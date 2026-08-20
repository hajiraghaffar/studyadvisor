// src/components/studyadvisor/ChangePasswordPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match!");
      return;
    }
    
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    
    try {
      // Get logged in user from localStorage
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      if (!user || !user.id) {
        setError('Please login first');
        navigate('/login');
        return;
      }
      
      // Call changePassword API
      const response = await api.changePassword(user.id, oldPassword, newPassword);
      
      if (response.success) {
        setSuccess('Password changed successfully! Redirecting...');
        // Update user in localStorage
        user.password = newPassword;
        localStorage.setItem('user', JSON.stringify(user));
        
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        setError(response.message || 'Failed to change password');
      }
    } catch (err) {
      console.error('Change password error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#1E3A8F]/40 to-[#00C7B1]/30">
      <div className="w-full max-w-md">
        <div className="mb-4">
          <button 
            onClick={() => navigate('/')}
            className="text-[#1E3A8F] hover:underline flex items-center gap-1"
          >
            ← Back to Home
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <img 
            src="/assets/logo.png" 
            alt="StudyAdvisor" 
            className="h-12 w-auto"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/120x40/white/1E3A8F?text=SA';
            }}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-center text-[#1E3A8F] mb-6">
            Change Password
          </h1>
          
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
              type="password"
              placeholder="Current Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-[#00C7B1]"
              required
            />
            
            <input
              type="password"
              placeholder="New Password (min 6 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-[#00C7B1]"
              required
            />
            
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-6 focus:outline-none focus:border-[#00C7B1]"
              required
            />
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1E3A8F] text-white py-3 rounded-lg font-semibold hover:bg-[#152C6B] transition disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}