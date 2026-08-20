import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import type { User } from '@supabase/supabase-js';
import NotificationBell from '@/components/studyadvisor/NotificationBell';

interface NavbarProps {
  onOpenAuth: (tab: 'signin' | 'register') => void;
  user: User | null;
  onSignOut: () => void;
}

const navItems = [
  { label: 'Home', href: '/' },
  { 
    label: 'Programs', 
    href: '/programs', 
    dropdown: [
      { label: 'All Programs', href: '/programs' },
      { label: 'Engineering', href: '/programs?category=Engineering' },
      { label: 'Medical', href: '/programs?category=Medical' },
      { label: 'Business', href: '/programs?category=Business' },
      { label: 'Computer Science', href: '/programs?category=Computer Science' },
    ]
  },
  { 
    label: 'Universities', 
    href: '/universities', 
    dropdown: [
      { label: 'All Universities', href: '/universities' },
      { label: 'Islamabad', href: '/universities?city=Islamabad' },
      { label: 'Lahore', href: '/universities?city=Lahore' },
      { label: 'Karachi', href: '/universities?city=Karachi' },
      { label: 'Public Universities', href: '/universities?type=Public' },
      { label: 'Private Universities', href: '/universities?type=Private' },
      { label: 'Top Ranked', href: '/universities?sort=ranking' },
      { label: 'University Offers', href: '/university/offers' },
    ]
  },
  { 
    label: 'Admission', 
    href: '/admission',
    dropdown: [
      { label: 'Admission Guide', href: '/admission' },
      { label: 'Deadlines', href: '/admission' },
      { label: 'Requirements', href: '/admission' },
      { label: 'Apply Now', href: '/admission' },
      { label: 'MyApplications', href: '/my-applications' },
    ]
  },
  { 
    label: 'Admin', 
    href: '/university/dashboard',
    dropdown: [
      { label: 'Compare', href: '/compare' },
      { label: 'University Dashboard', href: '/university/dashboard' },
      { label: 'Wishlist', href: '/wishlist' },
    ]
  },
  {
    label: 'Counseling', 
    href: '/counseling',  
    dropdown: [
      { label: 'Career Guidance', href: '/counseling' },
      { label: 'FAQ', href: '/faq' },
    ]
  },
  {
    label: 'Services', 
    href: '/services',  
    dropdown: [
      { label: 'Document Verification', href: '/services/verification' },
      { label: 'Application Tracking', href: '/services/tracking' },
    ]
  },
  {
    label: 'Contact', 
    href: '/change-password',
    dropdown: [
      { label: 'Change Password', href: '/change-password' },
      //{ label: 'Forget Password', href: '/forget-password' },
      //{ label: 'Reset Password', href: '/reset-password' },
    ]
  },
];

const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, user, onSignOut }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userRole = user?.user_metadata?.role || 'student';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setSearchOpen(false);
    
    if (href.startsWith('/')) {
      navigate(href);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const handleSearch = () => {
    setSearchOpen(false);
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#1E3A8F]/90 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('/')} 
              className="flex items-center shrink-0 cursor-pointer"
            >
              <img 
                src="/assets/white-logo.png" 
                alt="Study Advisor Logo" 
                className="h-13 w-auto max-w-full"
                style={{ maxWidth: '130px' }}
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/120x40/1E3A8F/white?text=SA';
                }}
              />
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="flex items-center gap-1 px-3 py-2 text-[15px] font-medium text-white hover:text-[#00C7B1] transition-colors rounded"
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-0 w-52 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                      {item.dropdown.map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => handleNavClick(sub.href)}
                          className="block w-full text-left px-4 py-2.5 text-[14px] text-[#333] hover:bg-[#f0f7ff] hover:text-[#1E3A8F] transition-colors"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              {/* ONLY ADDED NOTIFICATION BELL - NO OTHER CHANGES */}
            {user && <NotificationBell userId={Number(user.id)} />}

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1E3A8F] text-[13px] font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left hidden md:block">
                      <div className="text-[13px] font-semibold text-white leading-tight max-w-[120px] truncate">{userName}</div>
                      <div className="text-[11px] text-[#00C7B1] font-medium capitalize">{userRole}</div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-white" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="text-[13px] font-semibold text-[#333] truncate">{userName}</div>
                        <div className="text-[11px] text-gray-400 truncate">{user.email}</div>
                      </div>
                      <button 
                        onClick={() => {
                          setUserMenuOpen(false);
                          handleNavClick('/change-password');
                        }}
                        className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-[14px] text-gray-600 hover:bg-gray-50 hover:text-[#1E3A8F] transition-colors"
                      >
                        <span className="text-lg">🔑</span> Change Password
                      </button>
                      <button 
                        onClick={() => handleNavClick('/profile')}
                        className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-[14px] text-gray-600 hover:bg-gray-50 hover:text-[#1E3A8F] transition-colors"
                      >
                        <UserIcon className="w-4 h-4" /> My Profile
                      </button>
                      <button
                        onClick={() => { setUserMenuOpen(false); onSignOut(); }}
                        className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-[14px] text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => onOpenAuth('signin')}
                    className="hidden sm:inline-flex px-4 py-2 text-[13px] font-medium text-white border-2 border-white rounded hover:bg-white hover:text-[#1E3A8F] transition-all"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => onOpenAuth('register')}
                    className="hidden sm:inline-flex px-4 py-2 text-[13px] font-medium text-white bg-[#00C7B1] rounded hover:bg-[#00b5a1] transition-all"
                  >
                    Register
                  </button>
                </>
              )}

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white hover:text-[#00C7B1] transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-w-[800px] mx-auto flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search for courses, universities or programs..."
                  className="w-full pl-12 pr-4 py-3 text-[16px] border-2 border-gray-200 rounded-lg focus:border-[#00C7B1] focus:outline-none transition-colors"
                />
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-3 bg-[#00C7B1] text-white font-medium rounded-lg hover:bg-[#00b5a1] transition-colors"
              >
                Search
              </button>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-3 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 max-h-[80vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => {
                      if (item.dropdown) {
                        setActiveDropdown(activeDropdown === item.label ? null : item.label);
                      } else {
                        handleNavClick(item.href);
                      }
                    }}
                    className="flex items-center justify-between w-full px-3 py-3 text-[15px] font-medium text-[#333] hover:text-[#1E3A8F] hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="pl-4 space-y-0.5">
                      {item.dropdown.map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => handleNavClick(sub.href)}
                          className="block w-full text-left px-3 py-2.5 text-[14px] text-gray-600 hover:text-[#1E3A8F] hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 flex gap-2 border-t border-gray-100 mt-2">
                {user ? (
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 px-3 py-2">
                      <div className="w-8 h-8 rounded-full bg-[#1E3A8F] flex items-center justify-center text-white text-[13px] font-bold">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-[#333]">{userName}</div>
                        <div className="text-[11px] text-[#00C7B1] capitalize">{userRole}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => { setMobileOpen(false); onSignOut(); }}
                      className="w-full px-4 py-2.5 text-[15px] font-medium text-red-500 border border-red-200 rounded hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => { setMobileOpen(false); onOpenAuth('signin'); }}
                      className="flex-1 px-4 py-2.5 text-[15px] font-medium text-[#1E3A8F] border-2 border-[#1E3A8F] rounded hover:bg-[#1E3A8F] hover:text-white transition-all"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => { setMobileOpen(false); onOpenAuth('register'); }}
                      className="flex-1 px-4 py-2.5 text-[15px] font-medium text-white bg-[#00C7B1] rounded hover:bg-[#00b5a1] transition-all"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;