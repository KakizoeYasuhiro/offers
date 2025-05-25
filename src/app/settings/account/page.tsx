'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function AccountSettingsPage() {
  const [profileData, setProfileData] = useState({
    userName: '山田 太郎',
    userEmail: 'taro.yamada@example.com'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password change requested');
  };

  return (
    <div className="bg-gray-100 text-gray-800 app-layout">
      <Header />
      <Sidebar activeTab="/settings" />
      
      <main className="ml-60 flex-1 bg-white overflow-y-auto">
        <div className="max-w-3xl mx-auto p-6 py-10"> 
          <h1 className="text-3xl font-bold text-gray-800 mb-10">アカウント設定</h1>

          <section aria-labelledby="profile-settings-heading" className="mb-12">
            <form onSubmit={handleProfileSubmit}>
              <div className="bg-slate-50 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="profile-settings-heading" className="text-xl font-semibold leading-7 text-gray-900">プロフィール情報</h2>
                  <p className="mt-1 text-sm text-gray-500">アカウントに紐づく基本情報を確認・編集できます。</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:p-6">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">氏名</label>
                      <div className="mt-2">
                        <input 
                          type="text" 
                          name="userName" 
                          id="userName" 
                          autoComplete="name" 
                          value={profileData.userName}
                          onChange={handleProfileChange}
                          className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="userEmail" className="block text-sm font-medium leading-6 text-gray-900">メールアドレス</label>
                      <div className="mt-2">
                        <input 
                          type="email" 
                          name="userEmail" 
                          id="userEmail" 
                          autoComplete="email" 
                          value={profileData.userEmail} 
                          readOnly
                          className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 bg-gray-100 cursor-not-allowed sm:text-sm sm:leading-6"
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">メールアドレスの変更をご希望の場合は、システム管理者にお問い合わせください。</p>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button type="submit" className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 transition-colors">
                      プロフィールを保存
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </section>

          <section aria-labelledby="security-settings-heading">
            <form onSubmit={handlePasswordSubmit}>
              <div className="bg-slate-50 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="security-settings-heading" className="text-xl font-semibold leading-7 text-gray-900">パスワード変更</h2>
                  <p className="mt-1 text-sm text-gray-500">セキュリティのため、定期的なパスワードの変更を推奨します。</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:p-6">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium leading-6 text-gray-900">現在のパスワード</label>
                      <div className="mt-2">
                        <input 
                          type="password" 
                          name="currentPassword" 
                          id="currentPassword" 
                          autoComplete="current-password"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium leading-6 text-gray-900">新しいパスワード</label>
                      <div className="mt-2">
                        <input 
                          type="password" 
                          name="newPassword" 
                          id="newPassword" 
                          autoComplete="new-password"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <p className="mt-2 text-xs text-gray-500">8文字以上で、英数字と記号を組み合わせることを推奨します。</p>
                    </div>
                    <div>
                      <label htmlFor="confirmNewPassword" className="block text-sm font-medium leading-6 text-gray-900">新しいパスワード (確認)</label>
                      <div className="mt-2">
                        <input 
                          type="password" 
                          name="confirmNewPassword" 
                          id="confirmNewPassword" 
                          autoComplete="new-password"
                          value={passwordData.confirmNewPassword}
                          onChange={handlePasswordChange}
                          className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button type="submit" className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-colors">
                      パスワードを変更
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}