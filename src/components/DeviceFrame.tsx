import React from 'react';
import { Home, MapPin, MessageSquare, Calendar, User, Heart } from 'lucide-react';
import { OnboardingAndAuth } from '../screens/OnboardingAndAuth';
import { DashboardAndExplore } from '../screens/DashboardAndExplore';
import { SocialAndNearby } from '../screens/SocialAndNearby';
import { CommunicationAndChat } from '../screens/CommunicationAndChat';
import { CoupleAndTimeline } from '../screens/CoupleAndTimeline';
import { GamesAndTravel } from '../screens/GamesAndTravel';
import { ProfileAndSettings } from '../screens/ProfileAndSettings';
import { UserProfile } from '../types';

interface DeviceFrameProps {
  activeScreen: string;
  isDarkMode: boolean;
  onNavigate: (screen: string) => void;
  onSelectProfile: (profile: UserProfile) => void;
  onTriggerNotification: (title: string, body: string, type: 'match' | 'message' | 'event' | 'couple') => void;
  onToggleDarkMode: () => void;
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
}

export function DeviceFrame({
  activeScreen,
  isDarkMode,
  onNavigate,
  onSelectProfile,
  onTriggerNotification,
  onToggleDarkMode,
  activeChatId,
  onSelectChat
}: DeviceFrameProps) {
  
  // Decide whether to show bottom navigation bar inside the phone screen
  const showBottomNav = [
    'home', 'explore', 'friends', 
    'nearby', 'events', 'map',
    'chats', 
    'couple', 'memories',
    'games', 'travel',
    'profile', 'notifications', 'settings', 'edit_profile'
  ].includes(activeScreen);

  // Helper to map bottom navigation active states
  const getActiveTab = () => {
    if (['home', 'explore', 'friends'].includes(activeScreen)) return 'home';
    if (['nearby', 'map'].includes(activeScreen)) return 'nearby';
    if (['chats', 'individual_chat'].includes(activeScreen)) return 'chats';
    if (['events', 'games', 'travel'].includes(activeScreen)) return 'events';
    if (['profile', 'notifications', 'settings', 'edit_profile'].includes(activeScreen)) return 'profile';
    return 'home';
  };

  const currentTab = getActiveTab();

  return (
    <div className={`relative w-[340px] h-[720px] rounded-[50px] border-[10px] ${isDarkMode ? 'border-slate-800 bg-[#0F172A] shadow-indigo-500/10' : 'border-slate-300 bg-slate-50 shadow-slate-200'} shadow-2xl flex flex-col overflow-hidden transition-all duration-300 shrink-0`}>
      
      {/* 1. TOP STATUS BAR */}
      <div className={`absolute top-0 left-0 right-0 h-11 px-8 flex items-center justify-between z-40 select-none ${isDarkMode ? 'bg-[#0F172A]/70 text-slate-100' : 'bg-slate-50/70 text-slate-800'} backdrop-blur-md`}>
        <span className="text-xs font-bold font-mono">9:41</span>
        
        {/* Dynamic Island Pill */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4.5 bg-black rounded-full shadow-inner flex items-center justify-end px-2">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        </div>

        <div className="flex items-center space-x-1.5 text-[10px]">
          {/* Signal signal dots */}
          <span className="text-xs">📶</span>
          <span className="text-xs">🔋</span>
        </div>
      </div>

      {/* 2. MAIN ACTIVE INNER CONTENT */}
      <div className="flex-1 pt-11 relative overflow-hidden">
        {/* Router of sub-screens */}
        {['splash', 'onboarding', 'auth_login', 'auth_signup', 'auth_forgot', 'auth_otp'].includes(activeScreen) && (
          <OnboardingAndAuth
            currentSubScreen={activeScreen as any}
            onChangeScreen={onNavigate}
            isDarkMode={isDarkMode}
          />
        )}

        {['home', 'explore', 'friends'].includes(activeScreen) && (
          <DashboardAndExplore
            currentTab={activeScreen as any}
            onChangeTab={onNavigate as any}
            isDarkMode={isDarkMode}
            onSelectProfile={onSelectProfile}
            onTriggerNotification={onTriggerNotification}
          />
        )}

        {['nearby', 'events', 'map'].includes(activeScreen) && (
          <SocialAndNearby
            currentTab={activeScreen as any}
            onChangeTab={onNavigate as any}
            isDarkMode={isDarkMode}
            onSelectProfile={onSelectProfile}
            onTriggerNotification={onTriggerNotification}
          />
        )}

        {['chats', 'individual_chat'].includes(activeScreen) && (
          <CommunicationAndChat
            currentSubScreen={activeScreen === 'chats' ? 'chat_list' : 'individual_chat'}
            activeChatId={activeChatId}
            onSelectChat={(id) => {
              onSelectChat(id);
              onNavigate('individual_chat');
            }}
            onBackToChats={() => onNavigate('chats')}
            isDarkMode={isDarkMode}
            onTriggerNotification={onTriggerNotification}
          />
        )}

        {['couple', 'memories'].includes(activeScreen) && (
          <CoupleAndTimeline
            currentTab={activeScreen as any}
            onChangeTab={onNavigate as any}
            isDarkMode={isDarkMode}
            onTriggerNotification={onTriggerNotification}
          />
        )}

        {['games', 'travel'].includes(activeScreen) && (
          <GamesAndTravel
            currentTab={activeScreen as any}
            onChangeTab={onNavigate as any}
            isDarkMode={isDarkMode}
            onSelectProfile={onSelectProfile}
            onTriggerNotification={onTriggerNotification}
          />
        )}

        {['profile', 'notifications', 'settings', 'edit_profile'].includes(activeScreen) && (
          <ProfileAndSettings
            currentTab={activeScreen as any}
            onChangeTab={onNavigate as any}
            isDarkMode={isDarkMode}
            onToggleDarkMode={onToggleDarkMode}
            onTriggerNotification={onTriggerNotification}
          />
        )}
      </div>

      {/* 3. FLOATING BOTTOM DEVICE PILL TAB BAR */}
      {showBottomNav && (
        <div className={`absolute bottom-0 left-0 right-0 h-[72px] px-4 pt-1.5 pb-4 border-t ${isDarkMode ? 'bg-[#0F172A]/90 text-slate-100 border-slate-800/80' : 'bg-white/90 text-slate-800 border-slate-100'} backdrop-blur-md z-30 flex items-center justify-around select-none`}>
          
          {/* TAB 1: Home dashboard */}
          <button 
            onClick={() => onNavigate('home')}
            className={`flex flex-col items-center space-y-0.5 py-1 ${currentTab === 'home' ? 'text-[#6C63FF]' : 'text-slate-400 hover:text-slate-500'}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[8px] font-extrabold uppercase tracking-widest">Home</span>
          </button>

          {/* TAB 2: Nearby cards */}
          <button 
            onClick={() => onNavigate('nearby')}
            className={`flex flex-col items-center space-y-0.5 py-1 ${currentTab === 'nearby' ? 'text-[#6C63FF]' : 'text-slate-400 hover:text-slate-500'}`}
          >
            <MapPin className="w-5 h-5" />
            <span className="text-[8px] font-extrabold uppercase tracking-widest">Nearby</span>
          </button>

          {/* TAB 3: Chats log */}
          <button 
            onClick={() => onNavigate('chats')}
            className={`flex flex-col items-center space-y-0.5 py-1 ${currentTab === 'chats' ? 'text-[#6C63FF]' : 'text-slate-400 hover:text-slate-500'}`}
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white font-extrabold text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white dark:border-[#0F172A]">
                3
              </span>
            </div>
            <span className="text-[8px] font-extrabold uppercase tracking-widest">Chats</span>
          </button>

          {/* TAB 4: Events nearby */}
          <button 
            onClick={() => onNavigate('events')}
            className={`flex flex-col items-center space-y-0.5 py-1 ${currentTab === 'events' ? 'text-[#6C63FF]' : 'text-slate-400 hover:text-slate-500'}`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[8px] font-extrabold uppercase tracking-widest">Events</span>
          </button>

          {/* TAB 5: Profile section */}
          <button 
            onClick={() => onNavigate('profile')}
            className={`flex flex-col items-center space-y-0.5 py-1 ${currentTab === 'profile' ? 'text-[#6C63FF]' : 'text-slate-400 hover:text-slate-500'}`}
          >
            <User className="w-5 h-5" />
            <span className="text-[8px] font-extrabold uppercase tracking-widest">Profile</span>
          </button>

        </div>
      )}

      {/* Dynamic bottom indicator pill */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-300 dark:bg-slate-700 rounded-full z-40" />

    </div>
  );
}
