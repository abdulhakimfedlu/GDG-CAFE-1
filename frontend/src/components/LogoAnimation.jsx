import React from 'react';
import { Sparkles } from 'lucide-react';

const LogoAnimation = ({ isVisible }) => (
  <div className={`mb-8 transition-all duration-2000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
    <div className="relative inline-block">
      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600 via-purple-600 to-orange-600 rounded-full blur-xl opacity-30 animate-pulse" />
      <div className="relative bg-gradient-to-r from-emerald-500 to-orange-500 p-6 rounded-full">
        <Sparkles className="h-12 w-12 text-white animate-spin" style={{ animationDuration: '8s' }} />
      </div>
    </div>
  </div>
);

export default LogoAnimation;
