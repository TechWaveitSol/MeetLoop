import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import '../theme.dart';

class DashboardExploreScreen extends StatefulWidget {
  final String tab; // 'home' | 'explore' | 'friends'
  const DashboardExploreScreen({super.key, required this.tab});

  @override
  State<DashboardExploreScreen> createState() => _DashboardExploreScreenState();
}

class _DashboardExploreScreenState extends State<DashboardExploreScreen> {
  // Local state representing registered mutual groups
  final Set<String> _joinedGroups = {};

  final List<Map<String, dynamic>> _mockGroups = [
    {'id': 'g1', 'name': 'Chess Arenas', 'members': '142 local players', 'emoji': '♟️', 'category': 'Games'},
    {'id': 'g2', 'name': 'Trek hiking circles', 'members': '89 travelers', 'emoji': '🏔️', 'category': 'Travel'},
    {'id': 'g3', 'name': 'Vocal Jams & Covers', 'members': '65 artists', 'emoji': '🎤', 'category': 'Music'},
    {'id': 'g4', 'name': 'Flutter Hackathon Hub', 'members': '112 developers', 'emoji': '💻', 'category': 'Tech'},
  ];

  final List<Map<String, dynamic>> _mockFriends = [
    {'id': 'f1', 'name': 'Ananya Sen', 'match': '96%', 'avatar': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', 'hobby': 'Badminton, Chess'},
    {'id': 'f2', 'name': 'Kunal Verma', 'match': '88%', 'avatar': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', 'hobby': 'Hiking, FIFA 25'},
    {'id': 'f3', 'name': 'Pooja Reddy', 'match': '92%', 'avatar': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', 'hobby': 'Poetry, Backpacking'},
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            CircleAvatar(
              radius: 18,
              backgroundImage: const NetworkImage('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80'),
              backgroundColor: Colors.grey.shade300,
            ),
            const SizedBox(width: 12),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Arjun Sharma', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                Text('VERIFIED DESIGNER', style: TextStyle(fontSize: 8, color: AppTheme.primary, fontWeight: FontWeight.bold, letterSpacing: 1)),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('AI recommendation algorithm refreshed! 🧠')),
              );
            },
            icon: const Icon(Icons.psychology_outlined, color: AppTheme.primary),
          ),
          IconButton(
            onPressed: () => context.push('/notifications'),
            icon: const Badge(
              label: Text('1', style: TextStyle(fontSize: 7)),
              child: Icon(Icons.notifications_none),
            ),
          ),
        ],
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: _buildActiveTabContent(),
        ),
      ),
    );
  }

  Widget _buildActiveTabContent() {
    if (widget.tab == 'home') {
      return _buildHomeTab();
    } else if (widget.tab == 'explore') {
      return _buildExploreTab();
    } else {
      return _buildFriendsTab();
    }
  }

  // ==================== A. HOME BENTO TAB ====================
  Widget _buildHomeTab() {
    return ListView(
      physics: const BouncingScrollPhysics(),
      children: [
        const SizedBox(height: 12),
        // Greeting card
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            gradient: AppTheme.primaryGradient,
            borderRadius: AppTheme.roundedCorners,
            boxShadow: AppTheme.glowShadow,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Today\'s Loop Recommendation',
                style: TextStyle(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 2),
              ),
              const SizedBox(height: 8),
              const Text(
                'Meet Pooja at Sector 5 Coffee!',
                style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.black, letterSpacing: -0.5),
              ),
              const SizedBox(height: 6),
              Text(
                'You both share a mutual passion for poetry, travel diaries and casual Chess challenges.',
                style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 11, height: 1.4),
              ),
            ],
          ),
        ).animate().fadeIn().scaleY(begin: 0.9, end: 1),

        const SizedBox(height: 24),
        // Sub-title
        const Text(
          'YOUR DESIGN CIRCLES',
          style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, letterSpacing: 1.5, color: Colors.grey),
        ),
        const SizedBox(height: 12),

        // Bento Grid structure (using Table or multiple rows)
        Row(
          children: [
            // Left large card
            Expanded(
              child: GestureDetector(
                onTap: () => context.go('/couple'),
                child: Container(
                  height: 140,
                  padding: const EdgeInsets.all(16),
                  decoration: AppTheme.glassDecoration(context: context, customColor: const Color(0xFFFFF1F2)),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(color: AppTheme.accent.withOpacity(0.1), shape: BoxShape.circle),
                        child: const Icon(Icons.favorite, color: AppTheme.accent, size: 20),
                      ),
                      const Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Private Couple', style: TextStyle(fontWeight: FontWeight.black, fontSize: 12, color: Colors.black85)),
                          SizedBox(height: 4),
                          Text('14 Day Streak active', style: TextStyle(color: Colors.grey, fontSize: 10)),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(width: 12),
            // Right stack
            Expanded(
              child: Column(
                children: [
                  // Upper small card
                  GestureDetector(
                    onTap: () => context.go('/games'),
                    child: Container(
                      height: 64,
                      padding: const EdgeInsets.symmetric(horizontal: 14),
                      decoration: AppTheme.glassDecoration(context: context),
                      child: const Row(
                        children: [
                          Icon(Icons.sports_esports_outlined, color: AppTheme.primary, size: 20),
                          SizedBox(width: 12),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text('Gaming Arena', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11)),
                              Text('Play Tic Tac Toe', style: TextStyle(color: Colors.grey, fontSize: 9)),
                            ],
                          )
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  // Lower small card
                  GestureDetector(
                    onTap: () => context.go('/travel'),
                    child: Container(
                      height: 64,
                      padding: const EdgeInsets.symmetric(horizontal: 14),
                      decoration: AppTheme.glassDecoration(context: context),
                      child: const Row(
                        children: [
                          Icon(Icons.alt_route_outlined, color: AppTheme.mint, size: 20),
                          SizedBox(width: 12),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text('Travel Partners', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11)),
                              Text('Plan road trips', style: TextStyle(color: Colors.grey, fontSize: 9)),
                            ],
                          )
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ).animate().fadeIn(delay: 200.ms),

        const SizedBox(height: 24),
        // Active Hobbies
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text(
              'ACTIVE INTERESTS',
              style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, letterSpacing: 1.5, color: Colors.grey),
            ),
            TextButton(
              onPressed: () => context.push('/edit-profile'),
              child: const Text('Edit', style: TextStyle(fontSize: 11, color: AppTheme.primary, fontWeight: FontWeight.bold)),
            )
          ],
        ),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: ['Poetry', 'Badminton', 'Backpacking', 'Chess'].map((hobby) {
            return Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: AppTheme.primary.withOpacity(0.06),
                border: Border.all(color: AppTheme.primary.withOpacity(0.1)),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(
                hobby,
                style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.primary),
              ),
            );
          }).toList(),
        ),
        const SizedBox(height: 100),
      ],
    );
  }

  // ==================== B. EXPLORE TAB ====================
  Widget _buildExploreTab() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 12),
        // Mini search bar
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          decoration: AppTheme.glassDecoration(context: context, borderOpacity: 0.1),
          child: const TextField(
            style: TextStyle(fontSize: 12),
            decoration: InputDecoration(
              icon: Icon(Icons.search, size: 18),
              hintText: 'Search matching local circles...',
              hintStyle: TextStyle(fontSize: 12),
              border: InputBorder.none,
            ),
          ),
        ),
        const SizedBox(height: 20),
        const Text(
          'POPULAR CHANNELS NEAR YOU',
          style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, letterSpacing: 1.5, color: Colors.grey),
        ),
        const SizedBox(height: 12),

        // List
        Expanded(
          child: ListView.builder(
            itemCount: _mockGroups.length,
            physics: const BouncingScrollPhysics(),
            itemBuilder: (context, idx) {
              final group = _mockGroups[idx];
              final hasJoined = _joinedGroups.contains(group['id']);
              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(14),
                decoration: AppTheme.glassDecoration(context: context),
                child: Row(
                  children: [
                    Text(group['emoji']!, style: const TextStyle(fontSize: 28)),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(group['name']!, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                          const SizedBox(height: 2),
                          Text(group['members']!, style: const TextStyle(color: Colors.grey, fontSize: 10)),
                        ],
                      ),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        setState(() {
                          if (hasJoined) {
                            _joinedGroups.remove(group['id']);
                          } else {
                            _joinedGroups.add(group['id']);
                          }
                        });
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text(hasJoined ? 'Left ${group['name']}' : 'Subscribed to ${group['name']}! 🎉')),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: hasJoined ? Colors.grey.shade200 : AppTheme.primary,
                        foregroundColor: hasJoined ? Colors.black85 : Colors.white,
                        elevation: 0,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                      ),
                      child: Text(
                        hasJoined ? 'Joined' : 'Join',
                        style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
              ).animate().fadeIn(delay: (idx * 50).ms);
            },
          ),
        ),
      ],
    );
  }

  // ==================== C. FRIENDS TAB ====================
  Widget _buildFriendsTab() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SizedBox(height: 12),
        const Text(
          'MUTUAL INTEREST MATCHES',
          style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, letterSpacing: 1.5, color: Colors.grey),
        ),
        const SizedBox(height: 12),

        Expanded(
          child: ListView.builder(
            itemCount: _mockFriends.length,
            physics: const BouncingScrollPhysics(),
            itemBuilder: (context, idx) {
              final friend = _mockFriends[idx];
              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(14),
                decoration: AppTheme.glassDecoration(context: context),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 24,
                      backgroundImage: NetworkImage(friend['avatar']!),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Text(friend['name']!, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                              const SizedBox(width: 6),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(color: AppTheme.mint.withOpacity(0.15), borderRadius: BorderRadius.circular(4)),
                                child: Text(
                                  friend['match']!,
                                  style: const TextStyle(color: AppTheme.mint, fontSize: 8, fontWeight: FontWeight.bold),
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 2),
                          Text('Shared: ${friend['hobby']!}', style: const TextStyle(color: Colors.grey, fontSize: 10)),
                        ],
                      ),
                    ),
                    IconButton(
                      onPressed: () => context.go('/chats/c1'),
                      icon: const Icon(Icons.chat_bubble_outline, color: AppTheme.primary, size: 20),
                    ),
                  ],
                ),
              ).animate().fadeIn(delay: (idx * 50).ms);
            },
          ),
        ),
      ],
    );
  }
}
