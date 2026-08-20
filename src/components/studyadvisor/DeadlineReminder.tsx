// src/components/studyadvisor/DeadlineReminder.tsx
import { useState, useEffect } from 'react';

interface Deadline {
  id: number;
  university: string;
  program: string;
  deadline: string;
  daysLeft: number;
}

export default function DeadlineReminder() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([
    { id: 1, university: "NUST", program: "Undergraduate", deadline: "2024-12-31", daysLeft: 0 },
    { id: 2, university: "LUMS", program: "MBA", deadline: "2025-01-15", daysLeft: 0 },
    { id: 3, university: "UET", program: "Engineering", deadline: "2025-01-30", daysLeft: 0 },
    { id: 4, university: "Karachi University", program: "MBBS", deadline: "2025-02-15", daysLeft: 0 },
    { id: 5, university: "FAST", program: "Computer Science", deadline: "2025-03-01", daysLeft: 0 },
  ]);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date();
      setDeadlines(prev => prev.map(deadline => ({
        ...deadline,
        daysLeft: Math.ceil((new Date(deadline.deadline).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      })));
    };
    calculateDaysLeft();
  }, []);

  const urgentDeadlines = deadlines.filter(d => d.daysLeft <= 30 && d.daysLeft > 0);
  const upcomingDeadlines = deadlines.filter(d => d.daysLeft > 30);
  const pastDeadlines = deadlines.filter(d => d.daysLeft < 0);

  if (deadlines.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h3 className="font-bold text-[#1E3A8F] mb-3 flex items-center gap-2">
        <span>⏰</span> Admission Deadlines
      </h3>
      
      {urgentDeadlines.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 rounded">
          <p className="text-sm font-semibold text-red-700 mb-2">⚠️ Urgent - Deadlines Approaching!</p>
          {urgentDeadlines.map(d => (
            <div key={d.id} className="flex justify-between items-center py-1">
              <span className="text-sm">{d.university} - {d.program}</span>
              <span className="text-sm font-bold text-red-600">{d.daysLeft} days left</span>
            </div>
          ))}
        </div>
      )}
      
      {upcomingDeadlines.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-600">Upcoming Deadlines:</p>
          {upcomingDeadlines.map(d => (
            <div key={d.id} className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium text-gray-800">{d.university}</p>
                <p className="text-xs text-gray-500">{d.program}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#00C7B1]">{d.daysLeft} days left</p>
                <p className="text-xs text-gray-400">{new Date(d.deadline).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {pastDeadlines.length > 0 && (
        <div className="mt-3 p-2 bg-gray-100 rounded">
          <p className="text-xs text-gray-500">⚠️ {pastDeadlines.length} deadline(s) have passed</p>
        </div>
      )}
    </div>
  );
}