'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OfferRule {
  id: string;
  creationDate: string;
  scope: string;
  target: string;
  summary: string;
}

const offerRulesData: OfferRule[] = [
  { id: 'RUL-001', creationDate: '2025年5月25日', scope: '全体', target: '全ての求職者', summary: '初回メッセージにパーソナライズされた挨拶文を自動挿入するルール。返信率向上を目的とする。' },
  { id: 'RUL-002', creationDate: '2025年5月24日', scope: '職種', target: 'エンジニア', summary: 'エンジニア職の候補者に対し、技術スタックやプロジェクト経験を強調したオファー文面を生成する。' },
  { id: 'RUL-003', creationDate: '2025年5月23日', scope: '顧客', target: '株式会社テックリード', summary: '株式会社テックリードの求人応募者へ、企業の成長性や文化に関する情報を追加で提供する。' },
  { id: 'RUL-004', creationDate: '2025年5月22日', scope: '求人', target: 'JID-1001 (フロントエンドエンジニア)', summary: '特定のフロントエンド求人(JID-1001)に対し、歓迎スキルセットに合致する場合に給与交渉可の旨を明記。' },
  { id: 'RUL-005', creationDate: '2025年5月21日', scope: '職種', target: '人事', summary: '人事職の候補者へ、企業の福利厚生やキャリアパスに関する情報を重点的に記載する。' },
  { id: 'RUL-006', creationDate: '2025年5月20日', scope: '全体', target: '全ての求職者', summary: 'スカウトメール送信後、3日以内に返信がない場合に自動フォローアップメッセージを送信する設定。' },
  { id: 'RUL-007', creationDate: '2025年5月19日', scope: '顧客', target: '株式会社ヒューマンセントリック', summary: 'ヒューマンセントリック社の人事関連求人において、特にダイバーシティ＆インクルージョンへの取り組みをアピールする。' },
  { id: 'RUL-008', creationDate: '2025年5月18日', scope: '職種', target: '総務', summary: '総務職の候補者に対し、オフィスの立地や働きやすさ（リモートワーク制度など）を訴求する。' },
  { id: 'RUL-009', creationDate: '2025年5月17日', scope: '求人', target: 'JID-1008 (SREエンジニア)', summary: 'SREエンジニア(JID-1008)の求人では、オンコール体制や技術的裁量について具体的に記述する。' },
  { id: 'RUL-010', creationDate: '2025年5月16日', scope: '全体', target: '全ての求職者', summary: '週末や夜間に送信するメールの文面トーンをややカジュアルにする調整ルール。' },
];

function getScopeColor(scope: string) {
  switch (scope) {
    case '全体': return 'bg-blue-100 text-blue-800';
    case '職種': return 'bg-green-100 text-green-800';
    case '顧客': return 'bg-yellow-100 text-yellow-800';
    case '求人': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export default function RulesPage() {
  const [rules] = useState(offerRulesData);
  const router = useRouter();

  const handleRowClick = () => {
    router.push('/rules/detail');
  };

  return (
    <div className="bg-gray-100 text-gray-800 app-layout">
      <Header />
      <Sidebar activeTab="/rules" />
      
      <main className="ml-60 flex-1 bg-white overflow-y-auto">
        <div className="max-w-7xl mx-auto p-6 h-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">オファー作成ルール一覧</h1>

          <div className="h-[120px] md:h-[100px] flex flex-col justify-end mb-4">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
              <div className="flex flex-wrap gap-x-3 gap-y-2 items-center">
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-sm">
                  <span>ID</span>
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
                  <span className="whitespace-nowrap">適用範囲:</span>
                  <span className="truncate-value">顧客</span>
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
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-sm">
                  <span>顧客</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium py-1.5 px-3 rounded-full flex items-center space-x-1.5 shadow-sm">
                  <span>求人</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>

              <Link href="/rules/create" className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2.5 px-5 rounded-md text-sm shadow-md flex items-center space-x-2 flex-shrink-0 whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>ルール作成</span>
              </Link>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">作成日</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">適用範囲</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">対象</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-2/5">概要</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">詳細</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleRowClick()}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{rule.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{rule.creationDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getScopeColor(rule.scope)}`}>
                          {rule.scope}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{rule.target}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <div className="truncate-summary" title={rule.summary}>{rule.summary}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-center" onClick={(e) => e.stopPropagation()}>
                        <Link 
                          href="/rules/detail"
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
            onPageChange={(page) => console.log('Rules page changed to:', page)}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}