import React from 'react';

const CategoryNav = ({ categories, activeCategory, setActiveCategory }) => (
  <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-6">
    {categories.map((cat) => (
      <button
        key={cat._id}
        className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
          activeCategory && activeCategory._id === cat._id
            ? 'bg-green-600 text-white shadow-lg transform scale-105'
            : 'bg-white text-gray-700 hover:bg-green-50 shadow-md'
        }`}
        onClick={() => setActiveCategory(cat)}
      >
        {cat.name === 'Drink' && '🥤 '}
        {cat.name === 'Food' && '🍽️ '}
        {cat.name === 'Fruit' && '🍎 '}
        {cat.name}
      </button>
    ))}
  </div>
);

export default CategoryNav;
