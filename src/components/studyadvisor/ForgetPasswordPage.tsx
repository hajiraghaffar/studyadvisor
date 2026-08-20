// src/components/studyadvisor/ForgotPasswordPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    // SIMULATE API CALL - NO BACKEND NEEDED
    setTimeout(() => {
      if (email && email.includes('@')) {
        // Show success message
        setSuccess('Password reset link sent! Redirecting to login...');
        
        // Store email in localStorage for reset page
        localStorage.setItem('resetEmail', email);
        
        // Redirect to reset password page after 2 seconds
        setTimeout(() => {
          navigate('/reset-password');
        }, 2000);
      } else {
        setError('Please enter a valid email address');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#1E3A8F]/40 to-[#00C7B1]/30">
      <div className="w-full max-w-md">
        {/* Back to Login */}
        <div className="mb-4">
          <button 
            onClick={() => navigate('/login')}
            className="text-[#1E3A8F] hover:underline flex items-center gap-1"
          >
            ← Back to Login
          </button>
        </div>

        {/* Logo */}
         {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/assets/logo.png" 
            alt="StudyAdvisor" 
            className="h-12 w-auto"
          />
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-center text-[#1E3A8F] mb-2">
            Forgot Password?
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Enter your email and we'll send you a reset link
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-6 focus:outline-none focus:border-[#00C7B1]"
              required
            />
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E3A8F] text-white py-3 rounded-lg font-semibold hover:bg-[#152C6B] transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button 
              onClick={() => navigate('/login')}
              className="text-[#00C7B1] hover:underline"
            >
              Remember your password? Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}