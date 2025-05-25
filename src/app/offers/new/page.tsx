'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function NewOfferPage() {
  const [formData, setFormData] = useState({
    jobSelect: '',
    candidateName: '',
    candidateEmail: '',
    candidateProfileUrl: '',
    additionalInstructions: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Offer generation form submitted:', formData);
  };

  return (
    <div className="bg-gray-100 text-gray-800 app-layout">
      <Header />
      <Sidebar activeTab="/offers" />
      
      <main className="ml-60 flex-1 bg-white overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 py-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-10">新規オファー作成</h1>

          <form onSubmit={handleSubmit} className="space-y-12">
            
            <section aria-labelledby="job-selection-heading">
              <div className="bg-slate-50 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="job-selection-heading" className="text-xl font-semibold leading-7 text-gray-900">1. 対象求人の選択</h2>
                  <p className="mt-1 text-sm text-gray-500">どの求人に基づいてオファー文面を作成しますか？</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:p-6">
                  <div>
                    <label htmlFor="jobSelect" className="block text-sm font-medium leading-6 text-gray-900 mb-1.5">求人を選択</label>
                    <select 
                      id="jobSelect" 
                      name="jobSelect" 
                      value={formData.jobSelect}
                      onChange={handleInputChange}
                      className="block w-full md:w-3/4 rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 bg-white"
                    >
                      <option value="">求人を選択してください...</option>
                      <option value="JID-1001">JID-1001: フロントエンドエンジニア (株式会社テックリード)</option>
                      <option value="JID-1004">JID-1004: バックエンドデベロッパー (株式会社データドライブ)</option>
                      <option value="JID-1008">JID-1008: SREエンジニア (株式会社スマートワークス)</option>
                      <option value="JID-1016">JID-1016: クラウドアーキテクト (AWS) (株式会社クラウドエース)</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="candidate-info-heading">
              <div className="bg-slate-50 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="candidate-info-heading" className="text-xl font-semibold leading-7 text-gray-900">2. 候補者情報</h2>
                  <p className="mt-1 text-sm text-gray-500">オファーを送る候補者の情報を入力してください。</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:p-6">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="candidateName" className="block text-sm font-medium leading-6 text-gray-900">候補者名</label>
                      <div className="mt-2">
                        <input 
                          type="text" 
                          name="candidateName" 
                          id="candidateName" 
                          value={formData.candidateName}
                          onChange={handleInputChange}
                          placeholder="例: 山田 花子"
                          className="block w-full md:w-3/4 rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="candidateEmail" className="block text-sm font-medium leading-6 text-gray-900">候補者メールアドレス <span className="text-xs text-gray-500">(任意)</span></label>
                      <div className="mt-2">
                        <input 
                          type="email" 
                          name="candidateEmail" 
                          id="candidateEmail" 
                          value={formData.candidateEmail}
                          onChange={handleInputChange}
                          placeholder="例: hanako.yamada@example.com"
                          className="block w-full md:w-3/4 rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="candidateProfileUrl" className="block text-sm font-medium leading-6 text-gray-900">候補者プロフィールURL <span className="text-xs text-gray-500">(任意)</span></label>
                      <div className="mt-2">
                        <input 
                          type="url" 
                          name="candidateProfileUrl" 
                          id="candidateProfileUrl" 
                          value={formData.candidateProfileUrl}
                          onChange={handleInputChange}
                          placeholder="例: LinkedIn, GitHub, ポートフォリオサイトなど"
                          className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">AIが文面をパーソナライズする際の参考にします。</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section aria-labelledby="rules-instructions-heading">
              <div className="bg-slate-50 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="rules-instructions-heading" className="text-xl font-semibold leading-7 text-gray-900">3. ルールと追加指示</h2>
                  <p className="mt-1 text-sm text-gray-500">適用されるルールを確認し、必要であればこのオファー固有の追加指示を入力します。</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="block text-sm font-medium leading-6 text-gray-900 mb-2">適用予定ルール</h3>
                      <div className="p-4 border border-dashed border-gray-300 rounded-md bg-white min-h-[6rem]">
                        <p className="text-sm text-gray-500" id="applicable_rules_display">
                          （選択した求人や入力された候補者情報に基づき、適用されるオファー作成ルールがここに表示されます。例: 「エンジニア向け経験強調ルール」「株式会社テックリード向け特別案内ルール」など）
                        </p>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">適用ルールの詳細や編集は<a href="/rules" className="text-sky-600 hover:underline">オファー作成ルール一覧</a>から行えます。</p>
                    </div>
                    <div>
                      <label htmlFor="additionalInstructions" className="block text-sm font-medium leading-6 text-gray-900">AIへの追加指示 <span className="text-xs text-gray-500">(任意)</span></label>
                      <div className="mt-2">
                        <textarea 
                          id="additionalInstructions" 
                          name="additionalInstructions" 
                          rows={5}
                          value={formData.additionalInstructions}
                          onChange={handleInputChange}
                          placeholder="例: 特に〇〇のスキルセットを強調してください。候補者の△△の経験について具体的に触れてください。"
                          className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="pt-8 flex justify-end">
              <button 
                type="submit"
                className="w-full md:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 13.75M17 13.75L15.75 12M17 13.75L18.25 15.25M15.75 12L17 10.25m-7.5 0h7.5M12 15.75h3.75M12 18.75h1.5m1.5 0h1.5M4.5 12H6m-1.5 3H6m-1.5 3H6M3 12c0-4.142 3.358-7.5 7.5-7.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                オファー文面を生成する
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}