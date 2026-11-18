import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'কবি পরিচিতি | মোর্শেদ সাকিব — শরতের রংধনু',
  description: 'কবি মোর্শেদ সাকিব — রাজশাহী বিশ্ববিদ্যালয়ের নাট্যকলা বিভাগের প্রাক্তন শিক্ষার্থী এবং তাঁর কাব্য ও সাহিত্যভাবনা।',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 animate__animated animate__fadeIn">
        কবি পরিচিতি
      </h1>
      
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="md:w-1/3 flex flex-col items-center animate__animated animate__fadeInLeft">
          <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-5xl font-serif font-bold shadow-md">
            MS
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">মোর্শেদ সাকিব</h2>
          <p className="text-sm text-indigo-600 font-medium">Morshed Sakib</p>
          <span className="mt-2 inline-block bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium">
            নাট্যকলা বিভাগ, রাজশাহী বিশ্ববিদ্যালয়
          </span>
        </div>

        <div className="md:w-2/3 text-gray-700 leading-relaxed space-y-4 animate__animated animate__fadeInRight">
          <h3 className="text-xl font-bold text-gray-800 border-b pb-2">
            জীবন ও কাব্যদর্শন
          </h3>
          <p className="text-base md:text-lg">
            কবি ও নাট্যপ্রেমী <strong>মোর্শেদ সাকিব</strong> রাজশাহী বিশ্ববিদ্যালয়ের <em>নাট্যকলা বিভাগের</em> (Department of Theatre) প্রাক্তন শিক্ষার্থী। মঞ্চের আলো-আঁধারির আবহ, মানুষের অন্তর্লীন আবেগ, দ্বিধা ও অনুভূতির রূপায়ণ তাঁর রচনায় এক স্বতন্ত্র মাত্রা তৈরি করেছে।
          </p>
          <p className="text-base md:text-lg">
            <strong>&ldquo;শরতের রংধনু&rdquo;</strong> মূলত তাঁর কাব্যিক চিন্তা, নাটকীয় কথন এবং জীবনের নানা রঙের অনুভূতির এক উন্মুক্ত মিলনমেলা। নাট্যের দৃশ্যভাষ্য যেমন জীবনের সত্যকে উন্মোচিত করে, তেমনই তাঁর প্রতিটি কবিতায় থাকে জীবনের গভীর উপলব্ধি ও চিত্রকল্প।
          </p>
          <p className="text-base text-gray-600 italic border-l-4 border-indigo-500 pl-4 py-1">
            &ldquo;মঞ্চের সংলাপ আর কবিতার অক্ষর—উভয়ই আমার কাছে মানুষের হৃদয় ছোঁয়ার পবিত্র মাধ্যম। এই প্রাঙ্গণে আমার অনুভূতিগুলো ছড়িয়ে রইল আপনাদের জন্য।&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
