/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

interface FAQScreenProps {
  onNavigate: (view: 'start') => void;
}

export const faqs = [
  {
    question: 'What is Photo Changer?',
    answer: 'Photo Changer is an advanced AI-powered web application designed for virtual fashion styling. It allows you to generate a personalized, photorealistic model from your own photo, digitally try on different articles of clothing, change backgrounds to create unique scenes, and fine-tune the final image with professional-grade adjustments.'
  },
  {
    question: 'How does the AI create a virtual model from my photo?',
    answer: 'When you upload a photo, our underlying AI (Google\'s Gemini) analyzes the key features of the person in the image—such as face, body type, and hair. It then generates a new, high-quality image of that person in a standard, neutral model pose against a clean studio backdrop. This process is designed to preserve your identity while creating a perfect canvas for virtual try-on.'
  },
  {
    question: 'What type of photo gives the best results?',
    answer: 'For optimal results, use a clear, well-lit, high-resolution photo. A full-body or at least an upper-body shot where the person is facing forward works best. Avoid photos with complex backgrounds, heavy shadows, or where the person\'s body is significantly obscured.'
  },
  {
    question: 'Is my data and are my photos kept private?',
    answer: 'Yes, we prioritize your privacy. This application is a demonstration and operates on a client-side basis for user data. Account information and saved outfits are stored in your browser\'s local storage, not on our servers. Uploaded images are sent to the AI for processing and are not retained afterward. For more details, please review our Privacy Policy.'
  },
  {
    question: 'Can I use my own clothing in the app?',
    answer: 'Absolutely. The "Wardrobe" panel features an upload option that allows you to add images of your own clothes. For best results, use clear product shots of garments on a clean, contrasting background, similar to what you would find on a retail website. This helps the AI accurately apply the clothing to your model.'
  },
  {
    question: 'Why did my image generation fail or get blocked?',
    answer: 'Image generation can occasionally fail for a few reasons. The most common are safety filters blocking a potentially inappropriate prompt or image, a network connection issue, or a request that is too ambiguous for the AI to interpret. If an error occurs, we recommend trying a more specific prompt, using a different source image, or simply attempting the generation again.'
  },
  {
    question: 'Is this a free service?',
    answer: 'Yes. Photo Changer is a technology demonstration and is completely free to use. Our goal is to showcase the creative possibilities of generative AI in a practical, hands-on way.'
  },
  {
    question: 'Who developed this application?',
    answer: 'This application was created by Naveed Alam to demonstrate the powerful and versatile image generation capabilities of Google\'s Gemini AI, showcasing its potential to revolutionize industries like fashion and e-commerce.'
  }
];

const FAQScreen: React.FC<FAQScreenProps> = ({ onNavigate }) => {
  const viewVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  return (
    <motion.div
      key="faq-screen"
      className="w-screen min-h-[calc(100vh-61px)] bg-gray-50 p-4 sm:p-6 lg:p-8"
      variants={viewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about our platform and its features.
            </p>
        </div>
        
        <div className="space-y-8">
            {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200/80">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
            ))}
        </div>

        <div className="text-center mt-12">
            <button
            onClick={() => onNavigate('start')}
            className="relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gray-900 rounded-md cursor-pointer group hover:bg-gray-700 transition-colors"
            >
            Start Creating &rarr;
            </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FAQScreen;