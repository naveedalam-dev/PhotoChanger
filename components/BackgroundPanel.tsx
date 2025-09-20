/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { ImageIcon, UploadCloudIcon, PencilLineIcon, LayoutGridIcon } from './icons';
import { urlToFile } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundPanelProps {
  onBackgroundChange: (prompt: string) => void;
  onBackgroundImageSelect: (file: File) => void;
  isLoading: boolean;
}

const TEXT_SUGGESTIONS = [
  "A bustling Tokyo street at night, with neon signs",
  "A serene beach at sunset with soft waves",
  "A modern art gallery with minimalist paintings",
  "A lush, green forest with dappled sunlight",
  "The surface of Mars, with red rocks and a dusty sky",
  "A futuristic cityscape with flying vehicles",
];

const LIBRARY_BACKGROUNDS = [
    { name: "Tokyo Street", url: "https://storage.googleapis.com/gemini-95-icons/backgrounds/tokyo-street.jpg" },
    { name: "Beach Sunset", url: "https://storage.googleapis.com/gemini-95-icons/backgrounds/beach-sunset.jpg" },
    { name: "Art Gallery", url: "https://storage.googleapis.com/gemini-95-icons/backgrounds/art-gallery.jpg" },
    { name: "Green Forest", url: "https://storage.googleapis.com/gemini-95-icons/backgrounds/green-forest.jpg" },
    { name: "Mars Surface", url: "https://storage.googleapis.com/gemini-95-icons/backgrounds/mars-surface.jpg" },
    { name: "Futuristic City", url: "https://storage.googleapis.com/gemini-95-icons/backgrounds/futuristic-city.jpg" },
];

type Tab = 'prompt' | 'library' | 'upload';

const BackgroundPanel: React.FC<BackgroundPanelProps> = ({ onBackgroundChange, onBackgroundImageSelect, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('prompt');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onBackgroundChange(prompt.trim());
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    onBackgroundChange(suggestion);
  };

  const handleLibraryItemClick = async (item: { name: string, url: string }) => {
    if (isLoading) return;
    setError(null);
    try {
        const file = await urlToFile(item.url, `${item.name}.jpg`);
        onBackgroundImageSelect(file);
    } catch (err) {
        const detailedError = `Failed to load library background. Please check your network connection or try again.`;
        setError(detailedError);
        console.error(`Failed to load and convert library background from URL: ${item.url}`, err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file.');
            return;
        }
        setError(null);
        onBackgroundImageSelect(file);
    }
  };

  const tabVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const TabButton: React.FC<{tab: Tab, label: string, icon: React.ReactNode}> = ({ tab, label, icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      disabled={isLoading}
      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold rounded-md transition-colors disabled:opacity-50 ${activeTab === tab ? 'bg-gray-800 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="pt-6 border-t border-gray-400/50">
      <h2 className="text-xl font-serif tracking-wider text-gray-800 mb-4">Background Studio</h2>
      
      <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg mb-4">
        <TabButton tab="prompt" label="Describe" icon={<PencilLineIcon className="w-4 h-4" />} />
        <TabButton tab="library" label="Library" icon={<LayoutGridIcon className="w-4 h-4" />} />
        <TabButton tab="upload" label="Upload" icon={<UploadCloudIcon className="w-4 h-4" />} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
        >
          {activeTab === 'prompt' && (
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., A serene beach at sunset..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition text-sm"
                  rows={3}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className="w-full flex items-center justify-center text-center bg-gray-900 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 ease-in-out hover:bg-gray-700 active:scale-95 text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Generate Background
                </button>
              </form>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600 mb-2">Or try a suggestion:</p>
                <div className="flex flex-wrap gap-2">
                  {TEXT_SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                      disabled={isLoading}
                      className="text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1.5 transition-colors disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'library' && (
            <div>
              <p className="text-sm text-gray-600 mb-3">Choose a preset background from our library.</p>
              <div className="grid grid-cols-3 gap-3">
                {LIBRARY_BACKGROUNDS.map(item => (
                  <button
                    key={item.name}
                    onClick={() => handleLibraryItemClick(item)}
                    disabled={isLoading}
                    className="relative aspect-square border rounded-lg overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 group disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <img src={item.url} alt={item.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs font-bold text-center p-1">{item.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div>
                <p className="text-sm text-gray-600 mb-3">Upload your own background image.</p>
                <label htmlFor="background-upload" className={`relative w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500 transition-colors ${isLoading ? 'cursor-not-allowed bg-gray-100' : 'hover:border-gray-400 hover:text-gray-600 cursor-pointer'}`}>
                    <UploadCloudIcon className="w-8 h-8 mb-2"/>
                    <span className="text-sm font-semibold">Click to upload</span>
                    <span className="text-xs">PNG, JPG, WEBP</span>
                    <input id="background-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} disabled={isLoading}/>
                </label>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
};

export default BackgroundPanel;