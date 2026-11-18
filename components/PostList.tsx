'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import api from '../lib/api';
import { Post, PostsResponse } from '../types';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let isMounted = true;
    api
      .get<PostsResponse>('/posts', {
        params: {
          status: filterStatus,
          limit: 100,
        },
      })
      .then((response) => {
        if (isMounted) {
          setPosts(response.data.posts || []);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          if (axios.isAxiosError(err)) {
            setError(err.response?.data?.msg || err.message || 'লেখাগুলো লোড করতে ব্যর্থ হয়েছে।');
          } else {
            setError('লেখাগুলো লোড করতে ব্যর্থ হয়েছে।');
          }
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [filterStatus, refreshTrigger]);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`আপনি কি নিশ্চিত যে "${title}" লেখাটি মুছে ফেলতে চান?`)) {
      return;
    }

    try {
      await api.delete(`/posts/delete/${id}`);
      setMessage('লেখাটি সফলভাবে মুছে ফেলা হয়েছে!');
      setRefreshTrigger((prev) => prev + 1);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.msg || err.message || 'লেখাটি মুছতে সমস্যা হয়েছে।');
      } else {
        setError('লেখাটি মুছতে সমস্যা হয়েছে।');
      }
      console.error(err);
    }
  };

  const categoryLabels: Record<string, string> = {
    poem: 'কবিতা',
    theatre: 'নাট্যভাবনা',
    article: 'প্রবন্ধ',
    thought: 'অনুভাবনা',
  };

  return (
    <div className="py-2">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold font-serif text-gray-800">
          সকল লেখার তালিকা
        </h2>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterStatus === 'all'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            সব ({posts.length})
          </button>
          <button
            onClick={() => setFilterStatus('published')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterStatus === 'published'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            প্রকাশিত
          </button>
          <button
            onClick={() => setFilterStatus('draft')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              filterStatus === 'draft'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            খসড়া
          </button>
        </div>
      </div>

      {message && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2.5 rounded-xl text-xs mb-4">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-2.5 rounded-xl text-xs mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500 text-sm py-12">লেখাগুলো লোড হচ্ছে...</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-500 text-sm py-12 bg-gray-50 rounded-xl">
          কোনো লেখা পাওয়া যায়নি।
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="py-3 px-4">শিরোনাম</th>
                <th className="py-3 px-4">ক্যাটাগরি</th>
                <th className="py-3 px-4">অবস্থা</th>
                <th className="py-3 px-4">পাঠক প্রতিক্রিয়া</th>
                <th className="py-3 px-4 text-right">কার্যক্রম</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-serif font-bold text-gray-800">
                    <Link
                      href={`/blog/${post._id}`}
                      className="hover:text-indigo-600 transition-colors"
                      target="_blank"
                    >
                      {post.title}
                    </Link>
                    {post.isFeatured && (
                      <span className="ml-2 text-[10px] bg-amber-100 text-amber-800 font-sans px-1.5 py-0.5 rounded-sm font-semibold">
                        হাইলাইট
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-gray-500">
                    {categoryLabels[post.contentType || 'poem'] || 'কবিতা'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.isDraft
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {post.isDraft ? 'খসড়া' : 'প্রকাশিত'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-gray-400">
                    <span>👁️ {post.viewsCount || 0}</span>
                    <span className="ml-3">❤️ {post.likesCount || 0}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <Link
                      href={`/edit-post/${post._id}`}
                      className="inline-block bg-amber-500 text-white px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-amber-600 transition-colors"
                    >
                      সম্পাদনা
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id, post.title)}
                      className="inline-block bg-rose-500 text-white px-2.5 py-1 rounded-lg text-xs font-medium hover:bg-rose-600 transition-colors"
                    >
                      মুছুন
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PostList;
