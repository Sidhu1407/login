import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Leaf, ArrowRight, Mail } from 'lucide-react';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, password, rememberMe });
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <Leaf
            key={i}
            className="text-green-200 absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.4,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
            }}
            size={20 + Math.random() * 30}
          />
        ))}
      </div>

      {/* Logo and title */}
      <div className="text-center mb-6 relative z-10">
        <div className="bg-green-500 rounded-full p-4 inline-flex mb-4">
          <Leaf className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-green-700">AgroGen</h1>
        <p className="text-green-600 mt-1">Guiding farmers toward sustainable growth</p>
      </div>

      {/* Login card */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-8 relative z-10">
        <div className="absolute inset-0 bg-green-500 rounded-t-lg h-24"></div>
        
        <div className="relative pt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-green-600 mb-2">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="Your name"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-green-600 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="Your secure password"
                  required
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-green-500 hover:text-green-600 transition-colors">
                Forgot password?
              </Link>
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center group"
            >
              Login
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </form>
          
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account? <Link to="/signup" className="text-green-500 hover:text-green-600 transition-colors">Sign up now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;