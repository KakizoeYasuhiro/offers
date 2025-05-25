'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OfferText {
  offerId: string;
  creationDate: string;
  jobName: string;
  candidateName: string;
  status: string;
  subject: string;
}

const offerTextsData: OfferText[] = [
  { offerId: 'OFF-001', creationDate: '2025年5月25日 10:30', jobName: 'フロントエンドエンジニア', candidateName: '山田 花子', status: '下書き', subject: '【株式会社テックリード】フロントエンドエンジニアのポジションに関するご案内' },
  { offerId: 'OFF-002', creationDate: '2025年5月25日 09:15', jobName: '人事スペシャリスト', candidateName: '佐藤 太郎', status: '送信済', subject: '【株式会社ヒューマンセントリック】人事スペシャリストの件' },
  { offerId: 'OFF-003', creationDate: '2025年5月24日 18:00', jobName: 'SREエンジニア', candidateName: '鈴木 一郎', status: '送信準備完了', subject: '貴社SREエンジニアのポジションについて - 株式会社スマートワークスより' },
  { offerId: 'OFF-004', creationDate: '2025年5月24日 15:20', jobName: 'バックエンドデベロッパー (Java)', candidateName: '高橋 良子', status: '下書き', subject: 'Javaバックエンド開発ポジションのご提案 - 株式会社データドライブ' },
  { offerId: 'OFF-005', creationDate: '2025年5月23日 17:00', jobName: 'UI/UXデザイナー', candidateName: '田中 誠', status: '送信済', subject: 'UI/UXデザイナー募集の件（株式会社クリエイティブソリューションズ）' },
  { offerId: 'OFF-006', creationDate: '2025年5月23日 11:45', jobName: '採用担当リーダー', candidateName: '渡辺 久美子', status: '開封済', subject: '採用担当リーダーポジションについて - 株式会社ネクストステージ' },
  { offerId: 'OFF-007', creationDate: '2025年5月22日 16:30', jobName: 'オフィスアドミニストレーター', candidateName: '伊藤 健太', status: '下書き', subject: 'オフィスアドミニストレーター職のご案内 (株式会社グローバリンク)' },
  { offerId: 'OFF-008', creationDate: '2025年5月22日 14:00', jobName: 'QAエンジニア', candidateName: '山本 直樹', status: '送信済', subject: 'QAエンジニアのポジションに関するスカウト - 株式会社アルファシステム' },
  { offerId: 'OFF-009', creationDate: '2025年5月21日 10:00', jobName: '労務マネージャー', candidateName: '中村 あゆみ', status: '返信あり', subject: 'Re: 【株式会社キャリアアップ】労務マネージャーのポジションに関するご案内' },
  { offerId: 'OFF-010', creationDate: '2025年5月21日 09:00', jobName: 'フルスタックエンジニア', candidateName: '小林 恵子', status: '下書き', subject: 'フルスタックエンジニア募集 - 株式会社デジタルフォワード' },
];

function getStatusBadgeClass(status: string) {
  switch (status) {
    case '下書き': return 'bg-yellow-100 text-yellow-800';
    case '送信準備完了': return 'bg-blue-100 text-blue-800';
    case '送信済': return 'bg-green-100 text-green-800';
    case '開封済': return 'bg-indigo-100 text-indigo-800';
    case '返信あり': return 'bg-pink-100 text-pink-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export default function OffersPage() {
  const [offers] = useState(offerTextsData);
  const router = useRouter();

  const handleRowClick = (offerId: string) => {
    router.push('/offers/detail');
  };

  return (
    <div className="bg-gray-100 text-gray-800 app-layout">
      <Header />
      <Sidebar activeTab="/offers" />
      
      <main className="ml-60 flex-1 bg-white overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 h-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">オファー文面一覧</h1>

          <div className="h-[120px] md:h-[100px] flex flex-col justify-end mb-4">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
              <div className="flex flex-wrap gap-x-3 gap-y-2 items-center">
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-sm">
                  <span>オファーID</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-sm">
                  <span>求人名</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-sm">
                  <span>候補者名</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-sm">
                  <span>作成日</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <button className="bg-sky-100 text-sky-700 text-xs font-medium py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-sm">
                  <span className="whitespace-nowrap">ステータス:</span>
                  <span className="truncate-value">下書き</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>

              <Link 
                href="/offers/new"
                className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2.5 px-5 rounded-md text-sm shadow-md flex items-center space-x-2 flex-shrink-0 whitespace-nowrap transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>オファー作成</span>
              </Link>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">オファーID</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">作成日時</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">求人名</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">候補者名</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ステータス</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">件名</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">詳細</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {offers.map((offer) => (
                    <tr key={offer.offerId} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleRowClick(offer.offerId)}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{offer.offerId}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{offer.creationDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{offer.jobName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{offer.candidateName}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(offer.status)}`}>
                          {offer.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate" title={offer.subject}>{offer.subject}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-center" onClick={(e) => e.stopPropagation()}>
                        <Link 
                          href="/offers/detail"
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
            onPageChange={(page) => console.log('Offers page changed to:', page)}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}