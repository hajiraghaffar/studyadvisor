// src/components/studyadvisor/UniversityOffersPage.tsx
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
  applicationFeeStatus: string;
  documentPath?: string;
  program?: {
    id: number;
    name: string;
    degree: string;
    duration: string;
  };
  university?: {
    id: number;
    name: string;
    shortName: string;
  };
  user?: {
    id: number;
    fullName: string;
    email: string;
  };
}

export default function UniversityOffersPage() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [stats, setStats] = useState({ total: 0, pending: 0, accepted: 0, rejected: 0 });

  // Get the logged-in university (for demo, using university ID 1)
  // In real app, this would come from university login
  const universityId = 1; // NUST as example

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
  try {
    setLoading(true);
    const response = await fetch(`http://localhost:8081/api/applications/university/${universityId}`);
    const data = await response.json();
    console.log('Applications for university:', data);
    
    // ✅ Add this check: ensure data is an array before setting state
    if (Array.isArray(data)) {
      setApplications(data);
      // Calculate stats
      const total = data.length;
      const pending = data.filter((a: Application) => a.status === 'PENDING').length;
      const accepted = data.filter((a: Application) => a.status === 'ACCEPTED').length;
      const rejected = data.filter((a: Application) => a.status === 'REJECTED').length;
      setStats({ total, pending, accepted, rejected });
    } else {
      // If API returns an object or null, set empty array
      console.error('API did not return an array:', data);
      setApplications([]);
      setStats({ total: 0, pending: 0, accepted: 0, rejected: 0 });
    }
    
  } catch (error) {
    console.error('Error fetching applications:', error);
    setApplications([]); // ✅ Set empty array on error
    setStats({ total: 0, pending: 0, accepted: 0, rejected: 0 });
  } finally {
    setLoading(false);
  }
};

  const updateApplicationStatus = async (applicationId: number, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:8081/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        // Refresh applications list
        fetchApplications();
        alert(`Application ${newStatus} successfully!`);
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  const getFilteredApplications = () => {
    if (statusFilter === 'ALL') return applications;
    return applications.filter(app => app.status === statusFilter);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'REVIEWING': return 'bg-blue-100 text-blue-800';
      case 'ACCEPTED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'PENDING': return '⏳ Pending Review';
      case 'REVIEWING': return '📖 Under Review';
      case 'ACCEPTED': return '✅ Accepted';
      case 'REJECTED': return '❌ Rejected';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A8F] mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading applications...</p>
        </div>
      </div>
    );
  }

  const filteredApps = getFilteredApplications();

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1E3A8F]">University Offer Management</h1>
          <p className="text-gray-500 mt-1">Review student applications and manage admission offers</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 text-center cursor-pointer hover:shadow-lg transition" onClick={() => setStatusFilter('ALL')}>
            <div className="text-2xl font-bold text-[#1E3A8F]">{stats.total}</div>
            <div className="text-sm text-gray-500">Total Applications</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center cursor-pointer hover:shadow-lg transition" onClick={() => setStatusFilter('PENDING')}>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-500">Pending Review</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center cursor-pointer hover:shadow-lg transition" onClick={() => setStatusFilter('ACCEPTED')}>
            <div className="text-2xl font-bold text-green-600">{stats.accepted}</div>
            <div className="text-sm text-gray-500">Accepted</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center cursor-pointer hover:shadow-lg transition" onClick={() => setStatusFilter('REJECTED')}>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-gray-500">Rejected</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setStatusFilter('ALL')} className={`px-4 py-2 rounded-lg ${statusFilter === 'ALL' ? 'bg-[#1E3A8F] text-white' : 'bg-gray-200 text-gray-700'}`}>All</button>
          <button onClick={() => setStatusFilter('PENDING')} className={`px-4 py-2 rounded-lg ${statusFilter === 'PENDING' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Pending</button>
          <button onClick={() => setStatusFilter('REVIEWING')} className={`px-4 py-2 rounded-lg ${statusFilter === 'REVIEWING' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Reviewing</button>
          <button onClick={() => setStatusFilter('ACCEPTED')} className={`px-4 py-2 rounded-lg ${statusFilter === 'ACCEPTED' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Accepted</button>
          <button onClick={() => setStatusFilter('REJECTED')} className={`px-4 py-2 rounded-lg ${statusFilter === 'REJECTED' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}>Rejected</button>
        </div>

        {/* Applications List */}
        {filteredApps.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">No Applications Found</h3>
            <p className="text-gray-500">No student applications match the selected filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApps.map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-[#1E3A8F]">{app.studentName}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(app.status)}`}>
                          {getStatusBadge(app.status)}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-gray-500">Contact Information</p>
                          <p className="font-medium">📧 {app.studentEmail}</p>
                          <p className="font-medium">📞 {app.studentPhone || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Academic Qualification</p>
                          <p className="font-medium">🎓 {app.academicQualification || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Program Applied</p>
                          <p className="font-medium">📚 {app.program?.name || 'N/A'} ({app.program?.degree || 'N/A'})</p>
                          <p className="text-sm text-gray-400">Duration: {app.program?.duration || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Application Date</p>
                          <p className="font-medium">📅 {new Date(app.applicationDate).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-400">Fee Status: {app.applicationFeeStatus || 'PENDING'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons - CLICKABLE */}
                  <div className="mt-6 flex gap-3 border-t pt-4">
                    {app.status === 'PENDING' && (
                      <>
                        <button 
                          onClick={() => updateApplicationStatus(app.id, 'REVIEWING')}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          Start Review
                        </button>
                        <button 
                          onClick={() => setSelectedApp(app)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                          View Details
                        </button>
                      </>
                    )}
                    {app.status === 'REVIEWING' && (
                      <>
                        <button 
                          onClick={() => updateApplicationStatus(app.id, 'ACCEPTED')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                          ✅ Accept Application
                        </button>
                        <button 
                          onClick={() => updateApplicationStatus(app.id, 'REJECTED')}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                          ❌ Reject Application
                        </button>
                      </>
                    )}
                    {(app.status === 'ACCEPTED' || app.status === 'REJECTED') && (
                      <button 
                        onClick={() => setSelectedApp(app)}
                        className="px-4 py-2 border border-[#1E3A8F] text-[#1E3A8F] rounded-lg hover:bg-[#1E3A8F] hover:text-white transition"
                      >
                        View Decision Details
                      </button>
                    )}
                    {app.documentPath && (
                      <a 
                        href={`http://localhost:8081/${app.documentPath}`} 
                        target="_blank" 
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      >
                        📎 View Documents
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Application Detail Modal - CLICKABLE */}
        {selectedApp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedApp(null)}>
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[#1E3A8F]">Application Details</h2>
                  <button onClick={() => setSelectedApp(null)} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
                </div>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-gray-600">Student Name:</label>
                      <p className="mt-1">{selectedApp.studentName}</p>
                    </div>
                    <div>
                      <label className="font-semibold text-gray-600">Email:</label>
                      <p className="mt-1">{selectedApp.studentEmail}</p>
                    </div>
                    <div>
                      <label className="font-semibold text-gray-600">Phone:</label>
                      <p className="mt-1">{selectedApp.studentPhone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="font-semibold text-gray-600">Status:</label>
                      <p className={`mt-1 inline-block px-2 py-1 rounded ${getStatusColor(selectedApp.status)}`}>
                        {selectedApp.status}
                      </p>
                    </div>
                    <div>
                      <label className="font-semibold text-gray-600">Program:</label>
                      <p className="mt-1">{selectedApp.program?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="font-semibold text-gray-600">Degree:</label>
                      <p className="mt-1">{selectedApp.program?.degree || 'N/A'}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="font-semibold text-gray-600">Academic Qualification:</label>
                      <p className="mt-1">{selectedApp.academicQualification || 'Not specified'}</p>
                    </div>
                    <div className="col-span-2">
                      <label className="font-semibold text-gray-600">Application Date:</label>
                      <p className="mt-1">{new Date(selectedApp.applicationDate).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {selectedApp.documentPath && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="font-semibold mb-2">Uploaded Documents:</p>
                      <a 
                        href={`http://localhost:8081/${selectedApp.documentPath}`} 
                        target="_blank" 
                        className="text-[#00C7B1] hover:underline flex items-center gap-2"
                      >
                        📄 View Document
                      </a>
                    </div>
                  )}
                  
                  <div className="mt-6 border-t pt-4 flex gap-3">
                    {selectedApp.status === 'PENDING' && (
                      <button 
                        onClick={() => { updateApplicationStatus(selectedApp.id, 'REVIEWING'); setSelectedApp(null); }}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                      >
                        Start Review
                      </button>
                    )}
                    {selectedApp.status === 'REVIEWING' && (
                      <>
                        <button 
                          onClick={() => { updateApplicationStatus(selectedApp.id, 'ACCEPTED'); setSelectedApp(null); }}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                        >
                          ✅ Accept
                        </button>
                        <button 
                          onClick={() => { updateApplicationStatus(selectedApp.id, 'REJECTED'); setSelectedApp(null); }}
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
                        >
                          ❌ Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}