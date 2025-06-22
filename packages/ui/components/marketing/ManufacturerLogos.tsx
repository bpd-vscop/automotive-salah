"use client";

import React from 'react';

export function ManufacturerLogos() {
  const manufacturers = [
    { id: 1, name: "Toyota", logo: "🚗" },
    { id: 2, name: "Honda", logo: "🚙" },
    { id: 3, name: "Ford", logo: "🚐" },
    { id: 4, name: "BMW", logo: "🏎️" },
    { id: 5, name: "Mercedes", logo: "🚘" },
    { id: 6, name: "Audi", logo: "🚗" },
    { id: 7, name: "Volkswagen", logo: "🚙" },
    { id: 8, name: "Nissan", logo: "🚐" }
  ];

  return (
    <div className="bg-white py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
        {manufacturers.map((manufacturer) => (
          <div 
            key={manufacturer.id} 
            className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <div className="text-4xl mb-2">{manufacturer.logo}</div>
            <span className="text-sm font-medium text-gray-600">{manufacturer.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}