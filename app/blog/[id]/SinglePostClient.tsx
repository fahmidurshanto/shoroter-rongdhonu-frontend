'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import api from '../../../lib/api';
import { Post, Comment } from '../../../types';

export default function SinglePostClient({ id }: { id: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Reading customization
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('large');
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  // Comment Form State
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPostAndComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const postRes = await api.get<Post>(`/posts/${id}`);
        setPost(postRes.data);
        setLikes(postRes.data.likesCount || 0);

        // Record a view in backend
        api.post(`/posts/${id}/view`).catch(() => {});

        // Fetch comments independently so a comments issue never blocks reading
        try {
          const commentRes = await api.get<Comment[]>(`/comments/post/${id}`);
          setComments(commentRes.data || []);
        } catch {
          setComments([]);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.msg || err.message || 'লেখাটি লোড করা সম্ভব হয়নি।');
        } else {
          setError('লেখাটি লোড করা সম্ভব হয়নি।');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleLike = async () => {
    if (hasLiked) return;
    try {
      setHasLiked(true);
      setLikes((prev) => prev + 1);
      await api.post(`/posts/${id}/like`);
    } catch (err) {
      console.error('Failed to like:', err);
    }
  };

  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    if (typeof window === 'undefined') return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`কবি মোর্শেদ সাকিবের লেখা: ${post?.title || ''}`);

    let shareUrl = '';
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim()) return;

    setCommentSubmitting(true);
    setCommentSuccess(null);

    try {
      const res = await api.post<{ msg: string; comment: Comment }>(`/comments/post/${id}`, {
        authorName: commentName,
        authorEmail: commentEmail,
        content: commentContent,
      });

      setComments((prev) => [res.data.comment, ...prev]);
      setCommentContent('');
      setCommentSuccess('আপনার মূল্যবান মন্তব্যের জন্য ধন্যবাদ!');
    } catch (err) {
      console.error(err);
    } finally {
      setCommentSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-20 max-w-xl mx-auto">
        <div className="text-red-500 text-xl mb-4 font-serif">{error || 'লেখাটি পাওয়া যায়নি।'}</div>
        <Link
          href="/blog"
          className="inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
        >
          &larr; কবিতার পাতায় ফিরুন
        </Link>
      </div>
    );
  }

  const categoryLabels: Record<string, string> = {
    poem: 'কবিতা',
    theatre: 'নাট্যভাবনা',
    article: 'প্রবন্ধ',
    thought: 'অনুভাবনা',
  };

  const fontSizeClass =
    fontSize === 'normal'
      ? 'text-base md:text-lg leading-relaxed'
      : fontSize === 'huge'
      ? 'text-xl md:text-2xl leading-loose'
      : 'text-lg md:text-xl leading-loose';

  return (
    <article className="max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Top navigation & Font Resizer */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
        <Link
          href="/blog"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
        >
          &larr; সকল কবিতার সংগ্রহ
        </Link>

        {/* Reader Tools: Font Size Toggle */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
          <span className="px-2 font-medium">অক্ষরের আকার:</span>
          <button
            onClick={() => setFontSize('normal')}
            className={`px-2 py-1 rounded transition-colors ${
              fontSize === 'normal' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-gray-100'
            }`}
          >
            A
          </button>
          <button
            onClick={() => setFontSize('large')}
            className={`px-2 py-1 rounded transition-colors text-sm ${
              fontSize === 'large' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-gray-100'
            }`}
          >
            A+
          </button>
          <button
            onClick={() => setFontSize('huge')}
            className={`px-2 py-1 rounded transition-colors text-base ${
              fontSize === 'huge' ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-gray-100'
            }`}
          >
            A++
          </button>
        </div>
      </div>

      {/* Category badge */}
      <div className="mb-3">
        <span className="inline-block bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium">
          {categoryLabels[post.contentType || 'poem'] || 'কবিতা'}
        </span>
      </div>

      {/* Post Title */}
      <h1 className="text-3xl md:text-5xl font-bold font-serif text-gray-900 mb-4 leading-tight animate__animated animate__fadeInDown">
        {post.title}
      </h1>

      {/* Author & Meta stats */}
      <div className="flex flex-wrap items-center justify-between text-gray-500 text-sm mb-8 pb-4 border-b border-gray-200 gap-2">
        <div className="flex items-center">
          <span className="font-medium text-indigo-700">কবি মোর্শেদ সাকিব</span>
          {post.publishedAt && (
            <>
              <span className="mx-2">•</span>
              <time>
                {new Date(post.publishedAt).toLocaleDateString('bn-BD', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </>
          )}
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>👁️ {post.viewsCount || 0} বার পঠিত</span>
          <span>❤️ {likes} পছন্দ</span>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="mb-8 rounded-2xl overflow-hidden shadow-sm max-h-[540px] bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Audio Recitation Player (কবির কণ্ঠে আবৃত্তি) */}
      {post.audioUrl && (
        <div className="mb-8 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 shadow-sm animate__animated animate__fadeIn">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl">🎙️</span>
            <div>
              <p className="font-semibold text-gray-800 text-sm">স্বকণ্ঠে আবৃত্তি শুনুন</p>
              <p className="text-xs text-indigo-600">কণ্ঠ: মোর্শেদ সাকিব</p>
            </div>
          </div>
          <audio controls className="w-full mt-2">
            <source src={post.audioUrl} type="audio/mpeg" />
            আপনার ব্রাউজার অডিও প্লেয়ার সমর্থন করে না।
          </audio>
        </div>
      )}

      {/* Main Content (The Poem / Prose) */}
      <div
        className={`prose lg:prose-lg max-w-none text-gray-800 font-serif whitespace-pre-line ${fontSizeClass} animate__animated animate__fadeInUp mb-10`}
      >
        {post.content}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="inline-block bg-indigo-50 text-indigo-700 rounded-full px-3.5 py-1 text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Interaction: Like & Social Share */}
      <div className="my-10 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <button
          onClick={handleLike}
          disabled={hasLiked}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-medium transition-all shadow-sm ${
            hasLiked
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-rose-600 text-white hover:bg-rose-700 active:scale-95'
          }`}
        >
          <span className="text-xl">{hasLiked ? '❤️' : '🤍'}</span>
          <span>{hasLiked ? 'পছন্দ করা হয়েছে' : 'পছন্দ করুন'}</span>
          <span className="ml-1 bg-white/20 text-xs px-2 py-0.5 rounded-full font-bold">
            {likes}
          </span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">শেয়ার করুন:</span>
          <button
            onClick={() => handleShare('facebook')}
            className="p-2.5 bg-[#1877F2] text-white rounded-lg hover:opacity-90 transition-opacity text-xs font-semibold shadow-sm"
            title="Facebook"
          >
            Facebook
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="p-2.5 bg-[#1DA1F2] text-white rounded-lg hover:opacity-90 transition-opacity text-xs font-semibold shadow-sm"
            title="Twitter"
          >
            Twitter
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="p-2.5 bg-[#0A66C2] text-white rounded-lg hover:opacity-90 transition-opacity text-xs font-semibold shadow-sm"
            title="LinkedIn"
          >
            LinkedIn
          </button>
        </div>
      </div>

      {/* Author Card */}
      <div className="my-10 p-6 md:p-8 bg-gradient-to-tr from-white to-indigo-50/50 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
          কবি পরিচিতি
        </h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-500 via-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-2xl flex-shrink-0 shadow-sm">
            MS
          </div>
          <div className="text-center sm:text-left">
            <p className="font-bold text-gray-800 text-lg">মোর্শেদ সাকিব (Morshed Sakib)</p>
            <p className="text-indigo-600 text-xs font-medium mb-2">
              প্রাক্তন শিক্ষার্থী, নাট্যকলা বিভাগ, রাজশাহী বিশ্ববিদ্যালয়
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              মঞ্চের সংলাপ আর কবিতার অক্ষর—উভয়ই মানুষের হৃদয় ছোঁয়ার পবিত্র মাধ্যম। রাজশাহী বিশ্ববিদ্যালয়ের নাট্যকলা বিভাগের মঞ্চভাবনা আর সাহিত্যের মেলবন্ধনে তাঁর কাব্য সৃষ্টি।
            </p>
            <Link
              href="/about"
              className="inline-block mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              বিস্তারিত পরিচিতি পড়ুন &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Reader Comments Section */}
      <section className="mt-14 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold font-serif text-gray-800 mb-6 flex items-center gap-2">
          <span>পাঠকের অনুভূতি ও মন্তব্য</span>
          <span className="text-sm font-sans bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full">
            {comments.length}
          </span>
        </h2>

        {/* Comment Form */}
        <form
          onSubmit={handleCommentSubmit}
          className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-10 space-y-4"
        >
          <h3 className="font-semibold text-gray-700 text-base">আপনার মন্তব্য প্রকাশ করুন</h3>
          
          {commentSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2.5 rounded-xl text-sm">
              {commentSuccess}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="c_name" className="block text-xs font-semibold text-gray-600 mb-1">
                আপনার নাম <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="c_name"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                required
                className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                placeholder="যেমন: অনিক রহমান"
              />
            </div>
            <div>
              <label htmlFor="c_email" className="block text-xs font-semibold text-gray-600 mb-1">
                ইমেইল (ঐচ্ছিক)
              </label>
              <input
                type="email"
                id="c_email"
                value={commentEmail}
                onChange={(e) => setCommentEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="c_content" className="block text-xs font-semibold text-gray-600 mb-1">
              মন্তব্য / অনুভূতি <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="c_content"
              rows={4}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              required
              className="w-full px-3.5 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              placeholder="কবিতাটি পড়ে আপনার কেমন লাগলো তা লিখুন..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={commentSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50 shadow-sm"
          >
            {commentSubmitting ? 'পাঠানো হচ্ছে...' : 'মন্তব্য পোস্ট করুন'}
          </button>
        </form>

        {/* Existing Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm italic py-4">
              এখনও কোনো মন্তব্য নেই। আপনিই প্রথম আপনার অনুভূতি প্রকাশ করুন!
            </p>
          ) : (
            comments.map((c) => (
              <div
                key={c._id}
                className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">
                      {c.authorName.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-800 text-sm">{c.authorName}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(c.createdAt).toLocaleDateString('bn-BD', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <p className="text-gray-700 text-sm whitespace-pre-line pl-10">
                  {c.content}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </article>
  );
}
