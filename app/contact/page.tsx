'use client';

import React, { useState } from 'react';
import axios from 'axios';
import api from '../../lib/api';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.post('/messages', {
        name,
        email,
        subject,
        message,
      });

      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.msg || err.message || 'বার্তা পাঠাতে সমস্যা হয়েছে।');
      } else {
        setError('বার্তা পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-800 mb-3 animate__animated animate__fadeIn">
          কবিকে বার্তা পাঠান
        </h1>
        <p className="text-gray-600 font-serif text-sm md:text-base">
          আপনার কোনো ভাবনা, অনুভূতি বা চিঠি সরাসরি কবি মোর্শেদ সাকিবকে জানাতে নিচের ফর্মটি পূরণ করুন।
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 animate__animated animate__fadeInUp">
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
              ✓
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">ধন্যবাদ!</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              আপনার বার্তাটি সফলভাবে কবির কাছে পৌঁছে দেওয়া হয়েছে। সাহিত্যভাবনায় সাথে থাকার জন্য আন্তরিক কৃতজ্ঞতা।
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              আরেকটি বার্তা পাঠান
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-gray-700 text-xs font-semibold mb-1">
                আপনার নাম <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                placeholder="যেমন: সাকিব আল হাসান"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 text-xs font-semibold mb-1">
                আপনার ইমেইল <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-gray-700 text-xs font-semibold mb-1">
                বিষয়
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                placeholder="যেমন: কবিতার প্রতিক্রিয়া / আমন্ত্রণ"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 text-xs font-semibold mb-1">
                আপনার বার্তা / চিঠি <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors font-serif leading-relaxed"
                placeholder="আপনার মনের কথা লিখুন..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-medium py-3 px-6 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors shadow-sm disabled:opacity-50 text-sm"
            >
              {loading ? 'বার্তা পাঠানো হচ্ছে...' : 'বার্তা পাঠান'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
