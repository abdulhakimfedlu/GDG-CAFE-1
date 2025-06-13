import React from 'react';
import { Zap, ArrowRight, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CtaButtons = ({ isVisible }) => {
  const navigate = useNavigate();
  return (
    <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-2500 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
    }`}>
      <button 
        onClick={() => navigate('/')}
        className="group relative bg-gradient-to-r from-emerald-500 via-purple-500 to-orange-500 p-1 rounded-full overflow-hidden transform hover:scale-110 transition-all duration-500"
      >
        <div className="bg-black rounded-full px-12 py-6 relative z-10 group-hover:bg-transparent transition-all duration-500">
          <span className="text-white group-hover:text-white font-bold text-xl flex items-center space-x-3">
            <Zap className="h-6 w-6 group-hover:animate-pulse" />
            <span>Explore Menu</span>                  
            <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </button>
      
      {/* <button className="group border-2 border-emerald-400 text-emerald-400 px-12 py-6 rounded-full font-bold text-xl hover:bg-emerald-400 hover:text-black transition-all duration-500 transform hover:scale-110 relative overflow-hidden">
        <span className="relative z-10 flex items-center space-x-2">
          <Sun className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
          <span>Order Fresh</span>
        </span>
      </button> */}
    </div>
  );
};

export default CtaButtons;
