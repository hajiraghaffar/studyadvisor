// src/components/studyadvisor/UniversityDetailPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/services/api';

interface University {
  id: number;
  name: string;
  shortName: string;
  city: string;
  province: string;
  type: string;
  ranking: number;
  imagePath: string;
  studentsCount: string;
  description: string;
  website: string;
}

interface Program {
  id: number;
  name: string;
  degree: string;
  duration: string;
  fee: string;
}

export default function UniversityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [university, setUniversity] = useState<University | null>(null);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [uniData, progData] = await Promise.all([
          api.getUniversityById(id as string),
          api.getProgramsByUniversity(id as string)
        ]);
        setUniversity(uniData);
        setPrograms(progData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A8F]"></div>
      </div>
    );
  }

  if (!university) {
    return <div className="text-center py-20">University not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-82 w-full overflow-hidden bg-gray-200">
            <img
              src={university.imagePath || '/assets/images/universities/default.jpg'}
              alt={university.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/1200x400/1E3A8F/white?text=' + university.shortName;
              }}
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-[#1E3A8F]">{university.name}</h1>
                <p className="text-gray-500 mt-1">{university.shortName} • {university.city}, {university.province}</p>
              </div>
              <span className="px-3 py-1 bg-[#1E3A8F] text-white rounded-full text-sm">
                Rank #{university.ranking}
              </span>
            </div>
            <div className="mt-4 flex gap-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{university.type}</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">👥 {university.studentsCount} Students</span>
            </div>
            <p className="mt-4 text-gray-600">{university.description || 'Premier university in Pakistan offering quality education.'}</p>
            
            {/* Apply Button - Opens application form */}
            <button
            style={{
    backgroundColor: '#00C7B1',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: 'bold',
    animation: 'pulse 2s infinite',
    cursor: 'pointer'
  }}
  
              onClick={() => navigate('/admission', { state: { universityId: university.id, universityName: university.name } })}
              className="mt-6 bg-[#00C7B1] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#00b5a1] transition"
            >
              Apply Now →
            </button>
          </div>
        </div>

        {/* Programs Section */}
        <h2 className="text-2xl font-bold text-[#1E3A8F] mb-4">Programs Offered</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-[#1E3A8F]">{program.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{program.degree} • {program.duration}</p>
              <p className="text-[#00C7B1] font-semibold mt-2">💰 {program.fee}/year</p>
              <button
              style={{
    backgroundColor: '#00C7B1',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: 'bold',
    animation: 'pulse 2s infinite',
    cursor: 'pointer'
  }}
  
  
                onClick={() => navigate('/admission', { state: { universityId: university.id, universityName: university.name, programId: program.id, programName: program.name } })}
                className="mt-3 w-full bg-[#1E3A8F] text-white py-2 rounded-lg hover:bg-[#152C6B] transition"
              >
                Apply for {program.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}