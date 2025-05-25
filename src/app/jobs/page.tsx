'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Job {
  id: string;
  creationDate: string;
  clientName: string;
  jobTitle: string;
  jobCategory: string;
  salaryRange: string;
}

const jobsData: Job[] = [
  { id: 'JID-1001', creationDate: '2025年5月24日', clientName: '株式会社テックリード', jobTitle: 'フロントエンドエンジニア', jobCategory: 'エンジニア', salaryRange: '600～800万' },
  { id: 'JID-1002', creationDate: '2025年5月22日', clientName: '株式会社ヒューマンセントリック', jobTitle: '人事スペシャリスト', jobCategory: '人事', salaryRange: '500～700万' },
  { id: 'JID-1003', creationDate: '2025年5月20日', clientName: '株式会社オフィスサポート', jobTitle: '総務マネージャー候補', jobCategory: '総務', salaryRange: '550～750万' },
  { id: 'JID-1004', creationDate: '2025年5月18日', clientName: '株式会社データドライブ', jobTitle: 'バックエンドデベロッパー (Java)', jobCategory: 'エンジニア', salaryRange: '700～900万' },
  { id: 'JID-1005', creationDate: '2025年5月15日', clientName: '株式会社クリエイティブソリューションズ', jobTitle: 'UI/UXデザイナー', jobCategory: 'エンジニア', salaryRange: '500～750万' },
  { id: 'JID-1006', creationDate: '2025年5月12日', clientName: '株式会社ネクストステージ', jobTitle: '採用担当リーダー', jobCategory: '人事', salaryRange: '650～850万' },
  { id: 'JID-1007', creationDate: '2025年5月10日', clientName: '株式会社グローバリンク', jobTitle: 'オフィスアドミニストレーター', jobCategory: '総務', salaryRange: '400～600万' },
  { id: 'JID-1008', creationDate: '2025年5月08日', clientName: '株式会社スマートワークス', jobTitle: 'SREエンジニア', jobCategory: 'エンジニア', salaryRange: '800～1100万' },
  { id: 'JID-1009', creationDate: '2025年5月05日', clientName: '株式会社アルファシステム', jobTitle: 'QAエンジニア', jobCategory: 'エンジニア', salaryRange: '550～700万' },
  { id: 'JID-1010', creationDate: '2025年5月01日', clientName: '株式会社キャリアアップ', jobTitle: '労務マネージャー', jobCategory: '人事', salaryRange: '700～950万' },
];

export default function JobsPage() {
  const [jobs] = useState(jobsData);
  const router = useRouter();

  const handleRowClick = (jobId: string) => {
    router.push('/jobs/detail');
  };

  return (
    <div className="bg-gray-100 text-gray-800 app-layout">
      <Header />
      <Sidebar activeTab="/jobs" />
      
      <main className="ml-60 flex-1 bg-white overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 h-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">求人一覧</h1>

          <div className="h-[120px] md:h-[100px] flex flex-col justify-end mb-4">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
              <div className="flex flex-wrap gap-x-3 gap-y-2 items-center">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-sm">
                <span>ID</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <button className="bg-sky-100 text-sky-700 text-xs font-medium py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-sm">
                <span className="whitespace-nowrap">作成日:</span>
                <span className="truncate-value">2025-05-25</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-sm">
                <span>顧客名</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <button className="bg-sky-100 text-sky-700 text-xs font-medium py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-sm">
                <span className="whitespace-nowrap">求人名:</span>
                <span className="truncate-value">非常に長い求人名がここに入ります</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-sm">
                <span>職種</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <button className="bg-sky-100 text-sky-700 text-xs font-medium py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-sm">
                <span className="whitespace-nowrap">年収帯:</span>
                <span className="truncate-value">600万 - 800万</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              </div>

              <Link href="/jobs/registration" className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2.5 px-5 rounded-md text-sm shadow-md flex items-center space-x-2 flex-shrink-0 whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>求人作成</span>
              </Link>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">作成日</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">顧客名</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">求人名（オファーポジション）</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">職種</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">年収帯</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">PDFリンク</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">詳細</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleRowClick(job.id)}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{job.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{job.creationDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{job.clientName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{job.jobTitle}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{job.jobCategory}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{job.salaryRange}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center" onClick={(e) => e.stopPropagation()}>
                        <button type="button" title="PDFを表示" className="inline-block">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-400 hover:text-red-600 transition-colors">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                          </svg>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center" onClick={(e) => e.stopPropagation()}>
                        <Link 
                          href="/jobs/detail"
                          className="inline-block text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-xs px-3 py-1.5 transition-colors"
                        >
                          詳細
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination 
            currentPage={1}
            totalPages={10}
            onPageChange={(page) => console.log('Page changed to:', page)}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}