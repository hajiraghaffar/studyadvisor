// src/components/studyadvisor/TeamSection.tsx
import React, { useState, useEffect } from 'react';
import { Phone, Award, Users, Briefcase, GraduationCap } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
  linkedin?: string;
  email?: string;
  achievements: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Reema Choudhary",
    role: "Project Supervisor",
    department: "Software Engineering",
    image: "/assets/images/team/supervisor.jpg",
    bio: "PhD in Simulation and Modelling from London. 15+ years of experience in educational technology and student guidance systems. Published 30+ research papers in international journals.",
    achievements: [
      "Gold Madel in MS",
      "Published 30+ Research Papers",
      "PhD from London",
      "15+ Years Experience"
    ]
  },
  {
    id: 2,
    name: "Hajra Baig",
    role: "Lead Developer",
    department: "Software Engineering",
    image: "/assets/images/team/developer.jpg",
    bio: "Full Stack Developer specialized in React, Spring Boot, and Database Management. Created complete StudyAdvisor platform with real-time application tracking.",
    achievements: [
      "Full Stack Developer",
      "Spring Boot Expert",
      "React Specialist",
      "Database Designer"
    ]
  },
  {
    id: 3,
    name: "Sir Adeel Shahzad",
    role: "PMO",
    department: "Software Engineering",
    image: "/assets/images/team/advisor.jpg",
    bio: "Lecturer in Software Engineering department with expertise in system architecture, cloud computing, and educational platforms..",
   
    achievements: [
      "10+ Years Experience",
      "Cloud Architecture Expert",
      "System Designer",
      "Educational Technology Specialist"
    ]
  }
];

const TeamSection: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-[#00C7B1]/10 rounded-full mb-4">
            <span className="text-[#00C7B1] font-semibold text-sm">Our Team</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A8F] mb-4">
            Meet the Team Behind StudyAdvisor
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Dedicated professionals working together to help students achieve their educational dreams
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              {/* Image Container - FIXED FOR FULL IMAGE */}
<div className="relative h-72 w-full overflow-hidden bg-gradient-to-br from-[#1E3A8F] to-[#00C7B1]">
  <img
    src={member.image}
    alt={member.name}
    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
    style={{ objectPosition: 'center 20%' }}
    onError={(e) => {
      // Fallback if image doesn't exist
      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=1E3A8F&color=fff&size=300&length=2`;
    }}
  />
  {/* Role Badge */}
  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
    <span className="text-white font-semibold">{member.role}</span>
  </div>
</div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1E3A8F] mb-1">{member.name}</h3>
                <p className="text-sm text-[#00C7B1] font-medium mb-3">{member.department}</p>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{member.bio}</p>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {member.achievements.slice(0, 2).map((achievement, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {achievement}
                    </span>
                  ))}
                </div>

                
              </div>
            </div>
          ))}
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#1E3A8F]">3+</div>
            <div className="text-sm text-gray-500">Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#00C7B1]">50K+</div>
            <div className="text-sm text-gray-500">Students Helped</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#1E3A8F]">100+</div>
            <div className="text-sm text-gray-500">Universities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#00C7B1]">94%</div>
            <div className="text-sm text-gray-500">Success Rate</div>
          </div>
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Header Image */}
              <div className="h-48 bg-gradient-to-r from-[#1E3A8F] to-[#00C7B1] relative overflow-hidden">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover opacity-30"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-2">👥</div>
                    <h2 className="text-2xl font-bold">{selectedMember.name}</h2>
                    <p className="text-white/90">{selectedMember.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 text-white hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#1E3A8F] mb-2">Biography</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedMember.bio}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#1E3A8F] mb-2">Department</h3>
                  <p className="text-gray-600">{selectedMember.department}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#1E3A8F] mb-2">Key Achievements</h3>
                  <div className="space-y-2">
                    {selectedMember.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#00C7B1]" />
                        <span className="text-gray-600">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeamSection;