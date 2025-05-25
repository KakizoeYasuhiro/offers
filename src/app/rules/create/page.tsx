'use client';

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function RuleCreatePage() {
  const [ruleName, setRuleName] = useState('');
  const [scope, setScope] = useState('');
  const [target, setTarget] = useState('');
  const [ruleDetails, setRuleDetails] = useState('');
  const [rulePriority, setRulePriority] = useState('');
  const [ruleEnabled, setRuleEnabled] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Rule registration:', {
      ruleName,
      scope,
      target,
      ruleDetails,
      rulePriority,
      ruleEnabled
    });
    // ここで実際の登録処理を行う
  };

  return (
    <div className="bg-gray-100 text-gray-800 app-layout">
      <Header />
      <Sidebar activeTab="/rules" />
      
      <main className="ml-60 flex-1 bg-white overflow-y-auto">
        <div className="max-w-3xl mx-auto p-6 py-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">オファー作成ルール登録</h1>

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label htmlFor="rule_name" className="block text-sm font-medium text-gray-700 mb-1.5">ルール名</label>
              <input
                type="text"
                name="rule_name"
                id="rule_name"
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                placeholder="例: 経験3年以上のエンジニア向け挨拶強化"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="scope" className="block text-sm font-medium text-gray-700 mb-1.5">適用範囲</label>
              <select
                id="scope"
                name="scope"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              >
                <option value="">選択してください</option>
                <option value="全体">全体</option>
                <option value="職種">職種</option>
                <option value="顧客">顧客</option>
                <option value="求人">求人</option>
              </select>
            </div>

            <div>
              <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-1.5">対象</label>
              <input
                type="text"
                name="target"
                id="target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="適用範囲に応じた対象を入力"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-gray-400"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                適用範囲で「職種」を選んだ場合は職種名（例: エンジニア）、「顧客」なら顧客名やID、「求人」なら求人名やIDを入力します。「全体」の場合は入力不要か、「全て」等と記述します。
              </p>
            </div>

            <div>
              <label htmlFor="rule_details" className="block text-sm font-medium text-gray-700 mb-1.5">ルール詳細 (AIへの指示内容)</label>
              <textarea
                id="rule_details"
                name="rule_details"
                rows={8}
                value={ruleDetails}
                onChange={(e) => setRuleDetails(e.target.value)}
                placeholder="例: 候補者の経験年数が3年以上の場合、オファー文面の冒頭に「〇〇様のご経歴の中でも特に素晴らしいと感じましたのは、△△におけるご経験です。弊社では…」といった形で、具体的な強みに触れる一文を挿入してください。また、その際はやや丁寧な言葉遣いを心がけてください。"
                className="mt-1 block w-full px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-gray-400"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                この内容はAIがオファー文面を自動生成する際の指示となります。具体的かつ明確に記述してください。
              </p>
            </div>
            
            <div>
              <label htmlFor="rule_priority" className="block text-sm font-medium text-gray-700 mb-1.5">優先度 (任意)</label>
              <input
                type="number"
                name="rule_priority"
                id="rule_priority"
                value={rulePriority}
                onChange={(e) => setRulePriority(e.target.value)}
                placeholder="例: 1 (数値が小さいほど高優先)"
                className="mt-1 block w-1/3 px-3 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-gray-400"
              />
              <p className="mt-1.5 text-xs text-gray-500">
                複数のルールが適用可能な場合に、どのルールを優先的に使用するかを指定します。未入力の場合、標準の優先度で処理されます。
              </p>
            </div>

            <div className="flex items-center pt-2">
              <input
                id="rule_enabled"
                name="rule_enabled"
                type="checkbox"
                checked={ruleEnabled}
                onChange={(e) => setRuleEnabled(e.target.checked)}
                className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
              />
              <label htmlFor="rule_enabled" className="ml-2 block text-sm text-gray-900">
                このルールを有効にする
              </label>
            </div>

            <div className="pt-8">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                ルールを登録する
              </button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}