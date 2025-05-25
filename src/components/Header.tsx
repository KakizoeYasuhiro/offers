'use client';

import Link from 'next/link';

interface HeaderProps {
  isLogin?: boolean;
}

export default function Header({ isLogin = false }: HeaderProps) {
  return (
    <header className="bg-white shadow-md h-16 fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6">
      <Link href="/" className="text-4xl font-bold bg-gradient-to-b from-red-600 to-red-400 text-transparent bg-clip-text inline-block hover:opacity-90 transition-opacity">
        OFFERS
      </Link>
      
      {!isLogin && (
        <div className="flex items-center space-x-6">
          <span className="text-gray-700 text-sm">株式会社ABC</span>
          <Link href="/settings/account" title="アカウント設定" className="text-gray-600 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </Link>
          <Link href="/login" className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded text-sm border border-gray-300">
            ログアウト
          </Link>
        </div>
      )}
    </header>
  );
}