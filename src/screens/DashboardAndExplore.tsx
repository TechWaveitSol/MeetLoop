import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Sparkles, Bell, Calendar, Compass, ArrowRight, UserPlus, Users, Flame, Gamepad2, Plane, Check, X, ShieldAlert } from 'lucide-react';
import { CURRENT_USER, MOCK_STORIES, MOCK_PROFILES, MOCK_EVENTS, MOCK_GAMES } from '../data';
import { UserProfile } from '../types';

interface DashboardAndExploreProps {
  currentTab: 'home' | 'explore' | 'friends';
  onChangeTab: (tab: 'home' | 'explore' | 'friends' | 'nearby' | 'chats' | 'events' | 'profile' | 'couple' | 'games') => void;
  isDarkMode: boolean;
  onSelectProfile: (profile: UserProfile) => void;
  onTriggerNotification: (title: string, body: string, type: 'match' | 'message' | 'event' | 'couple') => void;
}

export function DashboardAndExplore({
  currentTab,
  onChangeTab,
  isDarkMode,
  onSelectProfile,
  onTriggerNotification
}: DashboardAndExploreProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [friendRequests, setFriendRequests] = useState([
    { id: 'req1', name: 'Tanvi Sen', age: 22, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100', mutuals: 4 },
    { id: 'req2', name: 'Kabir Mehta', age: 25, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100', mutuals: 2 }
  ]);

  const handleAcceptRequest = (id: string, name: string) => {
    setFriendRequests((prev) => prev.filter((r) => r.id !== id));
    onTriggerNotification('Friend Request Accepted! 👥', `You are now connected with ${name}.`, 'match');
  };

  const handleDeclineRequest = (id: string) => {
    setFriendRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const categories = [
    { id: 'all', name: 'All Activities' },
    { id: 'music', name: 'Music' },
    { id: 'games', name: 'Games' },
    { id: 'events', name: 'Events' },
    { id: 'travel', name: 'Travel' }
  ];

  return (
    <div className={`h-full w-full overflow-y-auto px-5 py-6 pb-24 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
      
      {/* ==================== HOME DASHBOARD TAB ==================== */}
      {currentTab === 'home' && (
        <div className="space-y-6">
          {/* Header section */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-sm text-slate-400">Hello, {CURRENT_USER.name.split(' ')[0]} </span>
                <span className="animate-bounce">👋</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">Good morning!</h2>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => onTriggerNotification('AI Tip 💡', 'We recommend checking out the Chess Hub today!', 'event')}
                className="p-2.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 text-[#6C63FF] transition"
              >
                <Sparkles className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-900/80 px-4 py-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search people, events, games..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full placeholder-slate-400"
            />
          </div>

          {/* Stories Horizontal view */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stories</h3>
            <div className="flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-none">
              {MOCK_STORIES.map((story) => (
                <div key={story.id} className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer">
                  <div className={`p-[2.5px] rounded-full bg-gradient-to-tr ${story.id === 's1' ? 'from-slate-300 to-slate-400' : story.isLive ? 'from-[#FF6B8A] to-[#8B5CF6]' : 'from-[#6C63FF] to-[#34D399]'} relative`}>
                    <img 
                      src={story.avatar} 
                      alt={story.userName} 
                      className="w-13 h-13 rounded-full object-cover border-2 border-white dark:border-[#0F172A]"
                    />
                    {story.isLive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-rose-500 text-[8px] text-white font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                        Live
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 max-w-[64px] truncate">{story.userName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="grid grid-cols-4 gap-3 bg-white dark:bg-slate-900/40 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/40">
            <button onClick={() => onChangeTab('chats')} className="flex flex-col items-center space-y-1.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-xl transition">
              <div className="w-10 h-10 rounded-full bg-[#6C63FF]/10 flex items-center justify-center text-[#6C63FF]">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium text-slate-400">Chats</span>
            </button>
            <button onClick={() => onChangeTab('games')} className="flex flex-col items-center space-y-1.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-xl transition">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium text-slate-400">Games</span>
            </button>
            <button onClick={() => onChangeTab('events')} className="flex flex-col items-center space-y-1.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-xl transition">
              <div className="w-10 h-10 rounded-full bg-[#FF6B8A]/10 flex items-center justify-center text-[#FF6B8A]">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium text-slate-400">Events</span>
            </button>
            <button onClick={() => onChangeTab('nearby')} className="flex flex-col items-center space-y-1.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-xl transition">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Plane className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium text-slate-400">Travel</span>
            </button>
          </div>

          {/* Nearby People Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nearby People</h3>
              <button onClick={() => onChangeTab('nearby')} className="text-xs text-[#6C63FF] font-semibold flex items-center space-x-1 hover:underline">
                <span>See all</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center space-x-4 overflow-x-auto pb-2 scrollbar-none">
              {MOCK_PROFILES.map((profile) => (
                <div 
                  key={profile.id} 
                  onClick={() => onSelectProfile(profile)}
                  className="flex-shrink-0 w-36 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden cursor-pointer hover:shadow-lg transition duration-300"
                >
                  <div className="relative h-40">
                    <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 text-white">
                      <div className="flex items-center space-x-1">
                        <span className="font-bold text-sm">{profile.name}</span>
                        <span className="text-xs text-slate-200">, {profile.age}</span>
                      </div>
                      <span className="text-[9px] text-slate-300 flex items-center">
                        <MapPin className="w-2 h-2 mr-0.5 text-rose-400 fill-rose-400" />
                        {profile.distance.split(' ')[0]} km away
                      </span>
                    </div>
                    {profile.onlineStatus === 'online' && (
                      <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-emerald-400 rounded-full border border-white" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI recommendations (UI Mock) */}
          <div className="bg-gradient-to-r from-[#6C63FF]/15 via-[#8B5CF6]/15 to-[#FF6B8A]/15 p-4 rounded-3xl border border-indigo-200/20 dark:border-indigo-800/20 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-1 text-[#6C63FF] dark:text-indigo-400">
                  <Sparkles className="w-4 h-4 fill-[#6C63FF]/20" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest">AI Matchmaker</span>
                </div>
                <h4 className="text-sm font-bold">Ananya is a 94% Perfect Match!</h4>
                <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed">
                  You both share a passion for **Music**, **Coffee**, and **Travel** hobbies.
                </p>
              </div>
              <button 
                onClick={() => onSelectProfile(MOCK_PROFILES[0])}
                className="bg-white dark:bg-slate-900 text-xs font-semibold text-[#6C63FF] px-3.5 py-2 rounded-xl shadow-sm hover:scale-105 active:scale-95 transition"
              >
                Connect
              </button>
            </div>
          </div>

          {/* Featured Games */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Featured Games</h3>
              <button onClick={() => onChangeTab('games')} className="text-xs text-[#6C63FF] font-semibold hover:underline">Explore Hub</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {MOCK_GAMES.slice(0, 2).map((game) => (
                <div 
                  key={game.id} 
                  onClick={() => onChangeTab('games')}
                  className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center space-x-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                >
                  <span className="text-3xl">{game.image}</span>
                  <div>
                    <h4 className="text-xs font-bold">{game.name}</h4>
                    <span className="text-[9px] text-slate-400">{game.playersCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== EXPLORE TAB ==================== */}
      {currentTab === 'explore' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Discover Hub</h2>
            <p className="text-xs text-slate-400">Join trending local communities and interest circles.</p>
          </div>

          {/* Search bar */}
          <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-900/80 px-4 py-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search hiking, tech, coffee..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full placeholder-slate-400"
            />
          </div>

          {/* Carousel Category List */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${activeCategory === cat.id ? 'bg-[#6C63FF] text-white shadow-md shadow-indigo-500/10' : 'bg-slate-100 dark:bg-slate-900 text-slate-400 border border-slate-200/10 hover:bg-slate-200 dark:hover:bg-slate-800'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Communities & Clubs */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Suggested Communities</h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { title: 'Old Manali Backpackers 🌲', desc: '142 local travelers sharing itineraries and campfires.', members: '1.2k', tag: 'travel' },
                { title: 'Chess Masters Club ♟️', desc: 'Join daily rapid matches and voice-connected analysis.', members: '4.8k', tag: 'games' },
                { title: 'KBR Morning Cyclists 🚴', desc: 'Group weekend rides, coffee debates, and sunrise routes.', members: '840', tag: 'sports' },
                { title: 'Coldplay Fans Hyd 🎸', desc: 'Concert companion search, lyric sessions, and carpool prep.', members: '3.1k', tag: 'music' }
              ].filter(c => activeCategory === 'all' || c.tag === activeCategory || (activeCategory === 'sports' && c.tag === 'sports')).map((club, idx) => (
                <div key={idx} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:border-indigo-400 dark:hover:border-indigo-800 transition">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold">{club.title}</h4>
                    <p className="text-[10px] text-slate-400 max-w-[210px] leading-relaxed">{club.desc}</p>
                    <span className="text-[9px] text-slate-300 font-mono">{club.members} active members</span>
                  </div>
                  <button 
                    onClick={() => onTriggerNotification('Welcome to Community! 🎉', `You joined ${club.title.split(' ')[0]}.`, 'couple')}
                    className="p-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-[#6C63FF] rounded-xl transition text-[10px] font-bold"
                  >
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Popular People Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Suggested for you</h3>
            <div className="grid grid-cols-2 gap-3">
              {MOCK_PROFILES.map((profile) => (
                <div 
                  key={profile.id}
                  onClick={() => onSelectProfile(profile)}
                  className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-center cursor-pointer hover:shadow-md transition"
                >
                  <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-[#6C63FF]/20" />
                  <div className="flex items-center justify-center space-x-1">
                    <h4 className="text-xs font-bold">{profile.name}</h4>
                    {profile.verified && <Check className="w-3 h-3 text-sky-400 bg-sky-400/10 rounded-full p-[1px]" />}
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono">{profile.matchScore}% Match</span>
                  <div className="flex flex-wrap gap-1 justify-center mt-2.5">
                    {profile.interests.slice(0, 2).map((i) => (
                      <span key={i} className="text-[8px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full text-slate-400">{i}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== FRIENDS TAB ==================== */}
      {currentTab === 'friends' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Mutual Loop</h2>
            <p className="text-xs text-slate-400">Manage pending requests and interact with online circles.</p>
          </div>

          {/* Pending Requests */}
          {friendRequests.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Friend Requests ({friendRequests.length})</h3>
              </div>
              <div className="space-y-2">
                {friendRequests.map((req) => (
                  <div key={req.id} className="p-3 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-2xl border border-[#6C63FF]/10 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={req.avatar} alt={req.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="text-xs font-bold">{req.name}, {req.age}</h4>
                        <span className="text-[9px] text-slate-400">{req.mutuals} mutual friends</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleDeclineRequest(req.id)}
                        className="p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-rose-500 rounded-lg transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleAcceptRequest(req.id, req.name)}
                        className="p-1.5 bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30 rounded-lg transition"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Online Friends */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Online Connections</h3>
            <div className="space-y-2">
              {MOCK_PROFILES.map((profile) => (
                <div 
                  key={profile.id}
                  onClick={() => onSelectProfile(profile)}
                  className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img src={profile.avatar} alt={profile.name} className="w-10 h-10 rounded-full object-cover" />
                      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#0F172A] ${profile.onlineStatus === 'online' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-1">
                        <h4 className="text-xs font-bold">{profile.name}</h4>
                        <span className="text-[9px] text-slate-400">· {profile.age}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block truncate max-w-[160px]">{profile.bio}</span>
                    </div>
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono">
                    {profile.onlineStatus === 'online' ? 'Active' : 'Idle'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
