import { UserProfile, ChatSession, NearbyEvent, TravelTrip, CoupleMemory, CoupleGoal, NotificationItem, GameItem, StoryItem } from './types';

export const CURRENT_USER: UserProfile = {
  id: 'me',
  name: 'Arjun Reddy',
  age: 25,
  distance: '0 km',
  bio: 'Explorer | Music Lover | Coffee Addict ☕️\nAlways up for new adventures and meaningful conversations!',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', // Beautiful portrait of a young stylish person
  coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
  interests: ['Travel', 'Music', 'Photography', 'Gaming', 'Cycling', 'Movies'],
  onlineStatus: 'online',
  verified: true,
  photos: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400'
  ]
};

export const MOCK_STORIES: StoryItem[] = [
  {
    id: 's1',
    userName: 'Your Story',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    mediaUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    isViewed: false
  },
  {
    id: 's2',
    userName: 'Ananya',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    mediaUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
    isViewed: false,
    isLive: true
  },
  {
    id: 's3',
    userName: 'Rohan',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
    mediaUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    isViewed: false
  },
  {
    id: 's4',
    userName: 'Pooja',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=100',
    mediaUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
    isViewed: true
  },
  {
    id: 's5',
    userName: 'Neha',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100',
    mediaUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600',
    isViewed: true
  }
];

export const MOCK_PROFILES: UserProfile[] = [
  {
    id: 'u1',
    name: 'Ananya',
    age: 22,
    distance: '2.4 km away',
    bio: 'Love exploring new places and meeting new people! Let\'s grab a cup of matcha latte 🍵 or go for a sunset hike 🌅.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600',
    interests: ['Music', 'Travel', 'Coffee', 'Hiking', 'Art'],
    mutualHobbies: ['Music', 'Travel', 'Coffee'],
    onlineStatus: 'online',
    verified: true,
    matchScore: 94,
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=400'
    ]
  },
  {
    id: 'u2',
    name: 'Rohan',
    age: 24,
    distance: '1.8 km away',
    bio: 'Always down for game nights or cafe hopping! Play chess or Connect Four? ♟️ Let\'s connect and create memories.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600',
    interests: ['Gaming', 'Chess', 'Tech', 'Cycling', 'Fitness'],
    mutualHobbies: ['Gaming', 'Cycling'],
    onlineStatus: 'online',
    verified: true,
    matchScore: 88,
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400'
    ]
  },
  {
    id: 'u3',
    name: 'Pooja',
    age: 25,
    distance: '3.1 km away',
    bio: 'Wanderlust soul ✈️. Looking for a travel companion for my upcoming trip to Manali! Let\'s discuss itineraries over dinner.',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600',
    interests: ['Travel', 'Photography', 'Foodie', 'Roadtrips', 'Blogging'],
    mutualHobbies: ['Travel', 'Photography'],
    onlineStatus: 'idle',
    verified: true,
    matchScore: 91,
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=400'
    ]
  },
  {
    id: 'u4',
    name: 'Neha',
    age: 23,
    distance: '4.5 km away',
    bio: 'Music festival enthusiast 🎸! Looking for someone to attend the Sunset Music Fest with. Let\'s sing along together!',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    coverImage: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600',
    interests: ['Music', 'Concerts', 'Festivals', 'Singing', 'Dance'],
    mutualHobbies: ['Music'],
    onlineStatus: 'online',
    verified: false,
    matchScore: 82,
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400'
    ]
  }
];

export const MOCK_CHATS: ChatSession[] = [
  {
    id: 'c1',
    user: {
      name: 'Ananya',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
      onlineStatus: 'online'
    },
    lastMessage: 'Hey! How are you doing? 😊',
    unreadCount: 2,
    messages: [
      { id: 'm1_1', senderId: 'u1', text: 'Hey! How are you doing? 😊', timestamp: '10:30 AM', type: 'text', readStatus: 'read' },
      { id: 'm1_2', senderId: 'me', text: 'I\'m great! How about you?', timestamp: '10:31 AM', type: 'text', readStatus: 'read' },
      { id: 'm1_3', senderId: 'u1', text: 'I\'m good too! What are you up to today?', timestamp: '10:32 AM', type: 'text', readStatus: 'read' },
      { id: 'm1_4', senderId: 'me', text: 'Planning a small trip this weekend. You in? 😉', timestamp: '10:33 AM', type: 'text', readStatus: 'read' },
      { id: 'm1_5', senderId: 'u1', text: 'Sounds fun! Let me think about it 😄', timestamp: '10:34 AM', type: 'text', readStatus: 'read' }
    ]
  },
  {
    id: 'c2',
    user: {
      name: 'Rohan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
      onlineStatus: 'online'
    },
    lastMessage: 'Let\'s play a game!',
    unreadCount: 1,
    messages: [
      { id: 'm2_1', senderId: 'u2', text: 'Are you free for chess tonight?', timestamp: 'Yesterday', type: 'text', readStatus: 'read' },
      { id: 'm2_2', senderId: 'me', text: 'Yes! Count me in.', timestamp: 'Yesterday', type: 'text', readStatus: 'read' },
      { id: 'm2_3', senderId: 'u2', text: 'Let\'s play a game!', timestamp: '10 mins ago', type: 'text', readStatus: 'delivered' }
    ]
  },
  {
    id: 'c3',
    user: {
      name: 'Travel Buddies',
      avatar: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=200',
      onlineStatus: 'online',
      isGroup: true,
      groupMembers: ['Arjun', 'Pooja', 'Rohan']
    },
    lastMessage: 'Anyone up for Manali trip?',
    unreadCount: 0,
    isGroup: true,
    messages: [
      { id: 'm3_1', senderId: 'u3', text: 'Hey guys! Ready for the hills?', timestamp: 'Yesterday', type: 'text', readStatus: 'read' },
      { id: 'm3_2', senderId: 'me', text: 'Super excited! Need to lock the dates.', timestamp: 'Yesterday', type: 'text', readStatus: 'read' },
      { id: 'm3_3', senderId: 'u3', text: 'Anyone up for Manali trip?', timestamp: '30 mins ago', type: 'text', readStatus: 'read' }
    ]
  },
  {
    id: 'c4',
    user: {
      name: 'Neha',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      onlineStatus: 'idle'
    },
    lastMessage: '🎙 Voice message (0:12)',
    unreadCount: 0,
    isVoiceChat: true,
    messages: [
      { id: 'm4_1', senderId: 'me', text: 'Can you send me that track playlist?', timestamp: '2 hours ago', type: 'text', readStatus: 'read' },
      { id: 'm4_2', senderId: 'u4', text: '', timestamp: '1 hour ago', type: 'voice', duration: '0:12', readStatus: 'read' }
    ]
  },
  {
    id: 'c5',
    user: {
      name: 'Game Squad',
      avatar: 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&q=80&w=200',
      onlineStatus: 'offline',
      isGroup: true,
      groupMembers: ['Rohan', 'Arjun', 'Ananya', 'Pooja']
    },
    lastMessage: 'Rohit sent a sticker',
    unreadCount: 0,
    isGroup: true,
    messages: [
      { id: 'm5_1', senderId: 'u2', text: 'Connect Four tonight guys!', timestamp: '3 hours ago', type: 'text', readStatus: 'read' },
      { id: 'm5_2', senderId: 'u1', text: 'Count me in! I will smash everyone 😂', timestamp: '2 hours ago', type: 'text', readStatus: 'read' }
    ]
  }
];

export const MOCK_EVENTS: NearbyEvent[] = [
  {
    id: 'e1',
    title: 'Sunset Music Fest',
    category: 'music',
    location: 'Hitech City, Hyderabad',
    date: 'Sun, 25 May',
    time: '6:00 PM',
    distance: '2.1 km away',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=600',
    attendees: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=100'
    ],
    description: 'Experience an unforgettable evening of live electronic and indie music as the sun sets over the lake. Free mocktails for early entries!',
    isInterested: true
  },
  {
    id: 'e2',
    title: 'Tech Meetup 2026',
    category: 'tech',
    location: 'Madhapur, Hyderabad',
    date: 'Tue, 26 May',
    time: '5:00 PM',
    distance: '3.4 km away',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
    attendees: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
    ],
    description: 'Connect with developers, startup founders, and design experts. Interactive panels on AI, Flutter 4, Web3 and beautiful custom design systems.',
    isInterested: false
  },
  {
    id: 'e3',
    title: 'Cycling Club Ride',
    category: 'sports',
    location: 'KBR Park, Hyderabad',
    date: 'Sun, 26 May',
    time: '6:30 AM',
    distance: '1.8 km away',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600',
    attendees: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
    ],
    description: 'A moderate 20km morning cycle ride. Finish off with fresh coconut water and breakfast chats. Beginners friendly!',
    isInterested: false
  },
  {
    id: 'e4',
    title: 'Travel Stories Night',
    category: 'travel',
    location: 'Mindspace Social, Hyd',
    date: 'Fri, 29 May',
    time: '7:30 PM',
    distance: '2.5 km away',
    image: 'https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=600',
    attendees: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=100',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100'
    ],
    description: 'Share your wildest hitchhiking stories, flight mishaps, and gorgeous mountain treks. Meet travel bloggers and budget nomads.',
    isInterested: false
  }
];

export const MOCK_TRIPS: TravelTrip[] = [
  {
    id: 't1',
    destination: 'Manali Heights, HP',
    date: '12 June - 18 June',
    duration: '6 Days',
    budget: '₹15,000',
    companionsCount: 3,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
    travelInterests: ['Trekking', 'Snowboarding', 'Photography', 'Cafes'],
    itinerary: [
      { day: 1, title: 'Arrival & Cafe Hopping', desc: 'Arrive in Old Manali, check in to the cozy wood cabin, explore ambient riversides and custom woodfire pizza cafes.' },
      { day: 2, title: 'Solang Valley Adventure', desc: 'Paragliding, quad biking, and beautiful views of the snow-capped Himalayan ranges.' },
      { day: 3, title: 'Jogini Waterfall Trek', desc: 'A short pine-tree trek to the sacred waterfalls, following a soothing dip.' }
    ],
    nearbyTravelers: [
      MOCK_PROFILES[0], // Ananya
      MOCK_PROFILES[2]  // Pooja
    ]
  }
];

export const MOCK_MEMORIES: CoupleMemory[] = [
  {
    id: 'm1',
    title: 'First Date Coffee ☕️',
    date: '14 Jan 2026',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600',
    type: 'photo',
    note: 'We talked for 4 hours straight about spaceships and pixel art!'
  },
  {
    id: 'm2',
    title: 'Sunset at the Lake 🌅',
    date: '18 Feb 2026',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=600',
    type: 'photo',
    note: 'Ananya took this beautiful photo while we were listening to Coldplay on shared AirPods.'
  },
  {
    id: 'm3',
    title: 'Late Night Chess ♟️',
    date: '03 Mar 2026',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=600',
    type: 'photo',
    note: 'She checkmated me in 7 moves and wouldn\'t stop bragging about it!'
  }
];

export const MOCK_GOALS: CoupleGoal[] = [
  { id: 'g1', title: 'Visit 5 cafes together', target: 5, current: 4, completed: false },
  { id: 'g2', title: 'Complete a 1000-piece puzzle', target: 1, current: 1, completed: true },
  { id: 'g3', title: 'Streak 150 days on MeetLoop', target: 150, current: 124, completed: false }
];

export const MOCK_GAMES: GameItem[] = [
  { id: 'g_c4', name: 'Connect Four', playersCount: '12.4k online', image: '🔴', description: 'Drop discs to connect 4 in a line! Smooth physics and interactive emoji chats.', isTrending: true, category: 'Strategy' },
  { id: 'g_cr', name: 'Carrom', playersCount: '8.1k online', image: '⚪️', description: 'Classic pocket board game with beautiful wooden boards and striking haptics.', isTrending: true, category: 'Board' },
  { id: 'g_ch', name: 'Chess', playersCount: '23.5k online', image: '👑', description: 'Test your brain. Play live with friends or match with nearby chess masters.', isTrending: true, category: 'Strategy' },
  { id: 'g_ttt', name: 'Tic Tac Toe', playersCount: '5.2k online', image: '❌', description: 'Quick, interactive 3x3 combat. Best-of-3 gets streak double-up!', isTrending: false, category: 'Casual' },
  { id: 'g_qb', name: 'Quiz Battle', playersCount: '15.9k online', image: '❓', description: 'Category-based real-time trivia. Reveal mutual answers after the match!', isTrending: true, category: 'Trivia' },
  { id: 'g_td', name: 'Truth or Dare', playersCount: '18.3k online', image: '🔥', description: 'Perfect icebreaker for groups or couples. Generates deep, creative questions!', isTrending: false, category: 'Party' }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: 'n1', title: 'New Match! ❤️', body: 'You and Ananya just matched! Say hello while she is active.', type: 'match', time: '2 mins ago', read: false },
  { id: 'n2', title: 'Ananya sent you a message', body: '"Sounds fun! Let me think about it 😄"', type: 'message', time: '10 mins ago', read: false },
  { id: 'n3', title: 'Couple Streak Milestone! 🎉', body: 'You and Ananya achieved a 120-Day Streak. Keep the loop active!', type: 'couple', time: '3 hours ago', read: true },
  { id: 'n4', title: 'New Event Nearby 🗺', body: 'Sunset Music Fest is trending in your city. 3 mutual friends are attending.', type: 'event', time: '1 day ago', read: true }
];
