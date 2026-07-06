import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Heart, Sparkles, Calendar, Plus, Smile, Camera, MapPin, FileText, ChevronRight, Lock, Check } from 'lucide-react';
import { MOCK_MEMORIES, MOCK_GOALS } from '../data';
import { CoupleMemory, CoupleGoal } from '../types';

interface CoupleAndTimelineProps {
  currentTab: 'couple' | 'memories';
  onChangeTab: (tab: 'couple' | 'memories' | 'chats' | 'profile') => void;
  isDarkMode: boolean;
  onTriggerNotification: (title: string, body: string, type: 'match' | 'message' | 'event' | 'couple') => void;
}

export function CoupleAndTimeline({
  currentTab,
  onChangeTab,
  isDarkMode,
  onTriggerNotification
}: CoupleAndTimelineProps) {
  // Goals State
  const [goals, setGoals] = useState<CoupleGoal[]>(MOCK_GOALS);
  const [dailyAnswer, setDailyAnswer] = useState('');
  const [dailyAnswerSubmitted, setDailyAnswerSubmitted] = useState(false);
  
  // Memories State
  const [memories, setMemories] = useState<CoupleMemory[]>(MOCK_MEMORIES);
  const [memoryFilter, setMemoryFilter] = useState<'all' | 'photo' | 'note'>('all');
  
  // New Memory creation Form
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [newMemoryTitle, setNewMemoryTitle] = useState('');
  const [newMemoryNote, setNewMemoryNote] = useState('');

  const handleToggleGoal = (id: string, title: string, currentlyCompleted: boolean) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const comp = !g.completed;
          const curr = comp ? g.target : Math.max(0, g.target - 1);
          if (comp) {
            onTriggerNotification('Goal Milestone Met! 🏆', `You and Ananya completed: "${title}"`, 'couple');
          }
          return { ...g, completed: comp, current: curr };
        }
        return g;
      })
    );
  };

  const handleDailyQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dailyAnswer.trim()) return;
    setDailyAnswerSubmitted(true);
    onTriggerNotification(
      'Daily Question Answered! 💖',
      'Ananya has been notified to unlock and reveal her answer!',
      'couple'
    );
  };

  const handleAddMemorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryTitle) return;

    const newMem: CoupleMemory = {
      id: `mem_${Date.now()}`,
      title: newMemoryTitle,
      date: 'Today',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600',
      type: 'photo',
      note: newMemoryNote || 'Created a new beautiful milestone together.'
    };

    setMemories([newMem, ...memories]);
    setShowAddMemory(false);
    setNewMemoryTitle('');
    setNewMemoryNote('');
    onTriggerNotification('Memory Saved! 📸', `"${newMemoryTitle}" added to your shared Love Timeline.`, 'couple');
  };

  // Partner Active Mood Tracker
  const [partnerMood, setPartnerMood] = useState<'happy' | 'peaceful' | 'tired' | 'excited'>('happy');

  return (
    <div className={`h-full w-full select-none overflow-y-auto px-5 py-6 pb-24 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
      
      {/* ==================== COUPLE SPACE TAB ==================== */}
      {currentTab === 'couple' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Couple Space</h2>
              <span className="text-xs text-slate-400">Your secure digital wood cabin with Ananya</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center">
              <Heart className="w-4 h-4 text-[#FF6B8A] fill-current" />
            </div>
          </div>

          {/* Large Emotional Streak card */}
          <div className="bg-gradient-to-tr from-[#FF6B8A] via-[#8B5CF6] to-[#6C63FF] p-6 rounded-[28px] text-white space-y-4 shadow-xl shadow-rose-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="flex items-center justify-between relative z-10">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                  Our Streak
                </span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-4xl font-extrabold tracking-tight">124</span>
                  <span className="text-sm font-semibold text-rose-100">days</span>
                </div>
              </div>
              <Flame className="w-12 h-12 text-amber-300 fill-current animate-pulse" />
            </div>

            {/* Relationship Level */}
            <div className="space-y-1.5 pt-2 relative z-10">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>Soulmates</span>
                <span>Lv. 15</span>
              </div>
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: '75%' }} />
              </div>
              <span className="text-[10px] text-rose-100 block font-mono">
                75% progress to level 16 milestone. Keeping the loop alive!
              </span>
            </div>
          </div>

          {/* Counting down / Milestones widgets */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between space-y-3 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center text-[#FF6B8A]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Next Anniversary</span>
                <span className="text-sm font-bold block">12 Days Left</span>
                <span className="text-[8px] text-slate-300 font-mono">July 16, 2026</span>
              </div>
            </div>

            {/* Partner Mood Widget */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Smile className="w-4 h-4" />
                </div>
                {/* Active pulse */}
                <span className="w-2 h-2 bg-emerald-400 rounded-full border border-white dark:border-[#0F172A]" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Ananya's Mood</span>
                <span className="text-sm font-bold block capitalize">{partnerMood} 🥰</span>
                <span className="text-[8px] text-slate-300 font-mono">Synced 5m ago</span>
              </div>
            </div>
          </div>

          {/* Daily Love Question */}
          <div className="bg-gradient-to-r from-[#6C63FF]/10 via-[#8B5CF6]/10 to-[#FF6B8A]/10 p-4 rounded-3xl border border-indigo-200/20 dark:border-indigo-800/20">
            <div className="flex items-center space-x-1 text-[#6C63FF] dark:text-indigo-400 mb-2">
              <Sparkles className="w-4 h-4 fill-current" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider">Daily Connection Question</span>
            </div>
            
            <h4 className="text-xs font-bold leading-normal mb-3">
              "What was the very first cafe or place we grabbed a drink together?"
            </h4>

            {dailyAnswerSubmitted ? (
              <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl text-xs space-y-1.5 border border-slate-200/55 text-center">
                <span className="text-emerald-500 font-bold block">✔ Answer Locked!</span>
                <p className="text-[10px] text-slate-400">Waiting for Ananya to lock hers to reveal both answers!</p>
              </div>
            ) : (
              <form onSubmit={handleDailyQuestionSubmit} className="flex items-center space-x-2">
                <input 
                  type="text" 
                  value={dailyAnswer}
                  onChange={(e) => setDailyAnswer(e.target.value)}
                  placeholder="Type your answer..." 
                  className="bg-white dark:bg-slate-900 px-3.5 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800 text-xs w-full outline-none"
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-tr from-[#6C63FF] to-[#8B5CF6] text-white text-xs font-bold px-3.5 py-2.5 rounded-xl flex-shrink-0"
                >
                  Lock
                </button>
              </form>
            )}
          </div>

          {/* Shared Goals Checklist */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Shared Goals</h3>
            <div className="space-y-2">
              {goals.map((goal) => (
                <div 
                  key={goal.id}
                  onClick={() => handleToggleGoal(goal.id, goal.title, goal.completed)}
                  className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:border-pink-300 dark:hover:border-pink-900 transition"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${goal.completed ? 'bg-[#FF6B8A] border-[#FF6B8A] text-white' : 'border-slate-300 dark:border-slate-700'}`}>
                      {goal.completed && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                    </div>
                    <span className={`text-xs font-medium ${goal.completed ? 'line-through text-slate-400' : ''}`}>{goal.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {goal.current}/{goal.target}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== MEMORIES TIMELINE TAB ==================== */}
      {currentTab === 'memories' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Timeline</h2>
              <span className="text-xs text-slate-400">A beautiful timeline of shared highlights</span>
            </div>
            <button 
              onClick={() => setShowAddMemory(true)}
              className="p-2.5 bg-rose-500/10 text-[#FF6B8A] hover:bg-[#FF6B8A] hover:text-white rounded-full transition"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setMemoryFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition ${memoryFilter === 'all' ? 'bg-[#FF6B8A] text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-400'}`}
            >
              All Memories
            </button>
            <button 
              onClick={() => setMemoryFilter('photo')}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition ${memoryFilter === 'photo' ? 'bg-[#FF6B8A] text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-400'}`}
            >
              Photos
            </button>
          </div>

          {/* Add Memory Form */}
          {showAddMemory && (
            <motion.form
              onSubmit={handleAddMemorySubmit}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-[#FF6B8A]/20 space-y-3 shadow-md"
            >
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1">
                <Camera className="w-4 h-4 text-[#FF6B8A]" />
                <span>Log New Memory</span>
              </h3>
              <div className="space-y-2 text-xs">
                <input 
                  type="text" 
                  required
                  placeholder="Memory Title (e.g. Hiking Adventure)" 
                  value={newMemoryTitle}
                  onChange={(e) => setNewMemoryTitle(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 outline-none"
                />
                <textarea 
                  placeholder="Write a sweet private note..." 
                  value={newMemoryNote}
                  onChange={(e) => setNewMemoryNote(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-100 dark:bg-slate-800 px-3.5 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-700/50 outline-none resize-none"
                />
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddMemory(false)}
                  className="flex-1 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-2 text-xs font-semibold text-white rounded-xl bg-[#FF6B8A]"
                >
                  Add Memory
                </button>
              </div>
            </motion.form>
          )}

          {/* Memory Bento Feed layout */}
          <div className="relative border-l-2 border-slate-200/60 dark:border-slate-800 pl-5 ml-2.5 space-y-6">
            {memories
              .filter((m) => memoryFilter === 'all' || m.type === memoryFilter)
              .map((mem) => (
                <div key={mem.id} className="relative space-y-2">
                  {/* Bullet indicator */}
                  <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#FF6B8A] border-2 border-slate-50 dark:border-[#0F172A]" />
                  
                  <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow transition duration-300">
                    <div className="h-44 relative">
                      <img src={mem.image} alt={mem.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                      <div className="absolute bottom-3.5 left-3.5 text-white">
                        <span className="text-[9px] text-pink-300 font-mono block mb-0.5">{mem.date}</span>
                        <h4 className="text-xs font-bold leading-tight">{mem.title}</h4>
                      </div>
                    </div>
                    {mem.note && (
                      <div className="p-3.5 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800/60 text-[10.5px] text-slate-400 italic leading-relaxed">
                        "{mem.note}"
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
