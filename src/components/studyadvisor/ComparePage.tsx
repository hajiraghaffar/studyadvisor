// src/components/studyadvisor/ComparePage.tsx
import { useState, useEffect } from 'react';

interface University {
  id: number;
  name: string;
  shortName: string;
  city: string;
  province: string;
  type: string;
  ranking: number;
  studentsCount: string;
  establishedYear: number;
  website: string;
}

export default function ComparePage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedUnis, setSelectedUnis] = useState<University[]>([]);
  const [compareList, setCompareList] = useState<University[]>([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/universities')
      .then(res => res.json())
      .then(data => setUniversities(data));
  }, []);

  const addToCompare = (uni: University) => {
    if (compareList.length >= 4) {
      alert('You can compare up to 4 universities');
      return;
    }
    if (!compareList.find(u => u.id === uni.id)) {
      setCompareList([...compareList, uni]);
    }
  };

  const removeFromCompare = (id: number) => {
    setCompareList(compareList.filter(u => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1E3A8F] mb-4">Compare Universities</h1>
        
        {/* Search to add universities */}
        <div className="mb-8">
          <select 
            onChange={(e) => {
              const uni = universities.find(u => u.id === parseInt(e.target.value));
              if (uni) addToCompare(uni);
            }}
            className="w-full p-3 border rounded-lg"
            defaultValue=""
          >
            <option value="">Select university to compare...</option>
            {universities.filter(u => !compareList.find(c => c.id === u.id)).map(uni => (
              <option key={uni.id} value={uni.id}>{uni.name}</option>
            ))}
          </select>
        </div>

        {/* Comparison Table */}
        {compareList.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500">Select universities to compare</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1E3A8F] text-white">
                  <th className="p-4 text-left">Criteria</th>
                  {compareList.map(uni => (
                    <th key={uni.id} className="p-4 text-left min-w-[200px]">
                      <div className="flex justify-between items-center">
                        <span>{uni.name}</span>
                        <button onClick={() => removeFromCompare(uni.id)} className="text-white/70 hover:text-white">✕</button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-4 font-semibold">Ranking</td>{compareList.map(uni => <td key={uni.id} className="p-4">#{uni.ranking}</td>)}</tr>
                <tr className="border-b"><td className="p-4 font-semibold">Location</td>{compareList.map(uni => <td key={uni.id} className="p-4">{uni.city}, {uni.province}</td>)}</tr>
                <tr className="border-b"><td className="p-4 font-semibold">Type</td>{compareList.map(uni => <td key={uni.id} className="p-4">{uni.type}</td>)}</tr>
                <tr className="border-b"><td className="p-4 font-semibold">Established</td>{compareList.map(uni => <td key={uni.id} className="p-4">{uni.establishedYear || 'N/A'}</td>)}</tr>
                <tr className="border-b"><td className="p-4 font-semibold">Students</td>{compareList.map(uni => <td key={uni.id} className="p-4">{uni.studentsCount || 'N/A'}</td>)}</tr>
                <tr><td className="p-4 font-semibold">Website</td>{compareList.map(uni => <td key={uni.id} className="p-4"><a href={uni.website} target="_blank" className="text-[#00C7B1]">Visit</a></td>)}</tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}