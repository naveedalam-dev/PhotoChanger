/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import type { SavedOutfit, User } from '../types';
import { SaveIcon, Trash2Icon } from './icons';

interface SaveLoadPanelProps {
    savedOutfits: SavedOutfit[];
    onSave: () => void;
    onLoad: (outfit: SavedOutfit) => void;
    onDelete: (outfitId: string) => void;
    isLoading: boolean;
    currentUser: User | null;
    onLoginClick: () => void;
    cookieConsent: 'accepted' | 'declined' | null;
}

const SaveLoadPanel: React.FC<SaveLoadPanelProps> = ({ savedOutfits, onSave, onLoad, onDelete, isLoading, currentUser, onLoginClick, cookieConsent }) => {
    const [justSaved, setJustSaved] = useState(false);

    const handleSaveClick = () => {
        onSave();
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 2000);
    };

    const handleDeleteClick = (e: React.MouseEvent, outfitId: string) => {
        e.stopPropagation(); // Prevent onLoad from being called
        if (window.confirm('Are you sure you want to delete this outfit?')) {
            onDelete(outfitId);
        }
    };
    
    // Sort outfits by creation date, newest first
    const sortedOutfits = [...savedOutfits].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div className="pt-6 border-t border-gray-400/50">
            <h2 className="text-xl font-serif tracking-wider text-gray-800 mb-3">Saved Outfits</h2>
            
            {currentUser ? (
                cookieConsent !== 'accepted' ? (
                    <div className="text-center p-4 bg-yellow-50 text-yellow-800 rounded-lg">
                        <p className="text-sm font-semibold">Action Required</p>
                        <p className="text-sm mt-1">Please accept the cookie policy to enable saving outfits. Your creations are stored on your device.</p>
                    </div>
                ) : (
                    <>
                        <button
                            onClick={handleSaveClick}
                            disabled={isLoading || justSaved}
                            className={`w-full flex items-center justify-center text-center font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 ease-in-out active:scale-95 text-base mb-4 ${
                                justSaved
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-900 text-white hover:bg-gray-700'
                            } disabled:bg-gray-400 disabled:cursor-not-allowed`}
                        >
                            <SaveIcon className="w-5 h-5 mr-2" />
                            {justSaved ? 'Saved!' : 'Save Current Outfit'}
                        </button>
                        
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                            {sortedOutfits.length > 0 ? (
                                sortedOutfits.map((outfit) => (
                                    <div
                                        key={outfit.id}
                                        onClick={() => onLoad(outfit)}
                                        className="flex items-center p-2 rounded-lg bg-white/60 border border-gray-200/80 cursor-pointer hover:bg-gray-100 hover:border-gray-300 transition-all group"
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`Load ${outfit.name}`}
                                    >
                                        <img src={outfit.thumbnail} alt={outfit.name} className="w-12 h-16 object-cover rounded-md flex-shrink-0" />
                                        <div className="ml-3 overflow-hidden">
                                            <p className="font-semibold text-gray-800 text-sm truncate">{outfit.name}</p>
                                            <p className="text-gray-500 text-xs">
                                                {new Date(outfit.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <button
                                            onClick={(e) => handleDeleteClick(e, outfit.id)}
                                            className="ml-auto flex-shrink-0 p-2 rounded-full text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-red-100 hover:text-red-600 transition-all"
                                            aria-label={`Delete ${outfit.name}`}
                                        >
                                            <Trash2Icon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-sm text-gray-500 pt-4">Your saved outfits will appear here.</p>
                            )}
                        </div>
                    </>
                )
            ) : null}
        </div>
    );
};

export default SaveLoadPanel;