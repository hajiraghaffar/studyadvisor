import React, { useState } from 'react';
import { MessageCircle, FileCheck, Compass, ArrowRight, X, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
const services = [
  {
    icon: MessageCircle,
    title: 'Career Counseling',
    description: 'Chat with expert counselors who understand Pakistan\'s job market. Get personalized career guidance and course matching based on your interests, aptitude, and goals.',
    features: ['One-on-one expert sessions', 'Career aptitude assessment', 'Course matching algorithm', 'Industry insights & trends'],
    color: '#1E3A8F',
    bg: 'bg-[#e8eef8]',
  },
  {
    icon: FileCheck,
    title: 'Document Preparation',
    description: 'Get professional help with your application documents. Our experts review and polish your CV, personal statement, and supporting documents.',
    features: ['CV & resume review', 'Personal statement writing', 'Document verification', 'Transcript evaluation'],
    color: '#00C7B1',
    bg: 'bg-[#e0f8f4]',
  },
  {
    icon: Compass,
    title: 'Application Support',
    description: 'Step-by-step guidance through the entire application process. From choosing universities to submitting applications, we\'re with you every step.',
    features: ['University shortlisting', 'Application form assistance', 'Deadline management', 'Interview preparation'],
    color: '#1E3A8F',
    bg: 'bg-[#e8eef8]',
  },
];

const CounselingSection: React.FC = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    setError('');

    try {
      // Get current user if logged in
      const { data: { user } } = await supabase.auth.getUser();

      const { error: dbError } = await supabase.from('counseling_bookings').insert({
        user_id: user?.id || null,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        message: formData.message || null,
        status: 'pending',
      });

      if (dbError) throw dbError;

      setSubmitted(true);
      setTimeout(() => {
        setBookingOpen(false);
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to book session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="counseling" className="py-16 bg-white">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[28px] font-bold text-[#1E3A8F] mb-2">Need Guidance? We're Here to Help</h2>
          <p className="text-[16px] text-gray-500 max-w-xl mx-auto">
            Our expert counselors are ready to guide you through every step of your educational journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-[#f8fafc] rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7" style={{ color: service.color }} />
              </div>
              <h3 className="text-[20px] font-bold text-[#1E3A8F] mb-2">{service.title}</h3>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-[13px] text-gray-600">
                    <CheckCircle className="w-4 h-4 text-[#00C7B1] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
  onClick={() => navigate('/counseling')}
  className="w-80 py-3 bg-[#00C7B1] text-white font-semibold rounded-lg hover:bg-[#00b5a1] transition-all flex items-center justify-center gap-2"
>
  🎓 Book Free Counseling Session
</button>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setBookingOpen(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#1E3A8F] to-[#00C7B1] p-6 rounded-t-2xl relative">
             
<button 
  onClick={() => navigate('/counseling')} 
  className="..."
>
  Book Free Session
</button>
              
            </div>

           
          </div>
        </div>
      )}
    </section>
  );
};

export default CounselingSection;
