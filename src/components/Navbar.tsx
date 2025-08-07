"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Flowork', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Policy', href: '/policy' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Freelance Register', href: '/freelance-register' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-50/80 backdrop-blur-sm border-b border-neutral-200/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-neutral-700">
              Flowork <span className='text-sm font-light text-neutral-500'>beta</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-neutral-700 bg-neutral-200/50'
                        : 'text-gray-500 hover:text-neutral-700 hover:bg-neutral-200/30'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              size="sm"
              className="text-neutral-700 border-neutral-300 hover:bg-neutral-200/50"
            >
              Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-700 hover:text-neutral-900 p-2"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-neutral-200/30">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-neutral-50/95">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-neutral-700 bg-neutral-200/50'
                        : 'text-gray-500 hover:text-neutral-700 hover:bg-neutral-200/30'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-neutral-200/30 mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-neutral-700 border-neutral-300 hover:bg-neutral-200/50"
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}