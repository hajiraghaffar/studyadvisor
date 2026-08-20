import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import Navbar from './studyadvisor/Navbar';
import Hero from './studyadvisor/Hero';
import LogoSlider from './studyadvisor/LogoSlider';
import HowItWorks from './studyadvisor/HowItWorks';
import PopularPrograms from './studyadvisor/PopularPrograms';
import FeaturedUniversities from './studyadvisor/FeaturedUniversities';
import Testimonials from './studyadvisor/Testimonials';
import ProgramSearch from './studyadvisor/ProgramSearch';
import CounselingSection from './studyadvisor/CounselingSection';
import DashboardPreview from './studyadvisor/DashboardPreview';
import BlogSection from './studyadvisor/BlogSection';
import Newsletter from './studyadvisor/Newsletter';
import Footer from './studyadvisor/Footer';
import AuthModal from './studyadvisor/AuthModal';
import BackToTop from './studyadvisor/BackToTop';

const AppLayout: React.FC = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'register'>('signin');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const openAuth = (tab: 'signin' | 'register') => {
    setAuthTab(tab);
    setAuthOpen(true);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#333333] font-sans">
      {/* Navigation */}
      <Navbar onOpenAuth={openAuth} user={user} onSignOut={handleSignOut} />

      {/* Main Content */}
      <main>
        <Hero />
        <LogoSlider />
        <HowItWorks />
        <PopularPrograms />
        <FeaturedUniversities />
        <Testimonials />
        <ProgramSearch />
        <DashboardPreview />
        <CounselingSection />
        <BlogSection />
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialTab={authTab} />

      {/* Back to Top */}
      <BackToTop />
    </div>
  );
};

export default AppLayout;
