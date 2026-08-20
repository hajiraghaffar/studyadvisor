// src/components/studyadvisor/MyApplicationsPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';

interface Application {
  id: number;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  academicQualification: string;
  status: string;
  applicationDate: string;
  documentPath?: string;
  applicationFeeStatus: string;
  university?: {
    id: number;
    name: string;
    shortName: string;
  };
  program?: {
    id: number;
    name: string;
    degree: string;
  };
}

export default function MyApplicationsPage() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Check login status and fetch applications
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    console.log('User from localStorage:', userStr);
    
    if (!userStr) {
      console.log('No user found, redirecting to login');
      navigate('/login');
      return;
    }
    
    fetchApplications();
  }, [navigate]);

  // Fetch applications from backend
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError('');
      
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      if (!user || !user.id) {
        console.log('No user ID found');
        setError('Please login to view applications');
        setLoading(false);
        return;
      }
      
      console.log('Fetching applications for user ID:', user.id);
      const data = await api.getUserApplications(user.id);
      console.log('Applications data received:', data);
      
      setApplications(Array.isArray(data) ? data : []);
      
      if (data.length === 0) {
        console.log('No applications found for this user');
      }
      
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Failed to load applications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status?.toUpperCase()) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'REVIEWING': return 'bg-blue-100 text-blue-800';
      case 'ACCEPTED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
// Add this function inside your MyApplicationsPage component

const exportMyApplicationsToCSV = () => {
  if (applications.length === 0) {
    alert('No applications to export');
    return;
  }
  
  const headers = ['ID', 'University', 'Program', 'Status', 'Application Date', 'Fee Status'];
  const rows = applications.map(app => [
    app.id,
    app.university?.name || 'N/A',
    app.program?.name || 'N/A',
    app.status,
    new Date(app.applicationDate).toLocaleDateString(),
    app.applicationFeeStatus || 'PENDING'
  ]);
  
  const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `my_applications_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  
  alert('Applications exported successfully!');
};

  
  const getStatusIcon = (status: string) => {
    switch(status?.toUpperCase()) {
      case 'PENDING': return '⏳';
      case 'REVIEWING': return '📖';
      case 'ACCEPTED': return '✅';
      case 'REJECTED': return '❌';
      default: return '📝';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A8F] mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
  <div>
    <h1 className="text-3xl font-bold text-[#1E3A8F]">My Applications</h1>
    <p className="text-gray-500 mt-1">Track your university applications in real-time</p>
  </div>
  <div className="flex gap-3">
    {/* Export Button for Student */}
    <button 
      onClick={exportMyApplicationsToCSV}
      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 flex items-center gap-2"
    >
      📊 Export My Data
    </button>
    <button 
      onClick={() => navigate('/admission')} 
      className="bg-[#00C7B1] text-white px-6 py-2 rounded-lg hover:bg-[#00b5a1] transition"
    >
      + New Application
    </button>
  </div>
</div>
<div className="flex justify-between items-center mb-8">
  
</div>
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg text-red-700">
            ❌ {error}
          </div>
        )}

        {/* No Applications */}
        {!error && applications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
            <p className="text-gray-500 mb-4">Start your university journey by applying now!</p>
            <button onClick={() => navigate('/admission')} className="bg-[#00C7B1] text-white px-6 py-2 rounded-lg">Apply Now</button>
          </div>
        )}

        {/* Applications List */}
        {applications.length > 0 && (
          <div className="space-y-4">
            {/* Statistics Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-4 text-center">
                <div className="text-2xl font-bold text-[#1E3A8F]">{applications.length}</div>
                <div className="text-sm text-gray-500">Total</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{applications.filter(a => a.status === 'PENDING').length}</div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{applications.filter(a => a.status === 'ACCEPTED').length}</div>
                <div className="text-sm text-gray-500">Accepted</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{applications.filter(a => a.status === 'REVIEWING').length}</div>
                <div className="text-sm text-gray-500">Reviewing</div>
              </div>
            </div>

            {/* Applications Cards */}
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getStatusIcon(app.status)}</span>
                        <h3 className="text-xl font-bold text-[#1E3A8F]">{app.university?.name || 'University'}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(app.status)}`}>
                          {app.status || 'PENDING'}
                        </span>
                      </div>
                      <p className="text-gray-600">Program: {app.program?.name || 'Program'}</p>
                      <p className="text-gray-600">Degree: {app.program?.degree || 'N/A'}</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Applied on: {app.applicationDate ? new Date(app.applicationDate).toLocaleDateString() : 'N/A'}
                      </p>
                      {app.applicationFeeStatus === 'PAID' && (
                        <p className="text-sm text-green-600 mt-1">✓ Fee Paid</p>
                      )}
                    </div>
                    <button 
                      onClick={() => setSelectedApp(app)}
                      className="px-4 py-2 border border-[#1E3A8F] text-[#1E3A8F] rounded-lg hover:bg-[#1E3A8F] hover:text-white transition"
                    >
                      View Details
                    </button>
                    
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Application Progress</span>
                      <span>
                        {app.status === 'PENDING' && 'Step 1/4'}
                        {app.status === 'REVIEWING' && 'Step 2/4'}
                        {app.status === 'ACCEPTED' && 'Step 4/4'}
                        {app.status === 'REJECTED' && 'Completed'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          app.status === 'PENDING' ? 'bg-yellow-500 w-1/4' :
                          app.status === 'REVIEWING' ? 'bg-blue-500 w-2/4' :
                          app.status === 'ACCEPTED' ? 'bg-green-500 w-full' :
                          'bg-red-500 w-full'
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Application Detail Modal */}
        {selectedApp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedApp(null)}>
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[#1E3A8F]">Application Details</h2>
                  <button onClick={() => setSelectedApp(null)} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><label className="font-semibold">Student Name:</label> <p>{selectedApp.studentName}</p></div>
                    <div><label className="font-semibold">Email:</label> <p>{selectedApp.studentEmail}</p></div>
                    <div><label className="font-semibold">Phone:</label> <p>{selectedApp.studentPhone}</p></div>
                    <div><label className="font-semibold">University:</label> <p>{selectedApp.university?.name || 'N/A'}</p></div>
                    <div><label className="font-semibold">Program:</label> <p>{selectedApp.program?.name || 'N/A'}</p></div>
                    <div><label className="font-semibold">Qualifications:</label> <p>{selectedApp.academicQualification}</p></div>
                    <div><label className="font-semibold">Status:</label> <p className={`inline-block px-2 py-1 rounded ${getStatusColor(selectedApp.status)}`}>{selectedApp.status}</p></div>
                    <div><label className="font-semibold">Application Date:</label> <p>{selectedApp.applicationDate ? new Date(selectedApp.applicationDate).toLocaleString() : 'N/A'}</p></div>
                  </div>
                  
                  {selectedApp.documentPath && (
                    <div><label className="font-semibold">Documents:</label> <a href={`http://localhost:8081/${selectedApp.documentPath}`} target="_blank" className="text-[#00C7B1] hover:underline">View Document</a></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}