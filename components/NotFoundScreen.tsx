/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface NotFoundScreenProps {
  onNavigate: (view: 'start') => void;
}

const NotFoundScreen: React.FC<NotFoundScreenProps> = ({ onNavigate }) => {
  const viewVariants: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <motion.div
      key="notfound-screen"
      className="w-screen min-h-[calc(100vh-61px)] flex items-center justify-center bg-gray-50 p-4 text-center"
      variants={viewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="max-w-md">
        <h2 className="text-8xl font-bold font-serif text-gray-300">404</h2>
        <h3 className="mt-2 text-3xl font-semibold text-gray-800">Page Not Found</h3>
        <p className="mt-4 text-gray-600">
          Sorry, we couldn't find the page you were looking for. It might have been moved, deleted, or maybe it never existed.
        </p>
        <button
          onClick={() => onNavigate('start')}
          className="mt-8 relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gray-900 rounded-md cursor-pointer group hover:bg-gray-700 transition-colors"
        >
          &larr; Go to Homepage
        </button>
      </div>
    </motion.div>
  );
};

export default NotFoundScreen;