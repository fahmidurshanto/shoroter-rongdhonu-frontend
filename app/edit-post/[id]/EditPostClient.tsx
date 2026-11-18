'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import api from '../../../lib/api';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { Post, ContentType } from '../../../types';

export default function EditPostClient({ id }: { id: string }) {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState<ContentType>('poem');
  const [featuredImage, setFeaturedImage] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [tags, setTags] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await api.get<Post>(`/posts/${id}`);
        const post = response.data;
        setTitle(post.title || '');
        setContent(post.content || '');
        setContentType(post.contentType || 'poem');
        setFeaturedImage(post.featuredImage || '');
        setAudioUrl(post.audioUrl || '');
        setTags(post.tags ? post.tags.join(', ') : '');
        setIsDraft(Boolean(post.isDraft));
        setIsFeatured(Boolean(post.isFeatured));
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.msg || err.message || 'লেখাটি আনতে সমস্যা হয়েছে।');
        } else {
          setError('লেখাটি আনতে সমস্যা হয়েছে।');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const updatedPost = {
        title,
        content,
        contentType,
        featuredImage,
        audioUrl,
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ''),
        isDraft,
        isFeatured,
      };

      await api.post(`/posts/update/${id}`, updatedPost);
      router.push('/dashboard');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.msg || err.message || 'লেখাটি আপডেট করতে সমস্যা হয়েছে।');
      } else {
        setError('লেখাটি আপডেট করতে সমস্যা হয়েছে।');
      }
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-serif text-gray-800 animate__animated animate__fadeIn">
              লেখা সংশোধন করুন
            </h1>
            <p className="text-xs text-gray-500 mt-1">কবি মোর্শেদ সাকিবের প্রকাশনা প্যানেল</p>
          </div>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            &larr; ড্যাশবোর্ডে ফিরুন
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate__animated animate__fadeInUp space-y-6"
          >
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-gray-700 text-xs font-semibold mb-1">
                  শিরোনাম <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="contentType" className="block text-gray-700 text-xs font-semibold mb-1">
                  ক্যাটাগরি
                </label>
                <select
                  id="contentType"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors bg-white"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value as ContentType)}
                >
                  <option value="poem">কবিতা</option>
                  <option value="theatre">নাট্যভাবনা / মঞ্চ</option>
                  <option value="article">প্রবন্ধ / আলোচনা</option>
                  <option value="thought">অনুভাবনা</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-gray-700 text-xs font-semibold mb-1">
                মূল লেখা / কবিতার চরণসমূহ <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="content"
                rows={12}
                className="w-full px-3.5 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors font-serif leading-relaxed text-base"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="featuredImage" className="block text-gray-700 text-xs font-semibold mb-1">
                  প্রচ্ছদ ছবি লিংক
                </label>
                <input
                  type="url"
                  id="featuredImage"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="audioUrl" className="block text-gray-700 text-xs font-semibold mb-1">
                  আবৃত্তি অডিও ফাইল লিংক (MP3)
                </label>
                <input
                  type="url"
                  id="audioUrl"
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="block text-gray-700 text-xs font-semibold mb-1">
                ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)
              </label>
              <input
                type="text"
                id="tags"
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 border-t border-gray-100">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFeatured"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />
                <label htmlFor="isFeatured" className="ml-2 block text-xs font-medium text-gray-700 cursor-pointer">
                  নির্বাচিত লেখা হিসেবে হোমপেজে হাইলাইট করুন
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDraft"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                  checked={isDraft}
                  onChange={(e) => setIsDraft(e.target.checked)}
                />
                <label htmlFor="isDraft" className="ml-2 block text-xs font-medium text-gray-700 cursor-pointer">
                  খসড়া (Draft) হিসেবে রাখুন
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
              <Link
                href="/dashboard"
                className="px-5 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium text-xs"
              >
                বাতিল
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-xl transition-colors disabled:opacity-50 text-xs shadow-sm"
              >
                {submitting ? 'হালনাগাদ হচ্ছে...' : 'পরিবর্তন সংরক্ষণ করুন'}
              </button>
            </div>
          </form>
        )}
      </div>
    </ProtectedRoute>
  );
}
