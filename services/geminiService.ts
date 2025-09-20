/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";

const fileToPart = async (file: File) => {
    const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
    const { mimeType, data } = dataUrlToParts(dataUrl);
    return { inlineData: { mimeType, data } };
};

const dataUrlToParts = (dataUrl: string) => {
    const arr = dataUrl.split(',');
    if (arr.length < 2) throw new Error("Invalid data URL");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch || !mimeMatch[1]) throw new Error("Could not parse MIME type from data URL");
    return { mimeType: mimeMatch[1], data: arr[1] };
}

const dataUrlToPart = (dataUrl: string) => {
    const { mimeType, data } = dataUrlToParts(dataUrl);
    return { inlineData: { mimeType, data } };
}

const handleApiResponse = (response: GenerateContentResponse): string => {
    if (response.promptFeedback?.blockReason) {
        const { blockReason, blockReasonMessage } = response.promptFeedback;
        const errorMessage = `Request was blocked. Reason: ${blockReason}. ${blockReasonMessage || ''}`;
        throw new Error(errorMessage);
    }

    // Find the first image part in any candidate
    for (const candidate of response.candidates ?? []) {
        const imagePart = candidate.content?.parts?.find(part => part.inlineData);
        if (imagePart?.inlineData) {
            const { mimeType, data } = imagePart.inlineData;
            return `data:${mimeType};base64,${data}`;
        }
    }

    const finishReason = response.candidates?.[0]?.finishReason;
    if (finishReason && finishReason !== 'STOP') {
        const errorMessage = `Image generation stopped unexpectedly. Reason: ${finishReason}. This often relates to safety settings.`;
        throw new Error(errorMessage);
    }
    const textFeedback = response.text?.trim();
    const errorMessage = `The AI model did not return an image. ` + (textFeedback ? `The model responded with text: "${textFeedback}"` : "This can happen due to safety filters or if the request is too complex. Please try a different image.");
    throw new Error(errorMessage);
};

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
const model = 'gemini-2.5-flash-image-preview';

export const generateModelImage = async (userImage: File, userPrompt: string): Promise<string> => {
    const userImagePart = await fileToPart(userImage);
    const systemPrompt = `You are an expert fashion photographer AI. Your task is to transform the person in the provided image into a full-body fashion model photo based on the user's request.
**Core Instructions:**
1.  **Preserve Identity:** You MUST preserve the person's identity, unique facial features, and body type from the original image.
2.  **Clean Background:** Unless the user specifies a different background, place the model against a clean, neutral studio backdrop (e.g., light gray, #f0f0f0).
3.  **Photorealistic Output:** The final image must be photorealistic.
4.  **Follow User's Lead:** The user's prompt is the primary creative direction. Interpret it to adjust the model's pose, expression, style, and background if requested.
5.  **Output:** Return ONLY the final generated image. Do not include any text, headers, or explanations.

**User's Creative Request:** "${userPrompt}"`;
    const response = await ai.models.generateContent({
        model,
        contents: { parts: [userImagePart, { text: systemPrompt }] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });
    return handleApiResponse(response);
};

export const generateVirtualTryOnImage = async (modelImageUrl: string, garmentImage: File): Promise<string> => {
    const modelImagePart = dataUrlToPart(modelImageUrl);
    const garmentImagePart = await fileToPart(garmentImage);
    const prompt = `You are an expert virtual try-on AI. You will be given a 'model image' and a 'garment image'. Your task is to create a new photorealistic image where the person from the 'model image' is wearing the clothing from the 'garment image'.

**Crucial Rules:**
1.  **Complete Garment Replacement:** You MUST completely REMOVE and REPLACE the clothing item worn by the person in the 'model image' with the new garment. No part of the original clothing (e.g., collars, sleeves, patterns) should be visible in the final image.
2.  **Preserve the Model:** The person's face, hair, body shape, and pose from the 'model image' MUST remain unchanged.
3.  **Preserve the Background:** The entire background from the 'model image' MUST be preserved perfectly.
4.  **Apply the Garment:** Realistically fit the new garment onto the person. It should adapt to their pose with natural folds, shadows, and lighting consistent with the original scene.
5.  **Output:** Return ONLY the final, edited image. Do not include any text.`;
    const response = await ai.models.generateContent({
        model,
        contents: { parts: [modelImagePart, garmentImagePart, { text: prompt }] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });
    return handleApiResponse(response);
};

export const generatePoseVariation = async (tryOnImageUrl: string, poseInstruction: string): Promise<string> => {
    const tryOnImagePart = dataUrlToPart(tryOnImageUrl);
    const prompt = `You are an expert fashion photographer AI. Take this image and regenerate it from a different perspective. The person, clothing, and background style must remain identical. The new perspective should be: "${poseInstruction}". Return ONLY the final image.`;
    const response = await ai.models.generateContent({
        model,
        contents: { parts: [tryOnImagePart, { text: prompt }] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });
    return handleApiResponse(response);
};

export const generateBackgroundReplacement = async (imageUrl: string, backgroundPrompt: string): Promise<string> => {
    const imagePart = dataUrlToPart(imageUrl);
    const prompt = `You are an advanced image editing assistant. Your task is to replace the background of the provided image with a new one as described by the user, while keeping the main subject sharp and natural.
- Preserve all details of the subject (person and their clothing), including edges, lighting, and shadows.
- Ensure the new background blends seamlessly with the subject’s lighting and perspective.
- Avoid distorting or altering the subject in any way.
- The output must be a high-resolution, photorealistic image.
- Return ONLY the final image.

New background description: "${backgroundPrompt}"`;

    const response = await ai.models.generateContent({
        model,
        contents: { parts: [imagePart, { text: prompt }] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });
    return handleApiResponse(response);
};

export const generateBackgroundReplacementWithImage = async (imageUrl: string, backgroundImage: File): Promise<string> => {
    const imagePart = dataUrlToPart(imageUrl);
    const backgroundImagePart = await fileToPart(backgroundImage);
    const prompt = `You are an advanced image editing assistant. You will receive a 'subject image' and a 'background image'. Your task is to flawlessly replace the background of the 'subject image' with the 'background image'.
-   Preserve the subject (person and clothing) from the 'subject image' in its entirety.
-   Ensure the lighting, shadows, and perspective on the subject are realistically adapted to the new background.
-   The final image must be photorealistic and high-resolution.
-   Return ONLY the final, combined image.`;

    const response = await ai.models.generateContent({
        model,
        contents: { parts: [imagePart, backgroundImagePart, { text: prompt }] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });
    return handleApiResponse(response);
};