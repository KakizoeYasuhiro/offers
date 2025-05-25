'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function SystemSettingsPage() {
  const [formData, setFormData] = useState({
    agentName: '山田 太郎',
    defaultSignature: `株式会社OFFERS
エージェント担当: 山田 太郎
電話: 03-XXXX-XXXX
Email: taro.yamada@example.com`,
    aiTone: 'standard',
    aiExclusions: '',
    notificationOfferGenerated: true,
    notificationRuleApplied: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
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
    console.log('System settings saved:', formData);
  };

  return (
    <div className="bg-gray-100 text-gray-800 app-layout">
      <Header />
      <Sidebar activeTab="/settings" />
      
      <main className="ml-60 flex-1 bg-white overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 py-8"> 
          <h1 className="text-3xl font-bold text-gray-800 mb-10">設定</h1>

          <form onSubmit={handleSubmit} className="space-y-12">
            <section aria-labelledby="general-settings-heading">
              <div className="bg-slate-50 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="general-settings-heading" className="text-xl font-semibold leading-6 text-gray-900">一般設定</h2>
                  <p className="mt-1 text-sm text-gray-500">基本的な情報を設定します。</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="agentName" className="block text-sm font-medium text-gray-700 mb-1">担当者名 (オファー署名用)</label>
                      <input 
                        type="text" 
                        name="agentName" 
                        id="agentName" 
                        value={formData.agentName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full md:w-2/3 px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="defaultSignature" className="block text-sm font-medium text-gray-700 mb-1">デフォルト署名</label>
                      <textarea 
                        id="defaultSignature" 
                        name="defaultSignature" 
                        rows={6}
                        value={formData.defaultSignature}
                        onChange={handleInputChange}
                        className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-gray-400"
                      />
                      <p className="mt-1.5 text-xs text-gray-500">ここで設定した署名は、オファー文面生成時に利用されることがあります。</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="ai-settings-heading">
              <div className="bg-slate-50 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="ai-settings-heading" className="text-xl font-semibold leading-6 text-gray-900">AI設定</h2>
                  <p className="mt-1 text-sm text-gray-500">オファー文面生成AIの挙動に関する設定です。</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="aiTone" className="block text-sm font-medium text-gray-700 mb-1">デフォルトの文面トーン</label>
                      <select 
                        id="aiTone" 
                        name="aiTone" 
                        value={formData.aiTone}
                        onChange={handleInputChange}
                        className="mt-1 block w-full md:w-1/2 px-3 py-2.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                      >
                        <option value="standard">標準</option>
                        <option value="formal">フォーマル</option>
                        <option value="casual">カジュアル</option>
                        <option value="enthusiastic">熱意のこもった</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="aiExclusions" className="block text-sm font-medium text-gray-700 mb-1">除外キーワード (カンマ区切り)</label>
                      <input 
                        type="text" 
                        name="aiExclusions" 
                        id="aiExclusions" 
                        value={formData.aiExclusions}
                        onChange={handleInputChange}
                        placeholder="例: ブラック, 至急, 必ず"
                        className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-gray-400"
                      />
                      <p className="mt-1.5 text-xs text-gray-500">AIがオファー文面を生成する際に使用を避けるキーワードを指定します。</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section aria-labelledby="notification-settings-heading">
              <div className="bg-slate-50 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="notification-settings-heading" className="text-xl font-semibold leading-6 text-gray-900">通知設定</h2>
                  <p className="mt-1 text-sm text-gray-500">アプリケーションからの通知に関する設定です。</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <fieldset className="space-y-5">
                    <legend className="sr-only">通知設定</legend>
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input 
                          id="notificationOfferGenerated" 
                          name="notificationOfferGenerated" 
                          type="checkbox" 
                          checked={formData.notificationOfferGenerated}
                          onChange={handleInputChange}
                          className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="notificationOfferGenerated" className="font-medium text-gray-700">オファー文面生成完了通知</label>
                        <p className="text-gray-500">AIによるオファー文面の生成が完了した際にメールで通知を受け取る。</p>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input 
                          id="notificationRuleApplied" 
                          name="notificationRuleApplied" 
                          type="checkbox" 
                          checked={formData.notificationRuleApplied}
                          onChange={handleInputChange}
                          className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="notificationRuleApplied" className="font-medium text-gray-700">ルール適用結果サマリー</label>
                        <p className="text-gray-500">（将来機能）定期的にルール適用の統計情報や改善提案をメールで受け取る。</p>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </section>

            <div className="pt-8 mt-4">
              <button 
                type="submit"
                className="w-full md:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                設定を保存する
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}