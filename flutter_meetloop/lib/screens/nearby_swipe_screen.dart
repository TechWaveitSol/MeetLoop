import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../theme.dart';

class SwipeConnectionScreen extends StatefulWidget {
  const SwipeConnectionScreen({Key? key}) : super(key: key);

  @override
  State<SwipeConnectionScreen> createState() => _SwipeConnectionScreenState();
}

class _SwipeConnectionScreenState extends State<SwipeConnectionScreen> {
  int _currentIndex = 0;
  bool _showMatchOverlay = false;

  final List<Map<String, dynamic>> _mockProfiles = [
    {
      'name': 'Ananya',
      'age': 22,
      'distance': '2.4 km away',
      'bio': 'Love exploring new places and meeting new people! Let\'s grab a cup of matcha latte 🍵 or go for a sunset hike 🌅.',
      'image': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600',
      'matchScore': 94,
    },
    {
      'name': 'Rohan',
      'age': 24,
      'distance': '1.8 km away',
      'bio': 'Always down for game nights or cafe hopping! Play chess or Connect Four? ♟️ Let\'s connect and create memories.',
      'image': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
      'matchScore': 88,
    },
    {
      'name': 'Pooja',
      'age': 23,
      'distance': '0.9 km away',
      'bio': 'UI/UX Designer & explorer. Let\'s sketch some digital layouts over premium hot chocolate! ☕️🎨',
      'image': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600',
      'matchScore': 97,
    }
  ];

  void _handleAction(bool accepted) {
    if (accepted) {
      // Show match modal randomly or if match score > 90
      if (_mockProfiles[_currentIndex]['matchScore'] > 90) {
        setState(() {
          _showMatchOverlay = true;
        });
        return;
      }
    }
    
    _nextCard();
  }

  void _nextCard() {
    setState(() {
      _showMatchOverlay = false;
      _currentIndex = (_currentIndex + 1) % _mockProfiles.length;
    });
  }

  @override
  Widget build(BuildContext context) {
    final profile = _mockProfiles[_currentIndex];
    final bool isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Connect Nearby'),
        centerTitle: false,
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () {},
          ),
        ],
      ),
      body: Stack(
        children: [
          // Base Swipe Card Column
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                Expanded(
                  child: Stack(
                    children: [
                      // Photo container with overlay text info
                      ClipRRect(
                        borderRadius: BorderRadius.circular(28),
                        child: Stack(
                          fit: StackFit.expand,
                          children: [
                            Image.network(
                              profile['image'],
                              fit: BoxFit.cover,
                            ),
                            // Dark bottom protection gradient
                            Container(
                              decoration: const BoxDecoration(
                                gradient: LinearGradient(
                                  colors: [Colors.transparent, Colors.black87],
                                  begin: Alignment.center,
                                  end: Alignment.bottomCenter,
                                ),
                              ),
                            ),
                            // Match percentage pill
                            Positioned(
                              top: 16,
                              left: 16,
                              child: Container(
                                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                                decoration: BoxDecoration(
                                  color: AppTheme.primary,
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: Row(
                                  children: [
                                    const Icon(Icons.flash_on, size: 14, color: Colors.white),
                                    const SizedBox(width: 4),
                                    Text(
                                      '${profile['matchScore']}% MATCH',
                                      style: const TextStyle(
                                        color: Colors.white,
                                        fontSize: 10,
                                        fontWeight: FontWeight.bold,
                                        letterSpacing: 0.5,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            // Profile Text Info
                            Positioned(
                              bottom: 24,
                              left: 20,
                              right: 20,
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Text(
                                        '${profile['name']}, ${profile['age']}',
                                        style: const TextStyle(
                                          color: Colors.white,
                                          fontSize: 24,
                                          fontWeight: FontWeight.w800,
                                        ),
                                      ),
                                      const SizedBox(width: 6),
                                      const Icon(Icons.verified, color: Colors.skyBlue, size: 20),
                                    ],
                                  ),
                                  const SizedBox(height: 6),
                                  Text(
                                    profile['distance'],
                                    style: TextStyle(
                                      color: Colors.white.withOpacity(0.7),
                                      fontSize: 12,
                                    ),
                                  ),
                                  const SizedBox(height: 10),
                                  Text(
                                    profile['bio'],
                                    style: TextStyle(
                                      color: Colors.white.withOpacity(0.85),
                                      fontSize: 12,
                                      height: 1.4,
                                    ),
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ).animate(key: ValueKey(_currentIndex))
                        .fadeIn(duration: 400.ms)
                        .scale(begin: const Offset(0.95, 0.95)),
                    ],
                  ),
                ),
                
                const SizedBox(height: 20),

                // Controls Row
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    _buildRoundButton(
                      Icons.close, 
                      Colors.redAccent, 
                      onTap: () => _handleAction(false),
                    ),
                    _buildRoundButton(
                      Icons.star, 
                      Colors.amber, 
                      size: 64,
                      iconSize: 32,
                      onTap: () => _handleAction(true),
                    ),
                    _buildRoundButton(
                      Icons.favorite, 
                      Colors.emerald, 
                      onTap: () => _handleAction(true),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
              ],
            ),
          ),

          // Match Success Overlay Popup
          if (_showMatchOverlay)
            Container(
              color: Colors.black.withOpacity(0.85),
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.favorite, size: 80, color: AppTheme.accent)
                      .animate()
                      .scale(duration: 500.ms, curve: Curves.bounceOut),
                    const SizedBox(height: 24),
                    const Text(
                      "It's a Match! ❤️",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 28,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'You and ${profile['name']} liked each other.',
                      style: const TextStyle(color: Colors.white70, fontSize: 14),
                    ),
                    const SizedBox(height: 32),
                    ElevatedButton(
                      onPressed: _nextCard,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.primary,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 16),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      ),
                      child: const Text('Send a Boardgame Challenge', style: TextStyle(fontWeight: FontWeight.bold)),
                    ),
                    const SizedBox(height: 12),
                    TextButton(
                      onPressed: _nextCard,
                      child: const Text('Keep Exploring', style: TextStyle(color: Colors.white54)),
                    )
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildRoundButton(
    IconData icon, 
    Color color, {
    double size = 52.0, 
    double iconSize = 24.0,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          color: color.withOpacity(0.12),
          shape: BoxShape.circle,
          border: Border.all(color: color.withOpacity(0.24), width: 1.5),
        ),
        child: Center(
          child: Icon(icon, color: color, size: iconSize),
        ),
      ),
    );
  }
}
