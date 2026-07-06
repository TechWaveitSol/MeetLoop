export const FLUTTER_CODE_SNIPPETS: Record<string, string> = {
  pubspec: `name: meetloop
description: "A premium social connection and interactive hub platform for MeetLoop."
publish_to: 'none'

version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter

  # State Management & DI
  flutter_riverpod: ^2.5.1
  riverpod_annotation: ^2.3.3

  # Routing & Navigation
  go_router: ^14.0.1

  # Animation & Motion
  flutter_animate: ^4.5.0
  lottie: ^3.1.0
  rive: ^0.13.0
  flutter_staggered_animations: ^1.0.0

  # Iconography
  hugeicons: ^1.2.0
  phosphor_flutter: ^2.1.0
  lucide_icons_flutter: ^1.0.0

  # Images & UI Utilities
  cached_network_image: ^3.3.1
  shimmer: ^3.0.0
  flutter_svg: ^2.0.10.1
  google_fonts: ^6.1.0

  # Native Hardware & Map Utilities
  google_maps_flutter: ^2.5.3
  image_picker: ^1.0.7
  camera: ^0.10.5+9
  permission_handler: ^11.3.1
  geolocator: ^11.0.0
  geocoding: ^3.0.0

  # Networking & Helpers
  dio: ^5.4.0
  uuid: ^4.3.3
  intl: ^0.19.0
  connectivity_plus: ^5.0.2

  # Local Persistence
  isar: ^3.1.0+1
  isar_generator: ^3.1.0+1
  path_provider: ^2.1.2

  # Cupertino Design Assets
  cupertino_icons: ^1.0.6

dev_dependencies:
  flutter_test:
    sdk: flutter

  # Code Generation
  build_runner: ^2.4.8
  riverpod_generator: ^2.3.9
  freezed: ^2.4.7
  json_serializable: ^6.7.1

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/lottie/`,

  theme: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Brand Colors
  static const Color primary = Color(0xFF6C63FF);
  static const Color secondary = Color(0xFF8B5CF6);
  static const Color accent = Color(0xFFFF6B8A);
  static const Color mint = Color(0xFF34D399);
  
  static const Color bgLight = Color(0xFFF8FAFC);
  static const Color bgDark = Color(0xFF0F172A);
  
  static const Color cardLight = Colors.white;
  static const Color cardDark = Color(0xFF1E293B);

  // Modern Border Radius (Large 24px)
  static const double borderRadius = 24.0;
  static final BorderRadius roundedGeometry = BorderRadius.circular(borderRadius);

  // Light Theme Configuration
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      primaryColor: primary,
      scaffoldBackgroundColor: bgLight,
      colorScheme: const ColorScheme.light(
        primary: primary,
        secondary: secondary,
        tertiary: accent,
        surface: cardLight,
        background: bgLight,
        onPrimary: Colors.white,
      ),
      textTheme: GoogleFonts.interTextTheme(ThemeData.light().textTheme).copyWith(
        displayLarge: GoogleFonts.manrope(fontWeight: FontWeight.w800, color: bgDark),
        headlineMedium: GoogleFonts.manrope(fontWeight: FontWeight.w700, color: bgDark),
        titleLarge: GoogleFonts.manrope(fontWeight: FontWeight.w600, color: bgDark),
        bodyLarge: GoogleFonts.inter(fontWeight: FontWeight.normal, color: Colors.slate[800]),
      ),
      cardTheme: CardTheme(
        color: cardLight,
        elevation: 2,
        shadowColor: Colors.black.withOpacity(0.04),
        shape: RoundedRectangleBorder(borderRadius: roundedGeometry),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: bgLight,
        elevation: 0,
        iconTheme: const IconThemeData(color: bgDark),
        titleTextStyle: GoogleFonts.manrope(
          color: bgDark,
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  // Dark Theme Configuration
  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      primaryColor: primary,
      scaffoldBackgroundColor: bgDark,
      colorScheme: const ColorScheme.dark(
        primary: primary,
        secondary: secondary,
        tertiary: accent,
        surface: cardDark,
        background: bgDark,
        onPrimary: Colors.white,
      ),
      textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme).copyWith(
        displayLarge: GoogleFonts.manrope(fontWeight: FontWeight.w800, color: Colors.white),
        headlineMedium: GoogleFonts.manrope(fontWeight: FontWeight.w700, color: Colors.white),
        titleLarge: GoogleFonts.manrope(fontWeight: FontWeight.w600, color: Colors.white),
        bodyLarge: GoogleFonts.inter(fontWeight: FontWeight.normal, color: Colors.slate[200]),
      ),
      cardTheme: CardTheme(
        color: cardDark,
        elevation: 4,
        shadowColor: Colors.black.withOpacity(0.2),
        shape: RoundedRectangleBorder(borderRadius: roundedGeometry),
      ),
      appBarTheme: AppBarTheme(
        backgroundColor: bgDark,
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.white),
        titleTextStyle: GoogleFonts.manrope(
          color: Colors.white,
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  // Glassmorphic Card Decoration Helper
  static BoxDecoration glassDecoration({
    required bool isDarkMode,
    BorderRadius? radius,
  }) {
    return BoxDecoration(
      color: isDarkMode 
          ? Colors.white.withOpacity(0.05) 
          : Colors.white.withOpacity(0.6),
      borderRadius: radius ?? roundedGeometry,
      border: Border.all(
        color: isDarkMode 
            ? Colors.white.withOpacity(0.08) 
            : Colors.white.withOpacity(0.2),
        width: 1.5,
      ),
      boxShadow: [
        BoxShadow(
          color: Colors.black.withOpacity(isDarkMode ? 0.25 : 0.05),
          blurRadius: 20,
          offset: const Offset(0, 10),
        ),
      ],
    );
  }
}`,

  main: `import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'theme.dart';
import 'screens/dashboard_screen.dart';
import 'screens/nearby_swipe_screen.dart';
import 'screens/chat_screen.dart';
import 'screens/games_travel_screen.dart';
import 'screens/couple_space_screen.dart';
import 'screens/profile_screen.dart';

// State provider for dark mode
final themeProvider = StateProvider<bool>((ref) => true);

// Auth state provider (to simulate login redirect)
final authStateProvider = StateProvider<bool>((ref) => false);

void main() {
  runApp(
    const ProviderScope(
      child: MeetLoopApp(),
    ),
  );
}

class MeetLoopApp extends ConsumerWidget {
  const MeetLoopApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDarkMode = ref.watch(themeProvider);
    
    final GoRouter router = GoRouter(
      initialLocation: '/splash',
      redirect: (context, state) {
        final loggedIn = ref.read(authStateProvider);
        final isGoingToAuth = state.matchedLocation.startsWith('/auth') || 
                              state.matchedLocation == '/splash' || 
                              state.matchedLocation == '/onboarding';

        if (!loggedIn && !isGoingToAuth) {
          return '/auth/login';
        }
        if (loggedIn && isGoingToAuth) {
          return '/home';
        }
        return null;
      },
      routes: [
        GoRoute(
          path: '/splash',
          builder: (context, state) => const SplashScreen(),
        ),
        GoRoute(
          path: '/onboarding',
          builder: (context, state) => const OnboardingScreen(),
        ),
        GoRoute(
          path: '/auth/login',
          builder: (context, state) => const LoginScreen(),
        ),
        GoRoute(
          path: '/auth/signup',
          builder: (context, state) => const SignUpScreen(),
        ),
        GoRoute(
          path: '/auth/forgot',
          builder: (context, state) => const ForgotPasswordScreen(),
        ),
        GoRoute(
          path: '/auth/otp',
          builder: (context, state) => const OtpScreen(),
        ),
        // Shell navigation routes
        ShellRoute(
          builder: (context, state, child) => MainShellLayout(child: child),
          routes: [
            GoRoute(
              path: '/home',
              builder: (context, state) => const DashboardScreen(),
            ),
            GoRoute(
              path: '/explore',
              builder: (context, state) => const ExploreScreen(),
            ),
            GoRoute(
              path: '/friends',
              builder: (context, state) => const FriendsScreen(),
            ),
            GoRoute(
              path: '/nearby',
              builder: (context, state) => const SwipeConnectionScreen(),
            ),
            GoRoute(
              path: '/radar-map',
              builder: (context, state) => const RadarMapScreen(),
            ),
            GoRoute(
              path: '/chats',
              builder: (context, state) => const ChatListScreen(),
              routes: [
                GoRoute(
                  path: 'chat/:id',
                  builder: (context, state) {
                    final chatId = state.pathParameters['id'] ?? 'c1';
                    return InteractiveChatScreen(chatId: chatId);
                  },
                ),
              ],
            ),
            GoRoute(
              path: '/events',
              builder: (context, state) => const NearbyEventsScreen(),
            ),
            GoRoute(
              path: '/games',
              builder: (context, state) => const GamesLobbyScreen(),
            ),
            GoRoute(
              path: '/travel',
              builder: (context, state) => const TravelPlannerScreen(),
            ),
            GoRoute(
              path: '/couple-space',
              builder: (context, state) => const CoupleSpaceScreen(),
            ),
            GoRoute(
              path: '/profile',
              builder: (context, state) => const ProfileScreen(),
            ),
            GoRoute(
              path: '/edit-profile',
              builder: (context, state) => const EditProfileScreen(),
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
      themeMode: isDarkMode ? ThemeMode.dark : ThemeMode.light,
      routerConfig: router,
    );
  }
}

class MainShellLayout extends ConsumerWidget {
  final Widget child;
  const MainShellLayout({Key? key, required this.child}) : super(key: key);

  int _getSelectedIndex(String location) {
    if (location.startsWith('/home') || location.startsWith('/explore') || location.startsWith('/friends')) return 0;
    if (location.startsWith('/nearby') || location.startsWith('/radar-map')) return 1;
    if (location.startsWith('/chats')) return 2;
    if (location.startsWith('/events') || location.startsWith('/games') || location.startsWith('/travel')) return 3;
    if (location.startsWith('/profile') || location.startsWith('/edit-profile')) return 4;
    return 0;
  }

  void _onItemTapped(int index, BuildContext context) {
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

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final GoRouterState routerState = GoRouterState.of(context);
    final String location = routerState.matchedLocation;
    final int selectedIndex = _getSelectedIndex(location);

    return Scaffold(
      body: child,
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          border: Border(
            top: BorderSide(
              color: Theme.of(context).brightness == Brightness.dark
                  ? Colors.white.withOpacity(0.08)
                  : Colors.slate[200]!,
              width: 1,
            ),
          ),
        ),
        child: BottomNavigationBar(
          currentIndex: selectedIndex,
          onTap: (index) => _onItemTapped(index, context),
          type: BottomNavigationBarType.fixed,
          selectedItemColor: AppTheme.primary,
          unselectedItemColor: Colors.slate[400],
          selectedLabelStyle: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
          unselectedLabelStyle: const TextStyle(fontSize: 10),
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.home_outlined), activeIcon: Icon(Icons.home), label: 'Home'),
            BottomNavigationBarItem(icon: Icon(Icons.map_outlined), activeIcon: Icon(Icons.map), label: 'Nearby'),
            BottomNavigationBarItem(icon: Icon(Icons.chat_bubble_outline), activeIcon: Icon(Icons.chat_bubble), label: 'Chats'),
            BottomNavigationBarItem(icon: Icon(Icons.calendar_today_outlined), activeIcon: Icon(Icons.calendar_today), label: 'Events'),
            BottomNavigationBarItem(icon: Icon(Icons.person_outline), activeIcon: Icon(Icons.person), label: 'Profile'),
          ],
        ),
      ),
    );
  }
}

class ExploreScreen extends StatelessWidget {
  const ExploreScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Explore Hub')));
}

class FriendsScreen extends StatelessWidget {
  const FriendsScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Friends Screen')));
}

class RadarMapScreen extends StatelessWidget {
  const RadarMapScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Radar Map Screen')));
}

class EditProfileScreen extends StatelessWidget {
  const EditProfileScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Edit Profile Screen')));
}

class NearbyEventsScreen extends StatelessWidget {
  const NearbyEventsScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) => const Scaffold(body: Center(child: Text('Nearby Events Screen')));
}`,

  auth: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../theme.dart';
import '../main.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [AppTheme.primary, AppTheme.secondary],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(32),
                ),
                child: const Icon(Icons.favorite, size: 72, color: Colors.white),
              ).animate().scale(duration: 500.ms, curve: Curves.bounceOut),
              const SizedBox(height: 24),
              const Text(
                'MeetLoop',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                  letterSpacing: -0.5,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Instant social orbits and games',
                style: TextStyle(
                  color: Colors.white.withOpacity(0.8),
                  fontSize: 14,
                ),
              ),
              const SizedBox(height: 48),
              ElevatedButton(
                onPressed: () => context.go('/onboarding'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white,
                  foregroundColor: AppTheme.primary,
                  padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                child: const Text('Get Started', style: TextStyle(fontWeight: FontWeight.bold)),
              )
            ],
          ),
        ),
      ),
    );
  }
}

class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Align(
                alignment: Alignment.topRight,
                child: TextButton(
                  onPressed: () => context.go('/auth/login'),
                  child: const Text('Skip', style: TextStyle(color: AppTheme.primary)),
                ),
              ),
              Column(
                children: [
                  const Icon(Icons.explore_outlined, size: 120, color: AppTheme.primary)
                      .animate()
                      .shake(delay: 200.ms),
                  const SizedBox(height: 40),
                  const Text(
                    'Discover Nearby Hearts',
                    style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Instantly discover, connect, and challenge local peers. Play real-time tabletop matches or travel together.',
                    textAlign: TextAlign.center,
                    style: TextStyle(color: Colors.grey[600], fontSize: 14, height: 1.5),
                  ),
                ],
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(width: 20, height: 8, decoration: BoxDecoration(color: AppTheme.primary, borderRadius: BorderRadius.circular(4))),
                      const SizedBox(width: 6),
                      Container(width: 8, height: 8, decoration: BoxDecoration(color: Colors.grey[300], borderRadius: BorderRadius.circular(4))),
                      const SizedBox(width: 6),
                      Container(width: 8, height: 8, decoration: BoxDecoration(color: Colors.grey[300], borderRadius: BorderRadius.circular(4))),
                    ],
                  ),
                  FloatingActionButton(
                    onPressed: () => context.go('/auth/login'),
                    backgroundColor: AppTheme.primary,
                    child: const Icon(Icons.arrow_forward, color: Colors.white),
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}

class LoginScreen extends ConsumerWidget {
  const LoginScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Icon(Icons.favorite, size: 64, color: AppTheme.primary),
              const SizedBox(height: 16),
              const Text('Welcome Back', textAlign: TextAlign.center, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
              const SizedBox(height: 32),
              TextField(
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.email_outlined),
                  labelText: 'Email Address',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                obscureText: true,
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.lock_outline),
                  labelText: 'Password',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                ),
              ),
              const SizedBox(height: 12),
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () => context.go('/auth/forgot'),
                  child: const Text('Forgot Password?', style: TextStyle(color: AppTheme.primary)),
                ),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: () {
                  ref.read(authStateProvider.notifier).state = true;
                  context.go('/home');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.primary,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                child: const Text('Login Instantly', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('New to MeetLoop? '),
                  TextButton(
                    onPressed: () => context.go('/auth/signup'),
                    child: const Text('Sign Up', style: TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}

class SignUpScreen extends StatelessWidget {
  const SignUpScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text('Create Account', textAlign: TextAlign.center, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
              const SizedBox(height: 32),
              TextField(
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.person_outline),
                  labelText: 'Full Name',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.email_outlined),
                  labelText: 'Email Address',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                obscureText: true,
                decoration: InputDecoration(
                  prefixIcon: const Icon(Icons.lock_outline),
                  labelText: 'Create Password',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                ),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: () => context.go('/auth/otp'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.primary,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                child: const Text('Sign Up', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class ForgotPasswordScreen extends StatelessWidget {
  const ForgotPasswordScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(leading: IconButton(icon: const Icon(Icons.arrow_back), onPressed: () => context.go('/auth/login'))),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text('Reset Password', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            const Text('Enter your registered email and we will send a password reset token.'),
            const SizedBox(height: 32),
            TextField(
              decoration: InputDecoration(
                prefixIcon: const Icon(Icons.email_outlined),
                labelText: 'Email Address',
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
              ),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => context.go('/auth/login'),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.primary,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              child: const Text('Send Reset Link'),
            )
          ],
        ),
      ),
    );
  }
}

class OtpScreen extends StatelessWidget {
  const OtpScreen({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text('Enter Verification Code', textAlign: TextAlign.center, style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            const Text('We sent a 4-digit code to your email inbox.', textAlign: TextAlign.center),
            const SizedBox(height: 32),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: List.generate(4, (index) => SizedBox(
                width: 60,
                child: TextField(
                  textAlign: TextAlign.center,
                  keyboardType: TextInputType.number,
                  maxLength: 1,
                  decoration: InputDecoration(
                    counterText: '',
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                  ),
                ),
              )),
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: () => context.go('/auth/login'),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.primary,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              child: const Text('Verify & Finish'),
            )
          ],
        ),
      ),
    );
  }
}`,

  dashboard: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import '../theme.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final bool isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 18.0, vertical: 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Good Morning,',
                        style: TextStyle(
                          fontSize: 13,
                          color: Colors.grey[500],
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      const Text(
                        'Arjun Reddy',
                        style: TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                    ],
                  ),
                  Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: AppTheme.primary, width: 2),
                      image: const DecorationImage(
                        image: NetworkImage(
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
                        ),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                ],
              ).animate().fadeIn(duration: 500.ms).slideY(begin: -0.2),

              const SizedBox(height: 24),

              // Stories Carousel
              SizedBox(
                height: 90,
                child: ListView(
                  scrollDirection: Axis.horizontal,
                  physics: const BouncingScrollPhysics(),
                  children: [
                    _buildStoryItem('Your Story', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', true),
                    _buildStoryItem('Ananya', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', false, isLive: true),
                    _buildStoryItem('Rohan', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', false),
                    _buildStoryItem('Pooja', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=100', false),
                    _buildStoryItem('Neha', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100', false),
                  ],
                ),
              ).animate().fadeIn(delay: 200.ms),

              const SizedBox(height: 24),

              // Core Bento Grid
              Text(
                'EXPLORE ORBITS',
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.extrabold,
                  letterSpacing: 1.5,
                  color: Colors.grey[500],
                ),
              ),
              const SizedBox(height: 12),

              // Bento Items
              GridView.count(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                crossAxisCount: 2,
                crossAxisSpacing: 14,
                mainAxisSpacing: 14,
                childAspectRatio: 1.25,
                children: [
                  _buildBentoItem(
                    context,
                    title: 'Swipe & Match',
                    subtitle: 'Find nearby connections',
                    icon: Icons.swipe,
                    gradient: const [Color(0xFF6C63FF), Color(0xFF8B5CF6)],
                    onTap: () => context.go('/nearby'),
                  ),
                  _buildBentoItem(
                    context,
                    title: 'Radar Map',
                    subtitle: 'Local peers scanning',
                    icon: Icons.radar,
                    gradient: const [Color(0xFFFF6B8A), Color(0xFFFF8E53)],
                    onTap: () => context.go('/radar-map'),
                  ),
                  _buildBentoItem(
                    context,
                    title: 'Games Arena',
                    subtitle: 'Challenge friends',
                    icon: Icons.sports_esports,
                    gradient: const [Color(0xFF34D399), Color(0xFF059669)],
                    onTap: () => context.go('/games'),
                  ),
                  _buildBentoItem(
                    context,
                    title: 'Travel Partner',
                    subtitle: 'Map out road trips',
                    icon: Icons.flight_takeoff,
                    gradient: const [Color(0xFF0EA5E9), Color(0xFF2563EB)],
                    onTap: () => context.go('/travel'),
                  ),
                ],
              ).animate().fadeIn(delay: 400.ms),

              const SizedBox(height: 24),

              // Couple Goal Milestones Alert Box
              GestureDetector(
                onTap: () => context.go('/couple-space'),
                child: Container(
                  padding: const EdgeInsets.all(18),
                  decoration: AppTheme.glassDecoration(isDarkMode: isDarkMode),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: AppTheme.accent.withOpacity(0.15),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.favorite, color: AppTheme.accent),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Private Space active!',
                              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              '12 Day Streak with Pooja Reddy. Keep it glowing!',
                              style: TextStyle(fontSize: 11, color: Colors.grey[500]),
                            ),
                          ],
                        ),
                      ),
                      const Icon(Icons.chevron_right, color: Colors.grey),
                    ],
                  ),
                ),
              ).animate().fadeIn(delay: 500.ms).slideY(begin: 0.1),

              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStoryItem(String name, String imageUrl, bool isMe, {bool isLive = false}) {
    return Padding(
      padding: const EdgeInsets.only(right: 14.0),
      child: Column(
        children: [
          Stack(
            children: [
              Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: isMe 
                        ? Colors.grey[300]! 
                        : isLive ? AppTheme.accent : AppTheme.primary,
                    width: 2.5,
                  ),
                  image: DecorationImage(
                    image: NetworkImage(imageUrl),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              if (isMe)
                Positioned(
                  bottom: 0,
                  right: 0,
                  child: Container(
                    padding: const EdgeInsets.all(2),
                    decoration: const BoxDecoration(color: AppTheme.primary, shape: BoxShape.circle),
                    child: const Icon(Icons.add, size: 14, color: Colors.white),
                  ),
                ),
              if (isLive)
                Positioned(
                  top: 0,
                  right: 0,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1.5),
                    decoration: BoxDecoration(color: AppTheme.accent, borderRadius: BorderRadius.circular(6)),
                    child: const Text('LIVE', style: TextStyle(color: Colors.white, fontSize: 7, fontWeight: FontWeight.bold)),
                  ),
                ),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            name,
            style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }

  Widget _buildBentoItem(
    BuildContext context, {
    required String title,
    required String subtitle,
    required IconData icon,
    required List<Color> gradient,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: gradient,
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          borderRadius: BorderRadius.circular(24),
          boxShadow: [
            BoxShadow(
              color: gradient[0].withOpacity(0.3),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, size: 28, color: Colors.white),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                  ),
                ),
                Text(
                  subtitle,
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.75),
                    fontSize: 9,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}`,

  nearby: `import 'package:flutter/material.dart';
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
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              children: [
                Expanded(
                  child: Stack(
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(28),
                        child: Stack(
                          fit: StackFit.expand,
                          children: [
                            Image.network(
                              profile['image'],
                              fit: BoxFit.cover,
                            ),
                            Container(
                              decoration: const BoxDecoration(
                                gradient: LinearGradient(
                                  colors: [Colors.transparent, Colors.black87],
                                  begin: Alignment.center,
                                  end: Alignment.bottomCenter,
                                ),
                              ),
                            ),
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
                                      '\${profile[\'matchScore\']}% MATCH',
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
                                        '\${profile[\'name\']}, \${profile[\'age\']}',
                                        style: const TextStyle(
                                          color: Colors.white,
                                          fontSize: 24,
                                          fontWeight: FontWeight.w800,
                                        ),
                                      ),
                                      const SizedBox(width: 6),
                                      const Icon(Icons.verified, color: Colors.sky, size: 20),
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
                      'You and \${profile[\'name\']} liked each other.',
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
}`,

  chat: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../theme.dart';

class ChatListScreen extends StatelessWidget {
  const ChatListScreen({Key? key}) : super(key: key);

  final List<Map<String, dynamic>> _mockChats = const [
    {
      'id': 'c1',
      'name': 'Ananya',
      'avatar': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
      'lastMsg': 'Hey Arjun! Wanna play Chess tonight?',
      'time': 'Just now',
      'unread': true,
    },
    {
      'id': 'c2',
      'name': 'Rohan',
      'avatar': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
      'lastMsg': 'Tic Tac Toe rematch whenever you are free!',
      'time': '12m ago',
      'unread': false,
    },
    {
      'id': 'c3',
      'name': 'Pooja',
      'avatar': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=100',
      'lastMsg': 'Our sunset hiking route is finalized! 🧭⛰️',
      'time': '1h ago',
      'unread': true,
    }
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Inbox Orbit'),
        centerTitle: false,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
        itemCount: _mockChats.length,
        itemBuilder: (context, index) {
          final chat = _mockChats[index];
          return GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => InteractiveChatScreen(chatId: chat['id']),
                ),
              );
            },
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 8.0),
              child: Container(
                padding: const EdgeInsets.all(12),
                decoration: AppTheme.glassDecoration(
                  isDarkMode: Theme.of(context).brightness == Brightness.dark,
                ),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 24,
                      backgroundImage: NetworkImage(chat['avatar']),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                chat['name'],
                                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
                              ),
                              Text(
                                chat['time'],
                                style: TextStyle(color: Colors.grey[400], fontSize: 9),
                              ),
                            ],
                          ),
                          const SizedBox(height: 4),
                          Text(
                            chat['lastMsg'],
                            style: TextStyle(
                              fontSize: 11,
                              color: chat['unread'] ? AppTheme.primary : Colors.grey[500],
                              fontWeight: chat['unread'] ? FontWeight.bold : FontWeight.normal,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                    if (chat['unread'])
                      Container(
                        margin: const EdgeInsets.only(left: 8),
                        width: 8,
                        height: 8,
                        decoration: const BoxDecoration(
                          color: AppTheme.primary,
                          shape: BoxShape.circle,
                        ),
                      )
                  ],
                ),
              ),
            ).animate().fadeIn(delay: (index * 100).ms),
          );
        },
      ),
    );
  }
}

class InteractiveChatScreen extends StatefulWidget {
  final String chatId;
  const InteractiveChatScreen({Key? key, required this.chatId}) : super(key: key);

  @override
  State<InteractiveChatScreen> createState() => _InteractiveChatScreenState();
}

class _InteractiveChatScreenState extends State<InteractiveChatScreen> {
  final List<Map<String, dynamic>> _messages = [
    {'text': 'Hey Arjun! Let\'s synchronize our locations today', 'isMe': false},
    {'text': 'Sounds like a master plan! Sunset hiking or chess arena first?', 'isMe': true},
    {'text': 'Let\'s definitely do the chess challenge first. Prepare to lose! ♟️👑', 'isMe': false},
  ];

  final TextEditingController _msgController = TextEditingController();

  void _sendMessage() {
    if (_msgController.text.trim().isEmpty) return;
    setState(() {
      _messages.add({
        'text': _msgController.text,
        'isMe': true,
      });
      _msgController.clear();
    });

    Future.delayed(const Duration(seconds: 1), () {
      if (mounted) {
        setState(() {
          _messages.add({
            'text': 'Haha challenge accepted! Let\'s lock in the schedule now. 🧭',
            'isMe': false,
          });
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            const CircleAvatar(
              radius: 16,
              backgroundImage: NetworkImage('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Ananya', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                Text('Active 3m ago', style: TextStyle(fontSize: 9, color: Colors.grey[400])),
              ],
            ),
          ],
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              reverse: false,
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                return Align(
                  alignment: msg['isMe'] ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.symmetric(vertical: 6),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    decoration: BoxDecoration(
                      color: msg['isMe'] 
                          ? AppTheme.primary 
                          : Theme.of(context).brightness == Brightness.dark 
                              ? Colors.slate[800] 
                              : Colors.slate[200],
                      borderRadius: BorderRadius.only(
                        topLeft: const Radius.circular(20),
                        topRight: const Radius.circular(20),
                        bottomLeft: msg['isMe'] ? const Radius.circular(20) : const Radius.circular(4),
                        bottomRight: msg['isMe'] ? const Radius.circular(4) : const Radius.circular(20),
                      ),
                    ),
                    child: Text(
                      msg['text'],
                      style: TextStyle(
                        fontSize: 13,
                        color: msg['isMe'] ? Colors.white : null,
                      ),
                    ),
                  ).animate().scale(alignment: msg['isMe'] ? Alignment.centerRight : Alignment.centerLeft, duration: 150.ms),
                );
              },
            ),
          ),

          Container(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: [
                  _buildSmartReply('I\'m on my way! 🚗'),
                  _buildSmartReply('Let\'s play! ♟️'),
                  _buildSmartReply('Send coordinates 📍'),
                ],
              ),
            ),
          ),

          SafeArea(
            child: Padding(
              padding: const EdgeInsets.only(left: 16, right: 16, bottom: 12, top: 4),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _msgController,
                      style: const TextStyle(fontSize: 13),
                      decoration: InputDecoration(
                        hintText: 'Type messages...',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(24),
                          borderSide: BorderSide.none,
                        ),
                        filled: true,
                        fillColor: Theme.of(context).brightness == Brightness.dark 
                            ? Colors.slate[800] 
                            : Colors.slate[100],
                        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  GestureDetector(
                    onTap: _sendMessage,
                    child: Container(
                      padding: const EdgeInsets.all(12),
                      decoration: const BoxDecoration(
                        color: AppTheme.primary,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.send, size: 18, color: Colors.white),
                    ),
                  )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSmartReply(String text) {
    return GestureDetector(
      onTap: () {
        setState(() {
          _messages.add({'text': text, 'isMe': true});
        });
      },
      child: Container(
        margin: const EdgeInsets.only(right: 8),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          border: Border.all(color: Colors.grey.withOpacity(0.3)),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Text(
          text,
          style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}`,

  couple: `import 'package:flutter/material.dart';
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
            child: Image.network(imageUrl, fit: BoxFit.cover),
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
}`,

  games: `import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../theme.dart';

class GamesLobbyScreen extends StatefulWidget {
  const GamesLobbyScreen({Key? key}) : super(key: key);

  @override
  State<GamesLobbyScreen> createState() => _GamesLobbyScreenState();
}

class _GamesLobbyScreenState extends State<GamesLobbyScreen> {
  List<String?> _board = List.generate(9, (_) => null);
  bool _isPlayerTurn = true;
  String? _winnerMessage;

  void _resetGame() {
    setState(() {
      _board = List.generate(9, (_) => null);
      _isPlayerTurn = true;
      _winnerMessage = null;
    });
  }

  String? _checkWinner(List<String?> s) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (var line in lines) {
      if (s[line[0]] != null && s[line[0]] == s[line[1]] && s[line[0]] == s[line[2]]) {
        return s[line[0]];
      }
    }
    if (s.every((element) => element != null)) {
      return 'Draw';
    }
    return null;
  }

  void _makeMove(int index) {
    if (_board[index] != null || _winnerMessage != null || !_isPlayerTurn) return;

    setState(() {
      _board[index] = '❌';
      final win = _checkWinner(_board);
      if (win != null) {
        _winnerMessage = win == 'Draw' ? "It's a draw! 🤝" : "Winner is: ❌";
        return;
      }
      _isPlayerTurn = false;
    });

    Future.delayed(const Duration(milliseconds: 600), () {
      if (!mounted) return;
      final emptyIndices = <int>[];
      for (var i = 0; i < 9; i++) {
        if (_board[i] == null) emptyIndices.add(i);
      }
      if (emptyIndices.isNotEmpty) {
        final rIndex = (emptyIndices..shuffle()).first;
        setState(() {
          _board[rIndex] = '⭕️';
          final win = _checkWinner(_board);
          if (win != null) {
            _winnerMessage = win == 'Draw' ? "It's a draw! 🤝" : "Winner is: ⭕️";
          } else {
            _isPlayerTurn = true;
          }
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final bool isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(title: const Text('Games Arenas')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(18.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: Colors.slate[900],
                borderRadius: BorderRadius.circular(24),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        '🏆 Global Ranking Score',
                        style: TextStyle(color: Colors.amber, fontWeight: FontWeight.bold, fontSize: 10),
                      ),
                      const SizedBox(height: 6),
                      const Text(
                        'Chess Master Tier',
                        style: TextStyle(color: Colors.white, fontWeight: FontWeight.w800, fontSize: 15),
                      ),
                      Text('1,480 Arena Score', style: TextStyle(color: Colors.grey[500], fontSize: 11)),
                    ],
                  ),
                  const Text('82%', style: TextStyle(color: AppTheme.mint, fontSize: 24, fontWeight: FontWeight.w900)),
                ],
              ),
            ).animate().fadeIn(),

            const SizedBox(height: 24),

            Container(
              padding: const EdgeInsets.all(16),
              decoration: AppTheme.glassDecoration(isDarkMode: isDarkMode),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Casual Arena: Tic Tac Toe', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                      TextButton(onPressed: _resetGame, child: const Text('Reset', style: TextStyle(fontSize: 11))),
                    ],
                  ),
                  const SizedBox(height: 12),
                  GridView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 3,
                      crossAxisSpacing: 8,
                      mainAxisSpacing: 8,
                    ),
                    itemCount: 9,
                    itemBuilder: (context, index) {
                      return GestureDetector(
                        onTap: () => _makeMove(index),
                        child: Container(
                          decoration: BoxDecoration(
                            color: isDarkMode ? Colors.slate[800] : Colors.slate[100],
                            borderRadius: BorderRadius.circular(16),
                          ),
                          child: Center(
                            child: Text(
                              _board[index] ?? '',
                              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 12),
                  Text(
                    _winnerMessage ?? (_isPlayerTurn ? "Your turn (❌)" : "Opponent planning... (⭕️)"),
                    style: const TextStyle(fontSize: 11, fontFamily: 'monospace'),
                  ),
                ],
              ),
            ).animate().fadeIn(delay: 200.ms),
          ],
        ),
      ),
    );
  }
}

class TravelPlannerScreen extends StatefulWidget {
  const TravelPlannerScreen({Key? key}) : super(key: key);

  @override
  State<TravelPlannerScreen> createState() => _TravelPlannerScreenState();
}

class _TravelPlannerScreenState extends State<TravelPlannerScreen> {
  final List<Map<String, dynamic>> _itinerary = [
    {'day': 1, 'title': 'Meet up & Cafe brief ☕️'},
    {'day': 2, 'title': 'Trekking sunset peak 🌅'},
    {'day': 3, 'title': 'Cozy bonfire stories 🔥'},
  ];

  final TextEditingController _itineraryController = TextEditingController();

  void _addItem() {
    if (_itineraryController.text.trim().isEmpty) return;
    setState(() {
      _itinerary.add({
        'day': _itinerary.length + 1,
        'title': _itineraryController.text,
      });
      _itineraryController.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    final bool isDarkMode = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(title: const Text('Travel Companions')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(18),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: Stack(
                children: [
                  Image.network(
                    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
                    height: 160,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                  Container(height: 160, color: Colors.black26),
                  const Positioned(
                    bottom: 16,
                    left: 16,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('July 15 - 20, 2026', style: TextStyle(color: Colors.white70, fontSize: 10, fontFamily: 'monospace')),
                        Text('Gokarna Roadtrip', style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w900)),
                      ],
                    ),
                  )
                ],
              ),
            ).animate().fadeIn(),

            const SizedBox(height: 24),

            Text(
              'SHARED TRIP ITINERARY',
              style: TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.extrabold,
                letterSpacing: 1.5,
                color: Colors.grey[500],
              ),
            ),
            const SizedBox(height: 12),

            Container(
              padding: const EdgeInsets.all(16),
              decoration: AppTheme.glassDecoration(isDarkMode: isDarkMode),
              child: Column(
                children: [
                  ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: _itinerary.length,
                    itemBuilder: (context, idx) {
                      final item = _itinerary[idx];
                      return Padding(
                        padding: const EdgeInsets.symmetric(vertical: 8.0),
                        child: Row(
                          children: [
                            CircleAvatar(
                              radius: 12,
                              backgroundColor: AppTheme.primary.withOpacity(0.15),
                              child: Text(
                                '\${item[\'day\']}',
                                style: const TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Text(item['title'], style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500)),
                          ],
                        ),
                      );
                    },
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Expanded(
                        child: TextField(
                          controller: _itineraryController,
                          style: const TextStyle(fontSize: 12),
                          decoration: InputDecoration(
                            hintText: 'Add new daily stop...',
                            filled: true,
                            fillColor: isDarkMode ? Colors.slate[800] : Colors.slate[100],
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                            contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      IconButton(
                        icon: const Icon(Icons.add_circle, color: AppTheme.primary),
                        onPressed: _addItem,
                      )
                    ],
                  ),
                ],
              ),
            ).animate().fadeIn(delay: 200.ms),
          ],
        ),
      ),
    );
  }
}`,

  profile: `import 'package:flutter/material.dart';
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

            Row(
              children: [
                const Text(
                  'Arjun Reddy',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
                ),
                const SizedBox(width: 6),
                const Icon(Icons.verified, color: Colors.blueAccent, size: 18),
              ],
            ),
            const SizedBox(height: 4),
            const Text(
              'Verified Architect',
              style: TextStyle(color: AppTheme.primary, fontSize: 10, fontWeight: FontWeight.bold, fontFamily: 'monospace'),
            ),
            const SizedBox(height: 12),
            Text(
              'Explorer | Music Lover | Coffee Addict ☕️\\nAlways up for new adventures and meaningful conversations!',
              style: TextStyle(color: Colors.grey[500], fontSize: 12, height: 1.4),
            ),

            const SizedBox(height: 24),

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
                      Text('\${_searchRadius.round()} km', style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold)),
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
}`
};
