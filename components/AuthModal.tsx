/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../types';
import { CloseIcon } from './icons';
import Spinner from './Spinner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  cookieConsent: 'accepted' | 'declined' | null;
}

// NOTE: This is a simulation of user authentication using localStorage.
// In a real-world application, you would replace this with API calls
// to a secure backend service for handling user registration and login.
const getStoredUsers = () => {
  try {
    const users = localStorage.getItem('photo-changer-users');
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, cookieConsent }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Reset form state when modal opens/closes
    if (!isOpen) {
      setTimeout(() => {
        setEmail('');
        setPassword('');
        setError(null);
        setIsLoading(false);
        setIsLoginView(true);
      }, 300); // Delay reset until after exit animation
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setError(null);
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      try {
        if (isLoginView) {
          handleLogin();
        } else {
          handleSignup();
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        setIsLoading(false);
      }
    }, 500);
  };

  const handleLogin = () => {
    if (cookieConsent !== 'accepted') {
        throw new Error('Please accept the cookie policy to log in.');
    }
    const users = getStoredUsers();
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      const userData: User = { email: user.email };
      localStorage.setItem('photo-changer-user', JSON.stringify(userData));
      onSuccess(userData);
    } else {
      throw new Error('Invalid email or password.');
    }
  };

  const handleSignup = () => {
    if (cookieConsent !== 'accepted') {
        throw new Error('Please accept the cookie policy to create an account.');
    }
    if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
    }
    const users = getStoredUsers();
    if (users.some((u: any) => u.email === email)) {
      throw new Error('An account with this email already exists.');
    }
    
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem('photo-changer-users', JSON.stringify(users));

    const userData: User = { email: newUser.email };
    localStorage.setItem('photo-changer-user', JSON.stringify(userData));
    onSuccess(userData);
  };

  const isSignupDisabled = !isLoginView && cookieConsent !== 'accepted';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl w-full max-w-sm flex flex-col shadow-xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
          >
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 id="auth-title" className="text-2xl font-serif tracking-wider text-gray-800">
                            {isLoginView ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {isLoginView ? 'Sign in to continue' : 'Get started with your free account'}
                        </p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                        aria-label="Close authentication modal"
                    >
                        <CloseIcon className="w-5 h-5"/>
                    </button>
                </div>
              

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm"
                        placeholder="you@example.com"
                    />
                </div>
                 <div>
                    <label htmlFor="password"  className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-800 focus:border-gray-800 sm:text-sm"
                        placeholder="••••••••"
                    />
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-50 text-red-700 p-3 rounded-md text-sm"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {isSignupDisabled && (
                    <div className="bg-yellow-50 text-yellow-800 p-3 rounded-md text-sm text-center">
                        Please accept the cookie policy to create an account.
                    </div>
                )}
                
                <button
                    type="submit"
                    disabled={isLoading || isSignupDisabled}
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Spinner /> : (isLoginView ? 'Log In' : 'Sign Up')}
                </button>
              </form>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 text-center">
              <p className="text-sm text-gray-600">
                {isLoginView ? "Don't have an account?" : 'Already have an account?'}
                <button
                  onClick={() => {
                    setIsLoginView(!isLoginView);
                    setError(null);
                  }}
                  className="font-medium text-gray-800 hover:text-gray-600 ml-1"
                >
                  {isLoginView ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;