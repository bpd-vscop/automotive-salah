"use client";

import React from 'react';
import { Button } from '../ui/button';

export function NewProductsSection() {
  const newProducts = [
    {
      id: 1,
      name: "Advanced Lock Pick Gun",
      price: "$199.99",
      badge: "NEW"
    },
    {
      id: 2,
      name: "Digital Key Programmer",
      price: "$1,599.99",
      badge: "NEW"
    },
    {
      id: 3,
      name: "Universal Jiggler Set",
      price: "$79.99",
      badge: "NEW"
    }
  ];

  return (
    <section className="w-[88%] mx-auto py-8 md:py-12">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-800">New Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
              <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs font-bold rounded">
                {product.badge}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
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