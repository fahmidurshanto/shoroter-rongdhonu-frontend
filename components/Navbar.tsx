'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '../context/UserContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navLinks = [
    { href: '/', label: 'হোম' },
    { href: '/blog', label: 'কবিতা ও সাহিত্য' },
    { href: '/about', label: 'কবি পরিচিতি' },
    { href: '/contact', label: 'যোগাযোগ' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-xs border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3.5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="group flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-serif font-bold text-base flex items-center justify-center shadow-xs">
                শ
              </span>
              <span className="text-xl font-bold font-serif text-gray-900 group-hover:text-indigo-600 transition-colors">
                শরতের রংধনু
              </span>
            </Link>
            <span className="hidden sm:inline-block text-[11px] text-gray-400 font-sans border-l border-gray-200 pl-2 ml-1">
              মোর্শেদ সাকিব
            </span>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-1.5"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 01-1.414 1.414L12 13.414l-4.864 4.864a1 1 0 01-1.414-1.414L10.586 12 5.722 7.136a1 1 0 011.414-1.414L12 10.586l4.864-4.864a1 1 0 011.414 1.414L13.414 12l4.864 4.864z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors text-sm font-medium ${
                  pathname === link.href
                    ? 'text-indigo-600 font-semibold'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user && user.isAuthenticated && (
              <Link
                href="/dashboard"
                className={`transition-colors text-sm font-medium ${
                  pathname.startsWith('/dashboard')
                    ? 'text-indigo-600 font-semibold'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                ড্যাশবোর্ড
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            {user && user.isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-gray-100 text-gray-700 px-3.5 py-1.5 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-colors text-xs font-semibold"
              >
                লগআউট
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-indigo-600 text-white px-4 py-1.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-xs text-xs font-semibold"
              >
                প্রবেশ
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-gray-100 flex flex-col space-y-2.5 animate__animated animate__fadeIn text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-1 ${
                  pathname === link.href
                    ? 'text-indigo-600 font-semibold'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user && user.isAuthenticated && (
              <Link
                href="/dashboard"
                className={`block py-1 ${
                  pathname.startsWith('/dashboard')
                    ? 'text-indigo-600 font-semibold'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                ড্যাশবোর্ড
              </Link>
            )}
            <div className="pt-2 border-t border-gray-100 flex flex-col space-y-2">
              {user && user.isAuthenticated ? (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="block w-full bg-rose-50 text-rose-600 px-4 py-2 rounded-xl text-center text-xs font-medium"
                >
                  লগআউট
                </button>
              ) : (
                <Link
                  href="/login"
                  className="block w-full bg-indigo-600 text-white px-4 py-2 rounded-xl text-center text-xs font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  প্রবেশ (Login)
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
