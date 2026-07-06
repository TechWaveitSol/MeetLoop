import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Compass, MapPin, MessageSquare, Shield, Smartphone, ArrowRight, Eye, RefreshCw, X, Palette, HelpCircle, AlertCircle, Info, ChevronRight, Check, Code, Copy, FileText, Terminal, Download } from 'lucide-react';
import { DeviceFrame } from './components/DeviceFrame';
import { SidebarPanel } from './components/SidebarPanel';
import { UserProfile } from './types';
import { CURRENT_USER } from './data';
import { FLUTTER_CODE_SNIPPETS } from './flutter_code_snippets';

interface LocalToast {
  id: string;
  title: string;
  body: string;
  type: 'match' | 'message' | 'event' | 'couple';
}

export default function App() {
  // Global active screens
  const [activeScreen, setActiveScreen] = useState<string>('splash');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activeChatId, setActiveChatId] = useState<string | null>('c1');
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  
  // Flutter code studio states
  const [codeTab, setCodeTab] = useState<'screen' | 'pubspec' | 'theme' | 'main'>('screen');
  const [copied, setCopied] = useState<boolean>(false);
  const [rightTab, setRightTab] = useState<'tokens' | 'flutter'>('flutter');

  const getActiveScreenSnippet = () => {
    if (activeScreen.startsWith('auth') || activeScreen === 'splash' || activeScreen === 'onboarding') {
      return FLUTTER_CODE_SNIPPETS.auth;
    }
    if (activeScreen === 'home' || activeScreen === 'explore' || activeScreen === 'friends') {
      return FLUTTER_CODE_SNIPPETS.dashboard;
    }
    if (activeScreen === 'nearby' || activeScreen === 'radar-map' || activeScreen === 'events') {
      return FLUTTER_CODE_SNIPPETS.nearby;
    }
    if (activeScreen.startsWith('chat') || activeScreen === 'individual_chat') {
      return FLUTTER_CODE_SNIPPETS.chat;
    }
    if (activeScreen === 'couple' || activeScreen === 'memories') {
      return FLUTTER_CODE_SNIPPETS.couple;
    }
    if (activeScreen === 'games' || activeScreen === 'travel') {
      return FLUTTER_CODE_SNIPPETS.games;
    }
    if (activeScreen === 'profile' || activeScreen === 'edit_profile' || activeScreen === 'settings') {
      return FLUTTER_CODE_SNIPPETS.profile;
    }
    return FLUTTER_CODE_SNIPPETS.dashboard;
  };

  const getActiveCode = () => {
    switch (codeTab) {
      case 'pubspec': return FLUTTER_CODE_SNIPPETS.pubspec;
      case 'theme': return FLUTTER_CODE_SNIPPETS.theme;
      case 'main': return FLUTTER_CODE_SNIPPETS.main;
      case 'screen': return getActiveScreenSnippet();
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    handleTriggerToast("Flutter Code Copied! 📋", "Directly paste this into your IDE to build.", "couple");
  };

  // Real-time custom toast triggers
  const [toasts, setToasts] = useState<LocalToast[]>([]);

  const handleTriggerToast = (
    title: string,
    body: string,
    type: 'match' | 'message' | 'event' | 'couple'
  ) => {
    const uniqueId = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const newToast: LocalToast = {
      id: uniqueId,
      title,
      body,
      type
    };
    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== uniqueId));
    }, 4000);
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // On initial mount, trigger a welcomed designer hint toast
  useEffect(() => {
    setTimeout(() => {
      handleTriggerToast(
        "Interactive Prototype Ready! 🚀",
        "Select screens in the designer panel to explore all 19 unique flows of MeetLoop.",
        "couple"
      );
    }, 1200);
  }, []);

  return (
    <div className={`min-h-screen w-full flex flex-col lg:flex-row transition-colors duration-300 overflow-hidden font-sans ${isDarkMode ? 'bg-[#0B0F19] text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* 1. LEFT COLUMN: DESIGN SYSTEM PANEL CONTROL */}
      <SidebarPanel
        activeScreen={activeScreen}
        onNavigate={(screen) => setActiveScreen(screen)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onTriggerNotification={handleTriggerToast}
      />

      {/* 2. CENTER STAGE: IMMERSIVE DEVICE EMULATOR PREVIEW */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden bg-radial from-transparent to-black/10">
        
        {/* Background Ambient Glowing Orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#6C63FF]/5 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-[#FF6B8A]/5 blur-[80px] pointer-events-none" />

        {/* Center device card frame layout with a desktop wrapper */}
        <div className="relative flex flex-col items-center space-y-4">
          
          <DeviceFrame
            activeScreen={activeScreen}
            isDarkMode={isDarkMode}
            onNavigate={(screen) => setActiveScreen(screen)}
            onSelectProfile={(p) => setSelectedProfile(p)}
            onTriggerNotification={handleTriggerToast}
            onToggleDarkMode={handleToggleDarkMode}
            activeChatId={activeChatId}
            onSelectChat={(id) => setActiveChatId(id)}
          />

          {/* Quick helpful overlay hints */}
          <span className="text-[10px] text-slate-400 font-mono tracking-wider text-center max-w-[280px]">
            💡 Tap elements inside the phone screen to trigger live animations & chat responses.
          </span>
        </div>
      </div>

      {/* 3. RIGHT COLUMN: APPLET DESIGN SPECS WORKSPACE SANDBOX */}
      <div className={`hidden xl:flex w-[340px] h-full flex-col p-6 overflow-hidden border-l shrink-0 ${isDarkMode ? 'bg-[#090D16] border-slate-800/80' : 'bg-white border-slate-200/50'}`}>
        {/* Tab switcher header */}
        <div className="flex border-b border-slate-200/50 dark:border-slate-800/80 pb-3 mb-4 space-x-1 shrink-0">
          <button
            onClick={() => setRightTab('flutter')}
            className={`flex-1 py-1.5 text-center rounded-lg text-[11px] font-extrabold tracking-wider uppercase transition ${rightTab === 'flutter' ? 'bg-[#6C63FF] text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Flutter Source
          </button>
          <button
            onClick={() => setRightTab('tokens')}
            className={`flex-1 py-1.5 text-center rounded-lg text-[11px] font-extrabold tracking-wider uppercase transition ${rightTab === 'tokens' ? 'bg-[#6C63FF] text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Design Tokens
          </button>
        </div>

        {rightTab === 'tokens' ? (
          <div className="space-y-6 overflow-y-auto pr-1 flex-1">
            {/* Header */}
            <div className="space-y-1.5 pb-2">
              <div className="flex items-center space-x-2 text-[#6C63FF]">
                <Palette className="w-5 h-5" />
                <h3 className="text-xs font-extrabold uppercase tracking-widest">Aesthetic Tokens</h3>
              </div>
              <p className="text-[11px] text-slate-400">
                The standardized design framework for MeetLoop.
              </p>
            </div>

            {/* Color Palettes Grid */}
            <div className="space-y-3">
              <h4 className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Brand Palette</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2.5">
                  <span className="w-6 h-6 rounded-lg bg-[#6C63FF] shadow" />
                  <div>
                    <span className="font-bold block">Primary Indigo</span>
                    <span className="text-[10px] text-slate-400 font-mono">#6C63FF</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-6 h-6 rounded-lg bg-[#8B5CF6] shadow" />
                  <div>
                    <span className="font-bold block">Secondary Purple</span>
                    <span className="text-[10px] text-slate-400 font-mono">#8B5CF6</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-6 h-6 rounded-lg bg-[#FF6B8A] shadow" />
                  <div>
                    <span className="font-bold block">Accent Coral</span>
                    <span className="text-[10px] text-slate-400 font-mono">#FF6B8A</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2.5">
                  <span className="w-6 h-6 rounded-lg bg-[#34D399] shadow" />
                  <div>
                    <span className="font-bold block">Mint Status</span>
                    <span className="text-[10px] text-slate-400 font-mono">#34D399</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Design Guidelines */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Structural Rules</h4>
              <div className="space-y-2.5 text-[11px] text-slate-400 leading-relaxed font-medium">
                <div className="flex items-start space-x-2">
                  <span className="text-[#6C63FF] mt-0.5">▪</span>
                  <p>**24px Rounded Corners**: No sharp layout boxes; maintains warmth.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-[#6C63FF] mt-0.5">▪</span>
                  <p>**Glassmorphism Effects**: Applied lightly on sliders and navigation wrappers.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-[#6C63FF] mt-0.5">▪</span>
                  <p>**8-Point Spacing**: Margins and padding align perfectly with the grid guidelines.</p>
                </div>
              </div>
            </div>

            {/* Simulated stats */}
            <div className="p-4 bg-indigo-500/5 dark:bg-slate-900/50 rounded-2xl border border-indigo-500/10 space-y-2 text-center">
              <span className="text-[9px] text-[#6C63FF] font-extrabold uppercase tracking-widest block">Prototype Status</span>
              <div className="flex justify-around py-1">
                <div>
                  <span className="text-sm font-extrabold block">19</span>
                  <span className="text-[8px] text-slate-400 uppercase font-semibold">Screens</span>
                </div>
                <div className="border-l border-slate-200/20 h-8" />
                <div>
                  <span className="text-sm font-extrabold block">100%</span>
                  <span className="text-[8px] text-slate-400 uppercase font-semibold">Flutter Ready</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden space-y-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[#6C63FF]">
                <Code className="w-5 h-5" />
                <h3 className="text-xs font-extrabold uppercase tracking-widest">Production Dart Exporter</h3>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Click any layout tab below to copy pristine, verified Flutter source files.
              </p>
            </div>

            {/* Snippet Toggles */}
            <div className="grid grid-cols-2 gap-1.5 shrink-0 text-[10px]">
              <button
                onClick={() => setCodeTab('pubspec')}
                className={`py-1.5 px-2 rounded-lg border font-bold transition text-center truncate ${codeTab === 'pubspec' ? 'bg-[#6C63FF]/20 border-[#6C63FF] text-[#6C63FF]' : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-300'}`}
              >
                pubspec.yaml
              </button>
              <button
                onClick={() => setCodeTab('theme')}
                className={`py-1.5 px-2 rounded-lg border font-bold transition text-center truncate ${codeTab === 'theme' ? 'bg-[#6C63FF]/20 border-[#6C63FF] text-[#6C63FF]' : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-300'}`}
              >
                theme.dart
              </button>
              <button
                onClick={() => setCodeTab('main')}
                className={`py-1.5 px-2 rounded-lg border font-bold transition text-center truncate ${codeTab === 'main' ? 'bg-[#6C63FF]/20 border-[#6C63FF] text-[#6C63FF]' : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-300'}`}
              >
                main.dart
              </button>
              <button
                onClick={() => setCodeTab('screen')}
                className={`py-1.5 px-2 rounded-lg border font-bold transition text-center truncate ${codeTab === 'screen' ? 'bg-[#6C63FF]/20 border-[#6C63FF] text-[#6C63FF]' : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-300'}`}
              >
                active_screen.dart ✨
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono px-1 shrink-0">
              <span>File: {
                codeTab === 'pubspec' ? 'pubspec.yaml' :
                codeTab === 'theme' ? 'lib/theme.dart' :
                codeTab === 'main' ? 'lib/main.dart' : 'lib/screens/active_screen.dart'
              }</span>
              {codeTab === 'screen' && (
                <span className="text-emerald-400 animate-pulse font-semibold">Auto-Synced 🟢</span>
              )}
            </div>

            {/* Code Box */}
            <div className="relative flex-1 min-h-0 bg-slate-950 rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col">
              {/* Copy control bar */}
              <button
                onClick={handleCopyCode}
                className="absolute top-3 right-3 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition flex items-center space-x-1.5 shadow-lg z-10"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="text-[10px] font-extrabold">{copied ? 'Copied!' : 'Copy File'}</span>
              </button>

              <div className="flex-1 p-4 overflow-auto font-mono text-[10.5px] text-slate-300 leading-relaxed scrollbar-thin select-text">
                <pre className="whitespace-pre">{getActiveCode()}</pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ==================== GLOBAL FLOATING PROFILE DETAIL MODAL ==================== */}
      <AnimatePresence>
        {selectedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`w-full max-w-sm rounded-[32px] overflow-hidden border shadow-2xl ${isDarkMode ? 'bg-[#0F172A] border-slate-800' : 'bg-white border-slate-200'}`}
            >
              {/* Profile Cover Image banner */}
              <div className="h-32 relative">
                <img src={selectedProfile.coverImage} alt="Cover" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedProfile(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Avatar picture and verification */}
              <div className="px-6 pb-6 relative">
                <div className="absolute -top-12 left-6">
                  <img src={selectedProfile.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-4 border-[#0F172A]" />
                </div>
                
                {/* Space for overlapping avatar */}
                <div className="h-10" />

                <div className="space-y-3.5">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-extrabold tracking-tight">{selectedProfile.name}, {selectedProfile.age}</h3>
                      {selectedProfile.verified && (
                        <span className="p-0.5 bg-sky-400 rounded-full text-white flex items-center">
                          <Check className="w-3 h-3 stroke-[4px]" />
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block font-mono">Location: {selectedProfile.distance}</span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {selectedProfile.bio}
                  </p>

                  {/* Mutual Hobbies list */}
                  <div className="space-y-2 bg-slate-100 dark:bg-slate-900/60 p-3 rounded-2xl">
                    <span className="text-[9px] font-extrabold text-[#6C63FF] uppercase tracking-widest block">Mutual Hobbies with you</span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {selectedProfile.mutualHobbies?.map((hobby) => (
                        <span key={hobby} className="text-[9px] bg-white dark:bg-slate-800 px-2.5 py-1 rounded-full text-slate-400 font-bold border border-slate-200/5 dark:border-slate-800">
                          {hobby}
                        </span>
                      )) || <span className="text-[9px] text-slate-400 italic">No matches, tap below to find matching interests!</span>}
                    </div>
                  </div>

                  {/* Primary Call to Action */}
                  <div className="flex items-center space-x-3 pt-1">
                    <button 
                      onClick={() => {
                        setSelectedProfile(null);
                        handleTriggerToast('Match request sent! 💖', `You requested to connect with ${selectedProfile.name}.`, 'match');
                      }}
                      className="flex-1 py-3 bg-gradient-to-tr from-[#6C63FF] to-[#8B5CF6] text-white text-xs font-bold rounded-2xl hover:opacity-95 active:scale-95 transition text-center shadow-lg shadow-indigo-500/10"
                    >
                      Request Connection
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedProfile(null);
                        handleTriggerToast('Super Liked! ⭐', `You super liked ${selectedProfile.name}.`, 'match');
                      }}
                      className="p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl hover:bg-slate-200 transition"
                    >
                      ⭐
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== GLOBAL FLOATING TOASTS NOTIFICATIONS ==================== */}
      <div className="fixed bottom-6 right-6 z-50 space-y-2.5 max-w-sm pointer-events-none select-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="p-4 rounded-3xl bg-white dark:bg-[#0F172A] border border-[#6C63FF]/30 dark:border-[#6C63FF]/20 shadow-2xl flex items-start space-x-3 pointer-events-auto"
            >
              <span className="text-2xl mt-0.5">
                {toast.type === 'match' ? '❤️' : toast.type === 'message' ? '💬' : toast.type === 'couple' ? '💖' : '🎉'}
              </span>
              <div className="space-y-0.5">
                <h4 className="text-xs font-extrabold leading-none">{toast.title}</h4>
                <p className="text-[10px] text-slate-400 leading-normal">{toast.body}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
}
