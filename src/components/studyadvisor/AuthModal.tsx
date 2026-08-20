import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Eye, EyeOff, CheckCircle, User, Mail, Lock, GraduationCap, Building2, MessageCircle, Loader2 } from 'lucide-react';

// CHANGE THIS: Remove supabase import, add API base URL
const API_BASE_URL = 'http://localhost:8081/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: 'signin' | 'register';
  onLoginSuccess?: (userData: any) => void;
}

const roles = [
  { id: 'student', label: 'Student', icon: GraduationCap },
  { id: 'university', label: 'University', icon: Building2 },
  { id: 'counselor', label: 'Counselor', icon: MessageCircle },
];

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab, onLoginSuccess }) => {
  const [tab, setTab] = useState<'signin' | 'register'>(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Sign In
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signInErrors, setSignInErrors] = useState<Record<string, string>>({});

  // Register
  const [registerData, setRegisterData] = useState({
    name: '', email: '', password: '', confirmPassword: '', role: 'student', terms: false,
  });
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});

  React.useEffect(() => {
    setTab(initialTab);
    setSuccess(false);
    setLoading(false);
    setSignInErrors({});
    setRegisterErrors({});
  }, [initialTab, isOpen]);

  // UPDATED: Sign In with Spring Boot
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!signInData.email) errors.email = 'Email is required';
    if (!signInData.password) errors.password = 'Password is required';
    if (signInData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInData.email)) errors.email = 'Invalid email';
    setSignInErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: signInData.email,
          password: signInData.password
        })
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        setSignInErrors({ email: data.message || 'Invalid email or password' });
        setLoading(false);
        return;
      }
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('isAuthenticated', 'true');
      
      setSuccessMessage('You have been signed in successfully.');
      setSuccess(true);
      
      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      }
      
      setTimeout(() => { 
        onClose(); 
        setSuccess(false); 
        setSignInData({ email: '', password: '' }); 
        setLoading(false);
        window.location.reload(); // Refresh to update navbar
      }, 2000);
    } catch (err: any) {
      setSignInErrors({ email: err.message || 'Sign in failed. Make sure backend is running on port 8081' });
      setLoading(false);
    }
  };

  // UPDATED: Register with Spring Boot
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!registerData.name) errors.name = 'Name is required';
    if (!registerData.email) errors.email = 'Email is required';
    if (registerData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) errors.email = 'Invalid email';
    if (!registerData.password) errors.password = 'Password is required';
    if (registerData.password.length < 8) errors.password = 'Password must be at least 8 characters';
    if (registerData.password !== registerData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    if (!registerData.terms) errors.terms = 'You must accept the terms';
    setRegisterErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: registerData.name,
          email: registerData.email,
          password: registerData.password,
          role: registerData.role
        })
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        setRegisterErrors({ email: data.message || 'Registration failed. Email may already exist.' });
        setLoading(false);
        return;
      }
      
      setSuccessMessage('Your account has been created. Welcome to StudyAdvisor!');
      setSuccess(true);
      
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setRegisterData({ name: '', email: '', password: '', confirmPassword: '', role: 'student', terms: false });
        setLoading(false);
        // Switch to sign in tab
        setTab('signin');
      }, 2000);
    } catch (err: any) {
      setRegisterErrors({ email: err.message || 'Registration failed. Make sure backend is running on port 8081' });
      setLoading(false);
    }
  };

  // Rest of your component remains EXACTLY THE SAME (the JSX)
  if (!isOpen) return null;

  return (
    // ... YOUR EXISTING JSX CODE (keep everything below exactly as is)
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      {/* Shadow effect around the modal */}
      <div 
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-y-auto max-h-[90vh]" 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          boxShadow: '0 25px 50px -12px rgba(30, 58, 143, 0.25), 0 0 0 1px rgba(0, 199, 177, 0.1)'
        }}
      >
        {/* Header with Logo */}
        <div className="bg-gradient-to-r from-[#1E3A8F] to-[#00C7B1] p-5 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          
          {/* Logo Section - Centered */}
          <div className="flex flex-col items-center mb-4">
            {/* Logo Image - Add your logo here */}
            <div className="flex justify-center mb-4">
              <img 
                src="/assets/white-logo.png" 
                alt="StudyAdvisor" 
                className="h-16 w-auto max-w-full" 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = '<span className="text-2xl text-white font-bold">SA</span>';
                  }
                }}
              />
            </div>
            {/* Text Logo Fallback */}
            <div className="text-center">
              <p className="text-white/80 text-xs mt-1">Pakistan's Leading Education Portal</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white/10 rounded-lg p-1 mt-2">
            <button
              onClick={() => { setTab('signin'); setSuccess(false); }}
              className={`flex-1 py-2 text-[14px] font-semibold rounded-md transition-all ${tab === 'signin' ? 'bg-white text-[#1E3A8F] shadow-md' : 'text-white/80 hover:text-white'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab('register'); setSuccess(false); }}
              className={`flex-1 py-2 text-[14px] font-semibold rounded-md transition-all ${tab === 'register' ? 'bg-white text-[#1E3A8F] shadow-md' : 'text-white/80 hover:text-white'}`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Content - Adjusted height with scroll if needed */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-[#00C7B1]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#00C7B1]" />
              </div>
              <h4 className="text-[18px] font-bold text-[#1E3A8F] mb-1">
                {tab === 'signin' ? 'Welcome Back!' : 'Account Created!'}
              </h4>
              <p className="text-[14px] text-gray-500">{successMessage}</p>
            </div>
          ) : tab === 'signin' ? (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-gray-600 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={signInData.email}
                    onChange={(e) => { setSignInData({ ...signInData, email: e.target.value }); setSignInErrors({}); }}
                    className={`w-full pl-10 pr-4 py-2.5 text-[14px] border rounded-lg focus:outline-none transition-all ${signInErrors.email ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#00C7B1] focus:ring-1 focus:ring-[#00C7B1]/20'}`}
                    placeholder="your@email.com"
                  />
                </div>
                {signInErrors.email && <p className="text-[12px] text-red-500 mt-1">{signInErrors.email}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-gray-600 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signInData.password}
                    onChange={(e) => { setSignInData({ ...signInData, password: e.target.value }); setSignInErrors({}); }}
                    className={`w-full pl-10 pr-10 py-2.5 text-[14px] border rounded-lg focus:outline-none transition-all ${signInErrors.password ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-[#00C7B1] focus:ring-1 focus:ring-[#00C7B1]/20'}`}
                    placeholder="Enter your password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {signInErrors.password && <p className="text-[12px] text-red-500 mt-1">{signInErrors.password}</p>}
              </div>
{/* 
              <div className="flex justify-end">
                <button type="button" className="text-[13px] text-[#1E3A8F] hover:underline font-medium">Forgot Password?</button>
              </div>
          */}    
  <div className="flex justify-end">
    <Link to="/change-password" className="text-[13px] text-[#1E3A8F] hover:underline font-medium">
      Change Password?
    </Link>
  </div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-[#1E3A8F] to-[#1E3A8F]/90 text-white font-semibold rounded-lg hover:from-[#152C6B] hover:to-[#152C6B] transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-md">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Signing In...' : 'Sign In'}
              </button>

              <p className="text-center text-[13px] text-gray-500">
                Don't have an account?{' '}
                <button type="button" onClick={() => setTab('register')} className="text-[#00C7B1] font-semibold hover:underline">Register</button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="block text-[13px] font-semibold text-gray-600 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={registerData.name}
                    onChange={(e) => { setRegisterData({ ...registerData, name: e.target.value }); setRegisterErrors({}); }}
                    className={`w-full pl-10 pr-4 py-2 text-[14px] border rounded-lg focus:outline-none transition-all ${registerErrors.name ? 'border-red-300' : 'border-gray-200 focus:border-[#00C7B1] focus:ring-1 focus:ring-[#00C7B1]/20'}`}
                    placeholder="Enter your full name"
                  />
                </div>
                {registerErrors.name && <p className="text-[12px] text-red-500 mt-1">{registerErrors.name}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-gray-600 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={registerData.email}
                    onChange={(e) => { setRegisterData({ ...registerData, email: e.target.value }); setRegisterErrors({}); }}
                    className={`w-full pl-10 pr-4 py-2 text-[14px] border rounded-lg focus:outline-none transition-all ${registerErrors.email ? 'border-red-300' : 'border-gray-200 focus:border-[#00C7B1] focus:ring-1 focus:ring-[#00C7B1]/20'}`}
                    placeholder="your@email.com"
                  />
                </div>
                {registerErrors.email && <p className="text-[12px] text-red-500 mt-1">{registerErrors.email}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-gray-600 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={registerData.password}
                    onChange={(e) => { setRegisterData({ ...registerData, password: e.target.value }); setRegisterErrors({}); }}
                    className={`w-full pl-10 pr-10 py-2 text-[14px] border rounded-lg focus:outline-none transition-all ${registerErrors.password ? 'border-red-300' : 'border-gray-200 focus:border-[#00C7B1] focus:ring-1 focus:ring-[#00C7B1]/20'}`}
                    placeholder="Min 8 characters"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {registerErrors.password && <p className="text-[12px] text-red-500 mt-1">{registerErrors.password}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-gray-600 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={registerData.confirmPassword}
                    onChange={(e) => { setRegisterData({ ...registerData, confirmPassword: e.target.value }); setRegisterErrors({}); }}
                    className={`w-full pl-10 pr-10 py-2 text-[14px] border rounded-lg focus:outline-none transition-all ${registerErrors.confirmPassword ? 'border-red-300' : 'border-gray-200 focus:border-[#00C7B1] focus:ring-1 focus:ring-[#00C7B1]/20'}`}
                    placeholder="Confirm your password"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {registerErrors.confirmPassword && <p className="text-[12px] text-red-500 mt-1">{registerErrors.confirmPassword}</p>}
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-[13px] font-semibold text-gray-600 mb-2">I am a</label>
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setRegisterData({ ...registerData, role: role.id })}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all ${
                        registerData.role === role.id
                          ? 'border-[#00C7B1] bg-[#00C7B1]/5 text-[#1E3A8F] shadow-sm'
                          : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <role.icon className="w-5 h-5" />
                      <span className="text-[11px] font-semibold">{role.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={registerData.terms}
                  onChange={(e) => { setRegisterData({ ...registerData, terms: e.target.checked }); setRegisterErrors({}); }}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-[#00C7B1]"
                />
                <span className="text-[11px] text-gray-500">
                  I accept the <button type="button" className="text-[#1E3A8F] hover:underline font-medium">Terms of Use</button> and <button type="button" className="text-[#1E3A8F] hover:underline font-medium">Privacy Policy</button>
                </span>
              </label>
              {registerErrors.terms && <p className="text-[11px] text-red-500">{registerErrors.terms}</p>}

              <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-[#00C7B1] to-[#00b5a1] text-white font-semibold rounded-lg hover:from-[#00b5a1] hover:to-[#00a391] transition-all disabled:opacity-60 flex items-center justify-center gap-2 shadow-md mt-2">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>

              <p className="text-center text-[13px] text-gray-500 pt-2">
                Already have an account?{' '}
                <button type="button" onClick={() => setTab('signin')} className="text-[#1E3A8F] font-semibold hover:underline">Sign In</button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;