'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function OfferEditPage() {
  // サンプルデータ - 実際の実装では URLパラメータやAPIから取得
  const [formData, setFormData] = useState({
    id: 'OFF-001',
    creationDate: '2025年5月25日 10:30',
    status: '下書き',
    jobName: 'フロントエンドエンジニア (株式会社テックリード)',
    candidateName: '山田 花子',
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
オンラインでの面談も可能ですので、ご都合の良い日時をお知らせください。

お忙しいところ恐縮ですが、ご検討いただけますようお願い申し上げます。

------------------------------------
株式会社OFFERS
[エージェント名]
[電話番号]
[メールアドレス]
[会社URL]
------------------------------------`
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Offer updated:', formData);
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

  return (
    <div className="bg-gray-100 text-gray-800 app-layout">
      <Header />
      <Sidebar activeTab="/offers" />
      
      <main className="ml-60 flex-1 bg-white overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6 py-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">オファー文面編集</h1>
              <p className="mt-1 text-sm text-gray-500">オファーID: <span className="font-semibold">{formData.id}</span></p>
            </div>
            <Link 
              href="/offers/detail" 
              className="text-sm font-medium text-sky-600 hover:text-sky-700 flex items-center space-x-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span>詳細に戻る</span>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 bg-slate-50 shadow-md sm:rounded-lg p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 pb-6 border-b border-slate-200">
              <div>
                <label className="block text-sm font-medium text-slate-600">作成日時</label>
                <p className="mt-1 text-sm text-slate-800 py-2">{formData.creationDate}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600">現在のステータス</label>
                <p className="mt-1 text-sm text-slate-800 py-2">
                  <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(formData.status)}`}>
                    {formData.status}
                  </span>
                </p>
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-slate-600">求人名</label>
                <p className="mt-1 text-sm text-slate-800 py-2">{formData.jobName}</p>
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-slate-600">候補者名</label>
                <p className="mt-1 text-sm text-slate-800 py-2">{formData.candidateName}</p>
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">件名</label>
              <input 
                type="text" 
                name="subject" 
                id="subject" 
                value={formData.subject}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label htmlFor="body" className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">本文</label>
              <textarea 
                id="body" 
                name="body" 
                rows={20}
                value={formData.body}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
              <p className="mt-2 text-xs text-gray-500">
                AIによって生成された文面です。必要に応じて修正してください。Markdown記法も一部利用可能です（例: **太字**, *イタリック*）。
              </p>
            </div>

            <div className="pt-8 mt-6 flex flex-col-reverse gap-y-3 sm:flex-row sm:justify-end sm:space-x-4">
              <Link 
                href="/offers/detail" 
                className="w-full sm:w-auto justify-center inline-flex items-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
              >
                キャンセル
              </Link>
              <button 
                type="submit"
                className="w-full sm:w-auto justify-center inline-flex items-center px-5 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                変更を保存する
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}