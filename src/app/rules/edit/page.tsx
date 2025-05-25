'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function RuleEditPage() {
  // サンプルデータ - 実際の実装では URLパラメータやAPIから取得
  const [formData, setFormData] = useState({
    id: 'RUL-002',
    ruleName: 'エンジニア向け経験スキル強調ルール',
    scope: '職種',
    target: 'エンジニア',
    ruleDetails: `適用範囲が「職種」で対象が「エンジニア」の場合に適用する。

候補者の職務経歴書から以下の情報を抽出する:
1. 主要なプログラミング言語とフレームワーク（例: Java, Spring Boot, React, Python, Django）。
2. 直近のプロジェクトでの役割と成果。

オファー文面の冒頭付近で、以下の形式でパーソナライズされた一文を挿入する:
「[候補者名]様の[抽出した言語/フレームワーク]に関する豊富なご経験、特に[抽出したプロジェクトでの役割と成果]は、弊社の[関連する求人名またはプロジェクト]でご活躍いただける可能性を大いに感じさせるものです。」

文面全体のトーンは、プロフェッショナルかつ候補者への敬意を払ったものとする。
企業の技術的な挑戦や成長機会についても触れること。
NGワード: 「絶対」「必ずしも」「～だけ」`,
    rulePriority: 10,
    ruleEnabled: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Rule updated:', formData);
  };

  const handleDelete = () => {
    if (window.confirm('このルールを削除してもよろしいですか？この操作は取り消すことができません。')) {
      console.log('Rule deleted:', formData.id);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-800 app-layout">
      <Header />
      <Sidebar activeTab="/rules" />
      
      <main className="ml-60 flex-1 bg-white overflow-y-auto">
        <div className="max-w-3xl mx-auto p-6 py-10"> 
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">オファー作成ルール編集</h1>
              <p className="mt-1 text-sm text-gray-500">ルールID: <span className="font-semibold">{formData.id}</span></p>
            </div>
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

          <form onSubmit={handleSubmit} className="space-y-8 bg-slate-50 shadow-md sm:rounded-lg p-6 sm:p-8">
            <div>
              <label htmlFor="ruleName" className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">ルール名</label>
              <input 
                type="text" 
                name="ruleName" 
                id="ruleName" 
                value={formData.ruleName}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
            </div>

            <div>
              <label htmlFor="scope" className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">適用範囲</label>
              <select 
                id="scope" 
                name="scope" 
                value={formData.scope}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 bg-white"
              >
                <option value="全体">全体</option>
                <option value="職種">職種</option>
                <option value="顧客">顧客</option>
                <option value="求人">求人</option>
              </select>
            </div>

            <div>
              <label htmlFor="target" className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">対象</label>
              <input 
                type="text" 
                name="target" 
                id="target" 
                value={formData.target}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
              <p className="mt-2 text-xs text-gray-500">
                適用範囲で「職種」なら職種名、「顧客」なら顧客名/ID、「求人」なら求人名/IDを入力。「全体」の場合は入力不要か、「全て」等と記述します。
              </p>
            </div>

            <div>
              <label htmlFor="ruleDetails" className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">ルール詳細 (AIへの指示内容)</label>
              <textarea 
                id="ruleDetails" 
                name="ruleDetails" 
                rows={10}
                value={formData.ruleDetails}
                onChange={handleInputChange}
                className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
              <p className="mt-2 text-xs text-gray-500">
                この内容はAIがオファー文面を自動生成する際の指示となります。具体的かつ明確に記述してください。
              </p>
            </div>
            
            <div>
              <label htmlFor="rulePriority" className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">優先度 <span className="text-xs text-gray-500">(任意)</span></label>
              <input 
                type="number" 
                name="rulePriority" 
                id="rulePriority" 
                value={formData.rulePriority}
                onChange={handleInputChange}
                className="block w-1/3 rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              />
              <p className="mt-2 text-xs text-gray-500">
                複数のルールが適用可能な場合に、どのルールを優先的に使用するかを指定します。数値が小さいほど高優先となります。
              </p>
            </div>

            <div className="flex items-center pt-2">
              <input 
                id="ruleEnabled" 
                name="ruleEnabled" 
                type="checkbox" 
                checked={formData.ruleEnabled}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
              />
              <label htmlFor="ruleEnabled" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                このルールを有効にする
              </label>
            </div>

            <div className="pt-8 mt-6 flex flex-col-reverse gap-y-3 sm:flex-row sm:justify-end sm:space-x-4">
              <button 
                type="button" 
                onClick={handleDelete}
                className="w-full sm:w-auto justify-center inline-flex items-center px-5 py-2.5 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                このルールを削除する
              </button>
              <Link 
                href="/rules" 
                className="w-full sm:w-auto justify-center inline-flex items-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors"
              >
                キャンセル
              </Link>
              <button 
                type="submit"
                className="w-full sm:w-auto justify-center inline-flex items-center px-5 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                更新を保存する
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}