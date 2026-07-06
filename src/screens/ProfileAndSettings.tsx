import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Bell, Settings, Shield, Moon, Eye, Globe, ChevronRight, Check, Trash, Plus, Camera, Sparkles, Map, Lock } from 'lucide-react';
import { CURRENT_USER, MOCK_NOTIFICATIONS } from '../data';
import { UserProfile, NotificationItem } from '../types';

interface ProfileAndSettingsProps {
  currentTab: 'profile' | 'notifications' | 'settings' | 'edit_profile';
  onChangeTab: (tab: 'profile' | 'notifications' | 'settings' | 'edit_profile' | 'home') => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onTriggerNotification: (title: string, body: string, type: 'match' | 'message' | 'event' | 'couple') => void;
}

export function ProfileAndSettings({
  currentTab,
  onChangeTab,
  isDarkMode,
  onToggleDarkMode,
  onTriggerNotification
}: ProfileAndSettingsProps) {
  // Notifications State
  const [notifs, setNotifs] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const handleMarkAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
    onTriggerNotification('Inbox Cleaned! ✨', 'All notifications marked as read.', 'event');
  };

  const handleDeleteNotif = (id: string) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  };

  // Edit Profile Form State
  const [bioText, setBioText] = useState(CURRENT_USER.bio);
  const [userInterests, setUserInterests] = useState<string[]>(CURRENT_USER.interests);
  const [newHobbyInput, setNewHobbyInput] = useState('');
  const [maxDistance, setMaxDistance] = useState(15);
  const [privacyProfilePublic, setPrivacyProfilePublic] = useState(true);

  const handleAddHobby = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHobbyInput.trim()) return;
    if (userInterests.includes(newHobbyInput)) return;
    setUserInterests([...userInterests, newHobbyInput]);
    setNewHobbyInput('');
  };

  const handleSaveProfile = () => {
    CURRENT_USER.bio = bioText;
    CURRENT_USER.interests = userInterests;
    onTriggerNotification('Profile Updated! 📝', 'Your public design identity has been refreshed.', 'event');
    onChangeTab('profile');
  };

  return (
    <div className={`h-full w-full select-none overflow-y-auto px-5 py-6 pb-24 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
      
      {/* ==================== NOTIFICATIONS PAGE ==================== */}
      {currentTab === 'notifications' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Notifications</h2>
              <span className="text-xs text-slate-400">See activity across your circles</span>
            </div>
            {notifs.some(n => !n.read) && (
              <button 
                onClick={handleMarkAllRead}
                className="text-xs text-[#6C63FF] font-semibold hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="space-y-2.5">
            {notifs.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <span className="text-4xl block">✨</span>
                <p className="text-xs text-slate-400 font-semibold">Inbox is completely clear!</p>
              </div>
            ) : (
              notifs.map((n) => (
                <div 
                  key={n.id}
                  className={`p-4 rounded-2xl border flex items-start justify-between transition-all ${n.read ? 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800/60 opacity-70' : 'bg-indigo-500/5 dark:bg-indigo-500/10 border-[#6C63FF]/20 shadow-sm'}`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-xl mt-0.5">
                      {n.type === 'match' ? '❤️' : n.type === 'message' ? '💬' : n.type === 'couple' ? '💖' : '🎉'}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold leading-none">{n.title}</h4>
                      <p className="text-[10px] text-slate-400 leading-normal max-w-[180px]">{n.body}</p>
                      <span className="text-[8px] text-slate-300 font-mono block">{n.time}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteNotif(n.id)}
                    className="p-1 text-slate-300 hover:text-rose-500 rounded-lg transition"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ==================== PROFILE VIEW ==================== */}
      {currentTab === 'profile' && (
        <div className="space-y-5">
          {/* Cover Photo and Avatar */}
          <div className="relative">
            <div className="h-32 rounded-3xl overflow-hidden border border-slate-200/25">
              <img src={CURRENT_USER.coverImage} alt="Cover" className="w-full h-full object-cover" />
            </div>
            {/* Round Avatar overlapping */}
            <div className="absolute -bottom-10 left-6">
              <div className="p-1 rounded-full bg-white dark:bg-[#0F172A] border-4 border-white dark:border-[#0F172A]">
                <img src={CURRENT_USER.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover shadow-md" />
              </div>
            </div>
          </div>

          {/* Spacer for overlapping avatar */}
          <div className="h-8" />

          {/* Name & Bio */}
          <div className="space-y-1">
            <div className="flex items-center space-x-1.5">
              <h2 className="text-lg font-extrabold tracking-tight">{CURRENT_USER.name}</h2>
              {CURRENT_USER.verified && (
                <span className="p-0.5 bg-sky-400 rounded-full text-white">
                  <Check className="w-3 h-3 stroke-[4px]" />
                </span>
              )}
            </div>
            <span className="text-[10px] text-[#6C63FF] font-semibold block font-mono">Verified Architect</span>
            <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-wrap pt-1.5">
              {CURRENT_USER.bio}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => onChangeTab('edit_profile')}
              className="flex-1 py-3 bg-gradient-to-tr from-[#6C63FF] to-[#8B5CF6] text-white text-xs font-bold rounded-2xl hover:opacity-90 active:scale-95 transition text-center shadow-lg shadow-indigo-500/10"
            >
              Edit Design Profile
            </button>
            <button 
              onClick={() => onChangeTab('settings')}
              className="p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-2xl hover:bg-slate-200 transition"
            >
              <Settings className="w-4.5 h-4.5 text-slate-400" />
            </button>
          </div>

          {/* Statistics Box */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 rounded-2xl text-center">
            <div>
              <span className="text-base font-extrabold block">120</span>
              <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Connections</span>
            </div>
            <div className="border-x border-slate-100 dark:border-slate-800/60">
              <span className="text-base font-extrabold block">48</span>
              <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Memories</span>
            </div>
            <div>
              <span className="text-base font-extrabold block">15</span>
              <span className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Badges</span>
            </div>
          </div>

          {/* Interests Snapshots */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hobby & Interests</h3>
            <div className="flex flex-wrap gap-1.5">
              {CURRENT_USER.interests.map((hobby) => (
                <span 
                  key={hobby}
                  className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full text-slate-400 border border-slate-200/10"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>

          {/* Gallery Snapshots */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Moments Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {CURRENT_USER.photos.map((photo, idx) => (
                <div key={idx} className="h-20 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                  <img src={photo} alt="Snapshot" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== EDIT PROFILE VIEW ==================== */}
      {currentTab === 'edit_profile' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Edit Profile</h2>
            <p className="text-xs text-slate-400">Refining your social cards and search visibility.</p>
          </div>

          {/* Avatar Photo Editor mock */}
          <div className="flex items-center space-x-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="relative">
              <img src={CURRENT_USER.avatar} alt="Avatar" className="w-14 h-14 rounded-full object-cover" />
              <button className="absolute bottom-0 right-0 p-1 bg-[#6C63FF] text-white rounded-full border-2 border-white">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h4 className="text-xs font-bold">Profile Identity Photo</h4>
              <span className="text-[10px] text-slate-400">Allowed formats: PNG, JPG (Max 5MB)</span>
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Design Biography</label>
              <textarea 
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                rows={3}
                placeholder="Write a sweet private intro..." 
                className="w-full bg-slate-100 dark:bg-slate-900 px-3.5 py-2.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 text-xs outline-none resize-none"
              />
            </div>

            {/* Radius slider */}
            <div className="space-y-2.5 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Search Radius Preferences</span>
                <span className="text-[#6C63FF]">{maxDistance} km</span>
              </div>
              <input 
                type="range" 
                min={2}
                max={50}
                value={maxDistance}
                onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#6C63FF]"
              />
            </div>

            {/* Interests add tag field */}
            <div className="space-y-2 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
              <label className="text-xs font-semibold text-slate-400">Add Custom Interacting Hobbies</label>
              <form onSubmit={handleAddHobby} className="flex items-center space-x-2">
                <input 
                  type="text" 
                  value={newHobbyInput}
                  onChange={(e) => setNewHobbyInput(e.target.value)}
                  placeholder="e.g. Badminton, Poetry" 
                  className="bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200/50 dark:border-slate-800 text-xs w-full outline-none"
                />
                <button 
                  type="submit"
                  className="p-2 bg-indigo-500/10 text-[#6C63FF] rounded-xl"
                >
                  <Plus className="w-4.5 h-4.5" />
                </button>
              </form>

              {/* Tag render */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {userInterests.map((hobby) => (
                  <span 
                    key={hobby}
                    className="text-[9px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full text-slate-400 flex items-center space-x-1"
                  >
                    <span>{hobby}</span>
                    <button 
                      onClick={() => setUserInterests(userInterests.filter(i => i !== hobby))}
                      className="text-slate-300 hover:text-rose-500 font-extrabold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3 pt-2">
            <button 
              onClick={() => onChangeTab('profile')}
              className="flex-1 py-3 bg-slate-100 dark:bg-slate-900 text-slate-400 text-xs font-semibold rounded-2xl text-center"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveProfile}
              className="flex-1 py-3 bg-gradient-to-tr from-[#6C63FF] to-[#8B5CF6] text-white text-xs font-bold rounded-2xl text-center shadow-lg shadow-indigo-500/10"
            >
              Save Profile
            </button>
          </div>
        </div>
      )}

      {/* ==================== SETTINGS SCREEN ==================== */}
      {currentTab === 'settings' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Settings</h2>
            <p className="text-xs text-slate-400">Configure notifications, appearance and safety rules.</p>
          </div>

          {/* List options */}
          <div className="space-y-2.5">
            {/* Dark Mode toggle */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/85 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-[#6C63FF] flex items-center justify-center">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Appearance Theme</h4>
                  <span className="text-[9px] text-slate-400">Toggle light / dark mode</span>
                </div>
              </div>
              <button 
                onClick={onToggleDarkMode}
                className={`w-11 h-6 rounded-full transition-colors duration-200 relative p-0.5 ${isDarkMode ? 'bg-[#6C63FF]' : 'bg-slate-200'}`}
              >
                <span className={`w-5 h-5 rounded-full bg-white block shadow-sm transform transition-transform duration-200 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Privacy toggle */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/85 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Public Search Visibility</h4>
                  <span className="text-[9px] text-slate-400">Allow nearby peers to discover you</span>
                </div>
              </div>
              <button 
                onClick={() => {
                  setPrivacyProfilePublic(!privacyProfilePublic);
                  onTriggerNotification('Privacy Settings Updated 🔒', 'Your search visibility preferences are synced.', 'event');
                }}
                className={`w-11 h-6 rounded-full transition-colors duration-200 relative p-0.5 ${privacyProfilePublic ? 'bg-emerald-400' : 'bg-slate-200'}`}
              >
                <span className={`w-5 h-5 rounded-full bg-white block shadow-sm transform transition-transform duration-200 ${privacyProfilePublic ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            {/* Standard Settings Row Links */}
            {[
              { title: 'Account Settings', desc: 'Email, connected platforms, phone verify', icon: <User className="w-4 h-4" />, color: 'bg-blue-500/10 text-blue-500' },
              { title: 'Notification Channels', desc: 'Push badges, streaks, sounds', icon: <Bell className="w-4 h-4" />, color: 'bg-amber-500/10 text-amber-500' },
              { title: 'Language (English)', desc: 'Configure regional localization', icon: <Globe className="w-4 h-4" />, color: 'bg-emerald-500/10 text-emerald-500' },
              { title: 'Block & Ignored Users', desc: 'Manage private safety list', icon: <Lock className="w-4 h-4" />, color: 'bg-slate-500/10 text-slate-500' }
            ].map((setting, idx) => (
              <div 
                key={idx}
                onClick={() => alert(`Configuring ${setting.title}...`)}
                className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/85 flex items-center justify-between cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-800 transition"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full ${setting.color} flex items-center justify-center`}>
                    {setting.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">{setting.title}</h4>
                    <span className="text-[9px] text-slate-400">{setting.desc}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            ))}
          </div>

          {/* Version line footer */}
          <div className="text-center space-y-1 py-4">
            <span className="text-[10px] text-[#6C63FF] font-extrabold tracking-widest uppercase block">MeetLoop</span>
            <span className="text-[8px] text-slate-400 font-mono block">Premium Design Identity · Version 1.0.0 (Gold Master)</span>
          </div>
        </div>
      )}
    </div>
  );
}
