/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, XIcon, LinkedinIcon } from './icons';

const newLogoUrl = 'https://i.postimg.cc/J7j2TQxx/20250919-2355-Photo-Changer-Logo-simple-compose-01k5hn89d9e7dbes9qcgyqqs0f.png';

type View = 'start' | 'about' | 'faq' | 'services' | 'blog' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'cookies' | 'sitemap';

interface FooterProps {
  isOnDressingScreen?: boolean;
  onNavigate: (view: View) => void;
}

const FooterLink: React.FC<{view: View, onNavigate: (view: View) => void, children: React.ReactNode}> = ({ view, onNavigate, children }) => (
    <li>
        <button onClick={() => onNavigate(view)} className="text-gray-500 hover:text-gray-800 transition-colors duration-200">
            {children}
        </button>
    </li>
);

const SocialLink: React.FC<{href: string, 'aria-label': string, children: React.ReactNode}> = ({ href, 'aria-label': ariaLabel, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className="text-gray-500 hover:text-gray-800 transition-colors duration-200">
        {children}
    </a>
);


const Footer: React.FC<FooterProps> = ({ isOnDressingScreen = false, onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-white border-t border-gray-200/80 p-8 sm:p-12 z-40 ${isOnDressingScreen ? 'hidden md:block' : ''} mt-auto`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 mb-6 md:mb-0">
                <button onClick={() => onNavigate('start')} className="flex items-center gap-3 group mb-4" aria-label="Go to homepage">
                    <img src={newLogoUrl} alt="Photo Changer Logo" className="w-auto h-12 transition-transform group-hover:scale-105" />
                    <h1 className="text-2xl font-serif tracking-wider text-gray-800">
                        Photo Changer
                    </h1>
                </button>
                <p className="text-gray-500 text-sm max-w-sm">
                    Your Style, Reimagined by AI. Create a personalized model, try on endless outfits, and design your perfect look.
                </p>
                 <a 
                    href="https://github.com/google/generative-ai-docs/tree/main/site/en/public/docs/hub/pro/virtual_try_on" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                    >
                    <GithubIcon className="w-5 h-5" />
                    Remix on GitHub
                </a>
            </div>
            
            <div>
                <h3 className="font-semibold text-gray-800 mb-4 tracking-wide">Quick Links</h3>
                <ul className="space-y-3 text-sm">
                    <FooterLink view="services" onNavigate={onNavigate}>Services</FooterLink>
                    <FooterLink view="blog" onNavigate={onNavigate}>Blog</FooterLink>
                    <FooterLink view="about" onNavigate={onNavigate}>About Us</FooterLink>
                    <FooterLink view="faq" onNavigate={onNavigate}>FAQ</FooterLink>
                    <FooterLink view="contact" onNavigate={onNavigate}>Contact</FooterLink>
                </ul>
            </div>

            <div>
                <h3 className="font-semibold text-gray-800 mb-4 tracking-wide">Legal</h3>
                <ul className="space-y-3 text-sm">
                    <FooterLink view="privacy" onNavigate={onNavigate}>Privacy Policy</FooterLink>
                    <FooterLink view="terms" onNavigate={onNavigate}>Terms of Service</FooterLink>
                    <FooterLink view="disclaimer" onNavigate={onNavigate}>Disclaimer</FooterLink>
                    <FooterLink view="cookies" onNavigate={onNavigate}>Cookies Policy</FooterLink>
                    <FooterLink view="sitemap" onNavigate={onNavigate}>Sitemap</FooterLink>
                </ul>
            </div>
            
             <div>
                <h3 className="font-semibold text-gray-800 mb-4 tracking-wide">Follow Us</h3>
                <div className="flex items-center space-x-4">
                    <SocialLink href="https://x.com/naveedalam_dev" aria-label="X (formerly Twitter)">
                        <XIcon className="w-6 h-6" />
                    </SocialLink>
                    <SocialLink href="https://github.com/naveedalam-dev" aria-label="GitHub">
                        <GithubIcon className="w-6 h-6" />
                    </SocialLink>
                    <SocialLink href="https://www.linkedin.com/in/naveedalam-dev/" aria-label="LinkedIn">
                        <LinkedinIcon className="w-6 h-6" />
                    </SocialLink>
                </div>
            </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200/80 text-center text-sm text-gray-500">
            <p>&copy; {currentYear} Photo Changer. All Rights Reserved.</p>
            <p className="mt-1">
                Created by{' '}
                <a 
                href="https://naveedalam.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                >
                @naveedalamdev
                </a>
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;