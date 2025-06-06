'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [recentJobsData] = useState([
    { id: 'JID-1020', title: '人事コンサルタント (株式会社トップキャリア)', date: '2025年4月05日' },
    { id: 'JID-1019', title: 'データサイエンティスト (株式会社コードマスターズ)', date: '2025年4月08日' },
    { id: 'JID-1018', title: '総務部長候補 (株式会社オールラウンドサービス)', date: '2025年4月10日' },
    { id: 'JID-1017', title: 'シニアリクルーター (株式会社HRプロフェッショナルズ)', date: '2025年4月12日' }
  ]);

  const [recentOffersData] = useState([
    { id: 'OFF-020', subject: 'SREエンジニアポジションへのスカウト', candidate: '西村 聡 様', job: 'SREエンジニア', date: '2025年5月16日 11:30', status: '下書き' },
    { id: 'OFF-019', subject: 'フロントエンドエンジニアのポジションに関するご連絡', candidate: '岡田 由紀 様', job: 'フロントエンドエンジニア', date: '2025年5月16日 17:00', status: '開封済' },
    { id: 'OFF-018', subject: '【株式会社トップキャリア】人事コンサルタント募集の件', candidate: '森 浩二 様', job: '人事コンサルタント', date: '2025年5月17日 10:00', status: '送信済' },
    { id: 'OFF-017', subject: 'データサイエンティストのポジションに関するスカウト', candidate: '林 真理子 様', job: 'データサイエンティスト', date: '2025年5月17日 14:50', status: '送信準備完了' }
  ]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case '下書き': return 'bg-yellow-100 text-yellow-800';
      case '送信準備完了': return 'bg-blue-100 text-blue-800';
      case '送信済': return 'bg-green-100 text-green-800';
      case '開封済': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-slate-100 text-gray-800 app-layout">
      <Header />
      <Sidebar />
      
      <main className="ml-60 flex-1 bg-slate-100 overflow-y-auto p-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">ダッシュボード</h1>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/jobs" className="group block bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 ease-in-out">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 group-hover:text-sky-700 transition-colors">登録済み求人数</p>
                <p className="text-3xl font-bold text-gray-800 mt-1 group-hover:text-sky-700 transition-colors">125</p>
              </div>
              <div className="p-3 bg-sky-100 rounded-full group-hover:bg-sky-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-sky-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25v-12a2.25 2.25 0 012.25-2.25h4.073M20.25 14.15c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125h-9.75c-.621 0-1.125.504-1.125 1.125V7.5M20.25 14.15M13.5 6.375h3.375M13.5 10.125h3.375M6.375 6.375h1.125m-1.125 3.75h1.125m-1.125 3.75h1.125M6.375 13.875h1.125M6.375 17.625h1.125m-1.125 3.75h1.125" />
                </svg>
              </div>
            </div>
            <div className="mt-4 text-sm font-medium text-sky-600 group-hover:text-sky-700 transition-colors flex justify-end items-center">
              <span>詳細を見る</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </Link>
          
          <Link href="/rules" className="group block bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 ease-in-out">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 group-hover:text-amber-700 transition-colors">作成済みルール数</p>
                <p className="text-3xl font-bold text-gray-800 mt-1 group-hover:text-amber-700 transition-colors">32</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-full group-hover:bg-amber-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-amber-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9Z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 text-sm font-medium text-sky-600 group-hover:text-sky-700 transition-colors flex justify-end items-center">
              <span>詳細を見る</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </Link>
          
          <Link href="/offers" className="group block bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-200 ease-in-out">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 group-hover:text-emerald-700 transition-colors">生成済みオファー文面</p>
                <p className="text-3xl font-bold text-gray-800 mt-1 group-hover:text-emerald-700 transition-colors">450</p>
                <p className="text-xs text-gray-500 mt-1 group-hover:text-emerald-700 transition-colors">下書き: 25, 送信準備完了: 10</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-emerald-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
            </div>
            <div className="mt-4 text-sm font-medium text-sky-600 group-hover:text-sky-700 transition-colors flex justify-end items-center">
              <span>詳細を見る</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </Link>
        </section>

        <section className="mb-8">
          <div className="bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-5">クイックアクション</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link href="/jobs/registration" className="group flex flex-col items-center justify-center p-5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 mb-2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25V18a2.25 2.25 0 002.25 2.25h5.25A2.25 2.25 0 0018 18v-2.25m-7.5-6.75h.008v.008H10.5v-.008zm0 3.75h.008v.008H10.5v-.008zm0 3.75h.008v.008H10.5v-.008Z M4.5 19.5A2.25 2.25 0 006.75 21.75h10.5A2.25 2.25 0 0019.5 19.5V4.5A2.25 2.25 0 0017.25 2.25H6.75A2.25 2.25 0 004.5 4.5v15Z" />
                </svg>
                <span className="font-medium text-base">新規求人作成</span>
              </Link>
              
              <Link href="/rules/create" className="group flex flex-col items-center justify-center p-5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 mb-2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                <span className="font-medium text-base">新規ルール作成</span>
              </Link>
              
              <Link href="/offers/new" className="group flex flex-col items-center justify-center p-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 mb-2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9V5.25A2.25 2.25 0 0019.5 3h-15A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h10.5a2.25 2.25 0 002.25-2.25V15M12 15l3-3m0 0l-3-3m3 3H9M21.75 12a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0z" />
                </svg>
                <span className="font-medium text-base">新規オファー作成</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow-xl rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700">最近追加された求人</h2>
            </div>
            <ul className="divide-y divide-gray-100">
              {recentJobsData.map((item) => (
                <li key={item.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                  <Link href="/jobs/detail" className="block group">
                    <p className="text-sm font-medium text-gray-800 group-hover:text-sky-600 truncate">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">作成日: {item.date}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-6 py-4 text-right border-t border-gray-100">
              <Link href="/jobs" className="text-sm font-medium text-sky-600 hover:text-sky-700">全ての求人を見る →</Link>
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-700">最近生成されたオファー文面</h2>
            </div>
            <ul className="divide-y divide-gray-100">
              {recentOffersData.map((item) => (
                <li key={item.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                  <Link href="/offers/detail" className="block group">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium text-gray-800 group-hover:text-sky-600 truncate w-3/4" title={item.subject}>{item.subject}</p>
                      <span className={`px-2 py-0.5 inline-flex text-xs leading-4 font-semibold rounded-full ${getStatusBadgeClass(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{item.candidate}向け ({item.job}) - {item.date}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-6 py-4 text-right border-t border-gray-100">
              <Link href="/offers" className="text-sm font-medium text-sky-600 hover:text-sky-700">全てのオファー文面を見る →</Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}