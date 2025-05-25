'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function RuleDetailPage() {
  const [copyButtonText, setCopyButtonText] = useState('指示内容をコピー');

  // サンプルデータ - 実際の実装では URLパラメータやAPIから取得
  const ruleData = {
    id: 'RUL-002',
    creationDate: '2025年5月24日 15:30',
    name: 'エンジニア向け経験スキル強調ルール',
    scope: '職種',
    target: 'エンジニア',
    priority: 10,
    status: '有効',
    summary: 'エンジニア職の候補者に対し、技術スタックやプロジェクト経験を強調したオファー文面を生成するためのルールです。特に候補者のスキルと求人の要件が合致する点を明確に示します。',
    instructions: `適用範囲が「職種」で対象が「エンジニア」の場合に適用する。

候補者の職務経歴書から以下の情報を抽出する:
1. 主要なプログラミング言語とフレームワーク（例: Java, Spring Boot, React, Python, Django）。
2. 直近のプロジェクトでの役割と成果。

オファー文面の冒頭付近で、以下の形式でパーソナライズされた一文を挿入する:
「[候補者名]様の[抽出した言語/フレームワーク]に関する豊富なご経験、特に[抽出したプロジェクトでの役割と成果]は、弊社の[関連する求人名またはプロジェクト]でご活躍いただける可能性を大いに感じさせるものです。」

文面全体のトーンは、プロフェッショナルかつ候補者への敬意を払ったものとする。
企業の技術的な挑戦や成長機会についても触れること。
NGワード: 「絶対」「必ずしも」「～だけ」`
  };

  const getScopeBadgeClass = (scope: string) => {
    switch (scope) {
      case '職種': return 'bg-green-100 text-green-800';
      case '会社': return 'bg-blue-100 text-blue-800';
      case '全体': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case '有効': return 'bg-emerald-100 text-emerald-800';
      case '無効': return 'bg-red-100 text-red-800';
      case '下書き': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCopyInstructions = async () => {
    try {
      await navigator.clipboard.writeText(ruleData.instructions);
      setCopyButtonText('コピーしました!');
      setTimeout(() => {
        setCopyButtonText('指示内容をコピー');
      }, 2000);
    } catch (err) {
      console.error('クリップボードへのコピーに失敗しました:', err);
      setCopyButtonText('コピー失敗');
      setTimeout(() => {
        setCopyButtonText('指示内容をコピー');
      }, 2000);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800 app-layout">
      <Header />
      <Sidebar activeTab="/rules" />
      
      <main className="ml-60 flex-1 bg-white overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6 py-10"> 
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">オファー作成ルール詳細</h1>
            <Link 
              href="/rules" 
              className="text-sm font-medium text-sky-600 hover:text-sky-700 flex items-center space-x-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span>ルール一覧に戻る</span>
            </Link>
          </div>

          <div className="bg-slate-50 shadow-md rounded-lg p-6 mb-8">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <div>
                <dt className="text-sm font-medium text-slate-500">ルールID</dt>
                <dd className="mt-1 text-base text-slate-900">{ruleData.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">作成日時</dt>
                <dd className="mt-1 text-base text-slate-900">{ruleData.creationDate}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-slate-500">ルール名</dt>
                <dd className="mt-1 text-base text-slate-900">{ruleData.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">適用範囲</dt>
                <dd className="mt-1 text-base text-slate-900">
                  <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getScopeBadgeClass(ruleData.scope)}`}>
                    {ruleData.scope}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">対象</dt>
                <dd className="mt-1 text-base text-slate-900">{ruleData.target}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">優先度</dt>
                <dd className="mt-1 text-base text-slate-900">{ruleData.priority}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">ステータス</dt>
                <dd className="mt-1 text-base text-slate-900">
                  <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(ruleData.status)}`}>
                    {ruleData.status}
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="bg-white shadow-lg rounded-lg mb-8">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h2 className="text-xl font-semibold text-gray-700">概要 (AIによる要約)</h2>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-800 leading-relaxed">{ruleData.summary}</p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-700">ルール詳細 (AIへの指示内容)</h2>
              <button 
                onClick={handleCopyInstructions}
                title="指示内容をクリップボードにコピー"
                className={`flex items-center space-x-2 text-sm font-medium py-2 px-3 border rounded-md transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                  copyButtonText === 'コピーしました!' 
                    ? 'text-green-600 border-green-600 hover:border-green-700 hover:bg-green-50 focus:ring-green-500'
                    : 'text-sky-600 border-sky-500 hover:text-sky-800 hover:border-sky-700 hover:bg-sky-50 focus:ring-sky-500'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{copyButtonText}</span>
              </button>
            </div>
            <div className="p-6">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed bg-slate-50 p-5 rounded-md border border-slate-200 min-h-[200px] selection:bg-sky-200">
                {ruleData.instructions}
              </pre>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/rules" 
              className="w-full sm:w-auto justify-center inline-flex items-center px-6 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
            >
              一覧に戻る
            </Link>
            <Link 
              href="/rules/edit" 
              className="w-full sm:w-auto justify-center inline-flex items-center px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
            >
              このルールを編集する
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}