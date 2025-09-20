/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface CookiePolicyScreenProps {
  onNavigate: (view: 'start' | 'contact') => void;
}

const CookiePolicyScreen: React.FC<CookiePolicyScreenProps> = ({ onNavigate }) => {
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
      key="cookies-screen"
      className="w-screen min-h-[calc(100vh-61px)] bg-gray-50 p-4 sm:p-6 lg:p-8"
      variants={viewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm">
        <motion.div variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
                Cookies Policy
            </h2>
            <p className="mt-2 text-sm text-gray-500">Last updated: October 26, 2024</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-8 prose prose-lg max-w-none text-gray-600">
          <p>
            This Cookies Policy explains how Photo Changer uses cookies and similar technologies like local storage to provide and improve our service.
          </p>

          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">1. What are Cookies and Local Storage?</h3>
          <p>
            Cookies are small text files that websites place on your device as you are browsing. Local storage is a similar technology that allows websites to store and retrieve data in your browser. Unlike cookies, data in local storage is not sent to the server with every request, making it suitable for storing user preferences and application data on your device. For the purposes of this policy, we will refer to both technologies collectively as "cookies."
          </p>

          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">2. How We Use Cookies</h3>
          <p>
            We use local storage for essential functions that are necessary for the application to work. We do not use cookies for tracking or advertising purposes. Here’s how we use them:
          </p>
          <ul>
            <li><strong>Essential Functionality:</strong> We use local storage to remember your cookie consent choice, keep you logged in, and save your created outfits. These are strictly necessary for the application to function as you expect.</li>
            <li><strong>Preferences:</strong> By accepting, you allow us to store your account details and saved creations in your browser's local storage. This enables features like saving and loading outfits across sessions.</li>
          </ul>

          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">3. Types of Cookies We Use</h3>
          <ul>
              <li>
                  <strong>`photo-changer-cookie-consent`</strong>: Stores your choice ('accepted' or 'declined') for this cookie policy so we don't have to ask you again on every visit. This is strictly necessary.
              </li>
              <li>
                  <strong>`photo-changer-users`</strong>: If you create an account, this stores a simulated list of users. This is only used if you accept our policy.
              </li>
               <li>
                  <strong>`photo-changer-user`</strong>: Stores your current logged-in state. This is only used if you accept our policy.
              </li>
               <li>
                  <strong>`photo-changer-outfits-[user-email]`</strong>: Stores your saved outfits, linked to your simulated account email. This is only used if you accept our policy.
              </li>
          </ul>
        
          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">4. Your Choices and How to Opt-Out</h3>
           <p>
             You have full control over your data.
           </p>
          <ul>
            <li><strong>Consent Banner:</strong> You can accept or decline the use of non-essential cookies via the consent banner that appears on your first visit. If you decline, features like user login and saving outfits will be disabled.</li>
            <li><strong>Browser Settings:</strong> You can manage and delete data stored by websites, including ours, through your browser's settings. Please refer to your browser's help documentation for instructions on how to clear site data, local storage, and cookies.</li>
          </ul>

          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">5. Contact Us</h3>
          <p>
            If you have any questions about our use of cookies, please <button onClick={() => onNavigate('contact')} className="text-indigo-600 hover:underline">contact us</button>.
          </p>
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

export default CookiePolicyScreen;