"use client";

import React from 'react';
import { Button } from '../ui/button';

export function BackInStock() {
  const backInStockProducts = [
    {
      id: 1,
      name: "Professional Bump Key Set",
      price: "$149.99",
      originalPrice: "$179.99"
    },
    {
      id: 2,
      name: "Electronic Lock Pick",
      price: "$399.99",
      originalPrice: "$449.99"
    },
    {
      id: 3,
      name: "Master Key System",
      price: "$799.99",
      originalPrice: "$899.99"
    }
  ];

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-800">Back In Stock</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {backInStockProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Product Image</span>
              </div>
              <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded">
                BACK IN STOCK
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-blue-600">{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                </div>
                <Button size="sm">Add to Cart</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}