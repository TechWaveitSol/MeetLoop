import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Smartphone, ArrowRight, Mail, Lock, User, KeyRound, ShieldCheck, CheckSquare, Chrome, Github } from 'lucide-react';

interface OnboardingAndAuthProps {
  currentSubScreen: 'splash' | 'onboarding' | 'auth_login' | 'auth_signup' | 'auth_forgot' | 'auth_otp';
  onChangeScreen: (screen: 'splash' | 'onboarding' | 'auth_login' | 'auth_signup' | 'auth_forgot' | 'auth_otp' | 'home') => void;
  isDarkMode: boolean;
}

export function OnboardingAndAuth({
  currentSubScreen,
  onChangeScreen,
  isDarkMode
}: OnboardingAndAuthProps) {
  // Splash Screen State
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (currentSubScreen === 'splash') {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => onChangeScreen('onboarding'), 600);
            return 100;
          }
          return prev + 4;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [currentSubScreen]);

  // Onboarding Pages State
  const [activeStep, setActiveStep] = useState(0);
  const onboardingSteps = [
    {
      title: "Discover Nearby Connections",
      desc: "Meet genuine people right in your neighborhood. Filter by travel interests, social games, or mutual hobbies.",
      image: "📍",
      gradient: "from-sky-400 to-indigo-500"
    },
    {
      title: "Create Couple Memories",
      desc: "Create a shared secure space with your partner. Count your milestones, log mood trackers, and answer daily love questions.",
      image: "💖",
      gradient: "from-pink-400 to-rose-500"
    },
    {
      title: "Play Social Games",
      desc: "Instant play Connect Four, Chess, Carrom, or Truth or Dare. Break the ice naturally without any awkward conversations.",
      image: "🎮",
      gradient: "from-purple-400 to-indigo-500"
    }
  ];

  // Auth Forms State
  const [loginEmail, setLoginEmail] = useState('demo@meetloop.com');
  const [loginPass, setLoginPass] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [otpCode, setOtpCode] = useState(['', '', '', '']);

  const handleOtpChange = (index: number, val: string) => {
    if (val.length <= 1) {
      const newOtp = [...otpCode];
      newOtp[index] = val;
      setOtpCode(newOtp);
      // Auto-focus next input
      if (val && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSocialLogin = (platform: string) => {
    alert(`Signing in with ${platform}...`);
    onChangeScreen('home');
  };

  return (
    <div className={`h-full w-full select-none flex flex-col justify-between overflow-hidden relative font-sans ${isDarkMode ? 'bg-[#0F172A] text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      <AnimatePresence mode="wait">
        {/* 1. SPLASH SCREEN */}
        {currentSubScreen === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-between py-16 px-6 relative z-10"
          >
            {/* Top Empty Space */}
            <div />

            {/* Logo and App Name */}
            <div className="flex flex-col items-center space-y-6">
              <motion.div
                animate={{ scale: [0.9, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#6C63FF] via-[#8B5CF6] to-[#FF6B8A] flex items-center justify-center shadow-xl shadow-indigo-500/20"
              >
                <Heart className="w-12 h-12 text-white fill-white/10" />
              </motion.div>
              <div className="text-center">
                <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#6C63FF] via-[#8B5CF6] to-[#FF6B8A] bg-clip-text text-transparent">
                  MeetLoop
                </h1>
                <p className="text-xs text-slate-400 font-mono mt-1 tracking-widest">
                  MEET. CONNECT. MEMORIES
                </p>
              </div>
            </div>

            {/* Bottom Loading Indicator */}
            <div className="w-full max-w-[200px] flex flex-col items-center space-y-3">
              <div className="h-1 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#6C63FF] to-[#FF6B8A]"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {loadingProgress < 100 ? `Initializing... ${loadingProgress}%` : 'Ready!'}
              </p>
            </div>
          </motion.div>
        )}

        {/* 2. ONBOARDING SCREEN */}
        {currentSubScreen === 'onboarding' && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: -20 }}
            className="flex-1 flex flex-col justify-between py-10 px-6 relative"
          >
            {/* Top bar with Skip button */}
            <div className="flex justify-end items-center">
              <button 
                onClick={() => onChangeScreen('auth_login')}
                className="text-xs font-semibold px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Skip
              </button>
            </div>

            {/* Middle Illustration & Text */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-8 my-6 text-center">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className={`w-40 h-40 rounded-full bg-gradient-to-tr ${onboardingSteps[activeStep].gradient} flex items-center justify-center text-6xl shadow-2xl shadow-indigo-500/10 relative`}
              >
                <div className="absolute inset-0 bg-white/10 rounded-full blur-xl scale-110" />
                <span>{onboardingSteps[activeStep].image}</span>
              </motion.div>

              <div className="space-y-3 max-w-sm">
                <h2 className="text-2xl font-bold tracking-tight">
                  {onboardingSteps[activeStep].title}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {onboardingSteps[activeStep].desc}
                </p>
              </div>
            </div>

            {/* Bottom Navigation and Pagination */}
            <div className="space-y-6">
              {/* Dots */}
              <div className="flex justify-center space-x-2">
                {onboardingSteps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === activeStep ? 'w-6 bg-[#6C63FF]' : 'w-2 bg-slate-300 dark:bg-slate-700'}`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                {activeStep > 0 && (
                  <button
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="flex-1 py-4 text-sm font-semibold rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => {
                    if (activeStep < onboardingSteps.length - 1) {
                      setActiveStep(activeStep + 1);
                    } else {
                      onChangeScreen('auth_login');
                    }
                  }}
                  className="flex-1 py-4 text-sm font-semibold text-white rounded-2xl bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:opacity-90 active:scale-95 transition shadow-lg shadow-indigo-500/15 flex items-center justify-center space-x-2"
                >
                  <span>{activeStep === onboardingSteps.length - 1 ? "Get Started" : "Next"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. AUTH: LOGIN */}
        {currentSubScreen === 'auth_login' && (
          <motion.div
            key="auth_login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: -20 }}
            className="flex-1 flex flex-col justify-between py-8 px-6 overflow-y-auto"
          >
            <div className="space-y-6 mt-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#8B5CF6] flex items-center justify-center mx-auto text-white shadow-md">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Welcome Back!</h2>
                <p className="text-xs text-slate-400">Log in to enter the MeetLoop network.</p>
              </div>

              {/* Form Inputs */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Email Address</label>
                  <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-900 px-4 py-3.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <input 
                      type="email" 
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="demo@meetloop.com" 
                      className="bg-transparent border-none outline-none text-sm w-full"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Password</label>
                  <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-900 px-4 py-3.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                    <Lock className="w-4 h-4 text-slate-400" />
                    <input 
                      type="password" 
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      placeholder="••••••••" 
                      className="bg-transparent border-none outline-none text-sm w-full"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-medium">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="rounded border-slate-300 dark:border-slate-700 text-[#6C63FF] focus:ring-[#6C63FF]"
                    />
                    <span className="text-slate-400">Remember me</span>
                  </label>
                  <button 
                    onClick={() => onChangeScreen('auth_forgot')}
                    className="text-[#6C63FF] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={() => onChangeScreen('home')}
                className="w-full py-4 text-sm font-semibold text-white rounded-2xl bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:opacity-90 active:scale-95 transition shadow-lg shadow-indigo-500/15"
              >
                Log In
              </button>

              {/* Divider */}
              <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono my-4">
                <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
                <span>OR SIGN IN WITH</span>
                <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
              </div>

              {/* Social Logins */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleSocialLogin('Google')}
                  className="flex-1 flex items-center justify-center space-x-2 bg-slate-100 dark:bg-slate-900 py-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                >
                  <Chrome className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-medium">Google</span>
                </button>
                <button
                  onClick={() => handleSocialLogin('GitHub')}
                  className="flex-1 flex items-center justify-center space-x-2 bg-slate-100 dark:bg-slate-900 py-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                >
                  <Github className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-medium">GitHub</span>
                </button>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="text-center text-xs text-slate-400 mt-6 pb-2">
              Don't have an account?{' '}
              <button 
                onClick={() => onChangeScreen('auth_signup')}
                className="text-[#6C63FF] font-semibold hover:underline"
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        )}

        {/* 3. AUTH: SIGN UP */}
        {currentSubScreen === 'auth_signup' && (
          <motion.div
            key="auth_signup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: -20 }}
            className="flex-1 flex flex-col justify-between py-6 px-6 overflow-y-auto"
          >
            <div className="space-y-5 mt-2">
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Create Account</h2>
                <p className="text-xs text-slate-400">Join MeetLoop and discover friends & lovers.</p>
              </div>

              {/* Form Inputs */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Full Name</label>
                  <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                    <User className="w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Arjun Reddy" 
                      className="bg-transparent border-none outline-none text-sm w-full"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Email Address</label>
                  <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <input 
                      type="email" 
                      placeholder="demo@meetloop.com" 
                      className="bg-transparent border-none outline-none text-sm w-full"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Password</label>
                  <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                    <Lock className="w-4 h-4 text-slate-400" />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-transparent border-none outline-none text-sm w-full"
                    />
                  </div>
                </div>

                {/* Terms and conditions */}
                <label className="flex items-start space-x-2.5 cursor-pointer text-xs mt-2 select-none">
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-[#6C63FF] focus:ring-[#6C63FF]"
                  />
                  <span className="text-slate-400 leading-normal">
                    I agree to the <span className="text-[#6C63FF] font-medium hover:underline">Terms of Service</span> and <span className="text-[#6C63FF] font-medium hover:underline">Privacy Policy</span>.
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => onChangeScreen('auth_otp')}
                className="w-full py-3.5 text-sm font-semibold text-white rounded-2xl bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:opacity-90 active:scale-95 transition shadow-lg shadow-indigo-500/15 flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Footer */}
            <div className="text-center text-xs text-slate-400 mt-6 pb-2">
              Already have an account?{' '}
              <button 
                onClick={() => onChangeScreen('auth_login')}
                className="text-[#6C63FF] font-semibold hover:underline"
              >
                Log In
              </button>
            </div>
          </motion.div>
        )}

        {/* 3. AUTH: FORGOT PASSWORD */}
        {currentSubScreen === 'auth_forgot' && (
          <motion.div
            key="auth_forgot"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 20 }}
            className="flex-1 flex flex-col justify-between py-8 px-6"
          >
            <div className="space-y-6 mt-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto text-[#6C63FF]">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Forgot Password</h2>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Enter your email address and we'll send you an OTP verification code.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Email Address</label>
                  <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-900 px-4 py-3.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <input 
                      type="email" 
                      placeholder="demo@meetloop.com" 
                      className="bg-transparent border-none outline-none text-sm w-full"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => onChangeScreen('auth_otp')}
                className="w-full py-4 text-sm font-semibold text-white rounded-2xl bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:opacity-90 active:scale-95 transition shadow-lg shadow-indigo-500/15"
              >
                Send Reset Code
              </button>
            </div>

            <button
              onClick={() => onChangeScreen('auth_login')}
              className="text-xs text-[#6C63FF] font-semibold hover:underline pb-4"
            >
              Back to Login
            </button>
          </motion.div>
        )}

        {/* 3. AUTH: OTP VERIFICATION */}
        {currentSubScreen === 'auth_otp' && (
          <motion.div
            key="auth_otp"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between py-8 px-6"
          >
            <div className="space-y-6 mt-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto text-[#6C63FF]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Verify Email</h2>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  We've sent a 4-digit verification code to your email. Enter it below to activate.
                </p>
              </div>

              {/* OTP Inputs */}
              <div className="flex justify-center items-center space-x-4 py-4">
                {otpCode.map((char, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={char}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-14 h-14 text-center text-xl font-bold rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 outline-none focus:border-[#6C63FF] dark:focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] transition"
                  />
                ))}
              </div>

              <button
                onClick={() => onChangeScreen('home')}
                className="w-full py-4 text-sm font-semibold text-white rounded-2xl bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:opacity-90 active:scale-95 transition shadow-lg shadow-indigo-500/15"
              >
                Verify & Activate
              </button>

              <div className="text-center text-xs text-slate-400 font-medium">
                Didn't receive the code?{' '}
                <button 
                  onClick={() => alert('Code resent!')}
                  className="text-[#6C63FF] font-semibold hover:underline"
                >
                  Resend Code
                </button>
              </div>
            </div>

            <button
              onClick={() => onChangeScreen('auth_signup')}
              className="text-xs text-[#6C63FF] font-semibold hover:underline pb-4"
            >
              Back to Sign Up
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
