/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { GithubIcon } from './icons';

const newLogoUrl = 'https://i.postimg.cc/J7j2TQxx/20250919-2355-Photo-Changer-Logo-simple-compose-01k5hn89d9e7dbes9qcgyqqs0f.png';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200/60 h-[61px]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center gap-3">
            <img src={newLogoUrl} alt="Photo Changer Logo" className="w-auto h-12" />
            <h1 className="text-2xl font-serif tracking-wider text-gray-800">
              PC
            </h1>
        </div>
        <a 
          href="https://github.com/google/generative-ai-docs/tree/main/site/en/public/docs/hub/pro/virtual_try_on" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 text-sm font-semibold text-gray-700 bg-white/50 border border-gray-300/80 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Star on GitHub"
        >
          <GithubIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Star on GitHub</span>
        </a>
      </div>
    </header>
  );
};

export default Header;