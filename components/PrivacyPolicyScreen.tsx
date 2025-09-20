/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface PrivacyPolicyScreenProps {
  onNavigate: (view: 'start' | 'contact') => void;
}

const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ onNavigate }) => {
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
      key="privacy-screen"
      className="w-screen min-h-[calc(100vh-61px)] bg-gray-50 p-4 sm:p-6 lg:p-8"
      variants={viewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm">
        <motion.div variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
                Privacy Policy
            </h2>
            <p className="mt-2 text-sm text-gray-500">Last updated: October 26, 2024</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-8 prose prose-lg max-w-none text-gray-600">
          <p>
            Welcome to Photo Changer. This Privacy Policy explains how we handle your information when you use our application. This is a technology demonstration, and we are committed to being transparent about our data practices.
          </p>

          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">1. Information We Collect</h3>
          <p>
            To provide our services, we collect and process the following types of information:
          </p>
          <ul>
            <li><strong>Account Information:</strong> When you create an account, we collect your email address and a password. For this demonstration, this information is stored in your browser's local storage (`localStorage`) and is not transmitted to a central server.</li>
            <li><strong>Uploaded Content:</strong> We process the images you upload, including photos of individuals for model creation and images of garments for virtual try-on. These images are sent to a third-party AI service (Google Gemini) for processing. We do not store your uploaded images on our servers.</li>
            <li><strong>Saved Creations:</strong> If you choose to save an outfit, we store the outfit details (including the sequence of garments, adjustments, and a generated thumbnail) in your browser's `localStorage`. This data is tied to your locally-stored account information.</li>
          </ul>

          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">2. How We Use Your Information</h3>
          <p>
            Your information is used solely to provide and improve the application's functionality:
          </p>
          <ul>
            <li>To generate a personalized virtual model from your photo.</li>
            <li>To enable the virtual try-on of garments.</li>
            <li>To create new scenes and backgrounds for your images.</li>
            <li>To allow you to save and load your created outfits on your device.</li>
            <li>To authenticate you and provide access to your saved content.</li>
          </ul>

          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">3. Data Storage and Security</h3>
          <p>
            As this is a technology demonstration, our data handling is simplified:
          </p>
          <ul>
            <li><strong>Local Storage:</strong> All user account information and saved outfits are stored directly in your web browser's `localStorage`. This means the data resides on your device and is not held in a central database controlled by us. Clearing your browser's cache and site data will permanently delete this information.</li>
            <li><strong>Image Processing:</strong> Your images are sent to Google for processing via the Gemini API. We recommend reviewing <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Google's Privacy Policy</a> to understand how they handle data. We do not retain copies of the images you upload.</li>
          </ul>

          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">4. Your Rights (GDPR/CCPA)</h3>
          <p>
            We respect your privacy rights. Given that your personal data is stored locally on your device, you have direct control over it. You can exercise your rights in the following ways:
          </p>
          <ul>
            <li><strong>Right to Access & Rectify:</strong> You can access and manage your saved outfits directly within the application.</li>
            <li><strong>Right to Erasure (Deletion):</strong> You can delete individual saved outfits within the application. To delete all your data, including your simulated account, you can clear your browser's site data for our application.</li>
          </ul>

          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">5. Changes to This Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>

          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">6. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please <button onClick={() => onNavigate('contact')} className="text-indigo-600 hover:underline">contact us</button>.
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

export default PrivacyPolicyScreen;