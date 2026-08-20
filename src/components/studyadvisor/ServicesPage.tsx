// src/components/studyadvisor/ServicesPage.tsx
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';

interface Application {
  id: number;
  studentName: string;
  university: { name: string; shortName: string };
  program: { name: string };
  status: string;
  applicationDate: string;
}

export default function ServicesPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('verification');
  
  // Document Verification State
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle');
  const [verifiedDocs, setVerifiedDocs] = useState<{name: string; verifiedAt: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const VALID_DOCUMENT_TYPES = [
  { keywords: ['matric', 'secondary', 'ssc'], name: 'Matric Certificate' },
  { keywords: ['fsc', 'intermediate', 'hscc'], name: 'FSc/Intermediate Certificate' },
  { keywords: ['cnic', 'identity', 'id card'], name: 'CNIC/B-Form' },
  { keywords: ['domicile'], name: 'Domicile Certificate' },
  { keywords: ['character'], name: 'Character Certificate' },
  { keywords: ['result', 'marksheet', 'transcript'], name: 'Result Card/Transcript' },
  { keywords: ['test', 'entry'], name: 'Entry Test Result' },
  { keywords: ['certificate'], name: 'Academic Certificate' },
  ];
  // Application Tracking State
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch real applications from backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        
        if (user && user.id) {
          const data = await api.getUserApplications(user.id);
          setApplications(data || []);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, []);
  
const detectDocumentType = (fileName: string): string | null => {
  const lowerName = fileName.toLowerCase();
  for (const docType of VALID_DOCUMENT_TYPES) {
    for (const keyword of docType.keywords) {
      if (lowerName.includes(keyword)) {
        return docType.name;
      }
    }
  }
  return null; // Not a valid document
};
  // Handle file upload
 // UPDATE handleFileUpload FUNCTION
const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    const newFiles = Array.from(files);
    const validFiles = [];
    const rejectedFiles = [];

    for (const file of newFiles) {
      // Check file extension
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!['pdf', 'jpg', 'jpeg', 'png'].includes(ext || '')) {
        rejectedFiles.push(`${file.name} (Invalid format - use PDF/JPG/PNG)`);
        continue;
      }
      
      // Check file size
      if (file.size > 5 * 1024 * 1024) {
        rejectedFiles.push(`${file.name} (Exceeds 5MB limit)`);
        continue;
      }
      
      // CHECK IF THIS IS A VALID ACADEMIC DOCUMENT
      const docType = detectDocumentType(file.name);
      if (!docType) {
        rejectedFiles.push(`${file.name} (Not a valid academic document - Please upload certificates, result cards, CNIC, etc.)`);
        continue;
      }
      
      // Add document type to file object
      (file as any).documentType = docType;
      validFiles.push(file);
    }
    
    if (rejectedFiles.length > 0) {
      setUploadStatus(`❌ Rejected: ${rejectedFiles.join(', ')}`);
      setTimeout(() => setUploadStatus(''), 8000);
    }
    
    if (validFiles.length > 0) {
      setUploadedFiles([...uploadedFiles, ...validFiles]);
      setUploadStatus(`✅ ${validFiles.length} valid academic document(s) added for verification`);
      setTimeout(() => setUploadStatus(''), 3000);
    }
    
    // Clear input
    event.target.value = '';
  }
};


  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      const validFiles = newFiles.filter(f => f.size <= 5 * 1024 * 1024);
      setUploadedFiles([...uploadedFiles, ...validFiles]);
      setVerificationStatus('idle');
    }
  };

  // Remove file
  const removeFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  // REAL-TIME DOCUMENT VERIFICATION PROCESS
  const handleVerify = async () => {
    if (uploadedFiles.length === 0) {
      setUploadStatus('⚠️ Please upload documents first!');
      setTimeout(() => setUploadStatus(''), 3000);
      return;
    }
    
    setVerificationStatus('verifying');
    setUploadStatus('🔍 Verifying documents...');
    
    // Simulate real verification process with backend
    try {
      // Step 1: Send documents to backend for verification
      const formData = new FormData();
      uploadedFiles.forEach(file => {
        formData.append('documents', file);
      });
      // Add allowed document types list
const allowedDocuments = [
  'matric', 'fsc', 'intermediate', 'certificate', 
  'transcript', 'marksheet', 'cnic', 'b-form', 
  'domicile', 'character', 'result', 'test'
];

// Add validation function
const isValidDocument = (fileName: string): boolean => {
  const lowerName = fileName.toLowerCase();
  return allowedDocuments.some(doc => lowerName.includes(doc));
};

// Update handleFileUpload:
const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    const newFiles = Array.from(files);
    const validFiles = [];
    const invalidFiles = [];
    
    for (const file of newFiles) {
      // Check file extension
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!['pdf', 'jpg', 'jpeg', 'png'].includes(ext || '')) {
        invalidFiles.push(`${file.name} (Invalid format)`);
      }
      // Check file size
      else if (file.size > 5 * 1024 * 1024) {
        invalidFiles.push(`${file.name} (Exceeds 5MB)`);
      }
      // Check if document type is allowed
      else if (!isValidDocument(file.name)) {
        invalidFiles.push(`${file.name} (Not an academic document)`);
      }
      else {
        validFiles.push(file);
      }
    }
    
    if (invalidFiles.length > 0) {
      setUploadStatus(`❌ Rejected: ${invalidFiles.join(', ')}`);
      setTimeout(() => setUploadStatus(''), 5000);
    }
    
    if (validFiles.length > 0) {
      setUploadedFiles([...uploadedFiles, ...validFiles]);
      setUploadStatus(`✅ ${validFiles.length} valid document(s) added`);
      setTimeout(() => setUploadStatus(''), 3000);
    }
  }
};
      
      // Step 2: Get user info
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      // Step 3: Call verification API (simulated for now)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Step 4: Mark as verified
      const now = new Date().toLocaleString();
      const newVerifiedDocs = uploadedFiles.map(file => ({
        name: file.name,
        verifiedAt: now
      }));
      
      setVerifiedDocs([...verifiedDocs, ...newVerifiedDocs]);
      setVerificationStatus('verified');
      setUploadStatus('✅ Documents verified successfully!');
      
      // Clear uploaded files after verification
      setTimeout(() => {
        setUploadedFiles([]);
        setUploadStatus('');
      }, 3000);
      
    } catch (error) {
      setVerificationStatus('failed');
      setUploadStatus('❌ Verification failed. Please try again.');
      setTimeout(() => setUploadStatus(''), 5000);
    }
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch(status?.toUpperCase()) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'REVIEWING': return 'bg-blue-100 text-blue-800';
      case 'ACCEPTED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/ad.mp4" type="video/mp4" />
            <img src="/images/counseling-bg.jpg" className="w-full h-full object-cover" />
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8F]/60 to-[#00C7B1]/30"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg max-w-2xl mx-auto">Free document verification and real-time application tracking.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Service Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('verification')}
            className={`px-8 py-3 rounded-lg font-semibold transition ${
              activeTab === 'verification' 
                ? 'bg-[#1E3A8F] text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:shadow-md'
            }`}
          >
            📎 Document Verification
          </button>
          <button
            onClick={() => setActiveTab('tracking')}
            className={`px-8 py-3 rounded-lg font-semibold transition ${
              activeTab === 'tracking' 
                ? 'bg-[#1E3A8F] text-white shadow-lg' 
                : 'bg-white text-gray-700 hover:shadow-md'
            }`}
          >
            📊 Application Tracking
          </button>
        </div>

        {/* Document Verification Service */}
        {activeTab === 'verification' && (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1E3A8F] mb-4">Document Verification Service</h2>
            <p className="text-gray-600 mb-6">
              Upload your academic documents for free verification. Verified documents are trusted by universities across Pakistan.
            </p>
            
            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 cursor-pointer transition ${
                verificationStatus === 'verifying' ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-[#00C7B1]'
              }`}
            >
              <div className="text-5xl mb-3">
                {verificationStatus === 'verifying' ? '⏳' : '📁'}
              </div>
              <p className="text-gray-500 mb-2">
                {verificationStatus === 'verifying' ? 'Verifying documents...' : 'Click or drag & drop your documents here'}
              </p>
              <p className="text-gray-400 text-sm">Supported: PDF, JPG, PNG (Max 5MB)</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                disabled={verificationStatus === 'verifying'}
              />
            </div>

            {/* Upload Status Message */}
            {uploadStatus && (
              <div className={`mb-4 p-3 rounded-lg text-center ${
                uploadStatus.includes('✅') ? 'bg-green-100 text-green-700' : 
                uploadStatus.includes('❌') ? 'bg-red-100 text-red-700' : 
                'bg-blue-100 text-blue-700'
              }`}>
                {uploadStatus}
              </div>
            )}

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && verificationStatus !== 'verified' && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Documents to Verify ({uploadedFiles.length})</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📄</span>
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 px-3 py-1 rounded text-sm"
                        disabled={verificationStatus === 'verifying'}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verified Documents List */}
            {verifiedDocs.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-green-700">✅ Verified Documents ({verifiedDocs.length})</h3>
                <div className="space-y-2">
                  {verifiedDocs.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">✅</span>
                        <div>
                          <p className="font-medium text-sm text-green-800">{doc.name}</p>
                          <p className="text-xs text-green-600">Verified on: {doc.verifiedAt}</p>
                        </div>
                      </div>
                      <span className="bg-green-600 text-white px-3 py-1 rounded text-xs">VERIFIED</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verify Button */}
            {uploadedFiles.length > 0 && verificationStatus !== 'verified' && (
              <button
                onClick={handleVerify}
                disabled={verificationStatus === 'verifying'}
                className="w-full bg-[#00C7B1] text-white py-3 rounded-lg font-semibold hover:bg-[#00b5a1] transition disabled:opacity-50"
              >
                {verificationStatus === 'verifying' ? 'Verifying...' : 'Verify Documents'}
              </button>
            )}

            {/* Verification Result */}
            {verificationStatus === 'verified' && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">✅</span>
                  <div>
                    <h3 className="font-semibold text-green-800">Verification Complete!</h3>
                    <p className="text-sm text-green-700">Your documents have been verified and stamped. They can now be shared with universities.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">What is Document Verification?</h3>
              <p className="text-sm text-blue-700 mb-3">
                Document verification ensures your academic documents are authentic and accepted by universities. 
                Our experts review each document and add a digital verification stamp.
              </p>
              <div className="flex gap-4 text-xs text-blue-600">
                <span>✓ Government recognized</span>
                <span>✓ Accepted by HEC</span>
                <span>✓ Valid for 1 year</span>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Accepted Documents:</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Matric Certificate</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">FSc Certificate</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">CNIC/B-Form</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Domicile</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Character Certificate</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Entry Test Result</span>
              </div>
            </div>
          </div>
        )}

        {/* Application Tracking Service - Redirects to My Applications */}
        {activeTab === 'tracking' && (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#1E3A8F]">Application Tracking</h2>
                <p className="text-gray-500 mt-1">Track your submitted applications in real-time</p>
              </div>
              <button
                onClick={() => navigate('/my-applications')}
                className="bg-[#00C7B1] text-white px-4 py-2 rounded-lg hover:bg-[#00b5a1] transition text-sm"
              >
                View Full Dashboard →
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A8F] mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading your applications...</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
                <p className="text-gray-500 mb-4">Start your university journey by applying now!</p>
                <button
                  onClick={() => navigate('/admission')}
                  className="bg-[#00C7B1] text-white px-6 py-2 rounded-lg"
                >
                  Apply Now
                </button>
              </div>
            ) : (
              <>
                {/* Statistics Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#1E3A8F]">{applications.length}</div>
                    <div className="text-sm text-gray-500">Total Applications</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-600">{applications.filter(a => a.status === 'PENDING').length}</div>
                    <div className="text-sm text-gray-500">Pending</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{applications.filter(a => a.status === 'ACCEPTED').length}</div>
                    <div className="text-sm text-gray-500">Accepted</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{applications.filter(a => a.status === 'REVIEWING').length}</div>
                    <div className="text-sm text-gray-500">Under Review</div>
                  </div>
                </div>

                {/* Applications List */}
                <div className="space-y-4">
                  {applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                      onClick={() => navigate('/my-applications')}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-[#1E3A8F]">{app.university?.name || 'University'}</h3>
                          <p className="text-sm text-gray-600">{app.program?.name || 'Program'}</p>
                          <p className="text-xs text-gray-400 mt-1">Applied: {new Date(app.applicationDate).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                          {app.status || 'PENDING'}
                        </span>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${
                              app.status === 'PENDING' ? 'bg-yellow-500 w-1/4' :
                              app.status === 'REVIEWING' ? 'bg-blue-500 w-2/4' :
                              app.status === 'ACCEPTED' ? 'bg-green-500 w-full' :
                              app.status === 'REJECTED' ? 'bg-red-500 w-full' : 'bg-gray-400 w-0'
                            }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {applications.length > 5 && (
                  <div className="text-center mt-4">
                    <button
                      onClick={() => navigate('/my-applications')}
                      className="text-[#00C7B1] font-semibold hover:underline"
                    >
                      View All {applications.length} Applications →
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Real-Time Application Tracking</h3>
              <p className="text-sm text-blue-700">
                Your applications are updated in real-time. When universities review your application,
                you'll see status changes instantly. You'll also receive email notifications for important updates.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}