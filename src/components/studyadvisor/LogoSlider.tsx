import React from 'react';
import { useNavigate } from 'react-router-dom';
import { partnerUniversities } from '@/data/siteData';

// Helper function to get university ID from name - FIXED
const getUniversityId = (uniName: string): number => {
  // Extract the base name (remove parenthetical content)
  const baseName = uniName.split('(')[0].trim();
  
  // Complete mapping of all Pakistani universities
  const universityMap: { [key: string]: number } = {
    // Top 10 universities
    'NUST': 1,
    'National University of Sciences & Technology': 1,
    'LUMS': 2,
    'Lahore University of Management Sciences': 2,
    'UET': 3,
    'University of Engineering & Technology': 3,
    'Karachi University': 4,
    'University of Karachi': 4,
    'FAST': 5,
    'FAST National University': 5,
    'COMSATS': 6,
    'COMSATS University': 6,
    'PIEAS': 7,
    'Pakistan Institute of Engineering & Applied Sciences': 7,
    'GIKI': 8,
    'Ghulam Ishaq Khan Institute': 8,
    'NED': 9,
    'NED University of Engineering & Technology': 9,
    'Punjab University': 10,
    'University of the Punjab': 10,
    
    // More universities (IDs 11-20)
    'Quaid-i-Azam University': 11,
    'QAU': 11,
    'Air University': 12,
    'AU': 12,
    'Bahria University': 13,
    'BU': 13,
    'GCU': 14,
    'Government College University': 14,
    'University of Agriculture': 15,
    'UAF': 15,
    'University of Peshawar': 16,
    'UOP': 16,
    'University of Balochistan': 17,
    'UOB': 17,
    'MUET': 18,
    'Mehran University of Engineering & Technology': 18,
    'IBA': 19,
    'Institute of Business Administration': 19,
    'LCWU': 20,
    'Lahore College for Women University': 20,
  };
  
  // Try exact match first
  if (universityMap[baseName]) {
    return universityMap[baseName];
  }
  
  // Try case-insensitive partial match
  const matchedKey = Object.keys(universityMap).find(key => 
    key.toLowerCase() === baseName.toLowerCase() ||
    baseName.toLowerCase().includes(key.toLowerCase()) ||
    key.toLowerCase().includes(baseName.toLowerCase())
  );
  
  if (matchedKey) {
    return universityMap[matchedKey];
  }
  
  // Default to NUST if no match found
  console.warn(`University not found in map: ${uniName}, defaulting to NUST (ID: 1)`);
  return 1;
};

const LogoSlider: React.FC = () => {
  const navigate = useNavigate();
  
  // Double the array for seamless infinite scroll
  const doubled = [...partnerUniversities, ...partnerUniversities];

  const handleUniversityClick = (uniName: string) => {
    const universityId = getUniversityId(uniName);
    console.log(`Navigating to: /university/${universityId} for university: ${uniName}`);
    window.location.href = `/university/${universityId}`;
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-[#1E3A8F] mb-2">Universities Trust StudyAdvisor</h2>
          <p className="text-[16px] text-gray-500">Partnering with leading institutions across Pakistan</p>
        </div>

        {/* Scrolling logos */}
        <div className="relative overflow-hidden group">
          <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
            {doubled.map((uni, i) => {
              const universityId = getUniversityId(uni);
              return (
                <div
                  key={`${uni}-${i}`}
                  onClick={() => handleUniversityClick(uni)}
                  className="flex-shrink-0 w-[200px] mx-4 flex items-center justify-center h-20 bg-gray-50 rounded-lg border border-gray-100 px-4 grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-md hover:border-[#00C7B1]/30 cursor-pointer group"
                >
                  <div className="text-center">
                    <div className="text-[13px] font-bold text-[#1E3A8F] leading-tight group-hover:text-[#00C7B1] transition-colors">
                      {uni.split('(')[0].trim()}
                    </div>
                    {uni.includes('(') && (
                      <div className="text-[11px] text-[#00C7B1] font-semibold mt-0.5">
                        {uni.match(/\(([^)]+)\)/)?.[1]}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/universities')}
            className="text-[15px] font-semibold text-[#00C7B1] hover:text-[#00b5a1] transition-colors inline-flex items-center gap-1"
          >
            See All Partner Universities
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
};

export default LogoSlider;