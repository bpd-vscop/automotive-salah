"use client";

import React from 'react';
import { Button } from '../ui/button';

interface VehicleSearchProps {
  isMobileSearchOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

export function VehicleSearch({ isMobileSearchOpen, onToggle }: VehicleSearchProps) {
  return (
    <div className="bg-gray-100 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-4">
          <select className="border border-gray-300 rounded-md px-3 py-2">
            <option>Select Make</option>
            <option>Toyota</option>
            <option>Honda</option>
            <option>Ford</option>
            <option>BMW</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-2">
            <option>Select Model</option>
            <option>Camry</option>
            <option>Civic</option>
            <option>F-150</option>
            <option>3 Series</option>
          </select>
          <select className="border border-gray-300 rounded-md px-3 py-2">
            <option>Select Year</option>
            <option>2024</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
          </select>
          <Button>Search Parts</Button>
        </div>
      </div>
    </div>
  );
}