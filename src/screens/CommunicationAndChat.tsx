import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Pin, MessageSquare, Phone, Video, Smile, Paperclip, Send, Mic, Play, MoreVertical, ChevronLeft, ArrowLeft, Image, Gamepad2, Gift, Check, CheckCheck } from 'lucide-react';
import { MOCK_CHATS, CURRENT_USER } from '../data';
import { ChatSession, Message } from '../types';

interface CommunicationAndChatProps {
  currentSubScreen: 'chat_list' | 'individual_chat';
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onBackToChats: () => void;
  isDarkMode: boolean;
  onTriggerNotification: (title: string, body: string, type: 'match' | 'message' | 'event' | 'couple') => void;
}

export function CommunicationAndChat({
  currentSubScreen,
  activeChatId,
  onSelectChat,
  onBackToChats,
  isDarkMode,
  onTriggerNotification
}: CommunicationAndChatProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatFilter, setChatFilter] = useState<'all' | 'unread' | 'groups' | 'calls'>('all');
  
  // Chats state with custom dynamic messaging
  const [chats, setChats] = useState<ChatSession[]>(MOCK_CHATS);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const activeChat = chats.find((c) => c.id === activeChatId) || chats[0];
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentSubScreen === 'individual_chat') {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSubScreen, activeChat?.messages, isTyping]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      senderId: CURRENT_USER.id,
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      readStatus: 'sending'
    };

    // Append to active chat
    setChats((prevChats) =>
      prevChats.map((chat) => {
        if (chat.id === activeChat.id) {
          return {
            ...chat,
            lastMessage: inputText,
            messages: [...chat.messages, userMsg]
          };
        }
        return chat;
      })
    );

    const typedText = inputText;
    setInputText('');

    // Update status to sent, then delivered
    setTimeout(() => {
      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === activeChat.id) {
            return {
              ...chat,
              messages: chat.messages.map((m) => m.id === userMsg.id ? { ...m, readStatus: 'delivered' } : m)
            };
          }
          return chat;
        })
      );
    }, 600);

    // Simulate Reply typing animation after 1.5s
    setTimeout(() => {
      setIsTyping(true);
    }, 1200);

    setTimeout(() => {
      setIsTyping(false);
      let replyText = 'That sounds amazing! Let\'s do it! 🚀';
      if (typedText.toLowerCase().includes('hello') || typedText.toLowerCase().includes('hey')) {
        replyText = `Hey there! Great to hear from you. What are you up to today?`;
      } else if (typedText.toLowerCase().includes('game') || typedText.toLowerCase().includes('play')) {
        replyText = `Oh, absolutely! Let's play Chess or Connect Four! Send me an invite.`;
      } else if (typedText.toLowerCase().includes('trip') || typedText.toLowerCase().includes('manali')) {
        replyText = `Wow! Manali is beautiful! I have always wanted to explore Old Manali's wood cabin cafes. Count me in!`;
      }

      const replyMsg: Message = {
        id: `reply_${Date.now()}`,
        senderId: activeChat.user.isGroup ? 'u2' : activeChat.id === 'c1' ? 'u1' : 'u2',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text',
        readStatus: 'read'
      };

      setChats((prevChats) =>
        prevChats.map((chat) => {
          if (chat.id === activeChat.id) {
            return {
              ...chat,
              lastMessage: replyText,
              messages: [...chat.messages.map(m => m.id === userMsg.id ? { ...m, readStatus: 'read' } : m), replyMsg]
            };
          }
          return chat;
        })
      );

      onTriggerNotification(
        `Message from ${activeChat.user.name}`,
        replyText,
        'message'
      );
    }, 3000);
  };

  const selectSuggestedReply = (text: string) => {
    setInputText(text);
  };

  const triggerCall = (type: 'audio' | 'video') => {
    onTriggerNotification(
      `${type === 'audio' ? 'Calling' : 'Video Calling'}... 📞`,
      `Connecting to ${activeChat.user.name}. Please ensure camera permissions are active.`,
      'couple'
    );
  };

  return (
    <div className={`h-full w-full select-none flex flex-col relative overflow-hidden ${isDarkMode ? 'bg-[#0F172A] text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* ==================== CHAT LIST SECTION ==================== */}
      {currentSubScreen === 'chat_list' && (
        <div className="flex-1 flex flex-col px-5 pt-4 pb-24 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">Chats</h2>
              <span className="text-xs text-slate-400">Keep up with your nearby loop circles</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-[#6C63FF]" />
            </div>
          </div>

          {/* Search bar */}
          <div className="mt-4 flex items-center space-x-3 bg-slate-100 dark:bg-slate-900/80 px-4 py-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search chat history, contacts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs w-full placeholder-slate-400"
            />
          </div>

          {/* Filter segments */}
          <div className="mt-4 grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl text-[10px] font-bold">
            {(['all', 'unread', 'groups', 'calls'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setChatFilter(filter)}
                className={`py-1.5 rounded-lg capitalize transition-all ${chatFilter === filter ? 'bg-white dark:bg-slate-800 text-[#6C63FF] shadow-sm' : 'text-slate-400 hover:text-slate-500'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Chats Render List */}
          <div className="mt-4 flex-1 space-y-2 pb-6">
            {chats
              .filter((chat) => {
                if (chatFilter === 'unread') return chat.unreadCount > 0;
                if (chatFilter === 'groups') return chat.isGroup;
                if (chatFilter === 'calls') return chat.isVoiceChat;
                return true;
              })
              .filter((chat) => chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition duration-200"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="relative flex-shrink-0">
                      <img src={chat.user.avatar} alt={chat.user.name} className="w-12 h-12 rounded-full object-cover" />
                      {chat.user.onlineStatus === 'online' && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white dark:border-[#0F172A]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-1.5">
                        <h4 className="text-xs font-bold truncate max-w-[120px]">{chat.user.name}</h4>
                        {chat.isGroup && (
                          <span className="text-[8px] font-bold bg-indigo-500/10 text-[#6C63FF] px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                            Group
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-400 truncate max-w-[160px] mt-0.5 font-medium">
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1 flex-shrink-0">
                    <span className="text-[9px] text-slate-300 font-mono">10:35 AM</span>
                    {chat.unreadCount > 0 ? (
                      <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                        {chat.unreadCount}
                      </span>
                    ) : (
                      <Pin className="w-3 h-3 text-slate-300 transform rotate-45" />
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ==================== INDIVIDUAL CHAT VIEW ==================== */}
      {currentSubScreen === 'individual_chat' && (
        <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-[#090D16]">
          {/* Active Chat Header */}
          <div className="p-4 bg-white dark:bg-[#0F172A] border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-2.5 min-w-0">
              <button 
                onClick={onBackToChats}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div className="relative">
                <img src={activeChat.user.avatar} alt={activeChat.user.name} className="w-9 h-9 rounded-full object-cover" />
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#0F172A] ${activeChat.user.onlineStatus === 'online' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              </div>

              <div className="min-w-0">
                <h4 className="text-xs font-bold truncate">{activeChat.user.name}</h4>
                <span className="text-[9px] text-slate-400 block font-mono">
                  {activeChat.user.onlineStatus === 'online' ? 'Active now' : 'Away'}
                </span>
              </div>
            </div>

            {/* Calling control icons */}
            <div className="flex items-center space-x-1.5">
              <button 
                onClick={() => triggerCall('audio')}
                className="p-2 text-slate-400 hover:text-[#6C63FF] hover:bg-indigo-500/5 rounded-full transition"
              >
                <Phone className="w-4.5 h-4.5" />
              </button>
              <button 
                onClick={() => triggerCall('video')}
                className="p-2 text-slate-400 hover:text-[#6C63FF] hover:bg-indigo-500/5 rounded-full transition"
              >
                <Video className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-none pb-28">
            <div className="text-center">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-300 font-mono bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full">
                Today
              </span>
            </div>

            {activeChat.messages.map((msg) => {
              const isMe = msg.senderId === CURRENT_USER.id;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className={`max-w-[75%] px-4 py-3 rounded-[20px] shadow-sm text-xs leading-relaxed ${isMe ? 'bg-gradient-to-tr from-[#6C63FF] to-[#8B5CF6] text-white rounded-tr-sm' : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-tl-sm border border-slate-100 dark:border-slate-800/50'}`}>
                    {msg.type === 'voice' ? (
                      <div className="flex items-center space-x-2.5 py-1 min-w-[130px]">
                        <button className="w-7 h-7 rounded-full bg-indigo-500/20 text-[#6C63FF] flex items-center justify-center hover:scale-105 active:scale-95 transition flex-shrink-0">
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <div className="flex-1 space-y-1">
                          {/* Simulated waveform */}
                          <div className="flex items-center space-x-0.5 h-3">
                            <span className="h-1 flex-1 bg-[#6C63FF] rounded-full" />
                            <span className="h-2 flex-1 bg-[#6C63FF] rounded-full animate-pulse" />
                            <span className="h-3 flex-1 bg-[#6C63FF] rounded-full" />
                            <span className="h-1 flex-1 bg-[#6C63FF] rounded-full" />
                            <span className="h-2 flex-1 bg-[#6C63FF] rounded-full" />
                            <span className="h-3 flex-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
                          </div>
                          <span className="text-[8px] text-slate-400 block font-mono">0:12 min</span>
                        </div>
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                  
                  {/* Message status bar */}
                  <div className="flex items-center space-x-1 mt-1 text-[8px] text-slate-400 font-mono px-1">
                    <span>{msg.timestamp}</span>
                    {isMe && (
                      <span>
                        {msg.readStatus === 'sending' && <span className="text-slate-300">...</span>}
                        {msg.readStatus === 'sent' && <Check className="w-2.5 h-2.5 text-slate-300" />}
                        {msg.readStatus === 'delivered' && <CheckCheck className="w-2.5 h-2.5 text-slate-400" />}
                        {msg.readStatus === 'read' && <CheckCheck className="w-2.5 h-2.5 text-indigo-400" />}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl rounded-tl-sm border border-slate-100 dark:border-slate-800/50 flex items-center space-x-1.5 h-9">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messageEndRef} />
          </div>

          {/* Chat Attachment popup panel representation */}
          <AnimatePresence>
            {showAttachments && (
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                className="absolute bottom-20 left-4 right-4 bg-white dark:bg-slate-900 p-3.5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl flex items-center justify-around z-20"
              >
                <button onClick={() => alert('Opening gallery...')} className="flex flex-col items-center space-y-1">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Image className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-semibold text-slate-400">Photos</span>
                </button>
                <button onClick={() => alert('Opening games...')} className="flex flex-col items-center space-y-1">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-semibold text-slate-400">Play</span>
                </button>
                <button onClick={() => alert('Sending gift streak...')} className="flex flex-col items-center space-y-1">
                  <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                    <Gift className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-semibold text-slate-400">Gift</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Smart Replies Carousel */}
          <div className="absolute bottom-16 left-0 right-0 px-4 py-1.5 flex items-center space-x-2 overflow-x-auto scrollbar-none z-10 bg-slate-50/80 dark:bg-[#090D16]/80 backdrop-blur-sm border-t border-slate-100 dark:border-slate-800/30">
            {['Tell me more! 😊', 'Wanna play a game?', 'Sounds fun!', 'Let\'s meet up! ☕️'].map((text) => (
              <button
                key={text}
                onClick={() => selectSuggestedReply(text)}
                className="px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 text-[10px] font-semibold hover:border-indigo-500 whitespace-nowrap shadow-sm text-slate-500 dark:text-slate-300"
              >
                {text}
              </button>
            ))}
          </div>

          {/* Chat Message Input form */}
          <form 
            onSubmit={handleSendMessage}
            className="absolute bottom-0 left-0 right-0 p-3 bg-white dark:bg-[#0F172A] border-t border-slate-100 dark:border-slate-800/80 flex items-center space-x-2 z-20"
          >
            <div className="flex items-center space-x-1.5 flex-1 bg-slate-100 dark:bg-slate-900/80 px-3.5 py-2.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
              <button 
                type="button"
                onClick={() => setShowAttachments(!showAttachments)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              >
                <Paperclip className="w-4.5 h-4.5" />
              </button>

              <input
                type="text"
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="bg-transparent border-none outline-none text-xs w-full placeholder-slate-400"
              />

              <button 
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              >
                <Smile className="w-4.5 h-4.5" />
              </button>
            </div>

            <button
              type="submit"
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#8B5CF6] text-white flex items-center justify-center hover:scale-105 active:scale-95 transition flex-shrink-0"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
