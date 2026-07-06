import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../theme.dart';

class CoupleSpaceScreen extends StatefulWidget {
  const CoupleSpaceScreen({Key? key}) : super(key: key);

  @override
  State<CoupleSpaceScreen> createState() => _CoupleSpaceScreenState();
}

class _CoupleSpaceScreenState extends State<CoupleSpaceScreen> {
  final List<Map<String, dynamic>> _checklistItems = [
    {'title': 'Sunset Coffee Date 🌅', 'completed': true},
    {'title': 'Play Chess Arena ♟️', 'completed': true},
    {'title': 'Plan Weekend Hiking Roadtrip 🧭', 'completed': false},
    {'title': 'Log first joint memory photo 📸', 'completed': false},
  ];

  @override
  Widget build(BuildContext context) {
    final bool isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Our Private Loop'),
        centerTitle: false,
        actions: [
          IconButton(
            icon: const Icon(Icons.favorite, color: AppTheme.accent),
            onPressed: () {},
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(18.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Streak counter card
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [AppTheme.accent, AppTheme.secondary],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: BorderRadius.circular(28),
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.accent.withOpacity(0.3),
                    blurRadius: 15,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.18),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Text(
                          'COUPLE STREAK',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 8,
                            letterSpacing: 1.2,
                          ),
                        ),
                      ),
                      const SizedBox(height: 12),
                      const Text(
                        '12 Days Active',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 22,
                          fontWeight: FontWeight.w900,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'With Pooja Reddy',
                        style: TextStyle(
                          color: Colors.white.withOpacity(0.8),
                          fontSize: 11,
                        ),
                      ),
                    ],
                  ),
                  const Text('🔥', style: TextStyle(fontSize: 48)),
                ],
              ),
            ).animate().fadeIn(duration: 500.ms).slideY(begin: -0.15),

            const SizedBox(height: 24),

            // Daily Milestones / Bucket List
            Text(
              'SHARED BUCKET LIST',
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.extrabold,
                letterSpacing: 1.5,
                color: Colors.grey[500],
              ),
            ),
            const SizedBox(height: 12),

            Container(
              padding: const EdgeInsets.all(20),
              decoration: AppTheme.glassDecoration(isDarkMode: isDarkMode),
              child: Column(
                children: _checklistItems.map((item) {
                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8.0),
                    child: Row(
                      children: [
                        GestureDetector(
                          onTap: () {
                            setState(() {
                              item['completed'] = !item['completed'];
                            });
                          },
                          child: Container(
                            width: 24,
                            height: 24,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(
                                color: item['completed'] ? AppTheme.accent : Colors.grey,
                                width: 2,
                              ),
                              color: item['completed'] ? AppTheme.accent : Colors.transparent,
                            ),
                            child: item['completed']
                                ? const Icon(Icons.check, size: 14, color: Colors.white)
                                : null,
                          ),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Text(
                            item['title'],
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w500,
                              decoration: item['completed'] 
                                  ? TextDecoration.lineThrough 
                                  : TextDecoration.none,
                              color: item['completed'] ? Colors.grey[500] : null,
                            ),
                          ),
                        ),
                      ],
                    ),
                  );
                }).toList(),
              ),
            ).animate().fadeIn(delay: 200.ms),

            const SizedBox(height: 24),

            // Memory gallery Section
            Text(
              'SHARED TIMELINE',
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.extrabold,
                letterSpacing: 1.5,
                color: Colors.grey[500],
              ),
            ),
            const SizedBox(height: 12),

            ListView(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              children: [
                _buildMemoryCard(
                  'Sunset Coffee Shop',
                  'June 28, 2026',
                  'Logged our first date photo in the cozy local design library.',
                  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400',
                  isDarkMode,
                ),
                const SizedBox(height: 14),
                _buildMemoryCard(
                  'Chess Tournament victory',
                  'June 24, 2026',
                  'Arjun defeated Rohan in the custom Tic Tac Toe arena.',
                  'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=400',
                  isDarkMode,
                ),
              ],
            ).animate().fadeIn(delay: 400.ms),
          ],
        ),
      ),
    );
  }

  Widget _buildMemoryCard(
    String title,
    String date,
    String desc,
    String imageUrl,
    bool isDarkMode,
  ) {
    return Container(
      decoration: AppTheme.glassDecoration(isDarkMode: isDarkMode),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            height: 140,
            width: double.infinity,
            child: ClipRRect(
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(24),
                topRight: Radius.circular(24),
              ),
              child: Image.network(imageUrl, fit: BoxFit.cover),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                    ),
                    Text(
                      date,
                      style: TextStyle(color: Colors.grey[500], fontSize: 9, fontFamily: 'monospace'),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  desc,
                  style: TextStyle(color: Colors.grey[500], fontSize: 11, height: 1.4),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
