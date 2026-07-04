import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Star, Sparkles, MapPin, Calendar, Clock, Compass, Plus, Search, Map, List, Check } from 'lucide-react';
import { MOCK_PROFILES, MOCK_EVENTS } from '../data';
import { UserProfile, NearbyEvent } from '../types';

interface SocialAndNearbyProps {
  currentTab: 'nearby' | 'events' | 'map';
  onChangeTab: (tab: 'nearby' | 'events' | 'map' | 'chats' | 'profile' | 'couple') => void;
  isDarkMode: boolean;
  onSelectProfile: (profile: UserProfile) => void;
  onTriggerNotification: (title: string, body: string, type: 'match' | 'message' | 'event' | 'couple') => void;
}

export function SocialAndNearby({
  currentTab,
  onChangeTab,
  isDarkMode,
  onSelectProfile,
  onTriggerNotification
}: SocialAndNearbyProps) {
  // Swipe Card States
  const [profileIndex, setProfileIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null);

  const activeSwipeProfile = MOCK_PROFILES[profileIndex % MOCK_PROFILES.length];

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    setSwipeDirection(direction);
    setTimeout(() => {
      if (direction === 'right') {
        onTriggerNotification('It\'s a Match! ❤️', `You and ${activeSwipeProfile.name} connected. Try sending a chess game invite!`, 'match');
      } else if (direction === 'up') {
        onTriggerNotification('Super Liked! ⭐', `You super liked ${activeSwipeProfile.name}. They will be notified!`, 'match');
      }
      setProfileIndex((prev) => prev + 1);
      setSwipeDirection(null);
    }, 400);
  };

  // Event Categories
  const [eventFilter, setEventFilter] = useState('all');
  const [events, setEvents] = useState<NearbyEvent[]>(MOCK_EVENTS);
  const [showCreateEvent, setShowCreateEvent] = useState(false);

  // New Event Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventCategory, setNewEventCategory] = useState<'music' | 'sports' | 'tech' | 'travel' | 'meetups'>('meetups');
  const [newEventLocation, setNewEventLocation] = useState('');

  const handleCreateEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle) return;

    const newEv: NearbyEvent = {
      id: `e_${Date.now()}`,
      title: newEventTitle,
      category: newEventCategory,
      location: newEventLocation || 'Hitech City, Hyderabad',
      date: 'Tomorrow',
      time: '7:00 PM',
      distance: '1.2 km away',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600',
      attendees: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'],
      description: 'Custom community meetup organized by Arjun Reddy. Let\'s get together and share deep conversations!'
    };

    setEvents([newEv, ...events]);
    setShowCreateEvent(false);
    onTriggerNotification('Event Created! 🗺', `"${newEventTitle}" is now live and showing to nearby peers.`, 'event');
    setNewEventTitle('');
  };

  const handleToggleInterest = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const isInt = !e.isInterested;
          if (isInt) {
            onTriggerNotification('Marked Interested! 🌟', `You saved ${e.title} in your calendar.`, 'event');
          }
          return { ...e, isInterested: isInt };
        }
        return e;
      })
    );
  };

  // Map Interactive Pin State
  const [selectedMapPin, setSelectedMapPin] = useState<'u1' | 'u2' | 'u3' | 'e1' | null>('u1');

  return (
    <div className={`h-full w-full select-none overflow-hidden relative ${isDarkMode ? 'bg-[#0F172A] text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* ==================== NEARBY SWIPING CARDS ==================== */}
      {currentTab === 'nearby' && (
        <div className="h-full w-full flex flex-col justify-between px-5 pt-4 pb-24 overflow-y-auto">
          {/* Top Info Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Nearby People</h2>
              <span className="text-xs text-slate-400">Discover friends & connections within 5 km</span>
            </div>
            <button 
              onClick={() => onChangeTab('map')}
              className="p-2 bg-indigo-500/10 text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white rounded-full transition"
            >
              <Map className="w-5 h-5" />
            </button>
          </div>

          {/* Swipe Deck Container */}
          <div className="flex-1 my-4 flex items-center justify-center relative min-h-[380px]">
            <AnimatePresence>
              <motion.div
                key={profileIndex}
                style={{ cursor: 'grab' }}
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  x: swipeDirection === 'left' ? -200 : swipeDirection === 'right' ? 200 : 0,
                  y: swipeDirection === 'up' ? -200 : 0,
                  rotate: swipeDirection === 'left' ? -10 : swipeDirection === 'right' ? 10 : 0
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                onClick={() => onSelectProfile(activeSwipeProfile)}
                className="absolute w-full h-full max-h-[460px] bg-white dark:bg-slate-900 rounded-[28px] overflow-hidden border border-slate-200/50 dark:border-slate-800/40 shadow-xl shadow-indigo-500/5 flex flex-col"
              >
                {/* Profile Image portrait with Gradient Overlay */}
                <div className="relative flex-1 overflow-hidden group">
                  <img 
                    src={activeSwipeProfile.avatar} 
                    alt={activeSwipeProfile.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-black/30 to-transparent" />
                  
                  {/* Top Badge: Online Status & Match */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="bg-[#6C63FF] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                      {activeSwipeProfile.matchScore}% Match
                    </span>
                    {activeSwipeProfile.onlineStatus === 'online' && (
                      <span className="flex items-center space-x-1 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>

                  {/* Profile info overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold">{activeSwipeProfile.name}, {activeSwipeProfile.age}</span>
                      {activeSwipeProfile.verified && (
                        <span className="p-0.5 bg-sky-400 rounded-full text-white">
                          <Check className="w-2.5 h-2.5 stroke-[4px]" />
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                      {activeSwipeProfile.bio}
                    </p>

                    {/* Hobbies list */}
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {activeSwipeProfile.interests.map((hobby) => (
                        <span 
                          key={hobby}
                          className="text-[9px] font-medium bg-white/15 px-2.5 py-1 rounded-full backdrop-blur-md"
                        >
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Swipe Buttons Controls */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            {/* Skip X */}
            <button
              onClick={() => handleSwipe('left')}
              className="w-13 h-13 rounded-full bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 flex items-center justify-center text-rose-500 hover:scale-110 hover:bg-rose-500/10 active:scale-95 transition shadow-md"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Super Like STAR */}
            <button
              onClick={() => handleSwipe('up')}
              className="w-11 h-11 rounded-full bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 flex items-center justify-center text-[#FF6B8A] hover:scale-110 hover:bg-[#FF6B8A]/10 active:scale-95 transition shadow-md"
            >
              <Star className="w-5 h-5 fill-current" />
            </button>

            {/* Match HEART */}
            <button
              onClick={() => handleSwipe('right')}
              className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#6C63FF] to-[#8B5CF6] flex items-center justify-center text-white hover:scale-110 hover:opacity-95 active:scale-95 transition shadow-lg shadow-indigo-500/15"
            >
              <Heart className="w-6 h-6 fill-current" />
            </button>
          </div>
        </div>
      )}

      {/* ==================== NEARBY EVENTS ==================== */}
      {currentTab === 'events' && (
        <div className="h-full w-full flex flex-col justify-between px-5 pt-4 pb-24 overflow-y-auto">
          <div className="space-y-4">
            {/* Header info */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight">Nearby Events</h2>
                <span className="text-xs text-slate-400">Discover meetups and concerts in your city</span>
              </div>
              <button 
                onClick={() => setShowCreateEvent(true)}
                className="p-2.5 bg-indigo-500/10 text-[#6C63FF] hover:bg-[#6C63FF] hover:text-white rounded-full transition"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Event Category Selector */}
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['all', 'music', 'tech', 'sports', 'travel'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setEventFilter(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${eventFilter === cat ? 'bg-[#6C63FF] text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-400 border border-slate-200/10 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Create Event Sheet (Modal Popup representation) */}
            {showCreateEvent && (
              <motion.form 
                onSubmit={handleCreateEventSubmit}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-[#6C63FF]/20 space-y-3 shadow-md"
              >
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1">
                  <Sparkles className="w-4 h-4 text-[#6C63FF]" />
                  <span>Host New Event</span>
                </h3>
                <div className="space-y-2 text-xs">
                  <input 
                    type="text" 
                    required
                    placeholder="Event Title (e.g. Sunset Coffee Chat)" 
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newEventCategory}
                      onChange={(e) => setNewEventCategory(e.target.value as any)}
                      className="bg-slate-100 dark:bg-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 outline-none text-slate-400"
                    >
                      <option value="music">Music</option>
                      <option value="meetups">Meetups</option>
                      <option value="sports">Sports</option>
                      <option value="tech">Tech</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder="Location" 
                      value={newEventLocation}
                      onChange={(e) => setNewEventLocation(e.target.value)}
                      className="bg-slate-100 dark:bg-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    type="button" 
                    onClick={() => setShowCreateEvent(false)}
                    className="flex-1 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-2 text-xs font-semibold text-white rounded-xl bg-[#6C63FF]"
                  >
                    Launch Event
                  </button>
                </div>
              </motion.form>
            )}

            {/* Events Grid layout */}
            <div className="grid grid-cols-1 gap-4">
              {events
                .filter((e) => eventFilter === 'all' || e.category === eventFilter)
                .map((event) => (
                  <div 
                    key={event.id}
                    className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow transition duration-300 flex flex-col"
                  >
                    <div className="relative h-40">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 bg-[#6C63FF] text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                        {event.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold tracking-tight">{event.title}</h3>
                        <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-rose-400" />
                          <span>{event.location}</span>
                          <span>·</span>
                          <span>{event.distance}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-medium pt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{event.date}</span>
                          <Clock className="w-3.5 h-3.5 text-indigo-400 ml-2" />
                          <span>{event.time}</span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                        {event.description}
                      </p>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/60">
                        {/* Attendee Group */}
                        <div className="flex items-center -space-x-2">
                          {event.attendees.map((a, idx) => (
                            <img 
                              key={idx} 
                              src={a} 
                              alt="Attendee" 
                              className="w-6 h-6 rounded-full border-2 border-white dark:border-[#0F172A] object-cover" 
                            />
                          ))}
                          <span className="text-[9px] text-slate-300 font-mono ml-3">
                            +{event.attendees.length * 3} going
                          </span>
                        </div>

                        {/* Interested CTA */}
                        <button
                          onClick={() => handleToggleInterest(event.id)}
                          className={`text-xs font-bold px-4 py-2 rounded-xl transition ${event.isInterested ? 'bg-emerald-500/10 text-emerald-500' : 'bg-[#6C63FF]/10 text-[#6C63FF] hover:bg-[#6C63FF]/20'}`}
                        >
                          {event.isInterested ? 'Going ✔' : 'Interested'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== MAP RADAR INTERACTIVE VIEW ==================== */}
      {currentTab === 'map' && (
        <div className="h-full w-full flex flex-col justify-between overflow-hidden relative">
          
          {/* Main Visual Map Canvas */}
          <div className="absolute inset-0 z-0 bg-[#E2E8F0] dark:bg-[#1E293B] overflow-hidden flex items-center justify-center">
            {/* Pulsing Radar rings */}
            <div className="absolute w-[240px] h-[240px] border border-indigo-500/20 rounded-full animate-ping" />
            <div className="absolute w-[360px] h-[360px] border border-indigo-500/10 rounded-full animate-pulse" />
            <div className="absolute w-[120px] h-[120px] border border-indigo-500/30 rounded-full flex items-center justify-center">
              {/* User Self Pin */}
              <div className="w-10 h-10 rounded-full bg-[#6C63FF] flex items-center justify-center text-white border-2 border-white dark:border-[#0F172A] shadow-lg animate-bounce">
                <Compass className="w-5 h-5 animate-spin-slow" />
              </div>
            </div>

            {/* Custom Interactive Avatar Scatter Pins */}
            {/* Pin 1: Ananya (u1) */}
            <button 
              onClick={() => setSelectedMapPin('u1')}
              className="absolute top-20 left-16 z-10 hover:scale-110 active:scale-95 transition"
            >
              <div className={`p-1 rounded-full ${selectedMapPin === 'u1' ? 'bg-[#6C63FF]' : 'bg-white'} shadow-md border-2 border-[#6C63FF]`}>
                <img 
                  src={MOCK_PROFILES[0].avatar} 
                  alt="Ananya" 
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </button>

            {/* Pin 2: Rohan (u2) */}
            <button 
              onClick={() => setSelectedMapPin('u2')}
              className="absolute bottom-40 right-14 z-10 hover:scale-110 active:scale-95 transition"
            >
              <div className={`p-1 rounded-full ${selectedMapPin === 'u2' ? 'bg-[#6C63FF]' : 'bg-white'} shadow-md border-2 border-[#8B5CF6]`}>
                <img 
                  src={MOCK_PROFILES[1].avatar} 
                  alt="Rohan" 
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </button>

            {/* Pin 3: Pooja (u3) */}
            <button 
              onClick={() => setSelectedMapPin('u3')}
              className="absolute top-36 right-16 z-10 hover:scale-110 active:scale-95 transition"
            >
              <div className={`p-1 rounded-full ${selectedMapPin === 'u3' ? 'bg-[#6C63FF]' : 'bg-white'} shadow-md border-2 border-rose-400`}>
                <img 
                  src={MOCK_PROFILES[2].avatar} 
                  alt="Pooja" 
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </button>

            {/* Pin 4: Music Event (e1) */}
            <button 
              onClick={() => setSelectedMapPin('e1')}
              className="absolute bottom-48 left-16 z-10 hover:scale-110 active:scale-95 transition"
            >
              <div className={`p-1.5 rounded-full ${selectedMapPin === 'e1' ? 'bg-[#FF6B8A]' : 'bg-white'} shadow-lg border-2 border-[#FF6B8A] text-xl`}>
                🎵
              </div>
            </button>
          </div>

          {/* Top Controls Overlay */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-slate-200/50 dark:border-slate-800 text-[10px] font-bold flex items-center space-x-1 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-[#6C63FF] animate-spin-slow" />
              <span>Scanning: Hitech City, Hyd</span>
            </div>
            <button 
              onClick={() => onChangeTab('nearby')}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-2 rounded-full border border-slate-200/50 dark:border-slate-800 text-slate-500 shadow-sm"
            >
              <List className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Card Sheet Overlay */}
          <div className="absolute bottom-24 left-4 right-4 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 rounded-3xl border border-slate-200/50 dark:border-slate-800 shadow-xl flex flex-col space-y-2 max-h-[140px]">
            {selectedMapPin === 'u1' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={MOCK_PROFILES[0].avatar} alt="Ananya" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold">{MOCK_PROFILES[0].name}, {MOCK_PROFILES[0].age}</h4>
                    <span className="text-[10px] text-[#6C63FF] font-medium block">2.4 km away · 94% Match</span>
                    <span className="text-[9px] text-slate-400 line-clamp-1">{MOCK_PROFILES[0].bio}</span>
                  </div>
                </div>
                <button 
                  onClick={() => onSelectProfile(MOCK_PROFILES[0])}
                  className="bg-[#6C63FF] text-white text-[10px] font-bold px-3 py-2 rounded-xl"
                >
                  Connect
                </button>
              </div>
            )}

            {selectedMapPin === 'u2' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={MOCK_PROFILES[1].avatar} alt="Rohan" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold">{MOCK_PROFILES[1].name}, {MOCK_PROFILES[1].age}</h4>
                    <span className="text-[10px] text-amber-500 font-medium block">1.8 km away · 88% Match</span>
                    <span className="text-[9px] text-slate-400 line-clamp-1">{MOCK_PROFILES[1].bio}</span>
                  </div>
                </div>
                <button 
                  onClick={() => onSelectProfile(MOCK_PROFILES[1])}
                  className="bg-[#8B5CF6] text-white text-[10px] font-bold px-3 py-2 rounded-xl"
                >
                  Connect
                </button>
              </div>
            )}

            {selectedMapPin === 'u3' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={MOCK_PROFILES[2].avatar} alt="Pooja" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold">{MOCK_PROFILES[2].name}, {MOCK_PROFILES[2].age}</h4>
                    <span className="text-[10px] text-[#FF6B8A] font-medium block">3.1 km away · 91% Match</span>
                    <span className="text-[9px] text-slate-400 line-clamp-1">{MOCK_PROFILES[2].bio}</span>
                  </div>
                </div>
                <button 
                  onClick={() => onSelectProfile(MOCK_PROFILES[2])}
                  className="bg-[#FF6B8A] text-white text-[10px] font-bold px-3 py-2 rounded-xl"
                >
                  Connect
                </button>
              </div>
            )}

            {selectedMapPin === 'e1' && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#FF6B8A] flex items-center justify-center text-xl">
                    🎵
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">{MOCK_EVENTS[0].title}</h4>
                    <span className="text-[10px] text-[#6C63FF] font-medium block">{MOCK_EVENTS[0].distance} · {MOCK_EVENTS[0].date}</span>
                    <span className="text-[9px] text-slate-400 line-clamp-1">{MOCK_EVENTS[0].description}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleToggleInterest(MOCK_EVENTS[0].id)}
                  className="bg-[#FF6B8A] text-white text-[10px] font-bold px-3 py-2 rounded-xl"
                >
                  Book Slot
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
