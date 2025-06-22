"use client";

import React from 'react';
import { Button } from '../ui/button';

export function OnSale() {
  const saleProducts = [
    {
      id: 1,
      name: "Basic Lock Pick Set",
      price: "$89.99",
      originalPrice: "$129.99",
      discount: "30% OFF"
    },
    {
      id: 2,
      name: "Car Opening Tool Kit",
      price: "$159.99",
      originalPrice: "$199.99",
      discount: "20% OFF"
    },
    {
      id: 3,
      name: "Key Blank Assortment",
      price: "$49.99",
      originalPrice: "$79.99",
      discount: "37% OFF"
    }
  ];

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-800">On Sale</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {saleProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
              <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                {product.discount}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-red-600">{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                </div>
                <Button size="sm" variant="destructive">Add to Cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}