export interface UserProfile {
  id: string;
  name: string;
  age: number;
  distance: string;
  bio: string;
  avatar: string;
  coverImage: string;
  interests: string[];
  mutualHobbies?: string[];
  onlineStatus: 'online' | 'offline' | 'idle';
  verified: boolean;
  matchScore?: number;
  photos: string[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  type: 'text' | 'image' | 'voice' | 'gif';
  duration?: string; // for voice messages
  mediaUrl?: string;
  readStatus: 'sending' | 'sent' | 'delivered' | 'read';
  reactions?: string[];
  replyTo?: string;
}

export interface ChatSession {
  id: string;
  user: {
    name: string;
    avatar: string;
    onlineStatus: 'online' | 'offline' | 'idle';
    isGroup?: boolean;
    groupMembers?: string[];
  };
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
  isVoiceChat?: boolean;
  isGroup?: boolean;
}

export interface NearbyEvent {
  id: string;
  title: string;
  category: 'music' | 'sports' | 'tech' | 'travel' | 'meetups';
  location: string;
  date: string;
  time: string;
  distance: string;
  image: string;
  attendees: string[];
  description: string;
  isInterested?: boolean;
}

export interface TravelTrip {
  id: string;
  destination: string;
  date: string;
  duration: string;
  budget: string;
  companionsCount: number;
  image: string;
  itinerary: { day: number; title: string; desc: string }[];
  travelInterests: string[];
  nearbyTravelers: UserProfile[];
}

export interface CoupleMemory {
  id: string;
  title: string;
  date: string;
  image: string;
  type: 'photo' | 'video' | 'note' | 'voice';
  note?: string;
}

export interface CoupleGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  completed: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: 'match' | 'message' | 'event' | 'couple' | 'system';
  time: string;
  read: boolean;
}

export interface GameItem {
  id: string;
  name: string;
  playersCount: string;
  image: string;
  description: string;
  isTrending: boolean;
  category: string;
  achievement?: string;
}

export interface StoryItem {
  id: string;
  userName: string;
  avatar: string;
  mediaUrl: string;
  isViewed: boolean;
  isLive?: boolean;
}
