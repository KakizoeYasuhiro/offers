'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ログイン処理を実装
    console.log('Login:', { email, password, rememberMe });
  };

  return (
    <>
      <div className="bg-slate-100">
        <Header isLogin={true} />
        
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block text-5xl font-extrabold bg-gradient-to-b from-red-600 to-red-400 text-transparent bg-clip-text hover:opacity-90 transition-opacity">
                OFFERS
              </Link>
            </div>

            <div className="bg-white shadow-2xl rounded-xl p-8 sm:p-10">
              <h2 className="text-center text-2xl font-semibold text-gray-700 mb-1">ログイン</h2>
              <p className="text-center text-sm text-gray-500 mb-8">アカウント情報を入力してください。</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">メールアドレス</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    placeholder="your@example.com"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm transition-shadow placeholder-gray-400"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">パスワード</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    placeholder="••••••••"
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 sm:text-sm transition-shadow placeholder-gray-400"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember_me" className="ml-2 block text-gray-700">ログイン状態を保持する</label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    ログイン
                  </button>
                </div>
              </form>
            </div>
            
            <p className="mt-8 text-center text-xs text-gray-400">
              &copy; 2024 株式会社TORQUE. All rights reserved.
            </p>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
}