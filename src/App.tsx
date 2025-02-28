import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Leaf, Sprout, Lock, Mail, Eye, EyeOff, ArrowRight, User, Phone, ChevronLeft } from 'lucide-react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';

// New animated login component
const AnimatedAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [leafPosition, setLeafPosition] = useState({ x: 0, y: 0, rotate: 0 });
  const [leafScale, setLeafScale] = useState(1);
  const [leaves, setLeaves] = useState<Array<{id: number, x: number, y: number, size: number, opacity: number, rotation: number}>>([]);
  const navigate = useNavigate();

  // Generate random falling leaves
  useEffect(() => {
    const newLeaves = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -100,
      size: Math.random() * 15 + 10,
      opacity: Math.random() * 0.5 + 0.2,
      rotation: Math.random() * 360
    }));
    setLeaves(newLeaves);

    const interval = setInterval(() => {
      setLeaves(prevLeaves => 
        prevLeaves.map(leaf => ({
          ...leaf,
          y: leaf.y + 0.5,
          rotation: leaf.rotation + 0.5,
          x: leaf.x + Math.sin(leaf.y / 20) * 0.5,
          // Reset leaf when it goes off screen
          ...(leaf.y > 100 ? {
            y: Math.random() * -50,
            x: Math.random() * 100,
            rotation: Math.random() * 360
          } : {})
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Animate leaf based on focus
  useEffect(() => {
    if (isEmailFocused) {
      setLeafPosition({ x: -20, y: 10, rotate: 15 });
      setLeafScale(1.2);
    } else if (isPasswordFocused) {
      setLeafPosition({ x: 20, y: 10, rotate: -15 });
      setLeafScale(1.2);
    } else if (isNameFocused) {
      setLeafPosition({ x: -15, y: 5, rotate: 10 });
      setLeafScale(1.3);
    } else if (isPhoneFocused) {
      setLeafPosition({ x: 15, y: 5, rotate: -10 });
      setLeafScale(1.3);
    } else {
      setLeafPosition({ x: 0, y: 0, rotate: 0 });
      setLeafScale(1);
    }
  }, [isEmailFocused, isPasswordFocused, isNameFocused, isPhoneFocused]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        // Using React Router navigation instead of window.location
        navigate('/dashboard');
      }, 1500);
    }, 2000);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        // Using React Router navigation instead of window.location
        navigate('/dashboard');
      }, 1500);
    }, 2000);
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50 flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Animated falling leaves background */}
      {leaves.map(leaf => (
        <div 
          key={leaf.id}
          className="absolute pointer-events-none"
          style={{
            left: `${leaf.x}%`,
            top: `${leaf.y}%`,
            opacity: leaf.opacity,
            transform: `rotate(${leaf.rotation}deg)`,
            transition: 'transform 0.5s ease-out'
          }}
        >
          <Leaf 
            size={leaf.size} 
            className="text-green-600" 
          />
        </div>
      ))}
      
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-200 rounded-full opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-200 rounded-full opacity-30 translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute top-1/4 right-1/5 w-20 h-20 bg-green-300 rounded-full opacity-20"></div>
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4 shadow-lg transform hover:rotate-12 transition-transform duration-300">
            <Sprout size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 animate-pulse">AgroGen</h1>
          <p className="text-green-700 text-center mt-2">Guiding farmers toward sustainable growth</p>
        </div>

        {/* Login/Signup Card */}
        <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 transform ${success ? 'scale-105 opacity-0' : 'hover:scale-[1.01]'}`}>
          {/* Interactive Plant Animation */}
          <div className="relative h-28 bg-gradient-to-r from-green-600 to-green-700 flex justify-center overflow-hidden">
            {/* Main animated leaf */}
            <div 
              className="absolute bottom-2 transition-all duration-500 ease-in-out"
              style={{
                transform: `translateX(${leafPosition.x}px) translateY(${leafPosition.y}px) rotate(${leafPosition.rotate}deg) scale(${leafScale})`,
              }}
            >
              <Leaf 
                size={32} 
                className={`text-green-200 transition-all duration-500 ${
                  (isEmailFocused || isPasswordFocused || isNameFocused || isPhoneFocused) ? "animate-pulse" : ""
                }`} 
              />
            </div>
            
            {/* Additional decorative leaves */}
            <div className="absolute top-4 left-4 transform rotate-45">
              <Leaf size={16} className="text-green-300 opacity-60" />
            </div>
            <div className="absolute top-6 right-8 transform -rotate-15">
              <Leaf size={14} className="text-green-300 opacity-50" />
            </div>
            <div className="absolute bottom-6 left-1/4 transform rotate-30">
              <Leaf size={12} className="text-green-300 opacity-40" />
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            {showSignUp ? (
              <>
                <div className="flex items-center mb-6">
                  <button 
                    onClick={() => setShowSignUp(false)}
                    className="mr-2 text-green-600 hover:text-green-800 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <h2 className="text-2xl font-semibold text-green-800">Create Account</h2>
                </div>
                
                <form onSubmit={handleSignUp} className="space-y-5">
                  {/* Name Field */}
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-green-700 mb-1">
                      Full Name
                    </label>
                    <div className={`flex items-center border-2 rounded-lg overflow-hidden transition-all ${
                      isNameFocused ? "border-green-500 bg-green-50" : "border-gray-300"
                    }`}>
                      <span className="pl-3">
                        <User size={18} className={`${isNameFocused ? "text-green-500" : "text-gray-400"}`} />
                      </span>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setIsNameFocused(true)}
                        onBlur={() => setIsNameFocused(false)}
                        className="w-full py-3 px-3 text-gray-700 focus:outline-none bg-transparent"
                        placeholder="John Farmer"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Number Field */}
                  <div className="relative">
                    <label htmlFor="phone" className="block text-sm font-medium text-green-700 mb-1">
                      Phone Number
                    </label>
                    <div className={`flex items-center border-2 rounded-lg overflow-hidden transition-all ${
                      isPhoneFocused ? "border-green-500 bg-green-50" : "border-gray-300"
                    }`}>
                      <span className="pl-3">
                        <Phone size={18} className={`${isPhoneFocused ? "text-green-500" : "text-gray-400"}`} />
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onFocus={() => setIsPhoneFocused(true)}
                        onBlur={() => setIsPhoneFocused(false)}
                        className="w-full py-3 px-3 text-gray-700 focus:outline-none bg-transparent"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  {/* Sign Up Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-[1.02] group ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <span className="mr-2">Sign Up</span>
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  {/* Login Link */}
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <button 
                        type="button"
                        onClick={() => setShowSignUp(false)}
                        className="font-medium text-green-600 hover:text-green-500"
                      >
                        Login here
                      </button>
                    </p>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-green-800 mb-6">Welcome Back</h2>
                
                <form onSubmit={handleLogin} className="space-y-5">
                  {/* Email Field */}
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-green-700 mb-1">
                      Email Address
                    </label>
                    <div className={`flex items-center border-2 rounded-lg overflow-hidden transition-all ${
                      isEmailFocused ? "border-green-500 bg-green-50" : "border-gray-300"
                    }`}>
                      <span className="pl-3">
                        <Mail size={18} className={`${isEmailFocused ? "text-green-500" : "text-gray-400"}`} />
                      </span>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsEmailFocused(true)}
                        onBlur={() => setIsEmailFocused(false)}
                        className="w-full py-3 px-3 text-gray-700 focus:outline-none bg-transparent"
                        placeholder="farmer@agrogen.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-green-700 mb-1">
                      Password
                    </label>
                    <div className={`flex items-center border-2 rounded-lg overflow-hidden transition-all ${
                      isPasswordFocused ? "border-green-500 bg-green-50" : "border-gray-300"
                    }`}>
                      <span className="pl-3">
                        <Lock size={18} className={`${isPasswordFocused ? "text-green-500" : "text-gray-400"}`} />
                      </span>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        className="w-full py-3 px-3 text-gray-700 focus:outline-none bg-transparent"
                        placeholder="Your secure password"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="pr-3 focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff size={18} className="text-gray-400" />
                        ) : (
                          <Eye size={18} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <button 
                        type="button"
                        onClick={handleForgotPassword}
                        className="font-medium text-green-600 hover:text-green-500"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-[1.02] group ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <span className="mr-2">Login</span>
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  {/* Sign Up Link */}
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <button 
                        type="button"
                        onClick={() => setShowSignUp(true)}
                        className="font-medium text-green-600 hover:text-green-500"
                      >
                        Sign up now
                      </button>
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center animate-bounce-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Sprout size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Success!</h2>
              <p className="text-green-600 mb-4">Redirecting you to AgroGen...</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-green-600 h-2 rounded-full animate-progress"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AnimatedAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        {/* Add a placeholder dashboard route for the success redirect */}
        <Route path="/dashboard" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-3xl font-bold text-green-700">Welcome to AgroGen Dashboard!</h1></div>} />
      </Routes>
    </div>
  );
}

export default App;