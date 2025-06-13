import React from 'react';

// Reusable MenuItem component with enhanced mobile design
const MenuItem = ({ name, description, price, badge, image, ingredients }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-all duration-200 hover:shadow-lg">
      {/* Image container with proper aspect ratio */}
      <div className="relative w-full h-40 sm:h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
        />
        {badge && (
          <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
            {badge}
          </span>
        )}
      </div>
      {/* Content section with improved spacing */}
      <div className="p-3 sm:p-4 flex flex-col gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 flex items-center justify-between">
          {name}
          {/* Five stars rating */}
          <span className="flex ml-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
            ))}
          </span>
        </h3>
        <p className="text-gray-600 text-sm sm:text-base mb-1 line-clamp-2">{description}</p>
        {/* Ingredients section */}
        {ingredients && ingredients.length > 0 && (
          <div className="mb-2">
            <span className="block text-xs font-semibold text-green-700 mb-1">Ingredients:</span>
            <ul className="flex flex-wrap gap-1">
              {ingredients.map((ing, idx) => (
                <li key={idx} className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium border border-green-200">
                  {ing}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-between items-center mt-auto">
          <span className="text-green-600 font-bold text-lg">{price} Birr</span>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
