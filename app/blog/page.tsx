'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../lib/api';
import { Post, PostsResponse } from '../../types';

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 9;

  const categories: { key: string; label: string }[] = [
    { key: '', label: 'সকল লেখা' },
    { key: 'poem', label: 'কবিতা' },
    { key: 'theatre', label: 'নাট্যভাবনা' },
    { key: 'article', label: 'প্রবন্ধ' },
    { key: 'thought', label: 'অনুভাবনা' },
  ];

  const categoryLabels: Record<string, string> = {
    poem: 'কবিতা',
    theatre: 'নাট্যভাবনা',
    article: 'প্রবন্ধ',
    thought: 'অনুভাবনা',
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params: Record<string, string | number> = {
          page: currentPage,
          limit: postsPerPage,
        };

        if (searchQuery.trim()) {
          params.search = searchQuery.trim();
        }
        if (selectedTag.trim()) {
          params.tag = selectedTag.trim();
        }
        if (selectedCategory) {
          params.category = selectedCategory;
        }

        const response = await api.get<PostsResponse>('/posts', { params });
        setPosts(response.data.posts || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (err: unknown) {
        setError('লেখাগুলো লোড করতে সমস্যা হয়েছে।');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchQuery, selectedTag, selectedCategory, currentPage]);

  const handleCategoryClick = (key: string) => {
    setSelectedCategory(key);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTag(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold font-serif text-gray-900 mb-3 animate__animated animate__fadeIn">
          কাব্য ও সাহিত্য সংগ্রহ
        </h1>
        <p className="text-gray-600 font-serif text-base md:text-lg">
          কবি মোর্শেদ সাকিবের প্রকাশিত সকল কবিতা, নাট্যভাবনা ও প্রবন্ধের সংকলন
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-gray-200 pb-3">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => handleCategoryClick(cat.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === cat.key
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search and Tag Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="কবিতার শিরোনাম বা পংক্তি দিয়ে খুঁজুন..."
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="md:w-64">
          <input
            type="text"
            placeholder="ট্যাগ দিয়ে খুঁজুন (যেমন: প্রেম, মঞ্চ)..."
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            value={selectedTag}
            onChange={handleTagChange}
          />
        </div>
      </div>

      {/* Tag indicator if filtered */}
      {selectedTag && (
        <div className="mb-6 flex items-center gap-2">
          <span className="text-sm text-gray-500">নির্বাচিত ট্যাগ:</span>
          <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full font-semibold">
            #{selectedTag}
            <button
              onClick={() => setSelectedTag('')}
              className="ml-1 text-indigo-500 hover:text-indigo-800"
            >
              ✕
            </button>
          </span>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 text-lg py-8 font-serif">{error}</div>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center text-gray-500 text-lg py-16 bg-white rounded-2xl shadow-xs border border-gray-100 font-serif">
          {searchQuery || selectedTag || selectedCategory
            ? 'আপনার অনুসন্ধানের সাথে মিলে এমন কোনো লেখা পাওয়া যায়নি।'
            : 'এখনও কোনো লেখা প্রকাশিত হয়নি। শীঘ্রই নতুন কবিতা প্রকাশ পাবে!'}
        </div>
      )}

      {!loading && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col justify-between animate__animated animate__fadeInUp group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div>
                {/* Category & Audio Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block bg-indigo-50 text-indigo-700 rounded-full px-3 py-0.5 text-xs font-medium">
                    {categoryLabels[post.contentType || 'poem'] || 'কবিতা'}
                  </span>
                  {post.audioUrl && (
                    <span className="text-xs text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      🎙️ আবৃত্তি আছে
                    </span>
                  )}
                </div>

                {post.featuredImage && (
                  <div className="mb-4 overflow-hidden rounded-xl h-44 bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <h2 className="text-xl font-bold font-serif text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  <Link href={`/blog/${post._id}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-600 text-sm line-clamp-4 leading-relaxed mb-4 font-serif">
                  {post.content}
                </p>
              </div>

              <div>
                {post.tags && post.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        onClick={() => {
                          setSelectedTag(tag);
                          setCurrentPage(1);
                        }}
                        className="cursor-pointer inline-block bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('bn-BD', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : ''}
                  </span>
                  <div className="flex items-center gap-3">
                    {post.likesCount ? <span>❤️ {post.likesCount}</span> : null}
                    <Link
                      href={`/blog/${post._id}`}
                      className="text-indigo-600 font-semibold hover:text-indigo-800"
                    >
                      সম্পূর্ণ পড়ুন &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-200 rounded-xl bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            আগের পাতা
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-4 py-2 border rounded-xl text-sm font-medium transition-colors ${
                currentPage === pageNumber
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-200 rounded-xl bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            পরের পাতা
          </button>
        </div>
      )}
    </div>
  );
}
