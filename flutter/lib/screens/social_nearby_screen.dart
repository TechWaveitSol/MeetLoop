import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import '../theme.dart';

class SocialNearbyScreen extends StatefulWidget {
  final String tab; // 'nearby' | 'map' | 'events'
  const SocialNearbyScreen({super.key, required this.tab});

  @override
  State<SocialNearbyScreen> createState() => _SocialNearbyScreenState();
}

class _SocialNearbyScreenState extends State<SocialNearbyScreen> {
  // Swipe Card stack mock state index
  int _cardIndex = 0;
  String _lastActionText = '';

  final List<Map<String, dynamic>> _swipeProfiles = [
    {
      'name': 'Pooja Reddy',
      'age': 22,
      'distance': '1.2 km away',
      'match': '92%',
      'bio': 'Deeply into aesthetic typography, structural coffee shops and modern design layout systems. Let\'s play chess or hike!',
      'avatar': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    },
    {
      'name': 'Kunal Verma',
      'age': 24,
      'distance': '3.4 km away',
      'match': '88%',
      'bio': 'Flutter architecture designer. Loves local hiking trails, filter coffee, and acoustic guitar sessions.',
      'avatar': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
    {
      'name': 'Sneha Kapoor',
      'age': 21,
      'distance': '0.5 km away',
      'match': '95%',
      'bio': 'UI/UX artist. Stacking badminton badges and reading science-fiction novellas. Looking for travel partners!',
      'avatar': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    }
  ];

  final List<Map<String, dynamic>> _mockEvents = [
    {'title': 'Board Game Meetup', 'time': 'Tonight, 8:00 PM', 'location': 'Third Wave Cafe', 'attendees': '12 going', 'joined': true},
    {'title': 'Saturday Hiking Trail', 'time': 'Saturday, 6:00 AM', 'location': 'Nandi Hills', 'attendees': '28 going', 'joined': false},
    {'title': 'Tech Stack Chillout', 'time': 'July 15, 5:00 PM', 'location': 'WeWork Arena', 'attendees': '45 going', 'joined': false},
  ];

  void _handleSwipe(bool match) {
    setState(() {
      _lastActionText = match ? 'Matched! ❤️' : 'Passed ✖';
      _cardIndex = (_cardIndex + 1) % _swipeProfiles.length;
    });

    // Reset indicator text
    Future.delayed(const Duration(seconds: 1), () {
      if (mounted) {
        setState(() => _lastActionText = '');
      }
    });

    if (match) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Connection request sent! ⚡️')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.tab == 'nearby' 
              ? 'Find Connection' 
              : widget.tab == 'map' 
                  ? 'Radar Scan' 
                  : 'Upcoming Events',
          style: const TextStyle(fontWeight: FontWeight.black, fontSize: 16),
        ),
        actions: [
          IconButton(
            onPressed: () => context.go('/map'),
            icon: const Icon(Icons.radar, color: AppTheme.primary),
          ),
          IconButton(
            onPressed: () => context.go('/events'),
            icon: const Icon(Icons.event, color: AppTheme.mint),
          ),
        ],
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: _buildActiveContent(),
        ),
      ),
    );
  }

  Widget _buildActiveContent() {
    if (widget.tab == 'nearby') {
      return _buildSwipeContent();
    } else if (widget.tab == 'map') {
      return _buildRadarContent();
    } else {
      return _buildEventsContent();
    }
  }

  // ==================== A. SWIPE CARDS ====================
  Widget _buildSwipeContent() {
    final profile = _swipeProfiles[_cardIndex];

    return Column(
      children: [
        const SizedBox(height: 8),
        Expanded(
          child: Stack(
            alignment: Alignment.center,
            children: [
              // Underlaying card simulation
              Transform.scale(
                scale: 0.95,
                child: Opacity(
                  opacity: 0.5,
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.grey.shade300,
                      borderRadius: BorderRadius.circular(28),
                    ),
                  ),
                ),
              ),

              // Active Swipe card
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(28),
                  image: DecorationImage(
                    image: NetworkImage(profile['avatar']!),
                    fit: BoxFit.cover,
                  ),
                  boxShadow: AppTheme.premiumShadow,
                ),
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(28),
                    gradient: LinearGradient(
                      colors: [Colors.black.withOpacity(0.9), Colors.transparent],
                      begin: Alignment.bottomCenter,
                      end: Alignment.topCenter,
                    ),
                  ),
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.end,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Match score badge
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(color: AppTheme.mint, borderRadius: BorderRadius.circular(8)),
                        child: Text(
                          '${profile['match']} Match',
                          style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.bold),
                        ),
                      ),
                      const SizedBox(height: 12),
                      Row(
                        children: [
                          Text(
                            '${profile['name']}, ${profile['age']}',
                            style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                          ),
                          const SizedBox(width: 6),
                          const Icon(Icons.verified, color: Colors.blue, size: 18),
                        ],
                      ),
                      Text(profile['distance']!, style: const TextStyle(color: Colors.grey, fontSize: 11)),
                      const SizedBox(height: 8),
                      Text(
                        profile['bio']!,
                        style: TextStyle(color: Colors.white.withOpacity(0.8), fontSize: 12, height: 1.4),
                      ),
                    ],
                  ),
                ),
              ).animate(key: ValueKey(_cardIndex)).fadeIn().slideX(begin: 0.1, end: 0),

              // Overlay Toast indicator
              if (_lastActionText.isNotEmpty)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  decoration: BoxDecoration(color: Colors.black.withOpacity(0.8), borderRadius: BorderRadius.circular(16)),
                  child: Text(
                    _lastActionText,
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 18),
                  ),
                ),
            ],
          ),
        ),

        // Action Buttons Row
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 24.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              // Pass Circle Button
              IconButton(
                onPressed: () => _handleSwipe(false),
                iconSize: 28,
                style: IconButton.styleFrom(
                  backgroundColor: Colors.white,
                  foregroundColor: Colors.red,
                  padding: const EdgeInsets.all(16),
                  elevation: 2,
                ),
                icon: const Icon(Icons.close),
              ),

              // Superlike star
              IconButton(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Super Liked! ⭐')),
                  );
                  _handleSwipe(true);
                },
                iconSize: 24,
                style: IconButton.styleFrom(
                  backgroundColor: Colors.white,
                  foregroundColor: Colors.amber,
                  padding: const EdgeInsets.all(12),
                  elevation: 2,
                ),
                icon: const Icon(Icons.star),
              ),

              // Love match
              IconButton(
                onPressed: () => _handleSwipe(true),
                iconSize: 28,
                style: IconButton.styleFrom(
                  backgroundColor: AppTheme.primary,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.all(16),
                  elevation: 4,
                ),
                icon: const Icon(Icons.favorite),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // ==================== B. RADAR MAP ====================
  Widget _buildRadarContent() {
    return Column(
      children: [
        const SizedBox(height: 12),
        // Mini Scan Panel
        Expanded(
          child: Container(
            decoration: AppTheme.glassDecoration(context: context, customColor: Colors.black.withOpacity(0.02)),
            child: Stack(
              alignment: Alignment.center,
              children: [
                // Glowing Pulse rings
                ...List.generate(3, (idx) {
                  return Container(
                    width: (idx + 1) * 100.0,
                    height: (idx + 1) * 100.0,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: AppTheme.primary.withOpacity(0.08),
                        width: 1.5,
                      ),
                    ),
                  ).animate(onPlay: (controller) => controller.repeat()).scale(
                    duration: 3.seconds,
                    begin: 0.5,
                    end: 1.8,
                    curve: Curves.easeOut,
                  ).fadeIn(duration: 1.seconds).fadeOut(delay: 2.seconds, duration: 1.seconds);
                }),

                // Center Node (You)
                const CircleAvatar(
                  radius: 18,
                  backgroundColor: AppTheme.primary,
                  child: Icon(Icons.radar, color: Colors.white, size: 18),
                ),

                // Floating local node 1 (Pooja)
                Positioned(
                  top: 70,
                  left: 60,
                  child: _buildRadarPin(
                    name: 'Pooja (92%)',
                    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
                  ),
                ),

                // Floating local node 2 (Kunal)
                Positioned(
                  bottom: 120,
                  right: 40,
                  child: _buildRadarPin(
                    name: 'Kunal (88%)',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        const Text(
          'Scanning for mutual hobby cards within 1.5 km...',
          style: TextStyle(color: Colors.grey, fontSize: 10, fontStyle: FontStyle.italic),
        ),
        const SizedBox(height: 20),
      ],
    );
  }

  Widget _buildRadarPin({required String name, required String avatar}) {
    return GestureDetector(
      onTap: () {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Scanning profile details for $name...')),
        );
      },
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(2),
            decoration: BoxDecoration(color: AppTheme.primary, shape: BoxShape.circle, boxShadow: AppTheme.glowShadow),
            child: CircleAvatar(
              radius: 18,
              backgroundImage: NetworkImage(avatar),
            ),
          ),
          const SizedBox(height: 4),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
            decoration: BoxDecoration(color: Colors.black.withOpacity(0.8), borderRadius: BorderRadius.circular(6)),
            child: Text(
              name,
              style: const TextStyle(color: Colors.white, fontSize: 8, fontWeight: FontWeight.bold),
            ),
          ),
        ],
      ),
    );
  }

  // ==================== C. EVENTS ====================
  Widget _buildEventsContent() {
    return ListView.builder(
      itemCount: _mockEvents.length,
      padding: const EdgeInsets.only(top: 12),
      itemBuilder: (context, idx) {
        final item = _mockEvents[idx];
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: AppTheme.glassDecoration(context: context),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(item['title']!, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                  IconButton(
                    onPressed: () {
                      setState(() {
                        item['joined'] = !item['joined'];
                      });
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text(item['joined'] ? 'RSVP Confirmed! 🎫' : 'Cancelled RSVP')),
                      );
                    },
                    icon: Icon(
                      item['joined'] ? Icons.check_circle : Icons.add_circle_outline,
                      color: item['joined'] ? AppTheme.mint : AppTheme.primary,
                      size: 22,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 4),
              Row(
                children: [
                  const Icon(Icons.access_time, size: 12, color: Colors.grey),
                  const SizedBox(width: 4),
                  Text(item['time']!, style: const TextStyle(color: Colors.grey, fontSize: 10)),
                  const SizedBox(width: 14),
                  const Icon(Icons.pin_drop_outlined, size: 12, color: Colors.grey),
                  const SizedBox(width: 4),
                  Text(item['location']!, style: const TextStyle(color: Colors.grey, fontSize: 10)),
                ],
              ),
              const SizedBox(height: 10),
              Text(
                item['attendees']!,
                style: const TextStyle(color: AppTheme.primary, fontSize: 9, fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ).animate().fadeIn(delay: (idx * 50).ms);
      },
    );
  }
}
