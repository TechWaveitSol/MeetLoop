import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'theme.dart';
import 'screens/onboarding_auth_screen.dart';
import 'screens/dashboard_explore_screen.dart';
import 'screens/social_nearby_screen.dart';
import 'screens/chat_screen.dart';
import 'screens/couple_timeline_screen.dart';
import 'screens/games_travel_screen.dart';
import 'screens/profile_settings_screen.dart';

// Riverpod Theme Provider for real-time dark/light mode toggle
final themeModeProvider = StateProvider<ThemeMode>((ref) => ThemeMode.dark);

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    const ProviderScope(
      child: MeetLoopApp(),
    ),
  );
}

class MeetLoopApp extends ConsumerWidget {
  const MeetLoopApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeModeProvider);

    // GoRouter configuration for smooth screen-to-screen routing
    final GoRouter router = GoRouter(
      initialLocation: '/',
      routes: [
        // 1. Onboarding & Gateways
        GoRoute(
          path: '/',
          builder: (context, state) => const SplashScreen(),
        ),
        GoRoute(
          path: '/onboarding',
          builder: (context, state) => const OnboardingScreen(),
        ),
        GoRoute(
          path: '/login',
          builder: (context, state) => const LoginScreen(),
        ),
        
        // 2. Main Shell Route (With integrated Bottom Navigation)
        ShellRoute(
          builder: (context, state, child) {
            return MainNavigationShell(child: child);
          },
          routes: [
            GoRoute(
              path: '/home',
              builder: (context, state) => const DashboardExploreScreen(tab: 'home'),
            ),
            GoRoute(
              path: '/explore',
              builder: (context, state) => const DashboardExploreScreen(tab: 'explore'),
            ),
            GoRoute(
              path: '/friends',
              builder: (context, state) => const DashboardExploreScreen(tab: 'friends'),
            ),
            GoRoute(
              path: '/nearby',
              builder: (context, state) => const SocialNearbyScreen(tab: 'nearby'),
            ),
            GoRoute(
              path: '/events',
              builder: (context, state) => const SocialNearbyScreen(tab: 'events'),
            ),
            GoRoute(
              path: '/map',
              builder: (context, state) => const SocialNearbyScreen(tab: 'map'),
            ),
            GoRoute(
              path: '/chats',
              builder: (context, state) => const ChatListScreen(),
            ),
            GoRoute(
              path: '/chats/:id',
              builder: (context, state) {
                final chatId = state.pathParameters['id'] ?? 'c1';
                return IndividualChatScreen(chatId: chatId);
              },
            ),
            GoRoute(
              path: '/couple',
              builder: (context, state) => const CoupleTimelineScreen(tab: 'couple'),
            ),
            GoRoute(
              path: '/memories',
              builder: (context, state) => const CoupleTimelineScreen(tab: 'memories'),
            ),
            GoRoute(
              path: '/games',
              builder: (context, state) => const GamesTravelScreen(tab: 'games'),
            ),
            GoRoute(
              path: '/travel',
              builder: (context, state) => const GamesTravelScreen(tab: 'travel'),
            ),
            GoRoute(
              path: '/profile',
              builder: (context, state) => const ProfileSettingsScreen(tab: 'profile'),
            ),
            GoRoute(
              path: '/edit-profile',
              builder: (context, state) => const ProfileSettingsScreen(tab: 'edit_profile'),
            ),
            GoRoute(
              path: '/notifications',
              builder: (context, state) => const ProfileSettingsScreen(tab: 'notifications'),
            ),
            GoRoute(
              path: '/settings',
              builder: (context, state) => const ProfileSettingsScreen(tab: 'settings'),
            ),
          ],
        ),
      ],
    );

    return MaterialApp.router(
      title: 'MeetLoop',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: themeMode,
      routerConfig: router,
    );
  }
}

// Layout Shell matching the Apple/Spotify styled bottom bar
class MainNavigationShell extends ConsumerWidget {
  final Widget child;
  const MainNavigationShell({super.key, required this.child});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final currentPath = GoRouterState.of(context).uri.toString();

    int getSelectedIndex() {
      if (currentPath.startsWith('/home') || currentPath.startsWith('/explore') || currentPath.startsWith('/friends')) return 0;
      if (currentPath.startsWith('/nearby') || currentPath.startsWith('/map')) return 1;
      if (currentPath.startsWith('/chats')) return 2;
      if (currentPath.startsWith('/events') || currentPath.startsWith('/games') || currentPath.startsWith('/travel')) return 3;
      if (currentPath.startsWith('/profile') || currentPath.startsWith('/settings')) return 4;
      return 0;
    }

    void onTabSelected(int index) {
      switch (index) {
        case 0:
          context.go('/home');
          break;
        case 1:
          context.go('/nearby');
          break;
        case 2:
          context.go('/chats');
          break;
        case 3:
          context.go('/events');
          break;
        case 4:
          context.go('/profile');
          break;
      }
    }

    return Scaffold(
      body: child,
      bottomNavigationBar: Container(
        height: 80,
        decoration: BoxDecoration(
          color: isDark ? AppTheme.backgroundDark.withOpacity(0.95) : Colors.white.withOpacity(0.95),
          border: Border(
            top: BorderSide(
              color: isDark ? Colors.white.withOpacity(0.08) : Colors.black.withOpacity(0.04),
              width: 1,
            ),
          ),
        ),
        child: ClipRRect(
          child: BottomNavigationBar(
            currentIndex: getSelectedIndex(),
            onTap: onTabSelected,
            type: BottomNavigationBarType.fixed,
            backgroundColor: Colors.transparent,
            elevation: 0,
            selectedItemColor: AppTheme.primary,
            unselectedItemColor: Colors.grey,
            selectedFontSize: 9,
            unselectedFontSize: 9,
            selectedLabelStyle: const TextStyle(fontWeight: FontWeight.w800, letterSpacing: 0.5),
            unselectedLabelStyle: const TextStyle(fontWeight: FontWeight.w500),
            items: const [
              BottomNavigationBarItem(
                icon: Icon(Icons.home_outlined),
                activeIcon: Icon(Icons.home),
                label: 'HOME',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.location_on_outlined),
                activeIcon: Icon(Icons.location_on),
                label: 'NEARBY',
              ),
              BottomNavigationBarItem(
                icon: Badge(
                  label: Text('3', style: TextStyle(fontSize: 8)),
                  child: Icon(Icons.chat_bubble_outline),
                ),
                activeIcon: Icon(Icons.chat_bubble),
                label: 'CHATS',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.calendar_today_outlined),
                activeIcon: Icon(Icons.calendar_today),
                label: 'EVENTS',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.person_outline),
                activeIcon: Icon(Icons.person),
                label: 'PROFILE',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
