"use client";

import React from 'react';

export function CategoryGrid() {
  const categories = [
    {
      id: 1,
      name: "Lock Picks",
      description: "Professional lock picking tools",
      icon: "🔧",
      count: "150+ items"
    },
    {
      id: 2,
      name: "Key Machines",
      description: "Key cutting and duplication equipment",
      icon: "⚙️",
      count: "25+ items"
    },
    {
      id: 3,
      name: "Transponders",
      description: "Key programming and transponder tools",
      icon: "📡",
      count: "80+ items"
    },
    {
      id: 4,
      name: "Entry Tools",
      description: "Vehicle entry and access tools",
      icon: "🚗",
      count: "45+ items"
    },
    {
      id: 5,
      name: "Diagnostic Tools",
      description: "Automotive diagnostic equipment",
      icon: "🔍",
      count: "30+ items"
    },
    {
      id: 6,
      name: "Safety Equipment",
      description: "Professional safety gear",
      icon: "🦺",
      count: "20+ items"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div 
          key={category.id} 
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
        >
          <div className="text-4xl mb-4">{category.icon}</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
          <p className="text-gray-600 mb-3">{category.description}</p>
          <span className="text-sm text-blue-600 font-medium">{category.count}</span>
        </div>
      ))}
    </div>
  );
}