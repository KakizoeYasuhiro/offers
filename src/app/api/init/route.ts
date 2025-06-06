import { NextRequest, NextResponse } from 'next/server';
import { initDatabase, sql } from '@/lib/db';

// POST /api/init - Initialize database tables and seed data
export async function POST(request: NextRequest) {
  try {
    // Initialize database tables
    await initDatabase();

    // Seed some initial data
    await seedInitialData();

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to initialize database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function seedInitialData() {
  try {
    // Check if data already exists
    const existingJobs = await sql`SELECT COUNT(*) as count FROM jobs`;
    if (parseInt(existingJobs[0].count) > 0) {
      console.log('Data already exists, skipping seed');
      return;
    }

    // Seed jobs
    const jobs = [
      { job_id: 'JID-1001', client_name: '株式会社テックリード', job_title: 'フロントエンドエンジニア', job_category: 'エンジニア', salary_range: '600～800万' },
      { job_id: 'JID-1002', client_name: '株式会社ヒューマンセントリック', job_title: '人事スペシャリスト', job_category: '人事', salary_range: '500～700万' },
      { job_id: 'JID-1003', client_name: '株式会社オフィスサポート', job_title: '総務マネージャー候補', job_category: '総務', salary_range: '550～750万' },
      { job_id: 'JID-1004', client_name: '株式会社データドライブ', job_title: 'バックエンドデベロッパー (Java)', job_category: 'エンジニア', salary_range: '700～900万' },
      { job_id: 'JID-1005', client_name: '株式会社クリエイティブソリューションズ', job_title: 'UI/UXデザイナー', job_category: 'エンジニア', salary_range: '500～750万' },
    ];

    for (const job of jobs) {
      await sql`
        INSERT INTO jobs (job_id, client_name, job_title, job_category, salary_range)
        VALUES (${job.job_id}, ${job.client_name}, ${job.job_title}, ${job.job_category}, ${job.salary_range})
      `;
    }

    // Seed offers
    const offers = [
      { offer_id: 'OFF-001', job_name: 'フロントエンドエンジニア', candidate_name: '山田 花子', status: '下書き', subject: '【株式会社テックリード】フロントエンドエンジニアのポジションに関するご案内', job_id: 'JID-1001' },
      { offer_id: 'OFF-002', job_name: '人事スペシャリスト', candidate_name: '佐藤 太郎', status: '送信済', subject: '【株式会社ヒューマンセントリック】人事スペシャリストの件', job_id: 'JID-1002' },
      { offer_id: 'OFF-003', job_name: 'バックエンドデベロッパー (Java)', candidate_name: '高橋 良子', status: '下書き', subject: 'Javaバックエンド開発ポジションのご提案 - 株式会社データドライブ', job_id: 'JID-1004' },
    ];

    for (const offer of offers) {
      await sql`
        INSERT INTO offers (offer_id, job_name, candidate_name, status, subject, job_id)
        VALUES (${offer.offer_id}, ${offer.job_name}, ${offer.candidate_name}, ${offer.status}, ${offer.subject}, ${offer.job_id})
      `;
    }

    // Seed rules
    const rules = [
      { rule_id: 'RUL-001', scope: '全体', target: '全ての求職者', summary: '初回メッセージにパーソナライズされた挨拶文を自動挿入するルール。返信率向上を目的とする。' },
      { rule_id: 'RUL-002', scope: '職種', target: 'エンジニア', summary: 'エンジニア職の候補者に対し、技術スタックやプロジェクト経験を強調したオファー文面を生成する。' },
      { rule_id: 'RUL-003', scope: '顧客', target: '株式会社テックリード', summary: '株式会社テックリードの求人応募者へ、企業の成長性や文化に関する情報を追加で提供する。' },
    ];

    for (const rule of rules) {
      await sql`
        INSERT INTO rules (rule_id, scope, target, summary)
        VALUES (${rule.rule_id}, ${rule.scope}, ${rule.target}, ${rule.summary})
      `;
    }

    console.log('Initial data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
}