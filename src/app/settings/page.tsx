'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="bg-gray-100 text-gray-800 app-layout">
      <Header />
      <Sidebar activeTab="/settings" />
      
      <main className="ml-60 flex-1 bg-white overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 h-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">設定</h1>
          
          <Link href="/settings/account" className="block bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">アカウント設定</h2>
                <p className="text-gray-600">アカウントに関する設定を管理できます。</p>
              </div>
              <div className="flex-shrink-0 ml-6">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
          
          <Link href="/settings/system" className="block bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">システム設定</h2>
                <p className="text-gray-600">システム全般の設定を管理できます。</p>
              </div>
              <div className="flex-shrink-0 ml-6">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
          
          <Link href="/settings/notifications" className="block bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">通知設定</h2>
                <p className="text-gray-600">通知に関する設定を管理できます。</p>
              </div>
              <div className="flex-shrink-0 ml-6">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}