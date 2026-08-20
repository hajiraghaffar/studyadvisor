import React from 'react';
import { BarChart3, Clock, BookOpen, Bell, User, CheckCircle, ArrowRight } from 'lucide-react';

const DashboardPreview: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#1E3A8F] to-[#0f2b42] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00C7B1]/20 text-[#00C7B1] text-[13px] font-semibold rounded-full mb-4">
              <BarChart3 className="w-3.5 h-3.5" />
              Dashboard Preview
            </span>
            <h2 className="text-[28px] lg:text-[32px] font-bold text-white mb-4 leading-tight">
              Your Personal Application Dashboard
            </h2>
            <p className="text-[16px] text-white/70 leading-relaxed mb-8">
              Track all your university applications from one place. Get real-time updates, manage offers, and never miss a deadline.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: CheckCircle, text: 'Track application status in real-time' },
                { icon: Bell, text: 'Get instant notifications on updates' },
                { icon: BookOpen, text: 'View personalized program recommendations' },
                { icon: User, text: 'Complete profile for better matching' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00C7B1]/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-[#00C7B1]" />
                  </div>
                  <span className="text-[15px] text-white/80">{item.text}</span>
                </div>
              ))}
            </div>

        
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-5 transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Top Bar */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                <div>
                  <div className="text-[14px] font-bold text-[#1E3A8F]">Welcome, Ahmed!</div>
                  <div className="text-[12px] text-gray-400">Your application dashboard</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#00C7B1]/10 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-[#00C7B1]" />
                </div>
              </div>

              {/* Profile Completion */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-[12px] mb-1.5">
                  <span className="font-semibold text-gray-600">Profile Completion</span>
                  <span className="font-bold text-[#00C7B1]">75%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#00C7B1] to-[#4cdd8c] rounded-full" style={{ width: '75%' }} />
                </div>
              </div>

              {/* Application Cards */}
              <div className="space-y-3 mb-5">
                {[
                  { uni: 'NUST', program: 'BS Computer Science', status: 'Under Review', color: 'text-orange-500', bg: 'bg-orange-50' },
                  { uni: 'LUMS', program: 'BBA', status: 'Offer Received', color: 'text-green-600', bg: 'bg-green-50' },
                  { uni: 'FAST', program: 'BS Software Engineering', status: 'Submitted', color: 'text-blue-500', bg: 'bg-blue-50' },
                ].map((app, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-[13px] font-bold text-[#1E3A8F]">{app.uni}</div>
                      <div className="text-[11px] text-gray-400">{app.program}</div>
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${app.color} ${app.bg}`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Upcoming Deadlines */}
              <div>
                <div className="text-[12px] font-bold text-gray-600 mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#00C7B1]" />
                  Upcoming Deadlines
                </div>
                <div className="flex gap-2">
                  {[
                    { uni: 'UET', days: '5 days' },
                    { uni: 'COMSATS', days: '12 days' },
                  ].map((d, i) => (
                    <div key={i} className="flex-1 p-2.5 bg-[#1E3A8F]/5 rounded-lg text-center">
                      <div className="text-[12px] font-bold text-[#1E3A8F]">{d.uni}</div>
                      <div className="text-[11px] text-gray-400">{d.days}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#00C7B1]/20 rounded-full blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#00C7B1]/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
