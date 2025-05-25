'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function RegistrationPage() {
  const [clientName, setClientName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration:', {
      clientName,
      jobTitle,
      jobCategory,
      salaryRange,
      pdfFile
    });
  };

  return (
    <div className="bg-gray-100 text-gray-800 app-layout">
      <Header />
      <Sidebar activeTab="/jobs" />
      
      <main className="ml-60 flex-1 bg-white overflow-y-auto">
        <div className="max-w-3xl mx-auto p-6 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">求人作成</h1>

          <div className="mb-10 p-6 bg-slate-50 rounded-lg shadow-sm border border-slate-200">
            <p className="text-base text-slate-700 mb-1">
              求人票PDFをアップロード
            </p>
            <p className="text-sm text-slate-500 mb-4">
              AIが内容を読み取り、以下の項目に自動入力します。 AIによる自動入力後、内容を修正することも可能です。
            </p>
            <label htmlFor="pdf_upload" className="cursor-pointer block w-full border-2 border-dashed border-slate-300 hover:border-sky-500 rounded-lg p-6 text-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mx-auto h-12 w-12 text-slate-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.338 0 4.5 4.5 0 01-1.41 8.775H6.75z" />
              </svg>
              <span className="mt-2 block text-sm font-medium text-slate-600">
                {pdfFile ? pdfFile.name : 'クリックしてファイルを選択、またはドラッグ＆ドロップ'}
              </span>
              <span className="mt-1 block text-xs text-slate-500">PDF (最大5MB)</span>
            </label>
            <input type="file" id="pdf_upload" name="pdf_upload" className="sr-only" accept=".pdf" onChange={handleFileChange} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="client_name" className="block text-sm font-medium text-gray-700 mb-1">顧客名</label>
              <input
                type="text"
                name="client_name"
                id="client_name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="例: 株式会社〇〇"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="job_title" className="block text-sm font-medium text-gray-700 mb-1">求人名（オファーポジション）</label>
              <input
                type="text"
                name="job_title"
                id="job_title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="例: プロジェクトマネージャー (SaaS)"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="job_category" className="block text-sm font-medium text-gray-700 mb-1">職種</label>
              <select
                id="job_category"
                name="job_category"
                value={jobCategory}
                onChange={(e) => setJobCategory(e.target.value)}
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
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
              <label htmlFor="salary_range" className="block text-sm font-medium text-gray-700 mb-1">年収帯</label>
              <input
                type="text"
                name="salary_range"
                id="salary_range"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                placeholder="例: 600～800万"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-gray-400"
              />
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                登録する
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}