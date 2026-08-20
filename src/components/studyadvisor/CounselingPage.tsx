// src/components/studyadvisor/CounselingPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';

interface University {
  id: number;
  name: string;
  shortName: string;
  city: string;
  type: string;
  ranking: number;
}

export default function CounselingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('career');
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState('');
  
  // Matching tool state
  const [programInterest, setProgramInterest] = useState('');
  const [preferredCity, setPreferredCity] = useState('');
  const [budget, setBudget] = useState('');
  const [matchedUniversities, setMatchedUniversities] = useState<University[]>([]);
  const [matchingLoading, setMatchingLoading] = useState(false);
  
  // Counseling form
  const [counselingForm, setCounselingForm] = useState({
    name: '', email: '', phone: '', education: '', concern: '', preferredDate: ''
  });
  const [counselingLoading, setCounselingLoading] = useState(false);
  const [counselingSuccess, setCounselingSuccess] = useState(false);
  
  // Fetch all universities for matching
  const [allUniversities, setAllUniversities] = useState<University[]>([]);
  
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await api.getUniversities();
        setAllUniversities(data);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };
    fetchUniversities();
  }, []);

  const careerPaths = [
    { title: "Engineering", icon: "⚙️", careers: "Mechanical, Electrical, Civil, Software Engineer", salary: "Rs. 50,000 - 200,000", 
      matching: "Engineering", universities: ["NUST", "UET", "GIKI", "NED"] },
    { title: "Medical", icon: "🩺", careers: "Doctor, Surgeon, Dentist, Pharmacist", salary: "Rs. 100,000 - 500,000",
      matching: "Medical", universities: ["Karachi University", "Dow University", "KMU"] },
    { title: "Business", icon: "📊", careers: "Marketing, Finance, HR, Entrepreneur", salary: "Rs. 60,000 - 300,000",
      matching: "Business", universities: ["LUMS", "IBA", "UMT", "UCP"] },
    { title: "Computer Science", icon: "💻", careers: "Developer, Data Scientist, AI Engineer", salary: "Rs. 80,000 - 400,000",
      matching: "CS", universities: ["FAST", "NUST", "COMSATS", "ITU"] },
  ];

  // Career Quiz Questions
  const quizQuestions = [
  { 
    id: 1, 
    question: "Which subject do you enjoy the most in school?", 
    options: ["Mathematics & Physics", "Biology & Chemistry", "Economics & Accounting", "Computer & Programming"] 
  },
  { 
    id: 2, 
    question: "What type of degree are you interested in?", 
    options: ["Engineering Degree (BE/BS)", "Medical Degree (MBBS/BDS)", "Business Degree (BBA/BS)", "Computer Science Degree (BS)"] 
  },
  { 
    id: 3, 
    question: "What is your preferred study environment?", 
    options: ["Lab/Workshop based", "Hospital/Clinic based", "Office/Corporate based", "Computer/Remote based"] 
  },
  { 
    id: 4, 
    question: "Which skill would you like to develop?", 
    options: ["Problem Solving & Design", "Patient Care & Diagnosis", "Management & Leadership", "Programming & Development"] 
  },
];

  const handleQuizAnswer = (questionId: number, answer: string) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answer });
  };

const calculateQuizResult = () => {
  const answers = Object.values(quizAnswers);
  
  const engineeringCount = answers.filter(a => 
    a === "Mathematics & Physics" || a === "Engineering Degree (BE/BS)" || a === "Lab/Workshop based" || a === "Problem Solving & Design"
  ).length;
  
  const medicalCount = answers.filter(a => 
    a === "Biology & Chemistry" || a === "Medical Degree (MBBS/BDS)" || a === "Hospital/Clinic based" || a === "Patient Care & Diagnosis"
  ).length;
  
  const businessCount = answers.filter(a => 
    a === "Economics & Accounting" || a === "Business Degree (BBA/BS)" || a === "Office/Corporate based" || a === "Management & Leadership"
  ).length;
  
  const csCount = answers.filter(a => 
    a === "Computer & Programming" || a === "Computer Science Degree (BS)" || a === "Computer/Remote based" || a === "Programming & Development"
  ).length;
  
  if (csCount >= 2) setQuizResult("Computer Science");
  else if (engineeringCount >= 2) setQuizResult("Engineering");
  else if (medicalCount >= 2) setQuizResult("Medical");
  else if (businessCount >= 2) setQuizResult("Business");
  else setQuizResult("Computer Science");
};

  // MATCHING FUNCTION - Real backend filtering
  const handleMatching = async () => {
    setMatchingLoading(true);
    
    let filtered = [...allUniversities];
    
    // Filter by program interest
    if (programInterest === 'Engineering') {
      filtered = filtered.filter(u => ['NUST', 'UET', 'GIKI', 'NED', 'COMSATS'].includes(u.shortName));
    } else if (programInterest === 'Medical') {
      filtered = filtered.filter(u => ['Karachi University', 'Dow University', 'KMU'].includes(u.name) || u.name.includes('Medical'));
    } else if (programInterest === 'Business') {
      filtered = filtered.filter(u => ['LUMS', 'IBA', 'UMT', 'UCP'].includes(u.shortName));
    } else if (programInterest === 'Computer Science') {
      filtered = filtered.filter(u => ['FAST', 'NUST', 'COMSATS', 'ITU'].includes(u.shortName));
    }
    
    // Filter by city
    if (preferredCity && preferredCity !== 'Any') {
      filtered = filtered.filter(u => u.city === preferredCity);
    }
    
    // Filter by budget
    if (budget === 'Below Rs. 200,000') {
      filtered = filtered.filter(u => u.ranking > 5);
    } else if (budget === 'Above Rs. 500,000') {
      filtered = filtered.filter(u => u.ranking <= 5);
    }
    
    setMatchedUniversities(filtered.slice(0, 5));
    setMatchingLoading(false);
  };

  // COUNSELING BOOKING - Real backend
  const handleCounselingSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setCounselingLoading(true);
  
  try {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    const counselingData = {
      studentName: counselingForm.name,
      studentEmail: counselingForm.email,
      studentPhone: counselingForm.phone,
      educationLevel: counselingForm.education,
      concern: counselingForm.concern,
      preferredDate: counselingForm.preferredDate,
      user: user ? { id: user.id } : null
    };
    
    const response = await fetch('http://localhost:8081/api/counseling', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(counselingData),
    });
    
    const result = await response.json();
    
    if (result.success) {
      setCounselingSuccess(true);  // ✅ Show success message
      setCounselingForm({ name: '', email: '', phone: '', education: '', concern: '', preferredDate: '' });
      
      // Auto hide after 5 seconds
      setTimeout(() => setCounselingSuccess(false), 5000);
    } else {
      alert('Failed to submit request. Please try again.');
    }
  } catch (error) {
    console.error('Counseling submission error:', error);
    alert('Error submitting request. Please try again.');
  } finally {
    setCounselingLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20">
  <div className="absolute inset-0 z-0">
    <video autoPlay loop muted playsInline className="w-full h-full object-cover">
      <source src="/videos/ad.mp4" type="video/mp4" />
      <img src="/images/services-bg.jpg" className="w-full h-full object-cover" />
    </video>
    <div className="absolute inset-0 bg-black/50"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8F]/60 to-[#00C7B1]/30"></div>
  </div>
  <div className="relative z-10 container mx-auto px-4 text-center text-white">
    <h1 className="text-4xl font-bold mb-4">Student Counseling & Guidance</h1>
    <p className="text-lg max-w-2xl mx-auto">Expert guidance to help you make the right career and university choices.</p>
  </div>
</div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap border-b mb-8">
          <button onClick={() => { setActiveTab('career'); setQuizStarted(false); }} 
            className={`px-6 py-3 font-semibold ${activeTab === 'career' ? 'border-b-2 border-[#00C7B1] text-[#00C7B1]' : 'text-gray-500'}`}>
            🎯 Career Guidance
          </button>
          <button onClick={() => setActiveTab('matching')} 
            className={`px-6 py-3 font-semibold ${activeTab === 'matching' ? 'border-b-2 border-[#00C7B1] text-[#00C7B1]' : 'text-gray-500'}`}>
            🤝 University Matching
          </button>
          <button onClick={() => setActiveTab('counseling')} 
            className={`px-6 py-3 font-semibold ${activeTab === 'counseling' ? 'border-b-2 border-[#00C7B1] text-[#00C7B1]' : 'text-gray-500'}`}>
            💬 Book Counseling
          </button>
        </div>

        {/* Career Guidance Tab */}
        {activeTab === 'career' && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {careerPaths.map((career, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer"
                  onClick={() => { setProgramInterest(career.matching); setActiveTab('matching'); }}>
                  <div className="text-5xl mb-4">{career.icon}</div>
                  <h3 className="text-xl font-bold text-[#1E3A8F] mb-2">{career.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{career.careers}</p>
                  <p className="text-[#00C7B1] font-semibold">💰 {career.salary}</p>
                  <button className="mt-3 text-sm text-[#1E3A8F] hover:underline">Find Universities →</button>
                </div>
              ))}
            </div>

            {/* Career Quiz - REAL WORKING */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-[#1E3A8F] mb-4">Career Assessment Quiz</h2>
              {!quizStarted ? (
                <>
                  <p className="text-gray-600 mb-4">Take our 5-minute quiz to discover which career path suits you best!</p>
                  <button onClick={() => setQuizStarted(true)} className="bg-[#00C7B1] text-white px-6 py-2 rounded-lg hover:bg-[#00b5a1]">
                    Start Quiz →
                  </button>
                </>
              ) : !quizResult ? (
                <div className="space-y-6">
                  {quizQuestions.map((q) => (
                    <div key={q.id} className="border-b pb-4">
                      <p className="font-semibold mb-3">{q.question}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {q.options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleQuizAnswer(q.id, opt)}
                            className={`p-2 text-left rounded-lg border transition ${quizAnswers[q.id] === opt ? 'border-[#00C7B1] bg-[#00C7B1]/10' : 'border-gray-200 hover:border-[#00C7B1]'}`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={calculateQuizResult}
                    disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                    className="w-full bg-[#1E3A8F] text-white py-3 rounded-lg font-semibold disabled:opacity-50"
                  >
                    See My Result
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="text-6xl mb-4">
                    {quizResult === 'Engineering' && '⚙️'}
                    {quizResult === 'Medical' && '🩺'}
                    {quizResult === 'Business' && '📊'}
                    {quizResult === 'Computer Science' && '💻'}
                  </div>
                  <h3 className="text-2xl font-bold text-[#1E3A8F] mb-2">You're suited for {quizResult}!</h3>
                  <p className="text-gray-600 mb-4">Based on your answers, {quizResult} is the best career path for you.</p>
                  <button 
                    onClick={() => { setProgramInterest(quizResult); setActiveTab('matching'); }}
                    className="bg-[#00C7B1] text-white px-6 py-2 rounded-lg"
                  >
                    Find Universities for {quizResult} →
                  </button>
                  <button 
                    onClick={() => { setQuizStarted(false); setQuizAnswers({}); setQuizResult(''); }}
                    className="ml-3 text-gray-500 hover:underline"
                  >
                    Retake Quiz
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* University Matching Tab - REAL WORKING */}
        {activeTab === 'matching' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-[#1E3A8F] mb-6">University Matching Tool</h2>
            <div className="grid gap-4 mb-6">
              <select className="w-full p-3 border rounded-lg" value={programInterest} onChange={(e) => setProgramInterest(e.target.value)}>
                <option value="">Select your program interest</option>
                <option value="Engineering">Engineering</option>
                <option value="Medical">Medical</option>
                <option value="Business">Business</option>
                <option value="Computer Science">Computer Science</option>
              </select>
              <select className="w-full p-3 border rounded-lg" value={preferredCity} onChange={(e) => setPreferredCity(e.target.value)}>
                <option value="">Select preferred city</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Any">Any</option>
              </select>
              <select className="w-full p-3 border rounded-lg" value={budget} onChange={(e) => setBudget(e.target.value)}>
                <option value="">Select budget range</option>
                <option value="Below Rs. 200,000">Below Rs. 200,000</option>
                <option value="Rs. 200,000 - 500,000">Rs. 200,000 - 500,000</option>
                <option value="Above Rs. 500,000">Above Rs. 500,000</option>
              </select>
              <button onClick={handleMatching} disabled={matchingLoading} className="bg-[#00C7B1] text-white py-3 rounded-lg font-semibold disabled:opacity-50">
                {matchingLoading ? 'Searching...' : 'Find Matching Universities'}
              </button>
            </div>
            
            {matchedUniversities.length > 0 && (
              <>
                <h3 className="font-bold text-lg mb-3">Recommended for you:</h3>
                <div className="space-y-3">
                  {matchedUniversities.map((uni, i) => (
                    <div key={i} 
                      onClick={() => window.location.href = `/university/${uni.id}`}
                      className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition">
                      <div>
                        <span className="font-semibold text-[#1E3A8F]">{uni.name}</span>
                        <p className="text-sm text-gray-500">{uni.city} • {uni.type}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[#00C7B1] font-semibold">Rank #{uni.ranking}</span>
                        <p className="text-xs text-gray-500">Click to view →</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {matchedUniversities.length === 0 && programInterest && (
              <div className="text-center py-6 text-gray-500">
                No matching universities found. Try different criteria.
              </div>
            )}
          </div>
        )}

        {/* Counseling Tab - REAL WORKING WITH BACKEND */}
      {activeTab === 'counseling' && (
  <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
    <h2 className="text-2xl font-bold text-[#1E3A8F] mb-6">Book a Counseling Session</h2>
    
    {/* ✅ SUCCESS MESSAGE - ADD THIS */}
    {counselingSuccess && (
      <div className="mb-4 p-4 bg-green-100 border border-green-400 rounded-lg text-green-700 text-center">
        ✅ Counseling request submitted successfully! We will contact you within 24 hours.
      </div>
    )}
    
    <form onSubmit={handleCounselingSubmit} className="space-y-4">
      {/* Rest of your form fields */}
      <div>
        <label className="block text-gray-700 mb-2">Full Name *</label>
        <input type="text" className="w-full p-3 border rounded-lg" required 
          value={counselingForm.name} onChange={(e) => setCounselingForm({...counselingForm, name: e.target.value})} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Email *</label>
          <input type="email" className="w-full p-3 border rounded-lg" required 
            value={counselingForm.email} onChange={(e) => setCounselingForm({...counselingForm, email: e.target.value})} />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Phone *</label>
          <input type="tel" className="w-full p-3 border rounded-lg" required 
            value={counselingForm.phone} onChange={(e) => setCounselingForm({...counselingForm, phone: e.target.value})} />
        </div>
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Current Education Level *</label>
        <select className="w-full p-3 border rounded-lg" 
          onChange={(e) => setCounselingForm({...counselingForm, education: e.target.value})}>
          <option value="">Select</option>
          <option>Matric</option>
          <option>Intermediate</option>
          <option>Bachelor's</option>
          <option>Master's</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Counseling Concern *</label>
        <textarea rows={3} className="w-full p-3 border rounded-lg" placeholder="What would you like to discuss?" 
          value={counselingForm.concern} onChange={(e) => setCounselingForm({...counselingForm, concern: e.target.value})} />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Preferred Date & Time</label>
        <input type="datetime-local" className="w-full p-3 border rounded-lg" 
          onChange={(e) => setCounselingForm({...counselingForm, preferredDate: e.target.value})} />
      </div>
      <button type="submit" disabled={counselingLoading} className="w-full bg-[#00C7B1] text-white py-3 rounded-lg font-semibold disabled:opacity-50">
        {counselingLoading ? 'Submitting...' : 'Request Counseling Session'}
      </button>
    </form>
  </div>
)}
      </div>
    </div>
  );
}