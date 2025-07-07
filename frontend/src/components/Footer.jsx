import React from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="relative z-10 bg-black/90 backdrop-blur-xl border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-emerald-500 to-orange-500 p-2 rounded-2xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent">
                Juice Plus
              </span>
            </div>
            <p className="text-gray-400 text-base max-w-md leading-relaxed">
              Redefining premium beverages through innovation, quality, and an unwavering commitment to extraordinary taste experiences.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white text-lg mb-3">Experience</h4>
            <div className="space-y-2">
              <button onClick={() => navigate('/about')} className="block text-gray-400 hover:text-emerald-400 transition-colors text-base">Our Story</button>
              <button onClick={() => navigate('/')} className="block text-gray-400 hover:text-emerald-400 transition-colors text-base">Premium Menu</button>
              <button onClick={() => navigate('/contact')} className="block text-gray-400 hover:text-emerald-400 transition-colors text-base">Contact</button>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white text-lg mb-3">Hours</h4>
            <div className="text-gray-400 space-y-1 text-base">
              <p>Monday - Friday</p>
              <p className="text-emerald-400 font-semibold">7:00 AM - 9:00 PM</p>
              <p>Weekend</p>
              <p className="text-emerald-400 font-semibold">8:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-gray-500 text-base">
            © 2025 <span className="text-emerald-400 font-semibold">Juice Plus</span>. Crafting liquid perfection.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
