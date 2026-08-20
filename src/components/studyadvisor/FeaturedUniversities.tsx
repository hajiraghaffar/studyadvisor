import React, { useState } from 'react';
import { MapPin, BookOpen, Award, X, Phone, Globe } from 'lucide-react';
import { universities, University, programs } from '@/data/siteData';

const FeaturedUniversities: React.FC = () => {
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? universities : universities.slice(0, 8);

  const getUniPrograms = (uniId: string) => programs.filter(p => p.universityId === uniId);

  return (
    <section id="universities" className="py-16 bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-[28px] font-bold text-[#1E3A8F] mb-1">Top Universities in Pakistan</h2>
            <p className="text-[16px] text-gray-500">Explore leading institutions and their programs</p>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="hidden sm:inline-flex text-[15px] font-semibold text-[#00C7B1] hover:text-[#00b5a1] transition-colors items-center gap-1"
          >
            {showAll ? 'Show Less' : 'View All Universities'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayed.map((uni) => (
            <div
              key={uni.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Cover Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={uni.coverImage}
                  alt={uni.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {/* Logo overlay */}
                <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#1E3A8F]">{uni.code.slice(0, 4)}</span>
                </div>
                {/* Ranking badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3 text-[#00C7B1]" />
                  <span className="text-[11px] font-bold text-[#1E3A8F]">HEC: {uni.ranking}</span>
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-[16px] font-bold text-[#1E3A8F] mb-1 leading-tight group-hover:text-[#00C7B1] transition-colors line-clamp-2">
                  {uni.name}
                </h4>
                <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#00C7B1]" />
                  {uni.city}, {uni.province}
                </div>
                <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-4">
                  <BookOpen className="w-3.5 h-3.5 text-[#00C7B1]" />
                  {uni.programsCount}+ Programs
                </div>

                <div className="flex gap-2">
                 
                  <button
                    onClick={() => setSelectedUni(uni)}
                    className="flex-1 py-2 text-[13px] font-semibold text-[#1E3A8F] border border-gray-200 rounded hover:bg-[#00C7B1] hover:text-white hover:border-[#00C7B1] transition-all"
                  >
                    View University
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sm:hidden text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[15px] font-semibold text-[#00C7B1] hover:text-[#00b5a1] transition-colors"
          >
            {showAll ? 'Show Less' : 'View All Universities'}
          </button>
        </div>
      </div>

      {/* University Detail Modal */}
      {selectedUni && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedUni(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Header with cover */}
            <div className="relative h-48">
              <img src={selectedUni.coverImage} alt={selectedUni.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8F]/90 to-transparent" />
              <button onClick={() => setSelectedUni(null)} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors bg-black/20 rounded-full p-1.5">
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-[12px] font-semibold text-white flex items-center gap-1">
                    <Award className="w-3 h-3" /> HEC Rank: {selectedUni.ranking}
                  </span>
                </div>
                <h3 className="text-[24px] font-bold text-white">{selectedUni.name}</h3>
                <p className="text-white/80 text-[14px] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> {selectedUni.city}, {selectedUni.province}
                </p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-[16px] font-bold text-[#1E3A8F] mb-2">About</h4>
                <p className="text-[14px] text-gray-600 leading-relaxed">{selectedUni.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#f0f7ff] rounded-lg p-3 text-center">
                  <BookOpen className="w-5 h-5 text-[#1E3A8F] mx-auto mb-1" />
                  <div className="text-[18px] font-bold text-[#1E3A8F]">{selectedUni.programsCount}+</div>
                  <div className="text-[12px] text-gray-500">Programs</div>
                </div>
                <div className="bg-[#e0f8f4] rounded-lg p-3 text-center">
                  <Award className="w-5 h-5 text-[#00C7B1] mx-auto mb-1" />
                  <div className="text-[18px] font-bold text-[#1E3A8F]">{selectedUni.ranking}</div>
                  <div className="text-[12px] text-gray-500">HEC Rank</div>
                </div>
                <div className="bg-[#f0f7ff] rounded-lg p-3 text-center">
                  <Globe className="w-5 h-5 text-[#1E3A8F] mx-auto mb-1" />
                  <div className="text-[18px] font-bold text-[#1E3A8F]">{selectedUni.city}</div>
                  <div className="text-[12px] text-gray-500">Location</div>
                </div>
              </div>

              {/* Programs at this university */}
              {getUniPrograms(selectedUni.id).length > 0 && (
                <div>
                  <h4 className="text-[16px] font-bold text-[#1E3A8F] mb-3">Available Programs</h4>
                  <div className="space-y-2">
                    {getUniPrograms(selectedUni.id).map(p => (
                      <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="text-[14px] font-semibold text-[#333]">{p.name}</div>
                          <div className="text-[12px] text-gray-400">{p.duration} | {p.level}</div>
                        </div>
                        <span className="text-[12px] font-semibold text-[#00C7B1]">{p.feeRange}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-[16px] font-bold text-[#1E3A8F] mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Contact
                </h4>
                <p className="text-[14px] text-gray-600">{selectedUni.contact}</p>
              </div>


            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedUniversities;
