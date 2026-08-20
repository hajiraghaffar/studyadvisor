// src/components/studyadvisor/Layout.tsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import AuthModal from './AuthModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'register'>('signin');
  
  // Get user from localStorage (or null if not logged in)
  const [user, setUser] = useState<any>(null);
  
  // Check for existing user on mount
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleOpenAuth = (tab: 'signin' | 'register') => {
    setAuthTab(tab);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleLoginSuccess = (loggedInUser: any) => {
    setUser(loggedInUser);
  };

  return (
    <>
      <Navbar 
        onOpenAuth={handleOpenAuth}
        user={user}
        onSignOut={handleSignOut}
      />
      <main>{children}</main>
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authTab}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Layout;