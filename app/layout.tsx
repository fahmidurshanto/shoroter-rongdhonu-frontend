import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { UserProvider } from '../context/UserContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'Shoroter Rongdhonu - শরতের রংধনু',
  description: 'A collection of poems, thoughts, and stories by a humble poet.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="h-full">
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-800 antialiased">
        <UserProvider>
          <Suspense fallback={<nav className="bg-white shadow-md h-16 w-full" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1 container mx-auto px-4 py-8">
            <Suspense
              fallback={
                <div className="flex justify-center items-center py-16">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              }
            >
              {children}
            </Suspense>
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
