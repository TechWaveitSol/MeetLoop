import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Plane, Trophy, Users, Star, ArrowRight, Play, Calendar, MapPin, Check, Plus } from 'lucide-react';
import { MOCK_GAMES, MOCK_TRIPS, MOCK_PROFILES } from '../data';
import { GameItem, TravelTrip, UserProfile } from '../types';

interface GamesAndTravelProps {
  currentTab: 'games' | 'travel';
  onChangeTab: (tab: 'games' | 'travel' | 'chats' | 'profile') => void;
  isDarkMode: boolean;
  onSelectProfile: (profile: UserProfile) => void;
  onTriggerNotification: (title: string, body: string, type: 'match' | 'message' | 'event' | 'couple') => void;
}

export function GamesAndTravel({
  currentTab,
  onChangeTab,
  isDarkMode,
  onSelectProfile,
  onTriggerNotification
}: GamesAndTravelProps) {
  // Mini Game State: Tic Tac Toe
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameResult, setGameResult] = useState<string | null>(null);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every((square) => square !== null)) {
      return 'Draw';
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || gameResult) return;

    const newBoard = [...board];
    newBoard[index] = '❌'; // User is X (or red disk cross)
    setBoard(newBoard);

    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameResult(winner);
      if (winner === '❌') {
        onTriggerNotification('Victory! 🏆', 'You won the Tic Tac Toe match. Double Streak Active!', 'match');
      }
      return;
    }

    // Opponent Turn simulation
    setIsXNext(false);
    setTimeout(() => {
      const emptyIndices = newBoard.reduce<number[]>((acc, cell, idx) => {
        if (cell === null) acc.push(idx);
        return acc;
      }, []);

      if (emptyIndices.length > 0) {
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        newBoard[randomIndex] = '⭕️'; // Opponent is O
        setBoard(newBoard);

        const nextWinner = calculateWinner(newBoard);
        if (nextWinner) {
          setGameResult(nextWinner);
          if (nextWinner === '⭕️') {
            onTriggerNotification('Defeat 💔', 'Rohan won this match. Rematch?', 'match');
          }
        } else {
          setIsXNext(true);
        }
      }
    }, 700);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameResult(null);
  };

  // Travel companion schedule state
  const [activeTrip, setActiveTrip] = useState<TravelTrip>(MOCK_TRIPS[0]);
  const [itinerary, setItinerary] = useState(MOCK_TRIPS[0].itinerary);
  const [newItineraryItem, setNewItineraryItem] = useState('');

  const handleAddItinerary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItineraryItem.trim()) return;

    const newItem = {
      day: itinerary.length + 1,
      title: newItineraryItem,
      desc: 'Custom itinerary bullet. Explore together and log gorgeous moments.'
    };

    setItinerary([...itinerary, newItem]);
    setNewItineraryItem('');
    onTriggerNotification('Itinerary Scheduled! 🧭', `Added Day ${newItem.day}: ${newItem.title}`, 'event');
  };

  return (
    <div className={`h-full w-full select-none overflow-y-auto px-5 py-6 pb-24 ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
      
      {/* ==================== GAMES HUB TAB ==================== */}
      {currentTab === 'games' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Games Hub</h2>
              <span className="text-xs text-slate-400">Play instant multiplayer and log achievements</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Gamepad2 className="w-4 h-4 text-amber-500" />
            </div>
          </div>

          {/* Quick Stats Banner */}
          <div className="p-4 bg-gradient-to-tr from-slate-900 to-[#0F172A] rounded-2xl text-white flex items-center justify-between border border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center space-x-1 text-amber-400">
                <Trophy className="w-4 h-4 fill-current" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest">Global Ranks</span>
              </div>
              <h4 className="text-sm font-bold">Chess Master Tier</h4>
              <span className="text-[10px] text-slate-400 block font-mono">1,480 Match Score</span>
            </div>
            <div className="text-right space-y-0.5">
              <span className="text-2xl font-bold block text-emerald-400">82%</span>
              <span className="text-[9px] text-slate-400 block font-mono uppercase tracking-wider">Win Rate</span>
            </div>
          </div>

          {/* Playable Mini Game Widget: Tic Tac Toe */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold">Match vs. Rohan</h4>
                <span className="text-[9px] text-slate-400 block">Casual Tic Tac Toe arena</span>
              </div>
              <button 
                onClick={resetGame}
                className="text-[9px] bg-[#6C63FF]/10 text-[#6C63FF] hover:bg-[#6C63FF]/20 px-3 py-1.5 rounded-lg font-bold"
              >
                Reset Board
              </button>
            </div>

            {/* Board render */}
            <div className="grid grid-cols-3 gap-2 w-48 h-48 mx-auto py-2">
              {board.map((cell, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCellClick(idx)}
                  className="w-14 h-14 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 rounded-xl text-lg font-bold flex items-center justify-center transition"
                >
                  {cell}
                </button>
              ))}
            </div>

            {/* Turn or Result state */}
            <div className="text-center">
              {gameResult ? (
                <span className="text-xs font-bold text-indigo-400">
                  {gameResult === 'Draw' ? "Match is a Draw! 🤝" : `Winner: ${gameResult}`}
                </span>
              ) : (
                <span className="text-[10px] text-slate-400 font-mono">
                  {isXNext ? "Your Turn (❌)" : "Rohan is planning... ⭕️"}
                </span>
              )}
            </div>
          </div>

          {/* Games list cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trending Arenas</h3>
            <div className="grid grid-cols-1 gap-3">
              {MOCK_GAMES.map((game) => (
                <div 
                  key={game.id}
                  className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:border-indigo-400 dark:hover:border-indigo-800 transition duration-300"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <span className="text-4xl">{game.image}</span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold">{game.name}</h4>
                      <span className="text-[9px] text-slate-400 block font-mono">{game.playersCount}</span>
                      <p className="text-[10.5px] text-slate-400 truncate max-w-[190px] mt-0.5">{game.description}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onTriggerNotification('Searching Peers... 🎮', `Matching you with nearby ${game.name} players.`, 'match')}
                    className="p-2 bg-indigo-500/10 text-[#6C63FF] rounded-xl text-[10px] font-bold hover:bg-[#6C63FF] hover:text-white transition"
                  >
                    Match
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TRAVEL COMPANION TAB ==================== */}
      {currentTab === 'travel' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Travel Partner</h2>
              <span className="text-xs text-slate-400">Find travel companions for upcoming road trips</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Plane className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          {/* Active Trip Header Banner */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="relative h-44">
              <img src={activeTrip.image} alt={activeTrip.destination} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-[9px] text-emerald-400 font-mono block mb-0.5">{activeTrip.date}</span>
                <h3 className="text-base font-extrabold tracking-tight">{activeTrip.destination}</h3>
                <div className="flex items-center space-x-2 text-[10px] text-slate-200 mt-1">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>Budget: {activeTrip.budget}</span>
                  <span>·</span>
                  <span>{activeTrip.duration}</span>
                </div>
              </div>
            </div>

            {/* Travel Companions list */}
            <div className="p-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Co-travelers looking to match</h4>
              <div className="flex items-center space-x-2.5 overflow-x-auto pb-1 scrollbar-none">
                {activeTrip.nearbyTravelers.map((traveler) => (
                  <div 
                    key={traveler.id}
                    onClick={() => onSelectProfile(traveler)}
                    className="flex-shrink-0 flex items-center space-x-2 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer hover:shadow-sm"
                  >
                    <img src={traveler.avatar} alt={traveler.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <h5 className="text-[10px] font-bold leading-none">{traveler.name}</h5>
                      <span className="text-[8px] text-[#6C63FF] font-mono mt-0.5 block">{traveler.matchScore}% Match</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trip Planner UI list */}
          <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-emerald-500" />
              <span>Shared Itinerary</span>
            </h4>

            {/* List */}
            <div className="space-y-3 pl-2.5 border-l-2 border-slate-200/50 dark:border-slate-800">
              {itinerary.map((item) => (
                <div key={item.day} className="relative pl-4">
                  <span className="absolute -left-[16px] top-1.5 w-2 h-2 rounded-full bg-emerald-400" />
                  <h5 className="text-xs font-bold">Day {item.day}: {item.title}</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Add itinerary form */}
            <form onSubmit={handleAddItinerary} className="flex items-center space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <input 
                type="text" 
                required
                placeholder="Day schedule (e.g. Hiking Trek)" 
                value={newItineraryItem}
                onChange={(e) => setNewItineraryItem(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800/60 px-3 py-2 rounded-xl border border-slate-200/50 dark:border-slate-700/50 text-xs w-full outline-none"
              />
              <button 
                type="submit"
                className="p-2 bg-emerald-500/10 text-emerald-500 hover:bg-[#34D399] hover:text-white rounded-xl transition flex-shrink-0"
              >
                <Plus className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
