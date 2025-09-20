/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
import { GithubIcon, LogOutIcon, MenuIcon, CloseIcon } from './icons';
import { User } from '../types';
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';

const newLogoUrl = 'https://i.postimg.cc/J7j2TQxx/20250919-2355-Photo-Changer-Logo-simple-compose-01k5hn89d9e7dbes9qcgyqqs0f.png';

type View = 'start' | 'editor' | 'about' | 'faq' | 'services' | 'blog' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'cookies' | 'sitemap' | 'notfound';
interface HeaderProps {
    view: View;
    onNavigate: (view: View) => void;
    currentUser: User | null;
    onLogout: () => void;
}

const NavButton: React.FC<{onClick: () => void, isActive: boolean, children: React.ReactNode}> = ({ onClick, isActive, children }) => (
    <button
        onClick={onClick}
        className={`relative px-4 py-1.5 text-sm font-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-white/80 ${
            isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
        }`}
    >
        <span className="relative z-10">{children}</span>
        {isActive && (
            <motion.div
                className="absolute inset-0 bg-gray-200/60 rounded-md"
                layoutId="active-nav-highlight"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
        )}
    </button>
);

const MobileNavLink: React.FC<{onClick: () => void, children: React.ReactNode}> = ({ onClick, children }) => (
    <button
        onClick={onClick}
        className="w-full text-center text-2xl font-semibold text-gray-200 hover:text-white py-4 transition-colors"
    >
        {children}
    </button>
);


const Header: React.FC<HeaderProps> = ({ view, onNavigate, currentUser, onLogout }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);
  
  const navLinks: { view: View, label: string }[] = [
      { view: 'start', label: 'Home' },
      { view: 'services', label: 'Services' },
      { view: 'blog', label: 'Blog' },
      { view: 'about', label: 'About' },
      { view: 'faq', label: 'FAQ' },
      { view: 'contact', label: 'Contact' }
  ];

  const handleMobileNavClick = (view: View) => {
      onNavigate(view);
      setIsMobileMenuOpen(false);
  }

  return (
    <>
      <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200/60 h-[61px]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
              <button onClick={() => onNavigate('start')} className="flex items-center gap-2 group" aria-label="Go to homepage">
                <img src={newLogoUrl} alt="Photo Changer Logo" className="w-auto h-10 transition-transform group-hover:scale-105" />
                <h1 className="text-xl font-serif tracking-wider text-gray-800 hidden sm:block">
                  Photo Changer
                </h1>
              </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-white/50 p-1 rounded-lg border border-gray-200/60">
              <LayoutGroup id="desktop-nav">
                  {navLinks.map(link => (
                    <NavButton 
                        key={link.view}
                        onClick={() => onNavigate(link.view)} 
                        isActive={(link.view === 'start' && (view === 'start' || view === 'editor')) || view === link.view}
                    >
                        {link.label}
                    </NavButton>
                  ))}
              </LayoutGroup>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
              {currentUser ? (
                  <div className="relative">
                      <button 
                          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                          className="flex items-center gap-2 pl-3 pr-1.5 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200/80 rounded-full hover:bg-gray-100 transition-colors"
                          aria-label="Open user menu"
                      >
                          <span className="truncate max-w-[100px] hidden sm:inline">{currentUser.email}</span>
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                            {currentUser.email.charAt(0).toUpperCase()}
                          </div>
                      </button>
                      <AnimatePresence>
                          {isUserMenuOpen && (
                               <motion.div
                                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -5, scale: 0.95 }}
                                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 origin-top-right"
                               >
                                   <button
                                       onClick={() => {
                                           onLogout();
                                           setIsUserMenuOpen(false);
                                       }}
                                       className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                                   >
                                       <LogOutIcon className="w-4 h-4" />
                                       Logout
                                   </button>
                               </motion.div>
                          )}
                      </AnimatePresence>
                  </div>
              ) : null }
              
              <a 
                href="https://github.com/google/generative-ai-docs/tree/main/site/en/public/docs/hub/pro/virtual_try_on" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden sm:flex items-center justify-center w-9 h-9 text-gray-500 bg-white border border-gray-200/80 rounded-full hover:bg-gray-100 hover:text-gray-800 transition-colors"
                aria-label="Star on GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              {/* Mobile Menu Button */}
              <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:hidden flex items-center justify-center w-9 h-9 text-gray-500 bg-white border border-gray-200/80 rounded-full hover:bg-gray-100 hover:text-gray-800 transition-colors"
                  aria-label="Open navigation menu"
              >
                  <MenuIcon className="w-5 h-5" />
              </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
          {isMobileMenuOpen && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-50 flex flex-col p-6"
              >
                  <div className="flex justify-between items-center">
                    <button onClick={() => handleMobileNavClick('start')} className="flex items-center gap-2 group" aria-label="Go to homepage">
                      <img src={newLogoUrl} alt="Photo Changer Logo" className="w-auto h-10" />
                    </button>
                    <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-gray-300 hover:text-white"
                        aria-label="Close navigation menu"
                    >
                        <CloseIcon className="w-7 h-7"/>
                    </button>
                  </div>

                  <nav className="flex-grow flex flex-col items-center justify-center gap-2 -mt-16">
                      {navLinks.map(link => (
                          <MobileNavLink key={link.view} onClick={() => handleMobileNavClick(link.view)}>
                              {link.label}
                          </MobileNavLink>
                      ))}
                  </nav>

                  <div className="py-6 text-center">
                    <a 
                      href="https://github.com/google/generative-ai-docs/tree/main/site/en/public/docs/hub/pro/virtual_try_on" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 text-base font-semibold text-white bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                      aria-label="Star on GitHub"
                    >
                      <GithubIcon className="w-5 h-5" />
                      Star on GitHub
                    </a>
                  </div>
              </motion.div>
          )}
      </AnimatePresence>
    </>
  );
};

export default Header;