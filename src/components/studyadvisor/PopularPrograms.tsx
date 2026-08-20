import React, { useState } from 'react';
import { MapPin, Clock, GraduationCap, X, BookOpen, CheckCircle } from 'lucide-react';
import { programs, Program } from '@/data/siteData';

const PopularPrograms: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayed = showAll ? programs : programs.slice(0, 8);

  return (
    <section id="programs" className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-[28px] font-bold text-[#1E3A8F] mb-1">Explore Popular Programs</h2>
            <p className="text-[16px] text-gray-500">Discover top programs from leading universities</p>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="hidden sm:inline-flex text-[15px] font-semibold text-[#00C7B1] hover:text-[#00b5a1] transition-colors items-center gap-1"
          >
            {showAll ? 'Show Less' : 'View All Programs'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayed.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* University badge */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#1E3A8F]/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-[#1E3A8F]" />
                </div>
                <span className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">{program.universityCode}</span>
              </div>

              <h4 className="text-[18px] font-bold text-[#1E3A8F] mb-1 group-hover:text-[#00C7B1] transition-colors leading-tight">
                {program.name}
              </h4>
              <p className="text-[14px] text-gray-500 mb-3">{program.universityName}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[13px] text-gray-500">
                  <MapPin className="w-3.5 h-3.5 text-[#00C7B1]" />
                  {program.city}, {program.province}
                </div>
                <div className="flex items-center gap-2 text-[13px] text-gray-500">
                  <Clock className="w-3.5 h-3.5 text-[#00C7B1]" />
                  {program.duration}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-semibold text-[#00C7B1] bg-[#00C7B1]/10 px-2.5 py-1 rounded-full">
                  {program.level}
                </span>
                <span className="text-[13px] font-semibold text-gray-700">{program.feeRange}</span>
              </div>

              <button
                onClick={() => setSelectedProgram(program)}
                className="w-full py-2.5 text-[14px] font-semibold text-[#1E3A8F] border-2 border-[#1E3A8F] rounded hover:bg-[#1E3A8F] hover:text-white transition-all"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        <div className="sm:hidden text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[15px] font-semibold text-[#00C7B1] hover:text-[#00b5a1] transition-colors"
          >
            {showAll ? 'Show Less' : 'View All Programs'}
          </button>
        </div>
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedProgram(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#1E3A8F] to-[#00C7B1] p-6 rounded-t-2xl relative">
              <button onClick={() => setSelectedProgram(null)} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
              <span className="text-[12px] font-semibold text-[#00C7B1] bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                {selectedProgram.level}
              </span>
              <h3 className="text-[22px] font-bold text-white mt-3">{selectedProgram.name}</h3>
              <p className="text-white/80 text-[14px] mt-1">{selectedProgram.universityName}</p>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h4 className="text-[16px] font-bold text-[#1E3A8F] mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Program Overview
                </h4>
                <p className="text-[14px] text-gray-600 leading-relaxed">{selectedProgram.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-[12px] text-gray-400 font-medium">Duration</div>
                  <div className="text-[15px] font-bold text-[#1E3A8F]">{selectedProgram.duration}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-[12px] text-gray-400 font-medium">Location</div>
                  <div className="text-[15px] font-bold text-[#1E3A8F]">{selectedProgram.city}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-[12px] text-gray-400 font-medium">Category</div>
                  <div className="text-[15px] font-bold text-[#1E3A8F]">{selectedProgram.category}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-[12px] text-gray-400 font-medium">Fee Range</div>
                  <div className="text-[15px] font-bold text-[#1E3A8F]">{selectedProgram.feeRange}</div>
                </div>
              </div>

              <div>
                <h4 className="text-[16px] font-bold text-[#1E3A8F] mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Entry Requirements
                </h4>
                <p className="text-[14px] text-gray-600 leading-relaxed">{selectedProgram.requirements}</p>
              </div>

              <div className="flex gap-3 pt-2">
               
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="px-6 py-3 border-2 border-gray-200 text-gray-600 font-semibold rounded-lg hover:border-gray-300 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PopularPrograms;
