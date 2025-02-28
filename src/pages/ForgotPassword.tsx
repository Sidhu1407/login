import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ArrowRight, Mail, ArrowLeft, Sprout } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
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
    } else {
      setLeafPosition({ x: 0, y: 0, rotate: 0 });
      setLeafScale(1);
    }
  }, [isEmailFocused]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email });
    setIsSubmitted(true);
    // Handle password reset logic here
  };

  const handleBackToLogin = () => {
    navigate('/login');
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

        {/* Forgot Password Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 transform hover:scale-[1.01]">
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
                  isEmailFocused ? "animate-pulse" : ""
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
            <h2 className="text-2xl font-semibold text-green-800 mb-6">Forgot Password</h2>
            
            <p className="text-gray-600 mb-6">
              {!isSubmitted 
                ? "Enter your email address and we'll send you a link to reset your password." 
                : "Check your email for a password reset link."}
            </p>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
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
                
                {/* Reset Password Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-[1.02] group"
                >
                  <span className="mr-2">Reset Password</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            ) : (
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <Mail className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Check Your Email</h3>
                <p className="text-gray-600 mb-4">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-green-500 hover:text-green-600 font-medium"
                >
                  Try another email
                </button>
              </div>
            )}
            
            {/* Back to Login Link */}
            <div className="text-center mt-6">
              <button 
                onClick={handleBackToLogin}
                className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back to login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;