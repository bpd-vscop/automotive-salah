"use client";

import React from 'react';
import { Button } from '../ui/button';

interface HeaderMenuProps {
  isMobileSearchOpen: boolean;
  isVehicleSearchOpen: boolean;
  onMobileSearchToggle: (isOpen: boolean) => void;
  onVehicleSearchToggle: (isOpen: boolean) => void;
}

export function HeaderMenu({
  isMobileSearchOpen,
  isVehicleSearchOpen,
  onMobileSearchToggle,
  onVehicleSearchToggle
}: HeaderMenuProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Automotive Locksmith Platform
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Products
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Categories
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              About
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              Contact
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => onMobileSearchToggle(!isMobileSearchOpen)}
            >
              Search
            </Button>
            <Button 
              variant="outline"
              onClick={() => onVehicleSearchToggle(!isVehicleSearchOpen)}
            >
              Vehicle Search
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}