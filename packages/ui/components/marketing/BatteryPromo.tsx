"use client";

import React from 'react';
import { Button } from '../ui/button';

export function BatteryPromo() {
  return (
    <section className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <span className="text-6xl">🔋</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Power Up Your Workshop
        </h2>
        <p className="text-xl mb-8 text-yellow-100">
          Professional battery tools and equipment for automotive locksmiths
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary">
            Shop Battery Tools
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold mb-2">24/7</div>
            <div className="text-yellow-100">Technical Support</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">1000+</div>
            <div className="text-yellow-100">Professional Tools</div>
          </div>
          <div>
            <div className="text-2xl font-bold mb-2">Fast</div>
            <div className="text-yellow-100">Shipping Worldwide</div>
          </div>
        </div>
      </div>
    </section>
  );
}