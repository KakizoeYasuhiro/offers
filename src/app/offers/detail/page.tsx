'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function OfferDetailPage() {
  const [copyButtonText, setCopyButtonText] = useState('コピー');

  const offerData = {
    offerId: 'OFF-001',
    creationDate: '2025年5月25日 10:30',
    jobName: 'フロントエンドエンジニア',
    candidateName: '山田 花子',
    status: '下書き',
    subject: '【株式会社テックリード】フロントエンドエンジニアのポジションに関するご案内',
    body: `山田 花子 様

突然のご連絡失礼いたします。
株式会社OFFERSのエージェント、[エージェント名]と申します。

この度は、山田様の素晴らしいご経歴を拝見し、ぜひご紹介したいポジションがございましてご連絡いたしました。

ご紹介求人：
企業名：株式会社テックリード
ポジション：フロントエンドエンジニア

業務内容：
・新規Webサービスのフロントエンド開発（React, TypeScript）
・UI/UX改善提案および実装
・コンポーネント設計、コードレビュー

株式会社テックリード様は、革新的な技術で業界をリードする急成長中のIT企業です。
特に、社員一人ひとりの成長を支援する文化と、自由な発想を歓迎する風土が魅力です。

もし少しでもご興味をお持ちいただけましたら、ぜひ一度カジュアルにお話させていただく機会を頂戴できますと幸いです。
オンラインでの面談も可能ですので、ご都合の良い日時をお知らせください。`
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case '下書き': return 'bg-yellow-100 text-yellow-800';
      case '送信準備完了': return 'bg-blue-100 text-blue-800';
      case '送信済': return 'bg-green-100 text-green-800';
      case '開封済': return 'bg-indigo-100 text-indigo-800';
      case '返信あり': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(offerData.body);
      setCopyButtonText('コピー完了！');
      setTimeout(() => setCopyButtonText('コピー'), 2000);
    } catch (err) {
      console.error('コピーに失敗しました:', err);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800 app-layout">
      <Header />
      <Sidebar activeTab="/offers" />
      
      <main className="ml-60 flex-1 bg-white overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">オファー文面詳細</h1>
            <Link href="/offers" className="text-sm font-medium text-sky-600 hover:text-sky-700 flex items-center space-x-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span>オファー文面一覧に戻る</span>
            </Link>
          </div>

          <div className="bg-slate-50 shadow-md rounded-lg p-6 mb-8">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <dt className="text-sm font-medium text-slate-500">オファーID</dt>
                <dd className="mt-1 text-base text-slate-900">{offerData.offerId}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">作成日時</dt>
                <dd className="mt-1 text-base text-slate-900">{offerData.creationDate}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">求人名</dt>
                <dd className="mt-1 text-base text-slate-900">{offerData.jobName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">候補者名</dt>
                <dd className="mt-1 text-base text-slate-900">{offerData.candidateName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">ステータス</dt>
                <dd className="mt-1 text-base text-slate-900">
                  <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(offerData.status)}`}>
                    {offerData.status}
                  </span>
                </dd>
              </div>
            </dl>
            <div className="mt-4">
              <dt className="text-sm font-medium text-slate-500">件名</dt>
              <dd className="mt-1 text-base text-slate-900">{offerData.subject}</dd>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
              <h2 className="text-xl font-semibold text-gray-700">オファー本文</h2>
              <button
                onClick={handleCopy}
                title="本文をクリップボードにコピー"
                className="flex items-center space-x-2 text-sm text-sky-600 hover:text-sky-800 font-medium py-2 px-3 border border-sky-500 hover:border-sky-700 rounded-md hover:bg-sky-50 transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{copyButtonText}</span>
              </button>
            </div>
            <div className="p-6">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed bg-slate-50 p-5 rounded-md border border-slate-200 min-h-[300px] selection:bg-sky-200">
                {offerData.body}
              </pre>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/offers" 
              className="w-full sm:w-auto justify-center inline-flex items-center px-6 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
            >
              一覧に戻る
            </Link>
            <Link 
              href="/offers/edit" 
              className="w-full sm:w-auto justify-center inline-flex items-center px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
            >
              このオファー文面を編集する
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}