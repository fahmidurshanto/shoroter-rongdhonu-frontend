'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../lib/api';
import { Post } from '../types';

export default function Home() {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      setLoading(true);
      try {
        const response = await api.get<Post[]>('/posts/latest?limit=3');
        setLatestPosts(response.data || []);
      } catch (err: unknown) {
        setError('সাম্প্রতিক কবিতাগুলো লোড করা সম্ভব হয়নি।');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestPosts();
  }, []);

  return (
    <div className="text-center px-4 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="py-12 md:py-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs md:text-sm font-medium mb-4 animate__animated animate__fadeInDown">
          কাব্য ও সাহিত্য সংকলন
        </span>
        <h1 className="text-4xl md:text-6xl font-bold font-serif text-gray-900 mb-4 tracking-tight animate__animated animate__fadeInDown">
          শরতের রংধনু
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 font-serif mb-3 animate__animated animate__fadeInUp">
          কবি <span className="text-indigo-600 font-semibold">মোর্শেদ সাকিব</span>-এর কাব্যজগৎ
        </p>
        <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto mb-8 animate__animated animate__fadeInUp">
          রাজশাহী বিশ্ববিদ্যালয়ের নাট্যকলা বিভাগের মঞ্চভাবনা আর শব্দের মেলবন্ধনে জীবনের বিচিত্র অনুভূতির প্রতিফলন।
        </p>
        <div className="flex justify-center gap-4 animate__animated animate__fadeInUp">
          <Link
            href="/blog"
            className="bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            কবিতাগুলো পড়ুন
          </Link>
          <Link
            href="/about"
            className="bg-white border border-gray-200 text-gray-700 font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            কবি পরিচিতি
          </Link>
        </div>
      </div>

      {/* Latest Poems Section */}
      <div className="my-12">
        <div className="flex items-center justify-between border-b pb-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-gray-800 text-left">
            সাম্প্রতিক কবিতা
          </h2>
          <Link
            href="/blog"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            সকল কবিতা &rarr;
          </Link>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 text-lg my-6">{error}</div>
        )}

        {!loading && latestPosts.length === 0 && !error && (
          <div className="text-center text-gray-500 text-base my-12 bg-white p-10 rounded-2xl border border-gray-100 shadow-sm">
            এখনও কোনো কবিতা প্রকাশিত হয়নি। শীঘ্রই নতুন কবিতা যুক্ত হবে!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between border border-gray-100 animate__animated animate__fadeInUp"
            >
              <div>
                {post.featuredImage && (
                  <div className="mb-4 overflow-hidden rounded-xl h-44 bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold font-serif text-gray-900 mb-3 hover:text-indigo-600 transition-colors">
                  <Link href={`/blog/${post._id}`}>{post.title}</Link>
                </h3>
                <p className="text-gray-600 text-sm line-clamp-4 leading-relaxed mb-4 font-serif">
                  {post.content}
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>
                  {post.publishedAt
                    ? new Date(post.publishedAt).toLocaleDateString('bn-BD', { year: 'numeric', month: 'short', day: 'numeric' })
                    : ''}
                </span>
                <Link
                  href={`/blog/${post._id}`}
                  className="text-indigo-600 font-semibold hover:text-indigo-800"
                >
                  সম্পূর্ণ পড়ুন &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
