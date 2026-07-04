import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:go_router/go_router.dart';
import '../theme.dart';

// ==================== 1. SPLASH SCREEN ====================
class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) {
        context.go('/onboarding');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF090D16), AppTheme.backgroundDark],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Ambient soft glowing aura behind logo
            Container(
              width: 120,
              height: 120,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.primary.withOpacity(0.35),
                    blurRadius: 50,
                    spreadRadius: 10,
                  )
                ],
              ),
              child: Center(
                child: Container(
                  width: 72,
                  height: 72,
                  decoration: BoxDecoration(
                    gradient: AppTheme.romanticGradient,
                    borderRadius: BorderRadius.circular(24),
                  ),
                  child: const Icon(
                    Icons.favorite,
                    color: Colors.white,
                    size: 38,
                  ),
                ),
              ),
            ).animate().scale(delay: 200.ms, duration: 800.ms, curve: Curves.easeOutBack).then().shimmer(duration: 1200.ms),
            const SizedBox(height: 24),
            Text(
              'MeetLoop',
              style: Theme.of(context).textTheme.displayLarge?.copyWith(
                fontWeight: FontWeight.black,
                letterSpacing: -1,
                color: Colors.white,
              ),
            ).animate().fadeIn(delay: 600.ms).slideY(begin: 0.2, end: 0),
            const SizedBox(height: 8),
            Text(
              'PROXIMITY · MOMENTS · ARENAS',
              style: TextStyle(
                color: Colors.white.withOpacity(0.4),
                fontSize: 10,
                fontWeight: FontWeight.w800,
                letterSpacing: 3,
              ),
            ).animate().fadeIn(delay: 1000.ms),
          ],
        ),
      ),
    );
  }
}

// ==================== 2. ONBOARDING SCREEN ====================
class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentIndex = 0;

  final List<Map<String, String>> _slides = [
    {
      'emoji': '✨',
      'title': 'Intelligent Proximity',
      'desc': 'Discover people who share your exact hobbies and circles in real-time, matching at nearby coffee hubs.',
    },
    {
      'emoji': '🎮',
      'title': 'Interactive Arenas',
      'desc': 'Break the ice effortlessly with casual, real-time board games and co-travel road maps directly in-app.',
    },
    {
      'emoji': '👩‍❤️‍👨',
      'title': 'Streaks & Shared Spaces',
      'desc': 'Already coupled? Log memory timelines, complete daily milestone streaks, and build an intimate digital vault.',
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
          child: Column(
            children: [
              // Top Action Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'MeetLoop',
                    style: TextStyle(fontWeight: FontWeight.black, fontSize: 16, color: AppTheme.primary),
                  ),
                  TextButton(
                    onPressed: () => context.go('/login'),
                    child: const Text('Skip', style: TextStyle(color: Colors.grey, fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
              
              // Page Swiper Slider
              Expanded(
                child: PageView.builder(
                  controller: _pageController,
                  onPageChanged: (idx) => setState(() => _currentIndex = idx),
                  itemCount: _slides.length,
                  itemBuilder: (context, idx) {
                    final slide = _slides[idx];
                    return Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          slide['emoji']!,
                          style: const TextStyle(fontSize: 72),
                        ).animate().scale(duration: 400.ms, curve: Curves.bounceOut),
                        const SizedBox(height: 32),
                        Text(
                          slide['title']!,
                          textAlign: TextAlign.center,
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                            fontWeight: FontWeight.extrabold,
                            letterSpacing: -0.5,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Text(
                          slide['desc']!,
                          textAlign: TextAlign.center,
                          style: const TextStyle(color: Colors.grey, height: 1.5, fontSize: 13),
                        ),
                      ],
                    );
                  },
                ),
              ),

              // Bottom Control pagination
              Row(
                mainAxisAlignment: MainAxisAlignment.between,
                children: [
                  // Indicators
                  Row(
                    children: List.generate(_slides.length, (idx) {
                      final active = idx == _currentIndex;
                      return AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        margin: const EdgeInsets.only(right: 6),
                        width: active ? 24 : 8,
                        height: 8,
                        decoration: BoxDecoration(
                          color: active ? AppTheme.primary : Colors.grey.withOpacity(0.3),
                          borderRadius: BorderRadius.circular(4),
                        ),
                      );
                    }),
                  ),

                  // Action Button
                  ElevatedButton(
                    onPressed: () {
                      if (_currentIndex < _slides.length - 1) {
                        _pageController.nextPage(
                          duration: const Duration(milliseconds: 300),
                          curve: Curves.easeInOut,
                        );
                      } else {
                        context.go('/login');
                      }
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.primary,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                    ),
                    child: Row(
                      children: [
                        Text(_currentIndex == _slides.length - 1 ? 'Get Started' : 'Next'),
                        const SizedBox(width: 8),
                        const Icon(Icons.arrow_forward_rounded, size: 16),
                      ],
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ==================== 3. LOGIN & AUTH SCREEN ====================
class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  // Authentication states: 'login' | 'signup' | 'forgot' | 'otp'
  String _mode = 'login';
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();

  void _submitForm() {
    if (_mode == 'login') {
      context.go('/home');
    } else if (_mode == 'signup') {
      setState(() => _mode = 'otp');
    } else if (_mode == 'otp') {
      context.go('/home');
    } else if (_mode == 'forgot') {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Verification link dispatched to your inbox!')),
      );
      setState(() => _mode = 'login');
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          height: MediaQuery.of(context).size.height,
          padding: const EdgeInsets.symmetric(horizontal: 28.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Tiny decorative card
              Center(
                child: Container(
                  width: 52,
                  height: 52,
                  decoration: BoxDecoration(
                    gradient: AppTheme.primaryGradient,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: const Icon(Icons.lock_person_outlined, color: Colors.white),
                ),
              ).animate().scale(duration: 400.ms, curve: Curves.easeOutBack),
              const SizedBox(height: 24),

              // Headers
              Text(
                _mode == 'login' 
                    ? 'Welcome Back' 
                    : _mode == 'signup' 
                        ? 'Create Account' 
                        : _mode == 'otp' 
                            ? 'Verification Gate' 
                            : 'Forgot Credentials',
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.black),
              ),
              const SizedBox(height: 6),
              Text(
                _mode == 'login' 
                    ? 'Access your private designer connections' 
                    : _mode == 'signup' 
                        ? 'Register matching hobbies with real-time peers' 
                        : _mode == 'otp' 
                            ? 'We sent a 6-digit PIN to verified cell number' 
                            : 'Recover proximity vault credentials',
                textAlign: TextAlign.center,
                style: const TextStyle(color: Colors.grey, fontSize: 11),
              ),
              const SizedBox(height: 32),

              // Inputs list
              if (_mode == 'signup') ...[
                _buildTextField(
                  controller: _nameController,
                  hint: 'Designer Handle / Full Name',
                  icon: Icons.person_outline,
                ),
                const SizedBox(height: 12),
              ],

              if (_mode != 'otp') ...[
                _buildTextField(
                  controller: _emailController,
                  hint: 'Design Email ID',
                  icon: Icons.alternate_email_rounded,
                  keyboardType: TextInputType.emailAddress,
                ),
                const SizedBox(height: 12),
              ],

              if (_mode == 'login' || _mode == 'signup') ...[
                _buildTextField(
                  controller: _passwordController,
                  hint: 'Identity Password',
                  icon: Icons.lock_outline_rounded,
                  obscureText: true,
                ),
                const SizedBox(height: 8),
              ],

              // Forgot password clickable link (only on login)
              if (_mode == 'login')
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () => setState(() => _mode = 'forgot'),
                    child: const Text('Forgot Password?', style: TextStyle(color: AppTheme.primary, fontSize: 11, fontWeight: FontWeight.bold)),
                  ),
                ),

              // OTP Boxes Mock
              if (_mode == 'otp') ...[
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: List.generate(4, (index) {
                    return Container(
                      width: 50,
                      height: 50,
                      decoration: AppTheme.glassDecoration(context: context),
                      child: const Center(
                        child: Text(
                          '8', // mock pin input
                          style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: AppTheme.primary),
                        ),
                      ),
                    );
                  }),
                ),
                const SizedBox(height: 24),
              ],

              const SizedBox(height: 12),

              // Primary CTA Submit
              Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: AppTheme.glowShadow,
                ),
                child: ElevatedButton(
                  onPressed: _submitForm,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.primary,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    padding: const EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: Text(
                    _mode == 'login' 
                        ? 'Sign In' 
                        : _mode == 'signup' 
                            ? 'Create Free Card' 
                            : _mode == 'otp' 
                                ? 'Verify PIN' 
                                : 'Send Links',
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
              ),
              const SizedBox(height: 20),

              // Secondary Mode Toggle Links
              if (_mode == 'login')
                _buildToggleLink(
                  preText: "Don't have a design card? ",
                  actionText: "Sign Up",
                  onTap: () => setState(() => _mode = 'signup'),
                ),

              if (_mode == 'signup' || _mode == 'forgot' || _mode == 'otp')
                _buildToggleLink(
                  preText: "Recalling your credentials? ",
                  actionText: "Log In",
                  onTap: () => setState(() => _mode = 'login'),
                ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String hint,
    required IconData icon,
    bool obscureText = false,
    TextInputType keyboardType = TextInputType.text,
  }) {
    return Container(
      decoration: AppTheme.glassDecoration(context: context, borderOpacity: 0.1),
      child: TextField(
        controller: controller,
        obscureText: obscureText,
        keyboardType: keyboardType,
        style: const TextStyle(fontSize: 13),
        decoration: InputDecoration(
          prefixIcon: Icon(icon, size: 18, color: Colors.grey),
          hintText: hint,
          hintStyle: const TextStyle(color: Colors.grey, fontSize: 13),
          border: InputBorder.none,
          contentPadding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
        ),
      ),
    );
  }

  Widget _buildToggleLink({
    required String preText,
    required String actionText,
    required VoidCallback onTap,
  }) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(preText, style: const TextStyle(color: Colors.grey, fontSize: 11)),
        GestureDetector(
          onTap: onTap,
          child: Text(
            actionText,
            style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold, fontSize: 11, decoration: TextDecoration.underline),
          ),
        ),
      ],
    );
  }
}
