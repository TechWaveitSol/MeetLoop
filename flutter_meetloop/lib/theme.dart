import 'package:flutter/material.dart';
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

  // Modern Border Radius (Large 24px per instructions)
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
}
