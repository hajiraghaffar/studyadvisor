// src/services/api.js

// CHANGE THIS PORT NUMBER based on your Spring Boot
// If Spring Boot shows 8080, change to 8080
// If Spring Boot shows 8081, keep as 8081
// If Spring Boot shows 8082, change to 8082
const API_BASE_URL = 'http://localhost:8081/api';

console.log('API_BASE_URL:', API_BASE_URL); // This will show in browser console

export const api = {
  // ============ TEST CONNECTION ============
  testConnection: async () => {
    try {
      const response = await fetch('http://localhost:8081/api/universities');
      console.log('Connection test:', response.ok ? '✅ Connected' : '❌ Failed');
      return response.ok;
    } catch (error) {
      console.error('Connection failed:', error);
      return false;
    }
  },

  // ============ UNIVERSITIES ============
  getUniversities: async () => {
    const response = await fetch(`${API_BASE_URL}/universities`);
    if (!response.ok) throw new Error('Failed to fetch universities');
    return response.json();
  },

  getUniversityById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/universities/${id}`);
    if (!response.ok) throw new Error('Failed to fetch university');
    return response.json();
  },

  getAllUniversities: async () => {
    const response = await fetch(`${API_BASE_URL}/universities`);
    if (!response.ok) throw new Error('Failed to fetch universities');
    return response.json();
  },

  // ============ PROGRAMS ============
  getPrograms: async () => {
    const response = await fetch(`${API_BASE_URL}/programs`);
    if (!response.ok) throw new Error('Failed to fetch programs');
    return response.json();
  },

  getProgramById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/programs/${id}`);
    if (!response.ok) throw new Error('Failed to fetch program');
    return response.json();
  },

  getProgramsByUniversity: async (universityId) => {
    const response = await fetch(`${API_BASE_URL}/programs/university/${universityId}`);
    if (!response.ok) throw new Error('Failed to fetch programs');
    return response.json();
  },

  // ============ AUTH (Login/Register) ============
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  // ============ CHANGE PASSWORD ============
  changePassword: async (userId, oldPassword, newPassword) => {
    const response = await fetch(`${API_BASE_URL}/auth/change-password/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    return response.json();
  },

 // Add these to your api.js

// Forgot Password - Request reset link
forgotPassword: async (email) => {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return response.json();
},

// Reset Password - Actually change password
resetPassword: async (token, newPassword) => {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword }),
  });
  return response.json();
},

  // ============ APPLICATIONS ============
  submitApplication: async (applicationData) => {
    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicationData),
    });
    const data = await response.json();
    console.log('Submit response:', data);
    return data;
  },

  getUserApplications: async (userId) => {
    console.log('API: Fetching applications for user:', userId);
    try {
      const response = await fetch(`${API_BASE_URL}/applications/user/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('API: Received applications:', data);
      return data;
    } catch (error) {
      console.error('API: Error fetching applications:', error);
      return [];
    }
  },

  // ============ UNIVERSITY ADMIN (NEW) ============
  getUniversityApplications: async (universityId) => {
    console.log('API: Fetching applications for university:', universityId);
    try {
      const response = await fetch(`${API_BASE_URL}/applications/university/${universityId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('API: Received university applications:', data);
      return data;
    } catch (error) {
      console.error('API: Error fetching university applications:', error);
      return [];
    }
  },

  getUniversityStats: async (universityId) => {
    console.log('API: Fetching statistics for university:', universityId);
    try {
      const response = await fetch(`${API_BASE_URL}/applications/university/${universityId}/stats`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('API: Received university stats:', data);
      return data;
    } catch (error) {
      console.error('API: Error fetching university stats:', error);
      return { total: 0, pending: 0, accepted: 0, rejected: 0, reviewing: 0 };
    }
  },

  updateApplicationStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/applications/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return response.json();
  },

  updateFeeStatus: async (id, feeStatus) => {
    const response = await fetch(`${API_BASE_URL}/applications/${id}/fee-status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feeStatus }),
    });
    return response.json();
  },

  // ============ WISHLIST (NEW) ============
  addToWishlist: async (userId, universityId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, universityId }),
      });
      return response.json();
    } catch (error) {
      console.error('API: Error adding to wishlist:', error);
      return { success: false, message: error.message };
    }
  },

  getUserWishlist: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/wishlist/user/${userId}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    } catch (error) {
      console.error('API: Error fetching wishlist:', error);
      return [];
    }
  },

  removeFromWishlist: async (wishlistId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/wishlist/${wishlistId}`, {
        method: 'DELETE',
      });
      return response.json();
    } catch (error) {
      console.error('API: Error removing from wishlist:', error);
      return { success: false, message: error.message };
    }
  },

  removeFromWishlistByUserAndUniversity: async (userId, universityId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/wishlist/remove?userId=${userId}&universityId=${universityId}`, {
        method: 'DELETE',
      });
      return response.json();
    } catch (error) {
      console.error('API: Error removing from wishlist:', error);
      return { success: false, message: error.message };
    }
  },

  // ============ EXPORT DATA (NEW) ============
  exportApplicationsToCSV: async (universityId) => {
    try {
      const applications = await api.getUniversityApplications(universityId);
      const headers = ['ID', 'Student Name', 'Email', 'Phone', 'Qualification', 'Status', 'Date'];
      const rows = applications.map(app => [
        app.id, app.studentName, app.studentEmail, app.studentPhone || '',
        app.academicQualification, app.status,
        new Date(app.applicationDate).toLocaleDateString()
      ]);
      const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
      return csvContent;
    } catch (error) {
      console.error('API: Error exporting applications:', error);
      return null;
    }
  },

  // ============ DOCUMENT VERIFICATION ============
  verifyDocuments: async (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('documents', file);
    });
    const response = await fetch(`${API_BASE_URL}/documents/verify`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },
};