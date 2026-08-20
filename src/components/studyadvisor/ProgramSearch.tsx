import React, { useState, useMemo } from 'react';
import { MapPin, Clock, GraduationCap, Filter, X, SlidersHorizontal } from 'lucide-react';
import { programs, provinces, categories, levels, Program } from '@/data/siteData';

const ProgramSearch: React.FC = () => {
  const [province, setProvince] = useState('All Provinces');
  const [category, setCategory] = useState('All Subjects');
  const [level, setLevel] = useState('All Levels');
  const [maxFee, setMaxFee] = useState(500000);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      if (province !== 'All Provinces' && p.province !== province) return false;
      if (category !== 'All Subjects' && p.category !== category) return false;
      if (level !== 'All Levels' && p.level !== level) return false;
      if (p.feeMin > maxFee) return false;
      return true;
    });
  }, [province, category, level, maxFee]);

  const resetFilters = () => {
    setProvince('All Provinces');
    setCategory('All Subjects');
    setLevel('All Levels');
    setMaxFee(500000);
  };

  const hasActiveFilters = province !== 'All Provinces' || category !== 'All Subjects' || level !== 'All Levels' || maxFee < 500000;

  return (
    <section id="search" className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-[#1E3A8F] mb-2">Find Your Program</h2>
          <p className="text-[16px] text-gray-500">Use filters to discover the perfect program for you</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#f8fafc] rounded-xl p-5 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-[15px] font-semibold text-[#1E3A8F]"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-[#00C7B1] text-white text-[11px] rounded-full flex items-center justify-center">
                  {[province !== 'All Provinces', category !== 'All Subjects', level !== 'All Levels', maxFee < 500000].filter(Boolean).length}
                </span>
              )}
            </button>
            {hasActiveFilters && (
              <button onClick={resetFilters} className="text-[14px] font-medium text-[#1E3A8F] hover:text-[#0f2b42] transition-colors flex items-center gap-1">
                <X className="w-3.5 h-3.5" /> Reset
              </button>
            )}
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-[12px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Province/City</label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-3 py-2.5 text-[14px] border border-gray-200 rounded-lg bg-white focus:border-[#00C7B1] focus:outline-none focus:ring-1 focus:ring-[#00C7B1] transition-colors"
                >
                  {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Subject</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 text-[14px] border border-gray-200 rounded-lg bg-white focus:border-[#00C7B1] focus:outline-none focus:ring-1 focus:ring-[#00C7B1] transition-colors"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Program Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-3 py-2.5 text-[14px] border border-gray-200 rounded-lg bg-white focus:border-[#00C7B1] focus:outline-none focus:ring-1 focus:ring-[#00C7B1] transition-colors"
                >
                  {levels.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Max Fee: PKR {maxFee >= 500000 ? '500k+' : `${(maxFee / 1000).toFixed(0)}k`}
                </label>
                <input
                  type="range"
                  min={0}
                  max={500000}
                  step={10000}
                  value={maxFee}
                  onChange={(e) => setMaxFee(Number(e.target.value))}
                  className="w-full mt-2 accent-[#00C7B1]"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>PKR 0</span>
                  <span>PKR 500k+</span>
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {}}
                  className="w-full py-2.5 bg-[#00C7B1] text-white text-[14px] font-semibold rounded-lg hover:bg-[#00b5a1] transition-all"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-[14px] text-gray-500">
            Showing <span className="font-bold text-[#1E3A8F]">{filtered.length}</span> of <span className="font-bold text-[#1E3A8F]">{programs.length}</span> programs
          </p>
          {hasActiveFilters && (
            <div className="flex gap-2 flex-wrap">
              {province !== 'All Provinces' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1E3A8F]/10 text-[#1E3A8F] text-[12px] font-medium rounded-full">
                  {province}
                  <button onClick={() => setProvince('All Provinces')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {category !== 'All Subjects' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#00C7B1]/10 text-[#00C7B1] text-[12px] font-medium rounded-full">
                  {category}
                  <button onClick={() => setCategory('All Subjects')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {level !== 'All Levels' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1E3A8F]/10 text-[#1E3A8F] text-[12px] font-medium rounded-full">
                  {level}
                  <button onClick={() => setLevel('All Levels')}><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((program) => (
              <div
                key={program.id}
                className="flex items-start gap-4 bg-[#f8fafc] rounded-xl p-4 border border-gray-100 hover:shadow-md hover:border-[#00C7B1]/30 transition-all cursor-pointer group"
                onClick={() => setSelectedProgram(program)}
              >
                <div className="w-12 h-12 rounded-xl bg-[#1E3A8F]/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-[#1E3A8F]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[15px] font-bold text-[#1E3A8F] group-hover:text-[#00C7B1] transition-colors truncate">{program.name}</h4>
                  <p className="text-[13px] text-gray-500 truncate">{program.universityName}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-[12px] text-gray-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{program.city}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{program.duration}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] font-semibold text-[#00C7B1] bg-[#00C7B1]/10 px-2 py-0.5 rounded-full">{program.level}</span>
                    <span className="text-[12px] font-semibold text-gray-600">{program.feeRange}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-[18px] font-bold text-gray-400 mb-2">No programs found</h3>
            <p className="text-[14px] text-gray-400 mb-4">Try adjusting your filters to see more results</p>
            <button onClick={resetFilters} className="px-6 py-2.5 bg-[#00C7B1] text-white font-semibold rounded-lg hover:bg-[#00b5a1] transition-all">
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick Detail Popup */}
      {selectedProgram && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedProgram(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-[12px] font-semibold text-[#00C7B1] bg-[#00C7B1]/10 px-2.5 py-1 rounded-full">{selectedProgram.level}</span>
                <h3 className="text-[20px] font-bold text-[#1E3A8F] mt-2">{selectedProgram.name}</h3>
                <p className="text-[14px] text-gray-500">{selectedProgram.universityName}</p>
              </div>
              <button onClick={() => setSelectedProgram(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[14px] text-gray-600 mb-4">{selectedProgram.description}</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-2.5">
                <div className="text-[11px] text-gray-400">Duration</div>
                <div className="text-[14px] font-bold text-[#1E3A8F]">{selectedProgram.duration}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5">
                <div className="text-[11px] text-gray-400">Fee</div>
                <div className="text-[14px] font-bold text-[#1E3A8F]">{selectedProgram.feeRange}</div>
              </div>
            </div>
            <p className="text-[13px] text-gray-500 mb-4"><strong>Requirements:</strong> {selectedProgram.requirements}</p>
           
          </div>
        </div>
      )}
    </section>
  );
};

export default ProgramSearch;
