import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../theme.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  double _searchRadius = 15.0;
  final List<String> _interests = ['Travel', 'Music', 'Photography', 'Gaming', 'Cycling', 'Movies'];

  @override
  Widget build(BuildContext context) {
    final bool isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Identity'),
        centerTitle: false,
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {},
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(18.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Overlapping Card with Cover and Avatar
            Stack(
              clipBehavior: Clip.none,
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(24),
                  child: Image.network(
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
                    height: 120,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                ),
                Positioned(
                  bottom: -36,
                  left: 20,
                  child: Container(
                    padding: const EdgeInsets.all(4),
                    decoration: BoxDecoration(
                      color: isDarkMode ? AppTheme.bgDark : Colors.white,
                      shape: BoxShape.circle,
                    ),
                    child: const CircleAvatar(
                      radius: 36,
                      backgroundImage: NetworkImage(
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
                      ),
                    ),
                  ),
                )
              ],
            ),

            const SizedBox(height: 48),

            // User Info
            Row(
              children: [
                const Text(
                  'Arjun Reddy',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
                ),
                const SizedBox(width: 6),
                const Icon(Icons.verified, color: Colors.skyBlue, size: 18),
              ],
            ),
            const SizedBox(height: 4),
            const Text(
              'Verified Architect',
              style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold, fontFamily: 'monospace'),
            ),
            const SizedBox(height: 12),
            Text(
              'Explorer | Music Lover | Coffee Addict ☕️\nAlways up for new adventures and meaningful conversations!',
              style: TextStyle(color: Colors.grey[500], fontSize: 12, height: 1.4),
            ),

            const SizedBox(height: 24),

            // Search Radius Slider Preferences
            Text(
              'SEARCH RADIUS PREFERENCE',
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.extrabold,
                letterSpacing: 1.5,
                color: Colors.grey[500],
              ),
            ),
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: AppTheme.glassDecoration(isDarkMode: isDarkMode),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Scan Radius', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                      Text('${_searchRadius.round()} km', style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  Slider(
                    value: _searchRadius,
                    min: 2,
                    max: 50,
                    activeColor: AppTheme.primary,
                    inactiveColor: AppTheme.primary.withOpacity(0.2),
                    onChanged: (val) {
                      setState(() {
                        _searchRadius = val;
                      });
                    },
                  ),
                ],
              ),
            ).animate().fadeIn(delay: 100.ms),

            const SizedBox(height: 24),

            // Interests tags list
            Text(
              'MY INTERESTS & HOBBIES',
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.extrabold,
                letterSpacing: 1.5,
                color: Colors.grey[500],
              ),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: _interests.map((hobby) {
                return Chip(
                  label: Text(hobby, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                  backgroundColor: isDarkMode ? Colors.slate[900] : Colors.slate[100],
                  side: BorderSide.none,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                );
              }).toList(),
            ).animate().fadeIn(delay: 200.ms),

            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}
