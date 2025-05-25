'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

export default function JobEdit() {
  const [formData, setFormData] = useState({
    clientName: '株式会社テックリード',
    jobTitle: 'フロントエンドエンジニア',
    jobStatus: '募集中',
    jobCategory: 'エンジニア',
    salaryRange: '600～800万',
    jobDescription: `ポジション概要: 当社の主力製品であるSaaS型顧客管理プラットフォーム「CustomerHub」のフロントエンド開発をリード。React, TypeScript, Next.jsを活用。

主な職務内容:
- 新規機能開発、既存機能改善
- UIコンポーネントライブラリ設計・開発
- チーム開発、コードレビュー、テスト、パフォーマンス最適化
- 技術選定、アーキテクチャ設計貢献

応募資格 (必須):
- Webフロントエンド開発実務経験3年以上（React, Vue, Angularいずれか）
- HTML, CSS, JavaScript (ES6+) の深い知識
- TypeScript利用経験、Git利用経験

応募資格 (歓迎):
- Next.js/Nuxt.js経験
- 状態管理ライブラリ経験
- UI/UXデザイン知識、バックエンド知識`
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('PDF uploaded:', file.name)
      // Handle PDF upload and AI processing here
    }
  }

  return (
    <div className="bg-gray-100 text-gray-800 app-layout">
      <Header />
      <Sidebar />
      
      <main className="ml-60 flex-1 bg-white overflow-y-auto">
        <div className="max-w-3xl mx-auto p-6 py-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-3">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">求人編集</h1>
                <p className="mt-1 text-sm text-gray-500">求人ID: <span className="font-semibold">JOB-001</span></p>
              </div>
              <Link href="/jobs/detail" className="text-sm font-medium text-sky-600 hover:text-sky-700 flex items-center space-x-1 self-start sm:self-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <span>詳細に戻る</span>
              </Link>
            </div>
            
            <div className="bg-slate-100 p-4 rounded-md text-sm mb-6 text-slate-600">
              <p><strong>作成日時:</strong> <span>2025年5月24日 09:00</span></p>
              <p><strong>最終更新日時:</strong> <span>2025年5月25日 11:00</span></p>
            </div>

            <div className="mb-10 p-6 bg-slate-50 rounded-lg shadow-sm border border-slate-200">
              <p className="text-base text-slate-700 mb-1">
                求人票PDFを更新
              </p>
              <p className="text-sm text-slate-500 mb-4">
                新しい求人票PDFをアップロードすると、AIが内容を再読み取りし、以下の項目を更新する際の参考にします。既存の入力内容は保持されますが、必要に応じて手動で修正してください。
              </p>
              <label htmlFor="pdf_upload_edit" className="cursor-pointer block w-full border-2 border-dashed border-slate-300 hover:border-sky-500 rounded-lg p-6 text-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-auto h-12 w-12 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338 0 4.5 4.5 0 01-1.41 8.775H6.75z" />
                </svg>
                <span className="mt-2 block text-sm font-medium text-slate-600">
                  クリックして新しいPDFを選択、またはドラッグ＆ドロップ
                </span>
                <span className="mt-1 block text-xs text-slate-500">PDF (最大5MB)</span>
              </label>
              <input 
                type="file" 
                id="pdf_upload_edit" 
                name="pdf_upload_edit" 
                className="sr-only" 
                accept=".pdf"
                onChange={handleFileUpload}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label htmlFor="clientName" className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">顧客名</label>
                <input 
                  type="text" 
                  name="clientName" 
                  id="clientName" 
                  value={formData.clientName}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">求人名（オファーポジション）</label>
                <input 
                  type="text" 
                  name="jobTitle" 
                  id="jobTitle" 
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
              
              <div>
                <label htmlFor="jobStatus" className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">ステータス</label>
                <select 
                  id="jobStatus" 
                  name="jobStatus" 
                  value={formData.jobStatus}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 bg-white"
                >
                  <option value="募集中">募集中</option>
                  <option value="募集終了">募集終了</option>
                  <option value="一時停止">一時停止</option>
                </select>
              </div>

              <div>
                <label htmlFor="jobCategory" className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">職種</label>
                <select 
                  id="jobCategory" 
                  name="jobCategory" 
                  value={formData.jobCategory}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 bg-white"
                >
                  <option value="">選択してください</option>
                  <option value="エンジニア">エンジニア</option>
                  <option value="人事">人事</option>
                  <option value="総務">総務</option>
                  <option value="営業">営業</option>
                  <option value="マーケティング">マーケティング</option>
                  <option value="企画">企画</option>
                  <option value="経理">経理</option>
                  <option value="その他">その他</option>
                </select>
              </div>

              <div>
                <label htmlFor="salaryRange" className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">年収帯</label>
                <input 
                  type="text" 
                  name="salaryRange" 
                  id="salaryRange" 
                  value={formData.salaryRange}
                  onChange={handleInputChange}
                  placeholder="例: 600～800万"
                  className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
              </div>
              
              <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">
                  求人内容概要 <span className="text-xs text-gray-500">(AI抽出・編集可能)</span>
                </label>
                <textarea 
                  id="jobDescription" 
                  name="jobDescription" 
                  rows={12}
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                />
                <p className="mt-2 text-xs text-gray-500">AIがPDFから抽出した主要な求人情報です。必要に応じて編集してください。</p>
              </div>

              <div className="pt-8 mt-6 flex flex-col-reverse gap-y-3 sm:flex-row sm:justify-end sm:space-x-4">
                <Link href="/jobs/detail" className="w-full sm:w-auto justify-center inline-flex items-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors">
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
  )
}