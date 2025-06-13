import React from 'react';
import { Users, Phone, ArrowRight, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PreviewCards = () => {
  const navigate = useNavigate();
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* About Preview - Glass Card */}
      <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-emerald-400/50 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative z-10">
          <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl w-20 h-20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
            <Users className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-6">Our Legacy</h3>
          <p className="text-gray-300 mb-8 leading-relaxed text-lg">
            Born from a revolutionary vision to redefine what premium juice means. We source exotic fruits from pristine locations worldwide.
          </p>
          <button 
            onClick={() => navigate('/about')}
            className="group/btn text-emerald-400 font-bold text-lg flex items-center space-x-3 hover:text-emerald-300 transition-colors"
          >
            <span>Discover Our Story</span>
            <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      {/* Menu Preview - Glass Card */}
      <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-orange-400/50 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative z-10">
          <div className="bg-gradient-to-br from-orange-400 to-pink-600 rounded-2xl w-20 h-20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
            <Droplets className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-6">Liquid Art</h3>
          <p className="text-gray-300 mb-8 leading-relaxed text-lg">
            From molecular gastronomy smoothies to cold-pressed masterpieces. Each drink is a symphony of flavors crafted by juice artisans.
          </p>
          <button 
            onClick={() => navigate('/menu')}
            className="group/btn text-orange-400 font-bold text-lg flex items-center space-x-3 hover:text-orange-300 transition-colors"
          >
            <span>View Creations</span>
            <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      {/* Contact Preview - Glass Card */}
      <div className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-purple-400/50 transition-all duration-700 transform hover:-translate-y-4 hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative z-10">
          <div className="bg-gradient-to-br from-purple-400 to-blue-600 rounded-2xl w-20 h-20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
            <Phone className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-6">Connect</h3>
          <p className="text-gray-300 mb-8 leading-relaxed text-lg">
            Step into our flagship experience center or reach out to our juice concierge team. Premium service for premium tastes.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="group/btn text-purple-400 font-bold text-lg flex items-center space-x-3 hover:text-purple-300 transition-colors"
          >
            <span>Get in Touch</span>
            <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewCards;
