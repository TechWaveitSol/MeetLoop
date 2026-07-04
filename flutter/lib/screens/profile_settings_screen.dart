import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../theme.dart';
import '../main.dart';

class ProfileSettingsScreen extends ConsumerStatefulWidget {
  final String tab; // 'profile' | 'edit_profile' | 'notifications' | 'settings'
  const ProfileSettingsScreen({super.key, required this.tab});

  @override
  ConsumerState<ProfileSettingsScreen> createState() => _ProfileSettingsScreenState();
}

class _ProfileSettingsScreenState extends ConsumerState<ProfileSettingsScreen> {
  // Proximity search radius local state
  double _searchRadius = 2.5;

  // Custom User details
  final _bioController = TextEditingController(text: 'Award-winning product designer. Specializing in minimal layouts, mobile fluid interfaces, and modular component design.');

  final List<Map<String, dynamic>> _mockNotifications = [
    {'title': 'Rohan challenge request', 'body': 'Rohan invited you to a round of Tic Tac Toe.', 'time': '5m ago'},
    {'title': 'Mutual Match Alert', 'body': 'You and Sneha matched! Send her an intimate icebreaker.', 'time': '2h ago'},
  ];

  @override
  Widget build(BuildContext context) {
    final themeMode = ref.watch(themeModeProvider);
    final isDark = themeMode == ThemeMode.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          widget.tab == 'profile' 
              ? 'My Card' 
              : widget.tab == 'edit_profile' 
                  ? 'Edit Bio' 
                  : widget.tab == 'notifications' 
                      ? 'Alert Center' 
                      : 'App Options',
          style: const TextStyle(fontWeight: FontWeight.black, fontSize: 16),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: _buildActiveContent(isDark),
        ),
      ),
    );
  }

  Widget _buildActiveContent(bool isDark) {
    switch (widget.tab) {
      case 'profile':
        return _buildProfileTab();
      case 'edit_profile':
        return _buildEditProfileTab();
      case 'notifications':
        return _buildNotificationsTab();
      case 'settings':
        return _buildSettingsTab(isDark);
      default:
        return _buildProfileTab();
    }
  }

  // ==================== A. PROFILE OVERVIEW TAB ====================
  Widget _buildProfileTab() {
    return ListView(
      physics: const BouncingScrollPhysics(),
      children: [
        const SizedBox(height: 12),
        // Big profile card
        Container(
          padding: const EdgeInsets.all(20),
          decoration: AppTheme.glassDecoration(context: context),
          child: Column(
            children: [
              Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    width: 90,
                    height: 90,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: AppTheme.primaryGradient,
                    ),
                  ),
                  const CircleAvatar(
                    radius: 41,
                    backgroundImage: NetworkImage('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80'),
                  ),
                ],
              ),
              const SizedBox(height: 14),
              const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Arjun Sharma, 24', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                  SizedBox(width: 6),
                  Icon(Icons.verified, color: Colors.blue, size: 16),
                ],
              ),
              const Text('PROXIMITY CARD DELEGATE', style: TextStyle(color: Colors.grey, fontSize: 9, fontWeight: FontWeight.bold, letterSpacing: 1)),
              const SizedBox(height: 16),
              Text(
                _bioController.text,
                textAlign: TextAlign.center,
                style: const TextStyle(color: Colors.grey, fontSize: 11, height: 1.5),
              ),
            ],
          ),
        ).animate().scale(duration: 400.ms, curve: Curves.easeOutBack),

        const SizedBox(height: 20),
        // Actions
        _buildProfileOption(
          icon: Icons.edit_note,
          title: 'Modify Design Biography',
          onTap: () => Navigator.push(context, MaterialPageRoute(builder: (context) => const ProfileSettingsScreen(tab: 'edit_profile'))),
        ),
        _buildProfileOption(
          icon: Icons.notifications_none,
          title: 'Alert Notifications Center',
          onTap: () => Navigator.push(context, MaterialPageRoute(builder: (context) => const ProfileSettingsScreen(tab: 'notifications'))),
        ),
        _buildProfileOption(
          icon: Icons.tune,
          title: 'App Settings & Privacy',
          onTap: () => Navigator.push(context, MaterialPageRoute(builder: (context) => const ProfileSettingsScreen(tab: 'settings'))),
        ),
        const SizedBox(height: 100),
      ],
    );
  }

  Widget _buildProfileOption({required IconData icon, required String title, required VoidCallback onTap}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      decoration: AppTheme.glassDecoration(context: context, borderOpacity: 0.05),
      child: ListTile(
        onTap: onTap,
        dense: true,
        leading: Icon(icon, color: AppTheme.primary, size: 18),
        title: Text(title, style: const TextStyle(fontSize: 11.5, fontWeight: FontWeight.bold)),
        trailing: const Icon(Icons.chevron_right, size: 16, color: Colors.grey),
      ),
    );
  }

  // ==================== B. EDIT BIOGRAPHY TAB ====================
  Widget _buildEditProfileTab() {
    return ListView(
      physics: const BouncingScrollPhysics(),
      children: [
        const SizedBox(height: 12),
        const Text('BIOGRAPHY', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey)),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.all(12),
          decoration: AppTheme.glassDecoration(context: context),
          child: TextField(
            controller: _bioController,
            maxLines: 4,
            style: const TextStyle(fontSize: 12, height: 1.4),
            decoration: const InputDecoration(
              border: InputBorder.none,
              hintText: 'Describe your design circle pass...',
            ),
          ),
        ),
        const SizedBox(height: 24),
        const Text('PROXIMITY SEARCH RADIUS', style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.grey)),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: AppTheme.glassDecoration(context: context),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Active Radius', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11)),
                  Text('${_searchRadius.toStringAsFixed(1)} km', style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 11, fontFamily: 'JetBrains Mono')),
                ],
              ),
              Slider(
                value: _searchRadius,
                min: 0.5,
                max: 10.0,
                activeColor: AppTheme.primary,
                inactiveColor: AppTheme.primary.withOpacity(0.15),
                onChanged: (val) {
                  setState(() {
                    _searchRadius = val;
                  });
                },
              ),
            ],
          ),
        ),
        const SizedBox(height: 32),
        ElevatedButton(
          onPressed: () {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Card settings synchronized successfully! 🌐')),
            );
            Navigator.pop(context);
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: AppTheme.primary,
            foregroundColor: Colors.white,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
            padding: const EdgeInsets.symmetric(vertical: 16),
          ),
          child: const Text('Save Card', style: TextStyle(fontWeight: FontWeight.bold)),
        ),
      ],
    );
  }

  // ==================== C. NOTIFICATIONS TAB ====================
  Widget _buildNotificationsTab() {
    return ListView.builder(
      itemCount: _mockNotifications.length,
      padding: const EdgeInsets.only(top: 12),
      itemBuilder: (context, idx) {
        final alert = _mockNotifications[idx];
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
                  Text(alert['title']!, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppTheme.primary)),
                  Text(alert['time']!, style: const TextStyle(color: Colors.grey, fontSize: 9, fontFamily: 'JetBrains Mono')),
                ],
              ),
              const SizedBox(height: 6),
              Text(alert['body']!, style: const TextStyle(color: Colors.grey, fontSize: 11, height: 1.4)),
            ],
          ),
        ).animate().fadeIn(delay: (idx * 50).ms);
      },
    );
  }

  // ==================== D. SETTINGS TAB ====================
  Widget _buildSettingsTab(bool isDark) {
    return ListView(
      physics: const BouncingScrollPhysics(),
      children: [
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: AppTheme.glassDecoration(context: context),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Intimate Dark Theme', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                  Switch(
                    value: isDark,
                    activeColor: AppTheme.primary,
                    onChanged: (val) {
                      ref.read(themeModeProvider.notifier).state = val ? ThemeMode.dark : ThemeMode.light;
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text(val ? 'Dark space loaded 🌌' : 'Light space loaded ☀️')),
                      );
                    },
                  ),
                ],
              ),
              const Divider(height: 24, opacity: 0.1),
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Biometric authentication lock', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                  Icon(Icons.fingerprint, color: AppTheme.primary, size: 22),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 24),
        ElevatedButton(
          onPressed: () {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Profile logged out. Session destroyed. 👋')),
            );
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.red.withOpacity(0.1),
            foregroundColor: Colors.red,
            elevation: 0,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
            padding: const EdgeInsets.symmetric(vertical: 16),
          ),
          child: const Text('Log Out Account', style: TextStyle(fontWeight: FontWeight.bold)),
        ),
      ],
    );
  }
}
