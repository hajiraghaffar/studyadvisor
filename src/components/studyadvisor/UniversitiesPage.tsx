// src/components/studyadvisor/UniversitiesPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';

interface University {
  id: number;
  name: string;
  shortName: string;
  city: string;
  province: string;
  type: string;
  ranking: number;
  imagePath: string;
  studentsCount: string;
}

export default function UniversitiesPage() {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [user, setUser] = useState<any>(null);

  // Get logged-in user
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  // Fetch universities
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const data = await api.getUniversities();
        setUniversities(data);
        
        // Fetch user's wishlist if logged in
        if (user?.id) {
          const wishlistData = await api.getUserWishlist(user.id);
          setWishlist(wishlistData.map((item: any) => item.university?.id || item.universityId));
        }
      } catch (error) {
        console.error('Error fetching universities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUniversities();
  }, [user?.id]);

  // Add to Wishlist
  const handleAddToWishlist = async (e: React.MouseEvent, universityId: number) => {
    e.stopPropagation(); // Prevent navigation to university detail
    
    if (!user) {
      alert('Please login to save universities to wishlist');
      navigate('/login');
      return;
    }
    
    try {
      const result = await api.addToWishlist(user.id, universityId);
      if (result.success) {
        setWishlist([...wishlist, universityId]);
        alert('Added to wishlist!');
      } else {
        alert(result.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Error adding to wishlist');
    }
  };

  // Remove from Wishlist
  const handleRemoveFromWishlist = async (e: React.MouseEvent, universityId: number) => {
    e.stopPropagation();
    
    try {
      const result = await api.removeFromWishlistByUserAndUniversity(user.id, universityId);
      if (result.success) {
        setWishlist(wishlist.filter(id => id !== universityId));
        alert('Removed from wishlist!');
      } else {
        alert(result.message || 'Failed to remove from wishlist');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      alert('Error removing from wishlist');
    }
  };

  const provinces = [...new Set(universities.map(u => u.province))];
  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = searchTerm === '' || 
      uni.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.shortName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.city?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProvince = selectedProvince === '' || uni.province === selectedProvince;
    const matchesType = selectedType === '' || uni.type === selectedType;
    return matchesSearch && matchesProvince && matchesType;
  });

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen pt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A8F] mb-4"></div>
          <p className="text-gray-500">Loading universities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-2">
      <div className="container mx-auto px-4 py-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img 
            src="/assets/logo.png" 
            alt="StudyAdvisor" 
            className="h-13 w-auto max-w-full"
            style={{ maxWidth: '200px' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#1E3A8F' }}>Universities in Pakistan</h1>
          <p className="text-gray-500 mt-2">{universities.length} universities found</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Search universities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-lg text-sm"
            />
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="p-2 border rounded-lg text-sm"
            >
              <option value="">All Provinces</option>
              {provinces.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-2 border rounded-lg text-sm"
            >
              <option value="">All Types</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedProvince(''); setSelectedType(''); }}
              className="bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Universities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUniversities.map((uni) => {
            const isInWishlist = wishlist.includes(uni.id);
            
            return (
              <div
                key={uni.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group relative"
              >
                {/* Image with Wishlist Button Overlay */}
                <div className="relative">
                  <div 
                    onClick={() => navigate(`/university/${uni.id}`)}
                    className="cursor-pointer"
                  >
                    <div className="w-full h-40 overflow-hidden bg-gray-100">
                      <img
                        src={uni.imagePath || '/assets/images/universities/default.jpg'}
                        alt={uni.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/400x200/1E3A8F/white?text=' + uni.shortName;
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* WISHLIST BUTTON - Heart icon in top-right corner */}
                  <button
                    onClick={(e) => isInWishlist ? handleRemoveFromWishlist(e, uni.id) : handleAddToWishlist(e, uni.id)}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <span className="text-xl">
                      {isInWishlist ? '❤️' : '🤍'}
                    </span>
                  </button>
                </div>
                
                {/* Content */}
                <div 
                  onClick={() => navigate(`/university/${uni.id}`)}
                  className="p-3 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-sm" style={{ color: '#1E3A8F' }}>{uni.shortName}</h3>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${uni.type === 'Public' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                      {uni.type === 'Public' ? 'Pub' : 'Pvt'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{uni.name}</p>
                  <p className="text-xs text-gray-400 mt-1">📍 {uni.city}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Rank #{uni.ranking}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredUniversities.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No universities found</p>
          </div>
        )}
      </div>
    </div>
  );
}