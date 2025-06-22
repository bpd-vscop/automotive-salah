"use client";

import React from 'react';
import { Button } from '../ui/button';

export function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Professional Lock Pick Set",
      price: "$299.99",
      image: "/api/placeholder/300/200",
      description: "Complete 24-piece lock pick set for automotive applications"
    },
    {
      id: 2,
      name: "Key Cutting Machine",
      price: "$1,299.99",
      image: "/api/placeholder/300/200",
      description: "High-precision key cutting machine for automotive keys"
    },
    {
      id: 3,
      name: "Transponder Programmer",
      price: "$899.99",
      image: "/api/placeholder/300/200",
      description: "Universal transponder programming device"
    },
    {
      id: 4,
      name: "Slim Jim Tool Set",
      price: "$89.99",
      image: "/api/placeholder/300/200",
      description: "Professional slim jim tools for vehicle entry"
    }
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">{product.price}</span>
                <Button size="sm">Add to Cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}