// src/components/studyadvisor/HeroSection.tsx
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';

interface University {
  id: number;
  name: string;
  shortName: string;
  city: string;
}

interface Program {
  id: number;
  name: string;
  category: string;
  university?: {
    id: number;
    name: string;
  };
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ type: string; id: number; name: string; subtitle: string }[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [allUniversities, setAllUniversities] = useState<University[]>([]);
  const [allPrograms, setAllPrograms] = useState<Program[]>([]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Video autoplay failed:", e));
    }
    
    // Fetch universities and programs for search
    const fetchData = async () => {
      try {
        const [unis, progs] = await Promise.all([
          api.getUniversities(),
          api.getPrograms()
        ]);
        setAllUniversities(unis);
        setAllPrograms(progs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (query.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    // Search in universities
    const uniResults = allUniversities
      .filter(uni => 
        uni.name.toLowerCase().includes(query) || 
        uni.shortName.toLowerCase().includes(query) ||
        uni.city.toLowerCase().includes(query)
      )
      .map(uni => ({
        type: 'university',
        id: uni.id,
        name: uni.name,
        subtitle: `${uni.city} • ${uni.shortName}`
      }));
    
    // Search in programs
    const progResults = allPrograms
      .filter(prog => 
        prog.name.toLowerCase().includes(query) ||
        (prog.university?.name?.toLowerCase().includes(query))
      )
      .map(prog => ({
        type: 'program',
        id: prog.id,
        name: prog.name,
        subtitle: prog.university?.name || 'Program'
      }));
    
    // Combine and limit results
    const combined = [...uniResults.slice(0, 5), ...progResults.slice(0, 5)];
    setSearchResults(combined);
    setShowResults(combined.length > 0);
  };

  // Handle search submission (Enter key)
  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.length > 0) {
      performSearch();
    }
  };

  // Perform search and navigate
  const performSearch = () => {
    if (searchQuery.length < 2) return;
    
    // Try to find exact match first
    const exactUniversity = allUniversities.find(
      uni => uni.name.toLowerCase() === searchQuery.toLowerCase() ||
              uni.shortName.toLowerCase() === searchQuery.toLowerCase()
    );
    
    if (exactUniversity) {
      navigate(`/university/${exactUniversity.id}`);
      return;
    }
    
    const exactProgram = allPrograms.find(
      prog => prog.name.toLowerCase() === searchQuery.toLowerCase()
    );
    
    if (exactProgram) {
      navigate(`/program/${exactProgram.id}`);
      return;
    }
    
    // If no exact match, navigate to search results page
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  // Handle result item click
  const handleResultClick = (result: { type: string; id: number }) => {
    setShowResults(false);
    setSearchQuery('');
    if (result.type === 'university') {
      navigate(`/university/${result.id}`);
    } else {
      navigate(`/program/${result.id}`);
    }
  };

  // Handle "See All Partner Universities" button
  const handleSeeAllUniversities = () => {
    navigate('/universities');
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/bg-video.mp4" type="video/mp4" />
          <img src="/images/universities/bg-video.mp4" alt="Background" className="w-full h-full object-cover" />
        </video>
        
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8F]/30 to-[#00C7B1]/15"></div>
      </div>

      {/* CONTENT ON TOP OF VIDEO */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center text-white">
        
     
{/* Heading  */}
<h5 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6 leading-tight">
  Your Gateway to Higher Education<br />
  <span className="text-[#00C7B1]">in Pakistan</span>
</h5>

{/* Description */}
<p className="text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto text-white/90">
  Apply to universities across Pakistan through one centralized platform. 
  Track applications, receive offers, and make your future bright.
</p>
        
        {/* Search Bar with Autocomplete */}
        <div className="relative max-w-2xl mx-auto mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for courses, universities or programs..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
                className="w-full px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#00C7B1]"
              />
              
              {/* Autocomplete Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-20 max-h-80 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <div
                      key={`${result.type}-${result.id}-${index}`}
                      onClick={() => handleResultClick(result)}
                      className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">
                          {result.type === 'university' ? '🏛️' : '📚'}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-gray-800">{result.name}</div>
                          <div className="text-sm text-gray-500">{result.subtitle}</div>
                          <div className="text-xs text-[#00C7B1] mt-0.5">
                            {result.type === 'university' ? 'University' : 'Program'}
                          </div>
                        </div>
                        <div className="text-gray-400">→</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button 
              onClick={performSearch}
              className="px-8 py-4 bg-[#00C7B1] text-white rounded-lg font-semibold hover:bg-[#00b5a1] transition"
            >
              Search
            </button>
          </div>
          
          {/* See All Partner Universities Button */}
          <div className="mt-4">
            <button
              onClick={handleSeeAllUniversities}
              className="text-white hover:text-[#00C7B1] transition text-sm flex items-center justify-center gap-2 mx-auto"
            >
              <span>🏛️</span> See All Partner Universities
              <span>→</span>
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl md:text-3xl font-bold text-[#00C7B1]">100+</div>
            <div className="text-sm">Universities</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl md:text-3xl font-bold text-[#00C7B1]">150+</div>
            <div className="text-sm">Programs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl md:text-3xl font-bold text-[#00C7B1]">100+</div>
            <div className="text-sm">Students Placed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl md:text-3xl font-bold text-[#00C7B1]">95%</div>
            <div className="text-sm">Satisfaction Rate</div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>
    </div>
  );
}