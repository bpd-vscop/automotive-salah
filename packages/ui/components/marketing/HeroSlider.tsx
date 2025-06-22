"use client";

import React from 'react';
import { Button } from '../ui/button';

export function HeroSlider() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Professional Automotive Locksmith Supplies
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Quality tools and equipment for automotive locksmith professionals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Shop Now
            </Button>
            <Button size="lg" variant="outline">
              View Catalog
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-20"></div>
    </section>
  );
}