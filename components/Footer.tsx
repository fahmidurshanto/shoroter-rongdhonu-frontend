import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 mt-auto border-t border-gray-800">
      <div className="container mx-auto px-6 text-center">
        <p className="text-lg font-serif text-gray-200 font-bold mb-1">শরতের রংধনু</p>
        <p className="text-xs text-indigo-400 mb-4 font-serif">
          কবি মোর্শেদ সাকিব — প্রাক্তন শিক্ষার্থী, নাট্যকলা বিভাগ, রাজশাহী বিশ্ববিদ্যালয়
        </p>
        <div className="border-t border-gray-800 max-w-xs mx-auto my-3"></div>
        <p className="text-xs text-gray-500">
          &copy; 2025 শরতের রংধনু (Shoroter Rongdhonu). সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
