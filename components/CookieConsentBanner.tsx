/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CookieIcon } from './icons';

interface CookieConsentBannerProps {
  isVisible: boolean;
  onConsent: (consent: 'accepted' | 'declined') => void;
  onNavigate: (view: 'cookies') => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ isVisible, onConsent, onNavigate }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200/80 z-50 p-4 shadow-2xl"
          role="dialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-description"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-3">
                <CookieIcon className="w-8 h-8 text-gray-600 flex-shrink-0 mt-1 hidden sm:block"/>
                <div>
                    <h2 id="cookie-title" className="font-semibold text-gray-800">We Value Your Privacy</h2>
                    <p id="cookie-description" className="text-sm text-gray-600 mt-1">
                        We use local storage to save your outfits and preferences directly on your device. This helps us provide a personalized experience without needing a server. By clicking "Accept", you agree to this. You can learn more in our{' '}
                        <button onClick={() => onNavigate('cookies')} className="text-indigo-600 hover:underline font-semibold">
                            Cookies Policy
                        </button>.
                    </p>
                </div>
            </div>
            <div className="flex-shrink-0 flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onConsent('declined')}
                className="flex-1 sm:flex-none px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => onConsent('accepted')}
                className="flex-1 sm:flex-none px-6 py-2 text-sm font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-700 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBanner;