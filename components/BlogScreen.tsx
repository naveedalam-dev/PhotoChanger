/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface BlogScreenProps {
  onNavigate: (view: 'start') => void;
}

export const blogPosts = [
  {
    id: 1,
    title: 'The Future is Now: How AI is Revolutionizing Your Personal Wardrobe',
    excerpt: 'Virtual try-on is no longer science fiction. In this article, we explore how generative AI is democratizing fashion, breaking down the barriers between imagination and reality to make personalized styling accessible to everyone, everywhere.',
    author: 'Alex Chen',
    date: 'October 26, 2024',
    imageUrl: 'https://storage.googleapis.com/gemini-95-icons/blog/ai-fashion-future.jpg'
  },
  {
    id: 2,
    title: '5 Pro Tips to Maximize Your Virtual Styling Experience',
    excerpt: 'Ready to build your digital wardrobe? We share five expert tips to help you create stunning looks, experiment with confidence, and discover your unique style using our powerful AI-driven platform. Get ready to unlock your inner stylist.',
    author: 'Jordan Smith',
    date: 'October 22, 2024',
    imageUrl: 'https://storage.googleapis.com/gemini-95-icons/blog/styling-tips.jpg'
  },
  {
    id: 3,
    title: 'Beyond the Backdrop: Crafting Compelling Scenes for Your Digital Looks',
    excerpt: 'An amazing outfit deserves an amazing setting. Learn how to master the Scene Creator tool to transport your virtual model anywhere, from the neon-lit streets of Tokyo to serene beaches, and tell a complete, captivating style story.',
    author: 'Casey Miller',
    date: 'October 18, 2024',
    imageUrl: 'https://storage.googleapis.com/gemini-95-icons/blog/compelling-scenes.jpg'
  }
];

const BlogScreen: React.FC<BlogScreenProps> = ({ onNavigate }) => {
  const viewVariants: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.5, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -15 },
  };
  
  const itemVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      key="blog-screen"
      className="w-screen min-h-[calc(100vh-61px)] bg-gray-50 p-4 sm:p-6 lg:p-8"
      variants={viewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
                Style Insights
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                Explore the latest in AI fashion, styling tips, and creative inspiration from our team.
            </p>
        </motion.div>
        
        <motion.div variants={viewVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
                <motion.div 
                    key={post.id} 
                    variants={itemVariants} 
                    className="bg-white rounded-xl shadow-sm border border-gray-200/80 overflow-hidden flex flex-col group"
                >
                    <div className="overflow-hidden">
                        <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 leading-snug">{post.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-sm flex-grow mb-4">{post.excerpt}</p>
                        <div className="text-xs text-gray-500">
                            <span>By {post.author}</span> &bull; <span>{post.date}</span>
                        </div>
                        <a href="#" onClick={(e) => e.preventDefault()} className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800 self-start">
                            Read More &rarr;
                        </a>
                    </div>
                </motion.div>
            ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-12">
            <button
                onClick={() => onNavigate('start')}
                className="relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gray-900 rounded-md cursor-pointer group hover:bg-gray-700 transition-colors"
            >
                Start Creating
            </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BlogScreen;