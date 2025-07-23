import React, { useState } from 'react';

const CourseCategories = ({ selectedCategory, onCategoryChange, showAll = true }) => {
  const categories = [
    { id: 'all', name: 'All Courses', icon: '📚', color: 'bg-gray-100' },
    { id: 'technology', name: 'Technology', icon: '💻', color: 'bg-blue-100' },
    { id: 'business', name: 'Business', icon: '💼', color: 'bg-green-100' },
    { id: 'creative', name: 'Creative Arts', icon: '🎨', color: 'bg-purple-100' },
    { id: 'health', name: 'Health & Wellness', icon: '🏥', color: 'bg-red-100' },
    { id: 'education', name: 'Education', icon: '🎓', color: 'bg-yellow-100' },
    { id: 'agriculture', name: 'Agriculture', icon: '🌾', color: 'bg-green-100' },
    { id: 'finance', name: 'Finance', icon: '💰', color: 'bg-emerald-100' }
  ];

  const displayCategories = showAll ? categories : categories.slice(1);

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {displayCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === category.id
              ? 'bg-orange-500 text-white shadow-md'
              : `${category.color} text-gray-700 hover:shadow-md`
          }`}
        >
          <span className="mr-2">{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CourseCategories;