'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

export default function JobDetail() {
  const [copyStatus, setCopyStatus] = useState('コピー')

  const handleCopy = async () => {
    const offerBodyElement = document.getElementById('offer_body_text')
    if (offerBodyElement) {
      try {
        await navigator.clipboard.writeText(offerBodyElement.innerText)
        setCopyStatus('コピーしました!')
        setTimeout(() => setCopyStatus('コピー'), 2000)
      } catch (err) {
        console.error('クリップボードへのコピーに失敗しました:', err)
        setCopyStatus('コピー失敗')
        setTimeout(() => setCopyStatus('コピー'), 2000)
      }
    }
  }

  return (
    <div className="bg-gray-100 text-gray-800 app-layout">
      <Header />
      <Sidebar />
      
      <main className="ml-60 flex-1 bg-white overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">求人詳細</h1>
              <Link href="/jobs" className="text-sm font-medium text-sky-600 hover:text-sky-700 flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span>求人一覧に戻る</span>
              </Link>
            </div>

            <div className="bg-slate-50 shadow-md rounded-lg p-6 mb-8">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <dt className="text-sm font-medium text-slate-500">求人ID</dt>
                  <dd className="mt-1 text-base text-slate-900">JOB-001</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">作成日時</dt>
                  <dd className="mt-1 text-base text-slate-900">2025年5月25日 10:30</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">求人名</dt>
                  <dd className="mt-1 text-base text-slate-900">フロントエンドエンジニア</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">企業名</dt>
                  <dd className="mt-1 text-base text-slate-900">株式会社テックリード</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">ステータス</dt>
                  <dd className="mt-1 text-base text-slate-900">
                    <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      公開中
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-500">年収</dt>
                  <dd className="mt-1 text-base text-slate-900">500-800万円</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white shadow-lg rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
                <h2 className="text-xl font-semibold text-gray-700">求人詳細情報</h2>
                <button 
                  onClick={handleCopy}
                  title="求人詳細をクリップボードにコピー"
                  className={`flex items-center space-x-2 text-sm font-medium py-2 px-3 border rounded-md transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    copyStatus === 'コピーしました!' 
                      ? 'text-green-600 border-green-600 hover:border-green-700 hover:bg-green-50 focus:ring-green-500'
                      : 'text-sky-600 border-sky-500 hover:text-sky-800 hover:border-sky-700 hover:bg-sky-50 focus:ring-sky-500'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>{copyStatus}</span>
                </button>
              </div>
              <div className="p-6">
                <pre id="offer_body_text" className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed bg-slate-50 p-5 rounded-md border border-slate-200 min-h-[300px] selection:bg-sky-200">{`【求人概要】
企業名：株式会社テックリード
ポジション：フロントエンドエンジニア
雇用形態：正社員
年収：500-800万円
勤務地：東京都渋谷区（リモートワーク可）

【業務内容】
・新規Webサービスのフロントエンド開発（React, TypeScript）
・既存システムのUI/UX改善提案および実装
・コンポーネント設計、コードレビュー
・プロダクトチームとの協働による機能開発
・技術選定、アーキテクチャ設計への参画

【必須スキル】
・React, TypeScriptを使った開発経験（2年以上）
・HTML/CSS/JavaScriptの深い理解
・Git/GitHubを使ったチーム開発経験
・レスポンシブデザインの実装経験

【歓迎スキル】
・Next.js、Vue.jsの開発経験
・Tailwind CSS、styled-componentsの使用経験
・Webパフォーマンス最適化の知識
・アクセシビリティへの理解
・バックエンド開発経験（Node.js、Python等）

【企業について】
株式会社テックリード様は、革新的な技術で業界をリードする急成長中のIT企業です。
特に、社員一人ひとりの成長を支援する文化と、自由な発想を歓迎する風土が魅力です。

【働く環境】
・フレックスタイム制
・リモートワーク可（週2-3日出社）
・最新の開発環境の提供
・書籍・勉強会参加費用の支援
・カジュアルな社内環境

【選考プロセス】
1. 書類選考
2. 一次面接（技術面接）
3. 最終面接（役員面接）
4. 内定

------------------------------------
株式会社OFFERS
求人情報詳細
公開日：2025年5月25日
------------------------------------`}</pre>
              </div>
            </div>

            <div className="mt-12 flex flex-col space-y-3 sm:space-y-0 sm:space-x-4 sm:flex-row sm:justify-end">
              <Link href="/jobs" className="w-full sm:w-auto order-3 sm:order-1 justify-center inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors">
                一覧に戻る
              </Link>
              <Link href="/jobs/edit" className="w-full sm:w-auto order-2 sm:order-2 justify-center inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2 -ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                この求人を編集する
              </Link>
              <Link href="/offers/new" className="w-full sm:w-auto order-1 sm:order-3 justify-center inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2 -ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9V5.25A2.25 2.25 0 0019.5 3h-15A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h10.5a2.25 2.25 0 002.25-2.25V15M12 15l3-3m0 0l-3-3m3 3H9M21.75 12a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0z" />
                </svg>
                この求人でオファー作成
              </Link>
            </div>
          </div>
        </main>
      
      <Footer />
    </div>
  )
}