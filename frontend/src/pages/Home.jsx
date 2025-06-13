import React, { useState, useEffect, useRef } from 'react';
import { Users, Phone, ArrowRight, Star, Heart, Zap, Sparkles, Sun, Droplets } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LogoAnimation from '../components/LogoAnimation';
import StaggeredTitle from '../components/StaggeredTitle';
import CtaButtons from '../components/CtaButtons';
import PreviewCards from '../components/PreviewCards';
import Footer from '../components/Footer'; // Importing the new Footer component

const JuicePlusHomepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const FloatingOrb = ({ delay = 0, size = 'w-4 h-4', color = 'bg-yellow-400' }) => (
    <div 
      className={`absolute ${size} ${color} rounded-full blur-sm opacity-60 animate-pulse`}
      style={{
        animationDelay: `${delay}s`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float ${3 + Math.random() * 2}s ease-in-out infinite ${delay}s`
      }}
    />
  );

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo Animation */}
          <LogoAnimation isVisible={isVisible} />

          {/* Main Title with Staggered Animation */}
          <div className="mb-12">
            <StaggeredTitle isVisible={isVisible} />
          </div>

          {/* Subtitle */}
          <p className={`text-2xl lg:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed transition-all duration-2000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Where <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent font-bold">premium meets pure</span> - 
            Experience the ultimate fusion of exotic fruits, cutting-edge nutrition, and unparalleled taste
          </p>

          {/* Interactive CTA Buttons */}
          <CtaButtons isVisible={isVisible} />
        </div>

        {/* Floating Juice Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large Floating Fruits */}
          <div className="absolute top-20 left-10 text-8xl opacity-20 animate-float">🍊</div>
          <div className="absolute top-40 right-20 text-6xl opacity-30 animate-float" style={{ animationDelay: '1s' }}>🥭</div>
          <div className="absolute bottom-32 left-20 text-7xl opacity-25 animate-float" style={{ animationDelay: '2s' }}>🍓</div>
          <div className="absolute top-60 left-1/2 text-5xl opacity-40 animate-float" style={{ animationDelay: '0.5s' }}>🥝</div>
          <div className="absolute bottom-20 right-10 text-9xl opacity-15 animate-float" style={{ animationDelay: '1.5s' }}>🫐</div>
        </div>
      </section>

      {/* Features Section with Glass Morphism */}
      <section className="relative z-10 py-32 bg-gradient-to-b from-transparent to-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-6xl lg:text-7xl font-black text-white mb-8">
              Why Choose 
              <span className="bg-gradient-to-r from-emerald-400 to-orange-400 bg-clip-text text-transparent block">
                Juice Plus?
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We don't just make juice - we craft liquid perfection that transforms your day
            </p>
          </div>
          <PreviewCards />
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative z-10 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-purple-600 to-orange-600 opacity-90" />
        <div className="absolute inset-0 bg-black/20" />
        
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex justify-center mb-8">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="h-12 w-12 text-yellow-400 fill-current animate-pulse" 
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            
            <h2 className="text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              Ready for the
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Ultimate Experience?
              </span>
            </h2>
            
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the exclusive community of taste connoisseurs who demand nothing but extraordinary
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <button 
              onClick={() => navigate('/contact')}
              className="group bg-white text-black px-16 py-8 rounded-full font-black text-2xl hover:bg-yellow-300 transform hover:scale-110 transition-all duration-500 shadow-2xl relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-4">
                <Heart className="h-8 w-8 group-hover:animate-spin" />
                <span>Visit Us</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <Footer />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(-10px) rotate(-5deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default JuicePlusHomepage;