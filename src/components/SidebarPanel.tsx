import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Compass, MapPin, MessageSquare, Flame, Gamepad2, Palette, Info, Bell, ToggleLeft, RefreshCw, Trash2, ArrowRight } from 'lucide-react';
import { CURRENT_USER } from '../data';

interface SidebarPanelProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onTriggerNotification: (title: string, body: string, type: 'match' | 'message' | 'event' | 'couple') => void;
}

export function SidebarPanel({
  activeScreen,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
  onTriggerNotification
}: SidebarPanelProps) {
  
  // Categorized screens
  const screenGroups = [
    {
      title: "1. Onboarding & Gateways",
      screens: [
        { id: 'splash', name: 'Splash Screen', icon: '✨' },
        { id: 'onboarding', name: 'Onboarding Flow', icon: '📖' },
        { id: 'auth_login', name: 'Login Screen', icon: '🔑' },
        { id: 'auth_signup', name: 'Sign Up Screen', icon: '📝' },
        { id: 'auth_forgot', name: 'Forgot Password', icon: '🔑' },
        { id: 'auth_otp', name: 'OTP Verification', icon: '🛡️' }
      ]
    },
    {
      title: "2. Discovery & Feed",
      screens: [
        { id: 'home', name: 'Home Dashboard', icon: '🏠' },
        { id: 'explore', name: 'Explore Grid', icon: '🧭' },
        { id: 'friends', name: 'Friends & Mutuals', icon: '👥' }
      ]
    },
    {
      title: "3. Nearby & Maps",
      screens: [
        { id: 'nearby', name: 'Swipe Connection', icon: '💖' },
        { id: 'events', name: 'Nearby Events', icon: '🎉' },
        { id: 'map', name: 'Radar Map View', icon: '🗺️' }
      ]
    },
    {
      title: "4. Communication Hub",
      screens: [
        { id: 'chats', name: 'Chat List', icon: '💬' },
        { id: 'individual_chat', name: 'Interactive Chat', icon: '🗣️' }
      ]
    },
    {
      title: "5. Private Spaces",
      screens: [
        { id: 'couple', name: 'Couple Streak Hub', icon: '👩‍❤️‍👨' },
        { id: 'memories', name: 'Memory Timeline', icon: '📸' }
      ]
    },
    {
      title: "6. Interactive Hubs",
      screens: [
        { id: 'games', name: 'Games Arenas', icon: '🎮' },
        { id: 'travel', name: 'Travel Planner', icon: '✈️' }
      ]
    },
    {
      title: "7. Profiles & Preferences",
      screens: [
        { id: 'profile', name: 'Public Profile', icon: '👤' },
        { id: 'edit_profile', name: 'Edit Profile Form', icon: '✏️' },
        { id: 'notifications', name: 'Inbox Notifications', icon: '🔔' },
        { id: 'settings', name: 'App Settings Panel', icon: '⚙️' }
      ]
    }
  ];

  // Map screen IDs to designer specifications & rationale
  const getDesignerSpec = (id: string) => {
    switch (id) {
      case 'splash':
        return {
          title: "Splash Design Specs",
          concept: "High-contrast visual mystery with soft, calming, warm gradients. A premium entrance that reassures emotional connection.",
          spacing: "Spacious central column, utilizing 64px padding and generous negative margins.",
          accessibility: "Pulsing micro-logo runs with custom duration triggers to prevent visual seizure issues."
        };
      case 'onboarding':
        return {
          title: "Onboarding Specs",
          concept: "Fluid horizontal swiping showing beautiful vector icons. Simple pagination dots double as navigation triggers.",
          spacing: "8-point rhythm (vertical padding of 24px and card margins of 16px) for maximum thumb-reachability.",
          accessibility: "All paging steps are explicitly labeled. Large touch targets (48px) for 'Skip' and 'Next' CTA controls."
        };
      case 'auth_login':
      case 'auth_signup':
      case 'auth_forgot':
      case 'auth_otp':
        return {
          title: "Gateway Forms Specs",
          concept: "Structured inputs with inset icons for a safe, secure feel. Glassmorphic button fills keep the screen lightweight.",
          spacing: "16px grid margin on fields, rounded borders at 16px to maintain the soft aesthetic.",
          accessibility: "Clear keyboard focus outlines. Input labels paired with placeholder text to ensure screen reader compliance."
        };
      case 'home':
        return {
          title: "Dashboard Specs",
          concept: "Bento-style layout grouping stories, quick actions, and custom AI recommendations. Welcoming typography sets a daily friendly tone.",
          spacing: "Dense, highly informational grid using 12px card spacing and horizontal carousel scroll hints.",
          accessibility: "Strict contrast checks on tags. Bold text headers paired with clear icons for fast semantic search."
        };
      case 'explore':
        return {
          title: "Explore Hub Specs",
          concept: "An endless discovery scroll with high-contrast categories. Dynamic group tags help users select matching local forums.",
          spacing: "Symmetric vertical padding of 16px, with horizontal scroll limits restricted to 320px in mobile previews.",
          accessibility: "Interactive cards trigger micro-scale on hover. Standardized screen-reader labels for Join CTAs."
        };
      case 'nearby':
        return {
          title: "Swipe Connections Specs",
          concept: "Immersive portrait focus. Soft bottom gradients protect text readability. Emotional tactile feedback for hearts/stars.",
          spacing: "Large border-radius cards (28px). Action controls set at 52px diameter for perfect thumb reach.",
          accessibility: "Keyboard controls support swiping (ArrowLeft to Skip, ArrowRight to Connect). High contrast action buttons."
        };
      case 'map':
        return {
          title: "Radar Map Specs",
          concept: "Vector layout with glowing radar rings and floating avatar markers. Real-time scanning animation prompts exploration.",
          spacing: "Floating map markers are spread using explicit coordinate offsets to prevent overlap on small devices.",
          accessibility: "Pins are fully interactive. Click triggers an accessible overlay sheet with clear detail links."
        };
      case 'individual_chat':
        return {
          title: "Interactive Chat Specs",
          concept: "Real-time communication. Soft bubble corners (20px) that align tightly to margins. Waveform layout for voice messages.",
          spacing: "Smart reply suggestions set above the keyboard with clean 8px spacing for swift index taps.",
          accessibility: "Voice duration is announced. Input bar has clear keyboard-focus rings and high-contrast send controls."
        };
      case 'couple':
        return {
          title: "Couple Space Specs",
          concept: "Intimate private dashboard featuring high-impact streak countdowns and collaborative checklist milestones.",
          spacing: "Warm coral and purple gradient combinations, utilizing rounded bento blocks with 14px gutters.",
          accessibility: "Checklist boxes are highly tactile (24px target) with crisp checkmarks for visual confirmation."
        };
      case 'games':
        return {
          title: "Games Hub Specs",
          concept: "A casual board game lobby. High-impact emoji labels and quick matching controls trigger instant server simulations.",
          spacing: "Grids of 2x2 cards with 12px margin. Playable Tic Tac Toe grid uses a 14px spacing rhythm.",
          accessibility: "Board game cells support clear keyboard navigation. Playable results highlight winner states with distinct audio-tactile notifications."
        };
      case 'profile':
      case 'edit_profile':
        return {
          title: "Profile Specs",
          concept: "Design identity showcase. Overlapping avatars create depth. Adjustable search range sliders allow quick radius tuning.",
          spacing: "Top cover utilizes 32px height overlays. Bottom tags are spaced with standard 6px gap modifiers.",
          accessibility: "Sliders support direct keyboard arrows. Form inputs are paired with simple clear error states."
        };
      case 'settings':
        return {
          title: "Settings Specs",
          concept: "Systematic checklist. Inset colorful icons help users categorize account, security, and appearance presets.",
          spacing: "Standardized list layout with 16px vertical padding. Icon boxes are rounded to 12px to match overall softness.",
          accessibility: "Switch toggles are fully compatible with keyboard Space/Enter key. Crisp chevron icons guide navigation."
        };
      default:
        return {
          title: "MeetLoop Specs",
          concept: "A high-fidelity startup layout built to comply with Apple HIG and Material Design 3 guidelines.",
          spacing: "Rhythmically aligned to an 8px layout grid.",
          accessibility: "Fully compliant with WCAG color and typography readability guidelines."
        };
    }
  };

  const activeSpec = getDesignerSpec(activeScreen);

  return (
    <div className={`w-full lg:w-[420px] h-full flex flex-col p-6 overflow-y-auto select-none border-r shrink-0 ${isDarkMode ? 'bg-[#090D16] border-slate-800/80 text-slate-100' : 'bg-white border-slate-200/50 text-slate-800'}`}>
      
      {/* Brand header */}
      <div className="space-y-1.5 pb-4 border-b border-slate-200/50 dark:border-slate-800/80">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6C63FF] via-[#8B5CF6] to-[#FF6B8A] flex items-center justify-center text-white shadow-md shadow-indigo-500/10">
            <Heart className="w-5.5 h-5.5 fill-current" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight">MeetLoop</h1>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider block uppercase">Product Design System</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed pt-1">
          Explore the premium interactive prototype showcasing all 19 requested screens of MeetLoop. Select any screen below to instantly render it inside the iPhone mockup.
        </p>
      </div>

      {/* Quick Mock Simulator Controls */}
      <div className="py-4 space-y-2">
        <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center space-x-1.5">
          <RefreshCw className="w-3.5 h-3.5 text-[#6C63FF] animate-spin-slow" />
          <span>Interactive Triggers</span>
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {/* Relaunch Splash */}
          <button 
            onClick={() => onNavigate('splash')}
            className="p-2.5 rounded-xl border border-slate-200/55 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/40 text-[10.5px] font-semibold text-slate-400 hover:text-[#6C63FF] hover:border-[#6C63FF] transition flex items-center justify-center space-x-1.5"
          >
            <span>Restart Splash</span>
          </button>

          {/* Trigger Match Toast */}
          <button 
            onClick={() => onTriggerNotification("It's a Match! ❤️", "You and Pooja Reddy just connected nearby. Send her a chess challenge!", "match")}
            className="p-2.5 rounded-xl border border-slate-200/55 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/40 text-[10.5px] font-semibold text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition flex items-center justify-center space-x-1.5"
          >
            <span>Trigger Match</span>
          </button>

          {/* Trigger message */}
          <button 
            onClick={() => onTriggerNotification("Incoming Chat 💬", "Ananya: \"Hey Arjun! Wanna play Connect Four tonight?\"", "message")}
            className="p-2.5 rounded-xl border border-slate-200/55 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/40 text-[10.5px] font-semibold text-slate-400 hover:text-sky-500 hover:border-sky-500 transition flex items-center justify-center space-x-1.5"
          >
            <span>Mock Message</span>
          </button>

          {/* Toggle outer dark mode */}
          <button 
            onClick={onToggleDarkMode}
            className="p-2.5 rounded-xl border border-slate-200/55 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/40 text-[10.5px] font-semibold text-slate-400 hover:text-amber-500 hover:border-amber-500 transition flex items-center justify-center space-x-1.5"
          >
            <span>Toggle Dark/Light</span>
          </button>
        </div>
      </div>

      {/* Screen Selection Hierarchical List */}
      <div className="py-2 space-y-4">
        <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
          App Screens (Select to Navigate)
        </h3>

        <div className="space-y-4">
          {screenGroups.map((group) => (
            <div key={group.title} className="space-y-1.5">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">
                {group.title}
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {group.screens.map((screen) => {
                  const isCurrent = activeScreen === screen.id;
                  return (
                    <button
                      key={screen.id}
                      onClick={() => onNavigate(screen.id)}
                      className={`p-2.5 rounded-xl text-left border text-[11px] font-medium transition-all flex items-center space-x-2 ${isCurrent ? 'bg-[#6C63FF]/15 border-[#6C63FF] text-[#6C63FF] font-bold scale-[1.02]' : 'bg-slate-50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800/40 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-200'}`}
                    >
                      <span className="text-xs">{screen.icon}</span>
                      <span className="truncate">{screen.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Screen Designer Specs Box */}
      <div className="mt-6 p-4 bg-indigo-500/5 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 space-y-3.5">
        <div className="flex items-center space-x-1.5 text-[#6C63FF] dark:text-indigo-400">
          <Palette className="w-4.5 h-4.5" />
          <h3 className="text-xs font-bold uppercase tracking-wider">{activeSpec.title}</h3>
        </div>

        <div className="space-y-2.5 text-xs">
          <div>
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block mb-0.5">Creative Concept</span>
            <p className="text-slate-400 leading-relaxed font-medium">{activeSpec.concept}</p>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block mb-0.5">Layout Spacing Rhythm</span>
            <p className="text-slate-400 font-mono text-[10.5px]">{activeSpec.spacing}</p>
          </div>
          <div>
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block mb-0.5">Accessibility (WCAG 2.2)</span>
            <p className="text-slate-400 leading-relaxed font-medium">{activeSpec.accessibility}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
