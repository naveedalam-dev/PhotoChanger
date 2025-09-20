/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { MailIcon, PhoneIcon, MapPinIcon } from './icons';

interface ContactScreenProps {
  onNavigate: (view: 'start') => void;
}

const ContactInfoCard: React.FC<{icon: React.ReactNode, title: string, content: React.ReactNode}> = ({ icon, title, content }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-indigo-100/80 p-3 rounded-lg mt-1">
            {icon}
        </div>
        <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <div className="text-sm text-gray-600 leading-snug">{content}</div>
        </div>
    </div>
);

const ContactScreen: React.FC<ContactScreenProps> = ({ onNavigate }) => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const viewVariants: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.5, ease: 'easeInOut' } },
    exit: { opacity: 0, y: -15 },
  };
  
  const itemVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here (e.g., send to an API)
    console.log('Form submitted:', formState);
    setIsSubmitted(true);
  };

  return (
    <motion.div
      key="contact-screen"
      className="w-screen min-h-[calc(100vh-61px)] bg-gray-50 p-4 sm:p-6 lg:p-8"
      variants={viewVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
                Get in Touch
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                We’d love to hear from you. Whether you have a question, feedback, or just want to say hello, feel free to reach out.
            </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200/80">
                <h3 className="text-2xl font-serif font-semibold text-gray-800 mb-6">Send us a Message</h3>
                {isSubmitted ? (
                    <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800">Thank You!</h4>
                        <p className="text-green-700 mt-2">Your message has been sent. We'll get back to you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" name="name" id="name" required value={formState.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" name="email" id="email" required value={formState.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea name="message" id="message" rows={4} required value={formState.message} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-800 focus:border-gray-800"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 ease-in-out hover:bg-gray-700 active:scale-95">
                            Submit
                        </button>
                    </form>
                )}
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-8">
                <div className="space-y-6">
                    <ContactInfoCard 
                        icon={<MailIcon className="w-6 h-6 text-indigo-600" />}
                        title="Email"
                        content={<a href="mailto:contact@naveedalam.dev" className="hover:underline">contact@naveedalam.dev</a>}
                    />
                    <ContactInfoCard 
                        icon={<PhoneIcon className="w-6 h-6 text-indigo-600" />}
                        title="WhatsApp"
                        content={<a href="https://wa.me/923362255235" target="_blank" rel="noopener noreferrer" className="hover:underline">+92 336 2255235</a>}
                    />
                    <ContactInfoCard 
                        icon={<MapPinIcon className="w-6 h-6 text-indigo-600" />}
                        title="Location"
                        content={<p>Islamabad, Pakistan</p>}
                    />
                </div>
                 <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden border border-gray-200/80">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212527.7511470879!2d72.93728330058882!3d33.61603746682738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515c3bdb02b6!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1718895085482!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Office Location"
                    ></iframe>
                </div>
            </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactScreen;