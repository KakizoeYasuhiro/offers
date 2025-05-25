'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function NotificationSettingsPage() {
  const [notifications, setNotifications] = useState({
    notifyOfferGenerated: true,
    notifyOfferOpened: false,
    notifyOfferReplied: false,
    notifyMaintenance: true,
    notifySecurity: true,
    notifyNewsletter: false
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Notification settings saved:', notifications);
  };

  return (
    <div className="bg-gray-100 text-gray-800 app-layout">
      <Header />
      <Sidebar activeTab="/settings" />
      
      <main className="ml-60 flex-1 bg-white overflow-y-auto">
        <div className="max-w-3xl mx-auto p-6 py-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">通知設定</h1>
          <p className="text-sm text-gray-600 mb-10">
            アプリケーションからの各種通知（主にメール）の受け取り方法を設定します。
          </p>

          <form onSubmit={handleSubmit} className="space-y-12">

            <section aria-labelledby="offer-notifications-heading">
              <div className="bg-slate-50 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="offer-notifications-heading" className="text-xl font-semibold leading-7 text-gray-900">オファー文面関連</h2>
                  <p className="mt-1 text-sm text-gray-500">オファー文面の作成や送受信に関する通知設定です。</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:p-6">
                  <fieldset className="space-y-6">
                    <legend className="sr-only">オファー文面関連の通知</legend>
                    <div className="relative flex items-start">
                      <div className="flex h-6 items-center">
                        <input 
                          id="notifyOfferGenerated" 
                          name="notifyOfferGenerated" 
                          type="checkbox" 
                          checked={notifications.notifyOfferGenerated}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                        />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label htmlFor="notifyOfferGenerated" className="font-medium text-gray-900">オファー文面生成完了</label>
                        <p className="text-gray-500">AIによるオファー文面の生成が完了した際にメールで通知を受け取る。</p>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="flex h-6 items-center">
                        <input 
                          id="notifyOfferOpened" 
                          name="notifyOfferOpened" 
                          type="checkbox" 
                          checked={notifications.notifyOfferOpened}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                        />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label htmlFor="notifyOfferOpened" className="font-medium text-gray-900">オファー開封 <span className="text-xs text-gray-400">(将来機能)</span></label>
                        <p className="text-gray-500">送信したオファーが候補者に開封された際にメールで通知を受け取る。</p>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="flex h-6 items-center">
                        <input 
                          id="notifyOfferReplied" 
                          name="notifyOfferReplied" 
                          type="checkbox" 
                          checked={notifications.notifyOfferReplied}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                        />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label htmlFor="notifyOfferReplied" className="font-medium text-gray-900">オファーへの返信 <span className="text-xs text-gray-400">(将来機能)</span></label>
                        <p className="text-gray-500">候補者からオファーに対して返信があった際にメールで通知を受け取る。</p>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </section>

            <section aria-labelledby="system-notifications-heading">
              <div className="bg-slate-50 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="system-notifications-heading" className="text-xl font-semibold leading-7 text-gray-900">システム・その他</h2>
                  <p className="mt-1 text-sm text-gray-500">システムメンテナンスやアカウントに関する重要な通知設定です。</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:p-6">
                  <fieldset className="space-y-6">
                    <legend className="sr-only">システム関連の通知</legend>
                    <div className="relative flex items-start">
                      <div className="flex h-6 items-center">
                        <input 
                          id="notifyMaintenance" 
                          name="notifyMaintenance" 
                          type="checkbox" 
                          checked={notifications.notifyMaintenance}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                        />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label htmlFor="notifyMaintenance" className="font-medium text-gray-900">メンテナンス情報</label>
                        <p className="text-gray-500">重要なシステムメンテナンスやアップデートに関する情報をメールで受け取る。</p>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="flex h-6 items-center">
                        <input 
                          id="notifySecurity" 
                          name="notifySecurity" 
                          type="checkbox" 
                          checked={notifications.notifySecurity}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                        />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label htmlFor="notifySecurity" className="font-medium text-gray-900">セキュリティアラート</label>
                        <p className="text-gray-500">アカウントに関する重要なセキュリティ通知（不審なログイン試行など）をメールで受け取る。</p>
                      </div>
                    </div>
                    <div className="relative flex items-start">
                      <div className="flex h-6 items-center">
                        <input 
                          id="notifyNewsletter" 
                          name="notifyNewsletter" 
                          type="checkbox" 
                          checked={notifications.notifyNewsletter}
                          onChange={handleCheckboxChange}
                          className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-600"
                        />
                      </div>
                      <div className="ml-3 text-sm leading-6">
                        <label htmlFor="notifyNewsletter" className="font-medium text-gray-900">ニュースレター・ヒント <span className="text-xs text-gray-400">(任意)</span></label>
                        <p className="text-gray-500">新機能の紹介や、より効果的なオファー作成のヒントなどをメールで受け取る。</p>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </section>

            <div className="pt-8 mt-6 flex justify-end">
              <button 
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                通知設定を保存
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}