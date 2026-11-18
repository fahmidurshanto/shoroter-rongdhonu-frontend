'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import api from '../../lib/api';
import ProtectedRoute from '../../components/ProtectedRoute';
import PostList from '../../components/PostList';

export default function DashboardPage() {
  const [totalPosts, setTotalPosts] = useState(0);
  const [draftPosts, setDraftPosts] = useState(0);
  const [publishedPosts, setPublishedPosts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      setError(null);
      try {
        const [totalRes, draftRes, publishedRes] = await Promise.all([
          api.get<{ count: number }>('/posts/count/total'),
          api.get<{ count: number }>('/posts/count/drafts'),
          api.get<{ count: number }>('/posts/count/published'),
        ]);

        setTotalPosts(totalRes.data.count);
        setDraftPosts(draftRes.data.count);
        setPublishedPosts(publishedRes.data.count);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.msg || err.message || 'ড্যাশবোর্ড তথ্য আনতে সমস্যা হয়েছে।');
        } else {
          setError('ড্যাশবোর্ড তথ্য আনতে সমস্যা হয়েছে।');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-800 animate__animated animate__fadeIn">
              কবির অ্যাডমিন প্যানেল
            </h1>
            <p className="text-xs text-gray-500 mt-1">মোর্শেদ সাকিবের কাব্য ও সাহিত্য পরিচালনা কেন্দ্র</p>
          </div>
          <Link
            href="/create-post"
            className="inline-flex items-center justify-center bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm text-sm"
          >
            + নতুন লেখা যোগ করুন
          </Link>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {/* Counter cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate__animated animate__fadeInLeft">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              মোট রচিত লেখা
            </h2>
            <p className="text-3xl font-bold text-indigo-600">
              {loading ? '...' : totalPosts}
            </p>
            <p className="text-[11px] text-gray-400 mt-1">কবিতা, নাট্যভাবনা ও প্রবন্ধ</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate__animated animate__fadeInUp">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              খসড়া (Drafts)
            </h2>
            <p className="text-3xl font-bold text-amber-500">
              {loading ? '...' : draftPosts}
            </p>
            <p className="text-[11px] text-gray-400 mt-1">অপ্রকাশিত অবস্থায় সংরক্ষিত</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate__animated animate__fadeInRight">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
              প্রকাশিত সাহিত্যকর্ম
            </h2>
            <p className="text-3xl font-bold text-emerald-600">
              {loading ? '...' : publishedPosts}
            </p>
            <p className="text-[11px] text-gray-400 mt-1">পাঠকদের পড়ার জন্য উন্মুক্ত</p>
          </div>
        </div>

        {/* Post Management List */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <PostList />
        </div>
      </div>
    </ProtectedRoute>
  );
}
