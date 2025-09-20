/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
// FIX: Import Variants to explicitly type animation variants.
import { motion, Variants } from 'framer-motion';
import { SparklesIcon, ShirtIcon, ImageIcon, SlidersHorizontalIcon, CheckCircleIcon } from './icons';

interface ServicesScreenProps {
  onNavigate: (view: 'start') => void;
}

export const features = [
  {
    icon: <SparklesIcon className="w-8 h-8 text-indigo-600" />,
    title: 'AI Model Generation',
    description: 'Transform your favorite photo into a high-quality, reusable virtual model. Our AI intelligently generates a professional, studio-ready image that preserves your unique identity, providing the perfect canvas for your styling journey.',
    benefits: ['Create a personalized digital twin for styling', 'Achieve professional results from a single photo', 'Provides a consistent base for all outfits']
  },
  {
    icon: <ShirtIcon className="w-8 h-8 text-indigo-600" />,
    title: 'Seamless Virtual Try-On',
    description: 'Explore styles without limits. Our core technology allows you to realistically apply any garment to your virtual model. Select from our curated wardrobe or upload your own clothing images to see how they fit, drape, and look in seconds.',
    benefits: ['Visualize outfits before you buy or wear', 'Experiment with new styles risk-free', 'Supports custom wardrobe uploads for true personalization']
  },
  {
    icon: <ImageIcon className="w-8 h-8 text-indigo-600" />,
    title: 'Dynamic Scene Creator',
    description: 'Your style, your story. Go beyond the studio by placing your model in any environment you can imagine. Simply describe a scene with text, choose from our high-resolution library, or upload your own background image to create the perfect setting.',
    benefits: ['Produce stunning, professional-grade fashion photos', 'Contextualize outfits for any event or mood', 'Unleash limitless creativity with text-to-image backgrounds']
  },
  {
    icon: <SlidersHorizontalIcon className="w-8 h-8 text-indigo-600" />,
    title: 'Full Creative Control',
    description: 'Perfect every last detail. Our suite of tools gives you complete control over the final image. Effortlessly change your model\'s pose to find the most dynamic angle, and use powerful adjustment sliders and one-click filters to master the lighting and mood.',
    benefits: ['Explore multiple AI-generated dynamic poses', 'Fine-tune brightness, contrast, and saturation', 'Apply artistic filters to achieve a stylized look']
  }
];

const ServicesScreen: React.FC<ServicesScreenProps> = ({ onNavigate }) => {
  // FIX: Explicitly typing variants with `Variants` from framer-motion.
  // This helps TypeScript understand that properties like `ease` expect specific string literals (e.g., 'easeOut') rather than the general `string` type, resolving the assignment error.
  const viewVariants: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -15 },
  };
  
  const itemVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      key="services-screen"
      className="w-screen min-h-[calc(100vh-61px)] bg-gray-50 p-4 sm:p-6 lg:p-8"
      variants={viewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
                A Studio of Creative Tools
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Our application combines powerful AI features to give you a complete virtual styling experience, from model creation to final photo.
            </p>
        </motion.div>
        
        <motion.div variants={viewVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200/80 flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-shrink-0 bg-indigo-100/80 p-3 rounded-lg">
                            {feature.icon}
                        </div>
                        <h3 className="text-2xl font-serif font-semibold text-gray-800">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{feature.description}</p>
                    <ul className="space-y-2">
                        {feature.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-12 bg-white p-8 rounded-xl shadow-sm border border-gray-200/80">
            <h3 className="text-2xl font-serif font-semibold text-gray-800">Completely Free to Use</h3>
            <p className="mt-2 text-gray-600">
                This entire suite of creative tools is available for free as part of our technology demonstration.
            </p>
            <button
            onClick={() => onNavigate('start')}
            className="mt-6 relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gray-900 rounded-md cursor-pointer group hover:bg-gray-700 transition-colors"
            >
            Start Your Creation &rarr;
            </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServicesScreen;