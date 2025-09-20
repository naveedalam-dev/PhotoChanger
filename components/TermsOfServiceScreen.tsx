/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface TermsOfServiceScreenProps {
  onNavigate: (view: 'start' | 'contact') => void;
}

const TermsOfServiceScreen: React.FC<TermsOfServiceScreenProps> = ({ onNavigate }) => {
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
      key="terms-screen"
      className="w-screen min-h-[calc(100vh-61px)] bg-gray-50 p-4 sm:p-6 lg:p-8"
      variants={viewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm">
        <motion.div variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
                Terms of Service
            </h2>
            <p className="mt-2 text-sm text-gray-500">Effective date: October 26, 2024</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-8 prose prose-lg max-w-none text-gray-600">
          <p>
            Please read these Terms of Service ("Terms") carefully before using the Photo Changer application (the "Service"). Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
          </p>

          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">1. Acceptance of Terms</h3>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service. This Service is a technology demonstration and is provided "as is" for informational and experimental purposes.
          </p>

          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">2. Use of the Service</h3>
          <p>
            You agree to use the Service only for lawful purposes. You are responsible for any content, such as images, that you upload to the Service. You must have the legal rights to any content you upload.
          </p>

          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">3. User Conduct</h3>
          <p>
            You agree not to use the Service to:
          </p>
          <ul>
            <li>Upload or generate any content that is unlawful, harmful, threatening, abusive, defamatory, obscene, or otherwise objectionable.</li>
            <li>Violate the privacy or intellectual property rights of others.</li>
            <li>Attempt to disrupt or interfere with the security or integrity of the Service.</li>
          </ul>
           <p>We reserve the right to block users who violate these terms.</p>

          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">4. Intellectual Property</h3>
          <p>
            You retain all ownership rights to the content you upload to the Service. By uploading content, you grant us a limited, non-exclusive, worldwide, royalty-free license to use, reproduce, and modify that content solely for the purpose of providing the Service's features to you. The Service and its original content, features, and functionality are and will remain the exclusive property of its creators.
          </p>

          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">5. Disclaimers and Limitation of Liability</h3>
          <p>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, express or implied, regarding the operation or availability of the Service. In no event shall the creators of Photo Changer be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the Service.
          </p>

          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">6. Changes to Terms</h3>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
          </p>
          
          <h3 className="text-2xl font-serif font-semibold text-gray-800 mt-6">7. Contact Us</h3>
          <p>
            If you have any questions about these Terms, please <button onClick={() => onNavigate('contact')} className="text-indigo-600 hover:underline">contact us</button>.
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

export default TermsOfServiceScreen;