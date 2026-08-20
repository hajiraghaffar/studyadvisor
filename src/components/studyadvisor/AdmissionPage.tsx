// src/components/studyadvisor/AdmissionPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '@/services/api';
import DeadlineReminder from '@/components/studyadvisor/DeadlineReminder';

interface University {
  id: number;
  name: string;
  shortName: string;
}

interface Program {
  id: number;
  name: string;
  category: string;
  degree: string;
  duration: string;
  fee: string;
  universityId?: number;
  university?: {
    id: number;
    name: string;
    shortName: string;
  };
}

export default function AdmissionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('apply');
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [universities, setUniversities] = useState<University[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [applicationId, setApplicationId] = useState<number | null>(null);

  // ============ FIXED: Load saved profile on page load ============
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    programId: '',
    universityId: '',
    qualification: '',
    message: '',
    paymentMethod: ''
  });

  // THIS IS THE KEY FUNCTION - Load saved profile when component mounts
  useEffect(() => {
    console.log('🔄 Loading saved profile from localStorage...');
    
    // Load student profile
    const savedProfile = localStorage.getItem('studentProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        console.log('✅ Found saved profile:', profile);
        setFormData(prev => ({
          ...prev,
          name: profile.name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          qualification: profile.qualification || ''
        }));
      } catch (e) {
        console.error('Error parsing saved profile:', e);
      }
    } else {
      console.log('ℹ️ No saved profile found in localStorage');
    }
    
    // Also load from logged-in user if available
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log('👤 Logged-in user:', user);
        // Optionally fill email from user if profile doesn't have it
        setFormData(prev => ({
          ...prev,
          email: prev.email || user.email || ''
        }));
      } catch (e) {
        console.error('Error parsing user:', e);
      }
    }
  }, []); // Empty array = runs ONCE when page loads

  // Save profile whenever form data changes
  const saveStudentProfile = (data: any) => {
    const profile = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      qualification: data.qualification
    };
    localStorage.setItem('studentProfile', JSON.stringify(profile));
    console.log('💾 Saved profile to localStorage:', profile);
  };

  // Pre-fill from navigation state (when clicking "Apply Now" from university/program page)
  useEffect(() => {
    const state = location.state as any;
    if (state) {
      console.log('📍 Navigation state received:', state);
      if (state.universityId) {
        setFormData(prev => ({ ...prev, universityId: String(state.universityId) }));
      }
      if (state.programId) {
        setFormData(prev => ({ ...prev, programId: String(state.programId) }));
      }
    }
  }, [location]);

  // Fetch universities and programs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [unis, progs] = await Promise.all([
          api.getUniversities(),
          api.getPrograms()
        ]);
        setUniversities(unis);
        setPrograms(progs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Filter programs when university changes
  useEffect(() => {
    if (formData.universityId) {
      const universityIdNum = parseInt(formData.universityId);
      const filtered = programs.filter(prog => {
        const progUniId = prog.universityId || prog.university?.id;
        return progUniId === universityIdNum;
      });
      setFilteredPrograms(filtered);
    } else {
      setFilteredPrograms([]);
    }
  }, [formData.universityId, programs]);

  // FIXED: Save profile on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
    setSubmitError('');
    
    // Save to localStorage when profile fields change
    if (['name', 'email', 'phone', 'qualification'].includes(e.target.name)) {
      saveStudentProfile(newFormData);
    }
  };

// Add this function before handleFileChange
const allowedDocumentTypes = [
  'Matric Certificate', 'FSc Certificate', 'Intermediate Certificate',
  'CNIC', 'B-Form', 'Domicile', 'Character Certificate', 
  'Entry Test Result', 'Transcript', 'Passport Size Photo'
];

const validateDocument = (file: File) => {
  const fileName = file.name.toLowerCase();
  const isPdfOrImage = file.type === 'application/pdf' || 
                       file.type === 'image/jpeg' || 
                       file.type === 'image/png';
  
  if (!isPdfOrImage) {
    alert('❌ Only PDF, JPG, PNG files are allowed');
    return false;
  }
  
  if (file.size > 5 * 1024 * 1024) {
    alert('❌ File size must be less than 5MB');
    return false;
  }
  
  return true;
};

// Update handleFileChange:
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    if (validateDocument(e.target.files[0])) {
      setSelectedFile(e.target.files[0]);
    } else {
      e.target.value = ''; // Clear the input
    }
  }
};

  const uploadDocument = async (appId: number) => {
    if (!selectedFile) return true;
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('applicationId', appId.toString());
    
    try {
      const response = await fetch('http://localhost:8081/api/applications/upload-document', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Upload error:', error);
      return false;
    }
  };
  const [feeAmount, setFeeAmount] = useState(1000);
const [paymentStatus, setPaymentStatus] = useState('pending');

// Update fee when program changes
useEffect(() => {
  if (formData.programId) {
    const selectedProgram = programs.find(p => p.id === parseInt(formData.programId));
    if (selectedProgram) {
      // Extract numeric fee or use default
      const fee = selectedProgram.fee ? parseInt(selectedProgram.fee.replace(/[^0-9]/g, '')) : 1000;
      setFeeAmount(fee);
    }
  }
}, [formData.programId, programs]);

// Handle payment selection
const handlePaymentSelect = (method: string) => {
  setFormData({ ...formData, paymentMethod: method });
  setPaymentStatus('processing');
  
  // Simulate payment processing (for demo)
  setTimeout(() => {
    setPaymentStatus('paid');
    alert(`Payment of Rs. ${feeAmount} via ${method} successful!`);
  }, 1500);
};

  // FIXED: Submit handler with save before submit
  // REPLACE your entire handleSubmit function with this:

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // ============ STEP 1: Validate Required Fields ============
  if (!formData.universityId) {
    setSubmitError('Please select a university');
    return;
  }
  
  if (!formData.programId) {
    setSubmitError('Please select a program');
    return;
  }
  
  // ============ STEP 2: Validate Payment Method (AFTER profile) ============
  if (!formData.paymentMethod) {
    setSubmitError('❌ Please select a payment method (Credit Card, JazzCash, or EasyPaisa)');
    return;
  }
  
  // ============ STEP 3: Check if payment is completed ============
  if (paymentStatus !== 'paid') {
    setSubmitError('❌ Please complete payment before submitting application');
    return;
  }
  
  setLoading(true);
  setSubmitError('');
  setUploadProgress(10);
  
  try {
    // Save profile before submitting
    saveStudentProfile(formData);
    setUploadProgress(20);
    
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    setUploadProgress(30);
    
    const applicationData = {
      studentName: formData.name,
      studentEmail: formData.email,
      studentPhone: formData.phone,
      academicQualification: formData.qualification,
      universityId: parseInt(formData.universityId),
      programId: parseInt(formData.programId),
      userId: user?.id || null,
      status: 'PENDING',
      applicationFee: feeAmount,
      paymentMethod: formData.paymentMethod,
      paymentStatus: 'PAID',
      transactionId: 'TXN_' + Date.now(),
      applicationFeeStatus: 'PAID'
    };
    
    setUploadProgress(50);
    console.log('Submitting application:', applicationData);
    
    const response = await api.submitApplication(applicationData);
    console.log('Server response:', response);
    
    setUploadProgress(70);
    
    if (response && (response.id || response.success)) {
      const appId = response.id || response.applicationId;
      
      if (selectedFile && appId) {
        const uploadSuccess = await uploadDocument(appId);
        if (!uploadSuccess) {
          console.warn('Document upload failed, but application was submitted');
        }
      }
      
      setUploadProgress(100);
      setSubmitSuccess(true);
      
      // Reset only university/program selection, keep profile data
      setFormData(prev => ({
        ...prev,
        universityId: '',
        programId: '',
        message: '',
        paymentMethod: ''  // Reset payment method for next application
      }));
      setPaymentStatus('pending');  // Reset payment status
      setSelectedFile(null);
      
      setTimeout(() => {
        setSubmitSuccess(false);
        setUploadProgress(0);
        navigate('/my-applications');
      }, 2000);
    } else {
      setSubmitError(response?.message || 'Application submission failed');
    }
  } catch (error) {
    console.error('Submission error:', error);
    setSubmitError('Failed to submit application. Please try again.');
  } finally {
    setLoading(false);
  }
};
  // ... (rest of your component remains the same - deadlines, requirements, return statement)
  const deadlines = [
    { university: "NUST", program: "Undergraduate", deadline: "December 31, 2025", status: "Closed" },
    { university: "LUMS", program: "MBA", deadline: "January 15, 2026", status: "Closed" },
    { university: "UET", program: "Engineering", deadline: "January 30, 2026", status: "Closed" },
    { university: "Karachi University", program: "MBBS", deadline: "February 15, 2026", status: "Closed" },
  ];

  const requirements = [
    { program: "Engineering", requirements: "FSc Pre-Engineering (60%+), Entry Test, Interview" },
    { program: "Medical", requirements: "FSc Pre-Medical (65%+), MDCAT, Interview" },
    { program: "Business", requirements: "Intermediate (60%+), University Test, Personal Statement" },
    { program: "Computer Science", requirements: "FSc/ICS (60%+), Entry Test, Programming Aptitude" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Header */}
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
          <h1 className="text-4xl font-bold mb-4">Admission Guide 2025-26</h1>
          <p className="text-lg max-w-2xl mx-auto">Complete guide to university admissions in Pakistan. Apply online, track applications, and receive offers.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
         <DeadlineReminder />
        {/* Success Message */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg text-green-700 text-center">
            ✅ Application submitted successfully! Redirecting to My Applications...
          </div>
        )}
        
        {/* Error Message */}
        {submitError && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg text-red-700 text-center">
            ❌ {submitError}
          </div>
        )}

        {/* Upload Progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mb-6">
            <div className="bg-gray-200 rounded-full h-2">
              <div className="bg-[#00C7B1] h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-1 text-center">Submitting application... {uploadProgress}%</p>
          </div>
        )}

        {/* Debug Info - Remove this in production */}
        <div className="mb-4 p-2 bg-gray-100 rounded text-xs text-gray-500">
          <details>
            <summary>Debug: Saved Profile</summary>
            <pre>{JSON.stringify(localStorage.getItem('studentProfile'), null, 2)}</pre>
          </details>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b mb-8">
          <button onClick={() => setActiveTab('apply')} className={`px-6 py-3 font-semibold transition ${activeTab === 'apply' ? 'border-b-2 border-[#00C7B1] text-[#00C7B1]' : 'text-gray-500 hover:text-[#1E3A8F]'}`}>✍️ Apply Now</button>
          <button onClick={() => setActiveTab('guide')} className={`px-6 py-3 font-semibold transition ${activeTab === 'guide' ? 'border-b-2 border-[#00C7B1] text-[#00C7B1]' : 'text-gray-500 hover:text-[#1E3A8F]'}`}>📖 Admission Guide</button>
          <button onClick={() => setActiveTab('deadlines')} className={`px-6 py-3 font-semibold transition ${activeTab === 'deadlines' ? 'border-b-2 border-[#00C7B1] text-[#00C7B1]' : 'text-gray-500 hover:text-[#1E3A8F]'}`}>⏰ Deadlines</button>
          <button onClick={() => setActiveTab('requirements')} className={`px-6 py-3 font-semibold transition ${activeTab === 'requirements' ? 'border-b-2 border-[#00C7B1] text-[#00C7B1]' : 'text-gray-500 hover:text-[#1E3A8F]'}`}>📋 Requirements</button>
        </div>

        {/* Apply Now Tab */}
        {activeTab === 'apply' && (
          <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-[#1E3A8F] mb-6">Application Form</h2>
            
            {/* Show saved profile indicator */}
            {localStorage.getItem('studentProfile') && (
              <div className="mb-4 p-2 bg-green-50 text-green-700 rounded text-sm">
                ✓ Your saved information has been loaded. Just select university and program to apply again!
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#00C7B1]" required />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#00C7B1]" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 mb-2">Phone *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#00C7B1]" required />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Qualifications *</label>
                  <input type="text" name="qualification" value={formData.qualification} onChange={handleInputChange} placeholder="e.g., FSc (Pre-Engineering) 75%" className="w-full p-3 border rounded-lg" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 mb-2">Select University *</label>
                  <select name="universityId" value={formData.universityId} onChange={handleInputChange} className="w-full p-3 border rounded-lg" required>
                    <option value="">Select University</option>
                    {universities.map(uni => (<option key={uni.id} value={uni.id}>{uni.name}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Select Program *</label>
                  <select name="programId" value={formData.programId} onChange={handleInputChange} className="w-full p-3 border rounded-lg" required disabled={!formData.universityId}>
                    <option value="">{!formData.universityId ? 'First select a university' : 'Select Program'}</option>
                    {filteredPrograms.map(prog => (<option key={prog.id} value={prog.id}>{prog.name}</option>))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Upload Documents (Transcript, CNIC, etc.)</label>
                <input type="file" onChange={handleFileChange} accept=".pdf,.jpg,.png" className="w-full p-3 border rounded-lg" />
                <p className="text-xs text-gray-400 mt-1">Accepted: PDF, JPG, PNG (Max 5MB)</p>
                {selectedFile && (<p className="text-xs text-green-600 mt-1">✓ Selected: {selectedFile.name}</p>)}
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Additional Information</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3} className="w-full p-3 border rounded-lg" placeholder="Any specific questions or requirements..."></textarea>
              </div>
{/* Fee Display Section */}
<div className="p-4 bg-gray-50 rounded-lg mb-4">
  <div className="flex justify-between items-center mb-3">
    <span className="font-semibold text-[#1E3A8F]">Application Fee:</span>
    <span className="text-2xl font-bold text-[#00C7B1]">Rs. {feeAmount.toLocaleString()}</span>
  </div>
  <p className="text-xs text-gray-500 mb-3">Fee includes application processing and document verification</p>
  
  {/* Payment Method Selection */}
  <div className="mt-3">
    <label className="block text-sm font-medium text-gray-700 mb-2">Select Payment Method</label>
    <div className="grid grid-cols-3 gap-3">
      <button
        type="button"
        onClick={() => handlePaymentSelect('credit_card')}
        className={`p-3 border rounded-lg text-center transition ${formData.paymentMethod === 'credit_card' ? 'border-[#00C7B1] bg-[#00C7B1]/10' : 'border-gray-200 hover:border-gray-300'}`}
      >
        <div className="text-xl mb-1">💳</div>
        <div className="text-xs font-medium">Credit Card</div>
      </button>
      <button
        type="button"
        onClick={() => handlePaymentSelect('jazzcash')}
        className={`p-3 border rounded-lg text-center transition ${formData.paymentMethod === 'jazzcash' ? 'border-[#00C7B1] bg-[#00C7B1]/10' : 'border-gray-200 hover:border-gray-300'}`}
      >
        <div className="text-xl mb-1">📱</div>
        <div className="text-xs font-medium">JazzCash</div>
      </button>
      <button
        type="button"
        onClick={() => handlePaymentSelect('easypaisa')}
        className={`p-3 border rounded-lg text-center transition ${formData.paymentMethod === 'easypaisa' ? 'border-[#00C7B1] bg-[#00C7B1]/10' : 'border-gray-200 hover:border-gray-300'}`}
      >
        <div className="text-xl mb-1">📱</div>
        <div className="text-xs font-medium">EasyPaisa</div>
      </button>
    </div>
  </div>
  
  {/* Payment Status Indicator */}
  {formData.paymentMethod && (
    <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
      <div className="flex items-center gap-2">
        <span className="text-green-600">✓</span>
        <span className="text-sm text-green-700">
          Payment via {formData.paymentMethod.toUpperCase()} - Status: {paymentStatus.toUpperCase()}
        </span>
      </div>
    </div>
  )}
</div>

              <button type="submit" disabled={loading} className="w-full bg-[#00C7B1] text-white py-3 rounded-lg font-semibold hover:bg-[#00b5a1] transition disabled:opacity-50">
                {loading ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </form>
          </div>
        )}

        {/* Guide, Deadlines, Requirements Tabs (same as before) */}
        {activeTab === 'guide' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-[#1E3A8F] mb-4">How to Apply</h2>
              <div className="space-y-6">
                {[{num:"1",title:"Research Universities & Programs",desc:"Explore universities, compare programs."},{num:"2",title:"Check Eligibility & Deadlines",desc:"Review admission requirements and deadlines."},{num:"3",title:"Prepare Documents",desc:"Gather academic transcripts, CNIC, photographs."},{num:"4",title:"Submit Application",desc:"Fill form, upload documents, pay fee."},{num:"5",title:"Track Application Status",desc:"Monitor your application progress."}].map((step,i)=>(<div key={i} className="flex gap-4"><div className="w-10 h-10 bg-[#00C7B1] rounded-full flex items-center justify-center text-white font-bold">{step.num}</div><div><h3 className="font-semibold">{step.title}</h3><p className="text-gray-600">{step.desc}</p></div></div>))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-[#1E3A8F] mb-4">Required Documents</h2>
              {["Matric Certificate", "Intermediate/FSc Certificate", "Domicile", "CNIC/B-Form", "Photographs", "Character Certificate"].map((doc,i)=>(<div key={i} className="flex items-center gap-3 p-2"><input type="checkbox" className="accent-[#00C7B1]" /><span>{doc}</span></div>))}
            </div>
          </div>
        )}

        {activeTab === 'deadlines' && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#1E3A8F] text-white"><tr><th className="p-4 text-left">University</th><th className="p-4 text-left">Program</th><th className="p-4 text-left">Deadline</th><th className="p-4 text-left">Status</th></tr></thead>
              <tbody>{deadlines.map((item,i)=>(<tr key={i} className="border-b"><td className="p-4 font-semibold">{item.university}</td><td className="p-4">{item.program}</td><td className="p-4">{item.deadline}</td><td className="p-4"><span className={`px-2 py-1 rounded text-xs ${item.status==='Open'?'bg-green-100 text-green-700':'bg-yellow-100 text-yellow-700'}`}>{item.status}</span></td></tr>))}</tbody>
            </table>
          </div>
        )}

        {activeTab === 'requirements' && (
          <div className="grid md:grid-cols-2 gap-6">
            {requirements.map((req,i)=>(<div key={i} className="bg-white rounded-lg shadow-md p-6"><h3 className="text-xl font-bold text-[#1E3A8F] mb-3">{req.program}</h3><p className="text-gray-700">{req.requirements}</p></div>))}
          </div>
        )}
      </div>
    </div>
  );
}