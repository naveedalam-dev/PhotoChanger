/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// FIX: Corrected the import statement for React hooks.
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StartScreen from './components/StartScreen';
import Canvas from './components/Canvas';
import WardrobePanel from './components/WardrobeModal';
import OutfitStack from './components/OutfitStack';
import BackgroundPanel from './components/BackgroundPanel';
import AdjustmentPanel from './components/AdjustmentPanel';
import SaveLoadPanel from './components/SaveLoadPanel';
import AboutScreen from './components/AboutScreen';
import FAQScreen from './components/FAQScreen';
import ServicesScreen from './components/ServicesScreen';
import BlogScreen from './components/BlogScreen';
import ContactScreen from './components/ContactScreen';
import AuthModal from './components/AuthModal';
import { generateVirtualTryOnImage, generatePoseVariation, generateBackgroundReplacement, generateBackgroundReplacementWithImage } from './services/geminiService';
import { OutfitLayer, WardrobeItem, AdjustmentValues, SavedOutfit, User } from './types';
import { ChevronDownIcon, ChevronUpIcon } from './components/icons';
import { defaultWardrobe } from './wardrobe';
import Footer from './components/Footer';
import Header from './components/Header';
import { getFriendlyErrorMessage, generateThumbnail } from './lib/utils';
import Spinner from './components/Spinner';
import PrivacyPolicyScreen from './components/PrivacyPolicyScreen';
import TermsOfServiceScreen from './components/TermsOfServiceScreen';
import DisclaimerScreen from './components/DisclaimerScreen';
import CookiePolicyScreen from './components/CookiePolicyScreen';
import CookieConsentBanner from './components/CookieConsentBanner';
import SitemapScreen from './components/SitemapScreen';
import NotFoundScreen from './components/NotFoundScreen';

// Data for SEO Schemas
import { faqs } from './components/FAQScreen';
import { blogPosts } from './components/BlogScreen';
import { features as serviceFeatures } from './components/ServicesScreen';

const POSE_INSTRUCTIONS = [
  "Full frontal view, hands on hips",
  "Slightly turned, 3/4 view",
  "Side profile view",
  "Jumping in the air, mid-action shot",
  "Walking towards camera",
  "Leaning against a wall",
];

type View = 'start' | 'editor' | 'about' | 'faq' | 'services' | 'blog' | 'contact' | 'privacy' | 'terms' | 'disclaimer' | 'cookies' | 'sitemap' | 'notfound';

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener('change', listener);
    
    if (mediaQueryList.matches !== matches) {
      setMatches(mediaQueryList.matches);
    }

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query, matches]);

  return matches;
};


const App: React.FC = () => {
  const [modelImageUrl, setModelImageUrl] = useState<string | null>(null);
  const [view, setView] = useState<View>('start');
  const [outfitHistory, setOutfitHistory] = useState<OutfitLayer[]>([]);
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [isSheetCollapsed, setIsSheetCollapsed] = useState(false);
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>(defaultWardrobe);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<'accepted' | 'declined' | null>(null);
  const [adjustments, setAdjustments] = useState<AdjustmentValues>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
  });
  const isMobile = useMediaQuery('(max-width: 767px)');

  // SEO: Dynamic Schema Markup Injection
  // FIX: Refactored the schema injection logic to resolve a TypeScript error on 'script.type'.
  // This approach is more robust by always creating a new, correctly typed script element.
  useEffect(() => {
    const SCRIPT_ID = 'app-schema-markup';

    // Always remove the old script first to ensure a clean state
    const existingScript = document.getElementById(SCRIPT_ID);
    if (existingScript) {
        existingScript.remove();
    }

    let schema: object | null = null;
    const appUrl = "https://photo-changer.example.com/"; // Placeholder URL
    const logoUrl = "https://i.postimg.cc/J7j2TQxx/20250919-2355-Photo-Changer-Logo-simple-compose-01k5hn89d9e7dbes9qcgyqqs0f.png";

    const organizationSchema = {
        "@type": "Organization",
        "name": "Photo Changer",
        "url": appUrl,
        "logo": logoUrl
    };

    switch(view) {
        case 'faq':
            schema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                    }
                }))
            };
            break;
        case 'blog':
             schema = {
                "@context": "https://schema.org",
                "@type": "Blog",
                "name": "Style Insights - Photo Changer Blog",
                "url": `${appUrl}blog`,
                "publisher": organizationSchema,
                "blogPost": blogPosts.map(post => ({
                  "@type": "BlogPosting",
                  "headline": post.title,
                  "image": post.imageUrl,
                  "datePublished": new Date(post.date).toISOString(),
                  "author": { "@type": "Person", "name": post.author },
                  "publisher": organizationSchema
                }))
             };
             break;
        case 'services':
            schema = {
                "@context": "https://schema.org",
                "@type": "Service",
                "serviceType": "Virtual Try-On and AI Photo Editing",
                "provider": organizationSchema,
                "name": "Photo Changer Services",
                "description": "An advanced AI-powered photo editor for virtual fashion styling. Generate a personalized model, try on an endless wardrobe of virtual outfits, change backgrounds with text prompts, and create stunning, professional-quality looks.",
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Our Features",
                    "itemListElement": serviceFeatures.map(feature => ({
                      "@type": "Offer",
                      "itemOffered": {
                        "@type": "Service",
                        "name": feature.title,
                        "description": feature.description
                      }
                    }))
                }
            };
            break;
        case 'about':
            schema = {
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "url": `${appUrl}about`,
                "name": "About Photo Changer",
                "description": "Learn about the mission, vision, and technology behind Photo Changer, an innovative AI-powered virtual styling application designed to unlock creativity in fashion."
            };
            break;
        case 'contact':
             schema = {
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "url": `${appUrl}contact`,
                "name": "Contact Photo Changer",
                "description": "Get in touch with the Photo Changer team for support, feedback, or partnership inquiries."
             };
             break;
        default:
            schema = {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Photo Changer",
                "url": appUrl,
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${appUrl}search?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                },
                "publisher": organizationSchema
            };
            break;
    }

    if (schema) {
        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema, null, 2);
        document.head.appendChild(script);
    }
  }, [view]);


  // Check for cookie consent on mount
  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem('photo-changer-cookie-consent') as 'accepted' | 'declined' | null;
      if (storedConsent) {
        setCookieConsent(storedConsent);
      }
    } catch (e) {
      console.error("Failed to load cookie consent from localStorage", e);
    }
  }, []);

  // Check for logged in user on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('photo-changer-user');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Failed to load user from localStorage", e);
    }
  }, []);


  // Load saved outfits from localStorage when user logs in/out
  useEffect(() => {
    if (!currentUser) {
      setSavedOutfits([]);
      return;
    }
    try {
      const storedOutfits = localStorage.getItem(`photo-changer-outfits-${currentUser.email}`);
      if (storedOutfits) {
        setSavedOutfits(JSON.parse(storedOutfits));
      }
    } catch (e) {
      console.error("Failed to load saved outfits from localStorage", e);
    }
  }, [currentUser]);

  const activeOutfitLayers = useMemo(() => 
    outfitHistory.slice(0, currentOutfitIndex + 1), 
    [outfitHistory, currentOutfitIndex]
  );
  
  const activeGarmentIds = useMemo(() => 
    activeOutfitLayers.map(layer => layer.garment?.id).filter(Boolean) as string[], 
    [activeOutfitLayers]
  );
  
  const displayImageUrl = useMemo(() => {
    if (outfitHistory.length === 0) return modelImageUrl;
    const currentLayer = outfitHistory[currentOutfitIndex];
    if (!currentLayer) return modelImageUrl;

    const poseInstruction = POSE_INSTRUCTIONS[currentPoseIndex];
    return currentLayer.poseImages[poseInstruction] ?? Object.values(currentLayer.poseImages)[0];
  }, [outfitHistory, currentOutfitIndex, currentPoseIndex, modelImageUrl]);

  const availablePoseKeys = useMemo(() => {
    if (outfitHistory.length === 0) return [];
    const currentLayer = outfitHistory[currentOutfitIndex];
    return currentLayer ? Object.keys(currentLayer.poseImages) : [];
  }, [outfitHistory, currentOutfitIndex]);

  const handleNavigate = (targetView: View) => {
    if (view === 'editor' && targetView === 'start') {
        handleStartOver();
    } else {
        setError(null);
        setView(targetView);
    }
  };

  const handleCookieConsent = (consent: 'accepted' | 'declined') => {
    try {
        localStorage.setItem('photo-changer-cookie-consent', consent);
        setCookieConsent(consent);
    } catch (e) {
        console.error("Failed to save cookie consent to localStorage", e);
        setError("Could not save your preference. Please ensure your browser supports local storage.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('photo-changer-user');
  };

  const handleModelFinalized = (url: string) => {
    setModelImageUrl(url);
    setOutfitHistory([{
      garment: null,
      poseImages: { [POSE_INSTRUCTIONS[0]]: url }
    }]);
    setCurrentOutfitIndex(0);
    setView('editor');
  };

  const handleStartOver = () => {
    setModelImageUrl(null);
    setOutfitHistory([]);
    setCurrentOutfitIndex(0);
    setIsLoading(false);
    setLoadingMessage('');
    setError(null);
    setCurrentPoseIndex(0);
    setIsSheetCollapsed(false);
    setWardrobe(defaultWardrobe);
    setAdjustments({ brightness: 100, contrast: 100, saturation: 100 });
    setView('start');
  };

  const handleGarmentSelect = useCallback(async (garmentFile: File, garmentInfo: WardrobeItem) => {
    if (!displayImageUrl || isLoading) return;

    const nextLayer = outfitHistory[currentOutfitIndex + 1];
    if (nextLayer && nextLayer.garment?.id === garmentInfo.id) {
        setCurrentOutfitIndex(prev => prev + 1);
        setCurrentPoseIndex(0);
        return;
    }

    setError(null);
    setIsLoading(true);
    setLoadingMessage(`Adding ${garmentInfo.name}...`);

    try {
      const newImageUrl = await generateVirtualTryOnImage(displayImageUrl, garmentFile);
      const currentPoseInstruction = POSE_INSTRUCTIONS[currentPoseIndex];
      
      const newLayer: OutfitLayer = { 
        garment: garmentInfo, 
        poseImages: { [currentPoseInstruction]: newImageUrl } 
      };

      setOutfitHistory(prevHistory => {
        const newHistory = prevHistory.slice(0, currentOutfitIndex + 1);
        return [...newHistory, newLayer];
      });
      setCurrentOutfitIndex(prev => prev + 1);
      
      setWardrobe(prev => {
        if (prev.find(item => item.id === garmentInfo.id)) {
            return prev;
        }
        return [...prev, garmentInfo];
      });
    } catch (err) {
      setError(getFriendlyErrorMessage(err, 'Failed to apply garment'));
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [displayImageUrl, isLoading, currentPoseIndex, outfitHistory, currentOutfitIndex]);

  const handleRemoveLastGarment = () => {
    if (currentOutfitIndex > 0) {
      setCurrentOutfitIndex(prevIndex => prevIndex - 1);
      setCurrentPoseIndex(0);
    }
  };
  
  const handlePoseSelect = useCallback(async (newIndex: number) => {
    if (isLoading || outfitHistory.length === 0 || newIndex === currentPoseIndex) return;
    
    const poseInstruction = POSE_INSTRUCTIONS[newIndex];
    const currentLayer = outfitHistory[currentOutfitIndex];

    if (currentLayer.poseImages[poseInstruction]) {
      setCurrentPoseIndex(newIndex);
      return;
    }

    const baseImageForPoseChange = Object.values(currentLayer.poseImages)[0];
    if (!baseImageForPoseChange) return;

    setError(null);
    setIsLoading(true);
    setLoadingMessage(`Changing pose...`);
    
    const prevPoseIndex = currentPoseIndex;
    setCurrentPoseIndex(newIndex);

    try {
      const newImageUrl = await generatePoseVariation(baseImageForPoseChange, poseInstruction);
      setOutfitHistory(prevHistory => {
        const newHistory = [...prevHistory];
        const updatedLayer = newHistory[currentOutfitIndex];
        updatedLayer.poseImages[poseInstruction] = newImageUrl;
        return newHistory;
      });
    } catch (err) {
      setError(getFriendlyErrorMessage(err, 'Failed to change pose'));
      setCurrentPoseIndex(prevPoseIndex);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [currentPoseIndex, outfitHistory, isLoading, currentOutfitIndex]);

  const handleBackgroundChange = useCallback(async (backgroundPrompt: string) => {
    if (!displayImageUrl || isLoading) return;

    setError(null);
    setIsLoading(true);
    setLoadingMessage('Changing background...');

    try {
        const newImageUrl = await generateBackgroundReplacement(displayImageUrl, backgroundPrompt);
        const poseInstruction = POSE_INSTRUCTIONS[currentPoseIndex];
        setOutfitHistory(prevHistory => {
            const newHistory = [...prevHistory];
            const currentLayer = newHistory[currentOutfitIndex];
            if (currentLayer) {
                currentLayer.poseImages[poseInstruction] = newImageUrl;
            }
            return newHistory;
        });
    } catch (err) {
        setError(getFriendlyErrorMessage(err, 'Failed to change background'));
    } finally {
        setIsLoading(false);
        setLoadingMessage('');
    }
  }, [displayImageUrl, isLoading, currentOutfitIndex, currentPoseIndex]);

  const handleBackgroundChangeWithImage = useCallback(async (backgroundImageFile: File) => {
    if (!displayImageUrl || isLoading) return;

    setError(null);
    setIsLoading(true);
    setLoadingMessage('Changing background...');

    try {
        const newImageUrl = await generateBackgroundReplacementWithImage(displayImageUrl, backgroundImageFile);
        const poseInstruction = POSE_INSTRUCTIONS[currentPoseIndex];
        setOutfitHistory(prevHistory => {
            const newHistory = [...prevHistory];
            const currentLayer = newHistory[currentOutfitIndex];
            if (currentLayer) {
                currentLayer.poseImages[poseInstruction] = newImageUrl;
            }
            return newHistory;
        });
    } catch (err) {
        setError(getFriendlyErrorMessage(err, 'Failed to change background'));
    } finally {
        setIsLoading(false);
        setLoadingMessage('');
    }
  }, [displayImageUrl, isLoading, currentOutfitIndex, currentPoseIndex]);

  const handleSaveOutfit = async () => {
    if (!displayImageUrl || !modelImageUrl || !currentUser) return;
    if (cookieConsent !== 'accepted') {
        setError("Please accept the cookie policy to save your outfits.");
        return;
    }
    try {
      const thumbnail = await generateThumbnail(displayImageUrl, adjustments);
      const newSavedOutfit: SavedOutfit = {
        id: `outfit-${Date.now()}`,
        name: `Outfit ${new Date().toLocaleString()}`,
        thumbnail,
        modelImageUrl,
        outfitHistory,
        currentOutfitIndex,
        adjustments,
        createdAt: new Date().toISOString(),
      };
      
      const updatedOutfits = [...savedOutfits, newSavedOutfit];
      setSavedOutfits(updatedOutfits);
      localStorage.setItem(`photo-changer-outfits-${currentUser.email}`, JSON.stringify(updatedOutfits));
    } catch (error) {
        console.error("Failed to save outfit:", error);
        setError("Could not save the outfit. Failed to generate thumbnail.");
    }
  };

  const handleLoadOutfit = (outfit: SavedOutfit) => {
    if (isLoading) return;
    setModelImageUrl(outfit.modelImageUrl);
    setOutfitHistory(outfit.outfitHistory);
    setCurrentOutfitIndex(outfit.currentOutfitIndex);
    setAdjustments(outfit.adjustments);
    setCurrentPoseIndex(0);
    setError(null);
    setView('editor');
  };
  
  const handleDeleteOutfit = (outfitId: string) => {
    if (!currentUser) return;
    const updatedOutfits = savedOutfits.filter(o => o.id !== outfitId);
    setSavedOutfits(updatedOutfits);
    localStorage.setItem(`photo-changer-outfits-${currentUser.email}`, JSON.stringify(updatedOutfits));
  };


  const viewVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  const renderContent = () => {
    switch (view) {
      case 'start':
        return (
          <motion.div
            key="start-screen"
            className="w-screen min-h-[calc(100vh-61px)] flex items-start sm:items-center justify-center bg-gray-50 p-4"
            variants={viewVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <StartScreen onModelFinalized={handleModelFinalized} />
          </motion.div>
        );
      case 'editor':
        if (!modelImageUrl) {
            setView('start'); // Safeguard
            return null;
        }
        return (
            <motion.div
              key="main-app"
              className="relative flex flex-col bg-white overflow-hidden"
              style={{ height: 'calc(100vh - 61px)' }}
              variants={viewVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <main className="flex-grow relative flex flex-col md:flex-row overflow-hidden">
                <div className="w-full h-full flex-grow flex items-center justify-center bg-white pb-16 relative">
                  <Canvas 
                    displayImageUrl={displayImageUrl}
                    onStartOver={handleStartOver}
                    isLoading={isLoading}
                    loadingMessage={loadingMessage}
                    onSelectPose={handlePoseSelect}
                    poseInstructions={POSE_INSTRUCTIONS}
                    currentPoseIndex={currentPoseIndex}
                    availablePoseKeys={availablePoseKeys}
                    isMobile={isMobile}
                    adjustments={adjustments}
                  />
                </div>

                <aside 
                  className={`absolute md:relative md:flex-shrink-0 bottom-0 right-0 h-auto md:h-full w-full md:w-1/3 md:max-w-sm bg-white/80 backdrop-blur-md flex flex-col border-t md:border-t-0 md:border-l border-gray-200/60 transition-transform duration-500 ease-in-out ${isSheetCollapsed ? 'translate-y-[calc(100%-4.5rem)]' : 'translate-y-0'} md:translate-y-0`}
                  style={{ transitionProperty: 'transform' }}
                >
                    <button 
                      onClick={() => setIsSheetCollapsed(!isSheetCollapsed)} 
                      className="md:hidden w-full h-8 flex items-center justify-center bg-gray-100/50"
                      aria-label={isSheetCollapsed ? 'Expand panel' : 'Collapse panel'}
                    >
                      {isSheetCollapsed ? <ChevronUpIcon className="w-6 h-6 text-gray-500" /> : <ChevronDownIcon className="w-6 h-6 text-gray-500" />}
                    </button>
                    <div className="p-4 md:p-6 pb-20 overflow-y-auto flex-grow flex flex-col gap-8">
                      {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md" role="alert">
                          <p className="font-bold">Error</p>
                          <p>{error}</p>
                        </div>
                      )}
                      <OutfitStack 
                        outfitHistory={activeOutfitLayers}
                        onRemoveLastGarment={handleRemoveLastGarment}
                      />
                      <BackgroundPanel
                        onBackgroundChange={handleBackgroundChange}
                        onBackgroundImageSelect={handleBackgroundChangeWithImage}
                        isLoading={isLoading}
                      />
                      <AdjustmentPanel
                        adjustments={adjustments}
                        onAdjustmentsChange={setAdjustments}
                        isLoading={isLoading}
                      />
                       <SaveLoadPanel
                          savedOutfits={savedOutfits}
                          onSave={handleSaveOutfit}
                          onLoad={handleLoadOutfit}
                          onDelete={handleDeleteOutfit}
                          isLoading={isLoading}
                          currentUser={currentUser}
                          onLoginClick={() => setIsAuthModalOpen(true)}
                          cookieConsent={cookieConsent}
                      />
                      <WardrobePanel
                        onGarmentSelect={handleGarmentSelect}
                        activeGarmentIds={activeGarmentIds}
                        isLoading={isLoading}
                        wardrobe={wardrobe}
                      />
                    </div>
                </aside>
              </main>
              <AnimatePresence>
                {isLoading && isMobile && (
                  <motion.div
                    className="fixed inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Spinner />
                    {loadingMessage && (
                      <p className="text-lg font-serif text-gray-700 mt-4 text-center px-4">{loadingMessage}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
        );
      case 'about':
        return <AboutScreen onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesScreen onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogScreen onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQScreen onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactScreen onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPolicyScreen onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsOfServiceScreen onNavigate={handleNavigate} />;
      case 'disclaimer':
        return <DisclaimerScreen onNavigate={handleNavigate} />;
      case 'cookies':
        return <CookiePolicyScreen onNavigate={handleNavigate} />;
      case 'sitemap':
        return <SitemapScreen onNavigate={handleNavigate} />;
      case 'notfound':
        return <NotFoundScreen onNavigate={handleNavigate} />;
      default:
        return <NotFoundScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="font-sans flex flex-col min-h-screen">
      <Header 
        view={view} 
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
      <Footer isOnDressingScreen={view === 'editor'} onNavigate={handleNavigate} />
      <CookieConsentBanner 
        isVisible={cookieConsent === null}
        onConsent={handleCookieConsent}
        onNavigate={handleNavigate}
      />
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthModalOpen(false);
        }}
        cookieConsent={cookieConsent}
      />
    </div>
  );
};

export default App;