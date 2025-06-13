import React from 'react';

const StaggeredTitle = ({ isVisible }) => (
  <div>
    <h1 className="text-8xl lg:text-9xl font-black mb-6 leading-none tracking-tight">
    {['J', 'U', 'I', 'C', 'E'].map((letter, i) => (
      <span 
        key={i}
        className={`inline-block bg-gradient-to-br from-emerald-400 via-purple-400 to-orange-400 bg-clip-text text-transparent transition-all duration-1000 hover:scale-125 cursor-default ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
        style={{ 
          transitionDelay: `${i * 100}ms`,
          textShadow: '0 0 50px rgba(16, 185, 129, 0.3)'
        }}
      >
        {letter}
      </span>
    ))}
  </h1>
    <div className="relative">
        <h2 className={`text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-emerald-200 to-orange-200 bg-clip-text text-transparent transition-all duration-1500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
        PLUS
        </h2>
        <div className="absolute -top-4 -right-8 text-2xl animate-bounce">✨</div>
    </div>
  </div>
);

export default StaggeredTitle;
