'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import api from '../../lib/api';
import { useUser } from '../../context/UserContext';
import { AuthResponse } from '../../types';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, login } = useUser();

  useEffect(() => {
    if (user && user.isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await api.post<AuthResponse>('/auth/register', { email, password });
      login(res.data.token);
      router.push('/dashboard');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.msg || err.message || 'নিবন্ধন সম্পন্ন করা যায়নি।');
      } else {
        setError('নিবন্ধন সম্পন্ন করা যায়নি।');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md border border-gray-100 animate__animated animate__fadeInUp">
        <h1 className="text-2xl font-bold font-serif text-gray-800 mb-2 text-center">নতুন অ্যাকাউন্ট</h1>
        <p className="text-xs text-gray-400 text-center mb-6">শরতের রংধনু পরিচালনা প্যানেল</p>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 px-4 py-2.5 rounded-xl text-xs mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-xs font-semibold mb-1">
              ইমেইল
            </label>
            <input
              type="email"
              id="email"
              className="border border-gray-200 rounded-xl w-full py-2.5 px-3.5 text-sm text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 text-xs font-semibold mb-1">
              পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)
            </label>
            <input
              type="password"
              id="password"
              className="border border-gray-200 rounded-xl w-full py-2.5 px-3.5 text-sm text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors disabled:opacity-50 mt-2 text-sm shadow-sm"
          >
            {loading ? 'নিবন্ধন হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4 pt-4 border-t border-gray-100">
            পূর্বেই অ্যাকাউন্ট আছে?{' '}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-semibold">
              লগইন করুন
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
