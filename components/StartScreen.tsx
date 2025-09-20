/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback, DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloudIcon, ShirtIcon, ImageIcon, SparklesIcon } from './icons';
import { Compare } from './ui/compare';
import { generateModelImage } from '../services/geminiService';
import Spinner from './Spinner';
import { getFriendlyErrorMessage } from '../lib/utils';

interface StartScreenProps {
  onModelFinalized: (modelUrl: string) => void;
}

const FeatureCard: React.FC<{icon: React.ReactNode, title: string, description: string}> = ({ icon, title, description }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-indigo-100/80 p-3 rounded-lg">{icon}</div>
        <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600 leading-snug">{description}</p>
        </div>
    </div>
);

const promptSuggestions = [
    "Standard, relaxed standing model pose for an e-commerce website",
    "Confident pose, hands on hips, looking directly at the camera",
    "Walking towards the camera with a slight smile",
    "Leaning against a white wall, casual and relaxed",
    "A dramatic, artistic pose with strong, moody lighting",
    "Professional headshot for a corporate profile, neutral expression",
];

const StartScreen: React.FC<StartScreenProps> = ({ onModelFinalized }) => {
  const [userImageFile, setUserImageFile] = useState<File | null>(null);
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [generatedModelUrl, setGeneratedModelUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        return;
    }

    setError(null);
    setGeneratedModelUrl(null);
    setPrompt('');
    setUserImageFile(file); // Store the file for later

    const reader = new FileReader();
    reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setUserImageUrl(dataUrl); // Set URL for preview, triggers view change
    };
    reader.readAsDataURL(file);
  }, []);

  const handleGenerateClick = async () => {
    if (!userImageFile || !prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setError(null);
    try {
        const result = await generateModelImage(userImageFile, prompt.trim());
        setGeneratedModelUrl(result);
    } catch (err) {
        setError(getFriendlyErrorMessage(err, 'Failed to create model'));
    } finally {
        setIsGenerating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const reset = () => {
    setUserImageFile(null);
    setUserImageUrl(null);
    setGeneratedModelUrl(null);
    setIsGenerating(false);
    setError(null);
    setPrompt('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const screenVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };
  
  // Drag and Drop handlers
  const handleDragEvents = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: DragEvent<HTMLElement>) => {
    handleDragEvents(e);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDraggingOver(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    handleDragEvents(e);
    setIsDraggingOver(false);
  };
  
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    handleDragEvents(e);
    setIsDraggingOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  // Determine which view to show
  const showUploader = !userImageUrl;
  const showPrompter = userImageUrl && !isGenerating && !generatedModelUrl;
  const showComparator = userImageUrl && (isGenerating || !!generatedModelUrl);

  return (
    <AnimatePresence mode="wait">
      {showUploader && (
        <motion.div
          key="uploader"
          className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-4"
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="max-w-lg">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
                Your Style, Reimagined by AI.
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                From a single photo, create a personalized model, try on endless outfits, and design your perfect look. Welcome to the future of your wardrobe.
              </p>

              <div className="my-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
                <FeatureCard 
                    icon={<SparklesIcon className="w-6 h-6 text-indigo-600" />}
                    title="AI Model"
                    description="Generate a realistic virtual model from your photo."
                />
                <FeatureCard 
                    icon={<ShirtIcon className="w-6 h-6 text-indigo-600" />}
                    title="Virtual Try-On"
                    description="Mix and match outfits from our wardrobe."
                />
                <FeatureCard 
                    icon={<ImageIcon className="w-6 h-6 text-indigo-600" />}
                    title="Scene Creator"
                    description="Change backgrounds with text or images."
                />
              </div>
              
              <label 
                htmlFor="image-upload-start"
                className={`relative block w-full p-8 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer group ${isDraggingOver ? 'border-indigo-500 bg-indigo-50/80 scale-105' : 'border-gray-300 bg-white/50 hover:border-indigo-400'} backdrop-blur-lg`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragEvents}
                onDrop={handleDrop}
              >
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-4 flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full transition-colors group-hover:bg-indigo-200">
                        <UploadCloudIcon className="w-8 h-8 text-indigo-600" />
                    </div>
                    <p className="font-semibold text-gray-800 text-lg">
                      Upload a Photo to Start
                    </p>
                    <p className="text-sm text-gray-500 mt-1">or drag and drop your image here</p>
                  </div>
                  <AnimatePresence>
                    {isDraggingOver && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-indigo-100/80 rounded-[14px] flex flex-col items-center justify-center z-10 pointer-events-none"
                        >
                            <UploadCloudIcon className="w-12 h-12 text-indigo-500 mb-4" />
                            <p className="text-xl font-semibold text-indigo-700">Drop your image here</p>
                        </motion.div>
                    )}
                 </AnimatePresence>
              </label>
              <input id="image-upload-start" type="file" className="hidden" accept="image/png, image/jpeg, image/webp, image/avif, image/heic, image/heif" onChange={handleFileChange} />
              
              <div className="mt-4 space-y-2">
                <p className="text-gray-500 text-xs text-center lg:text-left">By uploading an image, you agree not to submit any harmful content and acknowledge that this is a tech demo. For best results, use a clear, full-body photo.</p>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
            <Compare
              firstImage="https://i.postimg.cc/Rhw85CVj/pic.jpg"
              secondImage="https://i.postimg.cc/QCqbJFMx/image-m.png"
              slideMode="drag"
              className="w-full max-w-sm aspect-[2/3] rounded-2xl bg-gray-200"
            />
          </div>
        </motion.div>
      )}

      {showPrompter && (
        <motion.div
            key="prompter"
            className="w-full max-w-6xl mx-auto h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 px-4"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <div className="md:w-1/2 w-full flex flex-col items-center">
                <p className="text-sm font-semibold text-gray-600 mb-2">Your Photo</p>
                <img 
                    src={userImageUrl!} 
                    alt="User upload" 
                    className="w-[280px] h-[420px] sm:w-[320px] sm:h-[480px] rounded-2xl object-cover bg-gray-200 border"
                />
                <button onClick={reset} className="mt-4 text-sm font-semibold text-gray-700 hover:underline">
                    Use a different photo
                </button>
            </div>
            <div className="md:w-1/2 w-full flex-shrink-0 flex flex-col">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                    Bring Your Vision to Life
                </h2>
                <p className="mt-2 text-md text-gray-600">
                    Describe the pose, expression, and style for your AI model. Be as creative as you like!
                </p>
                
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A professional headshot for a LinkedIn profile, smiling warmly..."
                    className="w-full p-3 mt-6 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition text-base"
                    rows={4}
                />

                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-600 mb-2">Or try a suggestion:</p>
                    <div className="flex flex-wrap gap-2">
                        {promptSuggestions.map((suggestion) => (
                            <button
                                key={suggestion}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1.5 transition-colors"
                            >
                                {suggestion}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence>
                    {error && 
                      <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="text-red-600 max-w-md bg-red-50 p-3 rounded-md border border-red-200"
                      >
                        <p className="font-semibold text-sm">Generation Failed</p>
                        <p className="text-sm">{error}</p>
                      </motion.div>
                    }
                </AnimatePresence>

                <button 
                    onClick={handleGenerateClick}
                    disabled={!prompt.trim()}
                    className="w-full mt-6 relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gray-900 rounded-md cursor-pointer group hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Generate Model &rarr;
                </button>
            </div>
        </motion.div>
      )}

      {showComparator && (
        <motion.div
          key="compare"
          className="w-full max-w-6xl mx-auto h-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12"
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="md:w-1/2 flex-shrink-0 flex flex-col items-center md:items-start">
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                The New You
              </h2>
              <p className="mt-2 text-md text-gray-600">
                Drag the slider to see your transformation.
              </p>
            </div>
            
            {isGenerating && (
              <div className="flex items-center gap-3 text-lg text-gray-700 font-serif mt-6">
                <Spinner />
                <span>Generating your model...</span>
              </div>
            )}
            
            <AnimatePresence>
              {generatedModelUrl && !isGenerating && !error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col sm:flex-row items-center gap-4 mt-8"
                >
                  <button 
                    onClick={reset}
                    className="w-full sm:w-auto px-6 py-3 text-base font-semibold text-gray-700 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300 transition-colors"
                  >
                    Use Different Photo
                  </button>
                  <button 
                    onClick={() => onModelFinalized(generatedModelUrl)}
                    className="w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gray-900 rounded-md cursor-pointer group hover:bg-gray-700 transition-colors"
                  >
                    Proceed to Styling &rarr;
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="md:w-1/2 w-full flex items-center justify-center">
            <div 
              className={`relative rounded-[1.25rem] transition-all duration-700 ease-in-out ${isGenerating ? 'border border-gray-300 animate-pulse' : 'border border-transparent'}`}
            >
              <Compare
                firstImage={userImageUrl}
                secondImage={generatedModelUrl ?? userImageUrl}
                slideMode="drag"
                className="w-[280px] h-[420px] sm:w-[320px] sm:h-[480px] lg:w-[400px] lg:h-[600px] rounded-2xl bg-gray-200"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StartScreen;