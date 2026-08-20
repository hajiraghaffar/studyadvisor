// src/components/studyadvisor/WishlistPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/services/api';
import { Heart, Trash2 } from 'lucide-react';

interface WishlistItem {
  id: number;
  university: {
    id: number;
    name: string;
    shortName: string;
    city: string;
    province: string;
    type: string;
    ranking: number;
    imagePath: string;
  };
}

export default function WishlistPage() {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(userStr);
    setUser(userData);
    fetchWishlist(userData.id);
  }, [navigate]);

  const fetchWishlist = async (userId: number) => {
    try {
      const data = await api.getUserWishlist(userId);
      setWishlistItems(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistId: number, universityName: string) => {
    try {
      await api.removeFromWishlist(wishlistId);
      setWishlistItems(wishlistItems.filter(item => item.id !== wishlistId));
      alert(`Removed ${universityName} from wishlist`);
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      alert('Failed to remove');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A8F]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1E3A8F] mb-2">My Wishlist</h1>
        <p className="text-gray-500 mb-8">Universities you've saved for later</p>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-4">Save universities by clicking the heart icon on university cards</p>
            <button onClick={() => navigate('/universities')} className="bg-[#00C7B1] text-white px-6 py-2 rounded-lg">
              Browse Universities
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition group relative"
              >
                {/* Remove button */}
                <button
                  onClick={() => removeFromWishlist(item.id, item.university.name)}
                  className="absolute top-2 right-2 z-10 bg-white/80 rounded-full p-1.5 shadow-md hover:bg-red-50 transition"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>

                {/* Image */}
                <div 
                  className="w-full h-40 overflow-hidden bg-gray-100 cursor-pointer"
                  onClick={() => navigate(`/university/${item.university.id}`)}
                >
                  <img
                    src={item.university.imagePath || '/assets/images/universities/default.jpg'}
                    alt={item.university.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/400x200/1E3A8F/white?text=' + item.university.shortName;
                    }}
                  />
                </div>

                {/* Content */}
                <div 
                  className="p-3 cursor-pointer"
                  onClick={() => navigate(`/university/${item.university.id}`)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-sm text-[#1E3A8F]">{item.university.shortName}</h3>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-green-100 text-green-700">
                      {item.university.type === 'Public' ? 'Pub' : 'Pvt'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{item.university.name}</p>
                  <p className="text-xs text-gray-400 mt-1">📍 {item.university.city}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Rank #{item.university.ranking}</span>
                    <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}