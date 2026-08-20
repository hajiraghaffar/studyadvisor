// src/components/studyadvisor/HowItWorks.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText, BarChart3, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Find Your Perfect Program',
    description: 'Search thousands of programs across Pakistan. Filter by city, subject, fee, and entry requirements.',
    color: '#1E3A8F',
    bg: '#e8eef8',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop',
    imageAlt: 'Student searching programs'
  },
  {
    icon: FileText,
    title: 'One Profile, Multiple Applications',
    description: 'Create one profile and apply to multiple universities. No repetitive form filling.',
    color: '#00C7B1',
    bg: '#e0f8f4',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop',
    imageAlt: 'Student filling application'
  },
  {
    icon: BarChart3,
    title: 'Monitor Your Applications',
    description: 'Track all your applications from one dashboard. Get instant status updates.',
    color: '#1E3A8F',
    bg: '#e8eef8',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    imageAlt: 'Dashboard monitoring'
  },
  {
    icon: Trophy,
    title: 'Receive & Manage Offers',
    description: 'Accept or decline offers digitally. Choose your firm and insurance choices.',
    color: '#00C7B1',
    bg: '#e0f8f4',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop',
    imageAlt: 'Student receiving offer'
  },
];

const HowItWorks: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setActiveIndex((prev) => (prev + 1) % steps.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Scroll animation - detect when cards come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const cards = document.querySelectorAll('.step-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) => (prev + 1) % steps.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <section id="how-it-works" ref={sectionRef} className="py-16 bg-gradient-to-b from-[#f8fafc] to-white">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header with animation */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-[28px] font-bold text-[#1E3A8F] mb-2">How StudyAdvisor Works</h2>
          <p className="text-[16px] text-gray-500 max-w-xl mx-auto">
            Four simple steps to your dream university
          </p>
        </div>

        {/* Desktop View - Animated Cards Grid with Scroll Reveal */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              data-index={i}
              className={`step-card relative bg-white rounded-xl overflow-hidden text-center shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 group hover:-translate-y-2 ${
                visibleCards.includes(i) ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Image Container with relative positioning */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={step.image}
                  alt={step.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Dark overlay for better text visibility on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Step Number - NOW INSIDE THE IMAGE, NOT CUT OFF */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#1E3A8F] text-white text-[13px] font-bold flex items-center justify-center shadow-lg z-10">
                  {i + 1}
                </div>
              </div>

              <div className="p-5">
                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: step.bg }}
                >
                  <step.icon className="w-7 h-7" style={{ color: step.color }} />
                </div>

                <h3 className="text-[18px] font-bold text-[#1E3A8F] mb-2">{step.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet View - Animated Carousel */}
        <div className="lg:hidden relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {steps.map((step, i) => (
                <div key={i} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                    {/* Image with step number - FIXED */}
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.imageAlt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      
                      {/* Step Number - Properly positioned */}
                      <div className="absolute top-3 right-3 bg-[#1E3A8F] text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg z-10">
                        {i + 1}
                      </div>
                    </div>

                    <div className="p-6 text-center">
                      <div
                        className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                        style={{ backgroundColor: step.bg }}
                      >
                        <step.icon className="w-8 h-8" style={{ color: step.color }} />
                      </div>
                      <h3 className="text-xl font-bold text-[#1E3A8F] mb-3">{step.title}</h3>
                      <p className="text-[14px] text-gray-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all z-10"
          >
            <ChevronLeft className="w-5 h-5 text-[#1E3A8F]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all z-10"
          >
            <ChevronRight className="w-5 h-5 text-[#1E3A8F]" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setActiveIndex(i);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`transition-all duration-300 ${
                  activeIndex === i
                    ? 'w-8 h-2 bg-[#00C7B1] rounded-full'
                    : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="hidden lg:flex justify-center gap-2 mt-10">
          {steps.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-500 cursor-pointer"
              style={{
                width: activeIndex === i ? '40px' : '20px',
                backgroundColor: activeIndex === i ? '#00C7B1' : '#E2E8F0',
              }}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setActiveIndex(i);
                  setTimeout(() => setIsAnimating(false), 500);
                }
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;