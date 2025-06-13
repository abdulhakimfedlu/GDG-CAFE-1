import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryNav from '../components/CategoryNav';
import MenuItem from '../components/MenuItem';
import Footer from '../components/Footer';

const MenuPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [ratings, setRatings] = useState({}); // { menuId: { average, count, userRating } }
  const [user, setUser] = useState(null); // For demo: get user from localStorage or context
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user (for demo, from localStorage)
  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
  }, []);

  // Fetch categories and menu items
  useEffect(() => {
    setIsVisible(true);
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/categories');
        setCategories(res.data || []);
        if (res.data && res.data.length > 0) {
          setActiveCategory(res.data[0]);
        }
        setError(null);
      } catch {
        setError('Failed to load categories.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch menu items for the active category
  useEffect(() => {
    if (!activeCategory) return;
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/menus/category/${activeCategory._id}`);
        setMenuItems(res.data || []);
        setError(null);
      } catch {
        setError('Failed to load menu.');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [activeCategory]);

  // Fetch ratings for all menu items in the active category
  useEffect(() => {
    const fetchRatings = async () => {
      if (!menuItems.length) return;
      const newRatings = {};
      await Promise.all(menuItems.map(async (item) => {
        try {
          const res = await axios.get(`/api/ratings/${item._id}`);
          newRatings[item._id] = {
            average: res.data.average,
            count: res.data.count,
            ratings: res.data.ratings,
            userRating: res.data.ratings.find(r => r.user === user?._id)
          };
        } catch {
          // ignore error
        }
      }));
      setRatings(newRatings);
    };
    fetchRatings();
  }, [menuItems, user]);

  return (
    <div className={`bg-gradient-to-br from-green-50 to-green-100 min-h-screen transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Simple Hero Section right after navbar */}
      <div className="pt-24 pb-2 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1">Our Menu</h1>
        <p className="text-sm sm:text-lg text-gray-600">Fresh, Healthy, and Bursting with Flavor!</p>
      </div>

      {/* Category Navigation Buttons */}
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Active Section with enhanced animations */}
      <div className="animate-fadeIn">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : !menuItems || menuItems.length === 0 ? (
          <div className="text-center text-gray-400">No items found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {menuItems.map((item, idx) => (
              <MenuItem
                key={item._id || idx}
                name={item.name}
                description={item.description}
                price={item.price}
                badge={item.badge}
                image={item.image}
                ingredients={item.ingredients || []}
                menuId={item._id}
                ratingInfo={ratings[item._id]}
                user={user}
                onRate={async (rating, comment) => {
                  if (!user) return alert('Login to rate');
                  try {
                    await axios.post(`/api/ratings/${item._id}`, { rating, comment }, {
                      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });
                    // Refresh ratings
                    const res = await axios.get(`/api/ratings/${item._id}`);
                    setRatings(r => ({ ...r, [item._id]: {
                      average: res.data.average,
                      count: res.data.count,
                      ratings: res.data.ratings,
                      userRating: res.data.ratings.find(r => r.user === user._id)
                    }}));
                  } catch {
                    alert('Failed to rate');
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MenuPage;