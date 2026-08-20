// src/components/studyadvisor/ProgramsPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '@/services/api';

interface Program {
  id: number;
  name: string;
  category: string;
  degree: string;
  duration: string;
  fee: string;
  imagePath: string;
  university: {
    id: number;
    name: string;
    shortName: string;
  };
}

export default function ProgramsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // READ URL PARAMETERS
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get category from URL when page loads
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // Convert category param to match your data format
      const categoryMap: Record<string, string> = {
        'engineering': 'Engineering',
        'medical': 'Medical',
        'business': 'Business',
        'cs': 'Computer Science'
      };
      const mappedCategory = categoryMap[categoryParam.toLowerCase()] || categoryParam;
      setSelectedCategory(mappedCategory);
    }
  }, [searchParams]);

  // Fetch programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const data = await api.getPrograms();
        setPrograms(data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  // Get unique categories
  const categories = [...new Set(programs.map(p => p.category))];

  // Filter programs based on search and selected category
  const filteredPrograms = programs.filter(prog => {
    const matchesSearch = searchTerm === '' || 
      prog.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prog.university?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || prog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A8F]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src="/assets/logo.png" alt="StudyAdvisor" className="h-12 w-auto max-w-full" style={{ maxWidth: '200px' }} />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#1E3A8F' }}>Academic Programs</h1>
          <p className="text-gray-500 mt-2">{filteredPrograms.length} programs available</p>
          {selectedCategory && (
            <div className="mt-2 inline-flex items-center gap-2 bg-[#00C7B1]/10 px-3 py-1 rounded-full">
              <span className="text-sm text-[#00C7B1]">Filtered by: {selectedCategory}</span>
              <button 
                onClick={() => setSelectedCategory('')}
                className="text-xs text-gray-500 hover:text-red-500"
              >
                ✕ Clear
              </button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-lg text-sm"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded-lg text-sm"
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedCategory(''); }}
              className="bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              onClick={() => navigate(`/program/${prog.id}`)}
              className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition cursor-pointer"
            >
              <div className="h-35 overflow-hidden bg-gray-100">
                <img
                  src={prog.imagePath || '/assets/images/programs/default.jpg'}
                  alt={prog.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/400x200/00C7B1/white?text=' + (prog.name?.substring(0, 2) || 'PG');
                  }}
                />
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-sm truncate" style={{ color: '#1E3A8F' }}>{prog.name}</h3>
                  <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{prog.degree}</span>
                </div>
                <p className="text-xs text-gray-500">{prog.university?.shortName || prog.university?.name}</p>
                <p className="text-xs text-gray-400 mt-1">📅 {prog.duration}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{prog.category}</span>
                  <span className="text-xs text-[#00C7B1] font-medium">💰 {prog.fee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}