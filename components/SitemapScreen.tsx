/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion, Variants } from 'framer-motion';

type View = 'start' | 'editor' | 'about' | 'faq' | 'services' | 'blog' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'cookies' | 'sitemap' | 'notfound';

interface SitemapScreenProps {
  onNavigate: (view: View) => void;
}

const sitemapLinks = {
  main: [
    { name: 'Home', view: 'start' as View },
    { name: 'Editor', view: 'editor' as View },
  ],
  information: [
    { name: 'About Us', view: 'about' as View },
    { name: 'Services', view: 'services' as View },
    { name: 'Blog', view: 'blog' as View },
    { name: 'FAQ', view: 'faq' as View },
    { name: 'Contact', view: 'contact' as View },
  ],
  legal: [
    { name: 'Privacy Policy', view: 'privacy' as View },
    { name: 'Terms of Service', view: 'terms' as View },
    { name: 'Disclaimer', view: 'disclaimer' as View },
    { name: 'Cookies Policy', view: 'cookies' as View },
  ],
};

const SitemapScreen: React.FC<SitemapScreenProps> = ({ onNavigate }) => {
  const viewVariants: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.5, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -15 },
  };
  
  const itemVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const handleNavigate = (view: View) => {
    // The editor view requires a model to be selected first.
    // For the sitemap, we'll navigate to the start page instead as a safe fallback.
    if (view === 'editor') {
      onNavigate('start');
    } else {
      onNavigate(view);
    }
  };

  return (
    <motion.div
      key="sitemap-screen"
      className="w-screen min-h-[calc(100vh-61px)] bg-gray-50 p-4 sm:p-6 lg:p-8"
      variants={viewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm">
        <motion.div variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight text-center">
                Sitemap
            </h2>
            <p className="mt-4 text-lg text-gray-600 text-center">
                Navigate through our application with ease.
            </p>
        </motion.div>
        
        <motion.div variants={viewVariants} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div variants={itemVariants}>
                <h3 className="text-xl font-serif font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4">Main Pages</h3>
                <ul className="space-y-2">
                    {sitemapLinks.main.map(link => (
                        <li key={link.view}>
                            <button onClick={() => handleNavigate(link.view)} className="text-gray-600 hover:text-indigo-600 hover:underline transition-colors">{link.name}</button>
                        </li>
                    ))}
                </ul>
            </motion.div>

             <motion.div variants={itemVariants}>
                <h3 className="text-xl font-serif font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4">Information</h3>
                <ul className="space-y-2">
                    {sitemapLinks.information.map(link => (
                        <li key={link.view}>
                            <button onClick={() => handleNavigate(link.view)} className="text-gray-600 hover:text-indigo-600 hover:underline transition-colors">{link.name}</button>
                        </li>
                    ))}
                </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
                <h3 className="text-xl font-serif font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-4">Legal</h3>
                <ul className="space-y-2">
                    {sitemapLinks.legal.map(link => (
                        <li key={link.view}>
                            <button onClick={() => handleNavigate(link.view)} className="text-gray-600 hover:text-indigo-600 hover:underline transition-colors">{link.name}</button>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-12">
            <button
                onClick={() => onNavigate('start')}
                className="relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gray-900 rounded-md cursor-pointer group hover:bg-gray-700 transition-colors"
            >
                Start Creating &rarr;
            </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SitemapScreen;