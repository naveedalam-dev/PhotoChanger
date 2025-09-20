/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

interface AboutScreenProps {
  onNavigate: (view: 'start') => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  const viewVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  return (
    <motion.div
      key="about-screen"
      className="w-screen min-h-[calc(100vh-61px)] flex items-center justify-center bg-gray-50 p-4"
      variants={viewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="max-w-3xl mx-auto text-left bg-white p-8 sm:p-12 rounded-2xl shadow-sm">
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight text-center">
          About Photo Changer
        </h2>
        <p className="mt-6 text-lg text-gray-600">
          Photo Changer is a forward-looking technology demonstration created by Naveed Alam to explore the intersection of artificial intelligence and personal style. We believe that everyone holds a unique vision of themselves, and our goal is to provide the tools to bring that vision to life. This project stands as a testament to the power of AI in transforming creative expression.
        </p>
        
        <div className="mt-8 space-y-6">
            <div>
                <h3 className="text-2xl font-serif font-semibold text-gray-800">Our Mission</h3>
                <p className="mt-2 text-gray-600">
                    Our core mission is to democratize creativity in fashion. We aim to break down the traditional barriers of styling by providing an intuitive, powerful platform where users can experiment without limits. We want to empower you to discover, design, and define your personal style with confidence and imagination.
                </p>
            </div>
            <div>
                <h3 className="text-2xl font-serif font-semibold text-gray-800">Our Vision</h3>
                <p className="mt-2 text-gray-600">
                    We envision a future where personal styling is more accessible, sustainable, and deeply personalized. By leveraging cutting-edge AI, we see a world where you can visualize any outfit combination before making a purchase, reducing waste and fostering a more conscious approach to fashion. Photo Changer is a step towards this future—a digital sandbox for style exploration.
                </p>
            </div>
            <div>
                <h3 className="text-2xl font-serif font-semibold text-gray-800">The Technology</h3>
                <p className="mt-2 text-gray-600">
                    This entire experience is powered by <span className="font-semibold text-gray-800">Google's Gemini AI</span>, a state-of-the-art multimodal model. From generating a photorealistic virtual model from a single image to seamlessly applying new garments and dynamically creating entire scenes from text, every core feature showcases Gemini's remarkable ability to understand and manipulate visual concepts. This project serves as a practical example of its vast creative potential.
                </p>
            </div>
        </div>

        <div className="text-center">
            <button
            onClick={() => onNavigate('start')}
            className="mt-10 relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gray-900 rounded-md cursor-pointer group hover:bg-gray-700 transition-colors"
            >
            Start Creating &rarr;
            </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutScreen;