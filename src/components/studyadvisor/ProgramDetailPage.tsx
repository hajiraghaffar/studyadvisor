// src/components/studyadvisor/ProgramDetailPage.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '@/services/api';

interface Program {
  id: number;
  name: string;
  category: string;
  degree: string;
  duration: string;
  fee: string;
  imagePath: string;
  description: string;
  university: {
    id: number;
    name: string;
    shortName: string;
    city: string;
  };
}

export default function ProgramDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        const data = await api.getProgramById(id as string);
        setProgram(data);
      } catch (error) {
        console.error('Error fetching program:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProgram();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A8F]"></div>
      </div>
    );
  }

  if (!program) {
    return <div className="text-center py-20">Program not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-82 w-full overflow-hidden bg-gray-200">
              <img
                src={program.imagePath || '/assets/images/programs/default.jpg'}
                alt={program.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/800x300/00C7B1/white?text=' + program.name.substring(0, 2);
                }}
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-[#1E3A8F]">{program.name}</h1>
                  <p className="text-gray-500 mt-1">
                    Offered by: {program.university?.name} • {program.university?.city}
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#00C7B1] text-white rounded-full text-sm">{program.degree}</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-xs text-gray-500">Duration</div>
                  <div className="font-semibold">{program.duration}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Fee</div>
                  <div className="font-semibold text-[#00C7B1]">{program.fee}/year</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Category</div>
                  <div className="font-semibold">{program.category}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">University Rank</div>
                  <div className="font-semibold">Top University</div>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-bold text-[#1E3A8F] mb-3">Program Description</h2>
                <p className="text-gray-600">{program.description || 'Comprehensive program designed to prepare students for successful careers.'}</p>
              </div>

              {/* Apply Button - Opens application form */}
              <button
                onClick={() => navigate('/admission', { 
                  state: { 
                    universityId: program.university?.id, 
                    universityName: program.university?.name,
                    programId: program.id, 
                    programName: program.name 
                  } 
                })}
                className="mt-6 w-full bg-[#00C7B1] text-white py-3 rounded-lg font-semibold hover:bg-[#00b5a1] transition"
              >
                Apply Now for {program.name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}