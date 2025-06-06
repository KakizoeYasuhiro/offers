// src/app/page.tsx (または app/page.tsx)

import { neon,neonConfig } from '@neondatabase/serverless';
import { revalidatePath } from 'next/cache'; // データの再検証用に追記すると良い

// NeonのWebSocket接続を無効にする（Vercel Edge Functionsなどの環境で推奨）
//neonConfig.wsProxy = (host, port) => `<span class="math-inline">\{host\}\:</span>{port}/api/v1`; // This might be for a specific proxy setup
neonConfig.fetchConnectionCache = true; // Connection Cachingを有効に
neonConfig.webSocketConstructor = undefined; // WebSocketを無効化


// 既存のPageコンポーネントがある場合は、それを編集するか、
// このコードをPageコンポーネントとして定義します。
export default function Page() {
  async function create(formData: FormData) {
    'use server';
    console.log('Server Action "create" called.');
    // ... (DATABASE_URL, Neon SQL object初期化のログは既に出ていると仮定)

    let sql;
    try {
        console.log('Attempting to initialize Neon SQL object...');
        sql = neon(process.env.DATABASE_URL!);
        console.log('Neon SQL object initialized.');
    } catch (error) {
        console.error('Error initializing Neon SQL object:', error);
        return;
    }

    try {
        console.log('Attempting simple query with initialized SQL object...');
        const time = await sql`SELECT NOW();`;
        console.log('DB time:', time); // ★これは出ている

        // ▼▼▼ ここから重点的にログを追加 ▼▼▼
        const commentValue = formData.get('comment');
        console.log('Raw formData.get("comment"):', commentValue); // 取得した生の値を表示
        console.log('Type of commentValue:', typeof commentValue); // 型を確認

        if (commentValue === null) {
            console.log('formData.get("comment") returned null.');
            return; // nullならここで終了
        }

        const comment = String(commentValue); // 明示的に文字列に変換 (as string の代わりに)
        console.log('Converted comment string:', comment);
        console.log('Comment length:', comment.length);
        console.log('Comment trimmed length:', comment.trim().length);


       // ...
       if (comment && comment.trim() !== '') {
        console.log('Comment is valid, attempting to insert...');
        // 修正箇所: タグ付きテンプレートリテラルに変更
        await sql`INSERT INTO comments (comment) VALUES (${comment})`;
        console.log('Comment inserted successfully (presumably):', comment);
        revalidatePath('/');
        console.log('Path revalidated.');
    } else {
    // ...
            console.log('Comment was empty or whitespace. Not inserting.'); // ★このログが出るか？
        }
        // ▲▲▲ ここまで重点的にログを追加 ▲▲▲

    } catch (error) {
        console.error('Error during database operation or revalidation:', error);
        if (error instanceof Error) {
            console.error('Operation Error name:', error.name);
            console.error('Operation Error message:', error.message);
            console.error('Operation Error stack:', error.stack);
        }
    }
}


  // コメント一覧を表示する機能も追加すると、動作確認がしやすいです（任意）
  // async function getComments() {
  //   if (!process.env.DATABASE_URL) {
  //     return [];
  //   }
  //   const sql = neon(process.env.DATABASE_URL);
  //   try {
  //     const result = await sql('SELECT comment FROM comments ORDER BY id DESC LIMIT 5');
  //     return result.map(row => row.comment);
  //   } catch (error) {
  //     console.error('Error fetching comments:', error);
  //     return [];
  //   }
  // }
  // const comments = await getComments(); // Server Componentなので直接awaitできる

  return (
    <div className="container mx-auto p-4 pt-10"> {/* スタイル調整 */}
      <h1 className="text-2xl font-bold mb-4">Server Action Form Test</h1>
      <form action={create} className="space-y-4">
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            コメントを入力
          </label>
          <input
            type="text"
            id="comment"
            placeholder="write a comment"
            name="comment"
            required // 入力を必須にする（任意）
            className="mt-1 block w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          送信 (Submit)
        </button>
      </form>

      {/* 任意: 投稿されたコメント一覧を表示 */}
      {/* <div className="mt-8">
        <h2 className="text-xl font-semibold">最近のコメント</h2>
        {comments.length > 0 ? (
          <ul className="list-disc pl-5 mt-2 space-y-1">
            {comments.map((comment, index) => (
              <li key={index} className="text-gray-700">{comment}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">まだコメントはありません。</p>
        )}
      </div> */}
    </div>
  );
}