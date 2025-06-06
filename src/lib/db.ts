import { neon } from '@neondatabase/serverless';
import type { 
  Job, 
  Offer, 
  Rule, 
  CreateJobRequest, 
  CreateOfferRequest, 
  CreateRuleRequest,
  UpdateJobRequest,
  UpdateOfferRequest,
  UpdateRuleRequest,
  JobQueryParams,
  OfferQueryParams,
  RuleQueryParams,
  PaginatedResponse
} from '@/types';

const sql = neon(process.env.DATABASE_URL!);

// Database initialization
export async function initializeDatabase() {
  try {
    // Create jobs table
    await sql`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        company VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        salary_range VARCHAR(100) NOT NULL,
        location VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        requirements TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create offers table
    await sql`
      CREATE TABLE IF NOT EXISTS offers (
        id SERIAL PRIMARY KEY,
        job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
        candidate VARCHAR(255) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Create rules table
    await sql`
      CREATE TABLE IF NOT EXISTS rules (
        id SERIAL PRIMARY KEY,
        scope VARCHAR(255) NOT NULL,
        target VARCHAR(255) NOT NULL,
        overview VARCHAR(500) NOT NULL,
        details TEXT NOT NULL,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Insert sample data
    await sql`
      INSERT INTO jobs (company, position, salary_range, location, description, requirements) 
      VALUES 
        ('TechCorp', 'Senior Frontend Developer', '800万円〜1200万円', '東京', 'Reactを使った大規模Webアプリケーションの開発', 'React, TypeScript経験3年以上'),
        ('StartupInc', 'Full Stack Engineer', '600万円〜1000万円', 'リモート', 'スタートアップでのフルスタック開発', 'JavaScript, Node.js, Database経験'),
        ('BigTech', 'DevOps Engineer', '900万円〜1400万円', '大阪', 'クラウドインフラの構築・運用', 'AWS, Docker, Kubernetes経験')
      ON CONFLICT DO NOTHING
    `;

    await sql`
      INSERT INTO offers (job_id, candidate, subject, message, status)
      VALUES 
        (1, '山田太郎', '面接のご案内', 'この度は弊社の求人にご応募いただき、ありがとうございます。', 'pending'),
        (2, '佐藤花子', '選考結果のご連絡', '書類選考の結果をお知らせいたします。', 'accepted'),
        (3, '田中次郎', '追加面接のお願い', '最終面接の日程調整をさせていただきたく。', 'pending')
      ON CONFLICT DO NOTHING
    `;

    await sql`
      INSERT INTO rules (scope, target, overview, details)
      VALUES 
        ('採用プロセス', '全職種', '面接プロセスの標準化', '一次面接、技術面接、最終面接の3段階で実施する。各面接では統一された評価基準を使用し、候補者の技術力と企業文化への適合性を評価する。'),
        ('給与体系', 'エンジニア', '給与決定の透明性確保', '職級に応じた基本給と、技術力・貢献度に基づく評価給で構成。年2回の評価により昇給の機会を提供し、市場価値に応じた競争力のある報酬を実現する。'),
        ('リモートワーク', '全職種', '柔軟な働き方の推進', 'フルリモート、ハイブリッド、オフィス勤務から選択可能。コミュニケーションツールを活用し、場所に依存しない効率的な業務実行を支援する。')
      ON CONFLICT DO NOTHING
    `;

    return { success: true, message: 'Database initialized successfully' };
  } catch (error) {
    console.error('Database initialization error:', error);
    throw new Error(`Failed to initialize database: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Jobs CRUD operations
export async function getJobs(params: JobQueryParams = {}): Promise<PaginatedResponse<Job>> {
  const { page = 1, limit = 10, status, company, position } = params;
  const offset = (page - 1) * limit;

  let whereConditions = [];
  let queryParams: (string | number)[] = [limit, offset];
  let paramIndex = 3;

  if (status) {
    whereConditions.push(`status = $${paramIndex}`);
    queryParams.push(status);
    paramIndex++;
  }

  if (company) {
    whereConditions.push(`company ILIKE $${paramIndex}`);
    queryParams.push(`%${company}%`);
    paramIndex++;
  }

  if (position) {
    whereConditions.push(`position ILIKE $${paramIndex}`);
    queryParams.push(`%${position}%`);
    paramIndex++;
  }

  const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

  const countResult = await sql`SELECT COUNT(*) as total FROM jobs ${whereClause ? sql.unsafe(whereClause.replace(/\$\d+/g, (match) => queryParams[parseInt(match.slice(1)) - 1] as string)) : sql``}`;
  const total = parseInt(countResult[0].total);

  const jobs = await sql`
    SELECT 
      id, company, position, salary_range as "salaryRange", location, 
      description, requirements, status, 
      created_at as "createdAt", updated_at as "updatedAt"
    FROM jobs 
    ${whereClause ? sql.unsafe(whereClause.replace(/\$\d+/g, (match) => queryParams[parseInt(match.slice(1)) - 1] as string)) : sql``}
    ORDER BY created_at DESC 
    LIMIT $1 OFFSET $2
  `;

  return {
    data: jobs as Job[],
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export async function getJobById(id: number): Promise<Job | null> {
  const result = await sql`
    SELECT 
      id, company, position, salary_range as "salaryRange", location, 
      description, requirements, status, 
      created_at as "createdAt", updated_at as "updatedAt"
    FROM jobs 
    WHERE id = ${id}
  `;
  
  return result.length > 0 ? result[0] as Job : null;
}

export async function createJob(job: CreateJobRequest): Promise<Job> {
  const result = await sql`
    INSERT INTO jobs (company, position, salary_range, location, description, requirements)
    VALUES (${job.company}, ${job.position}, ${job.salaryRange}, ${job.location}, ${job.description}, ${job.requirements})
    RETURNING id, company, position, salary_range as "salaryRange", location, 
             description, requirements, status, 
             created_at as "createdAt", updated_at as "updatedAt"
  `;
  
  return result[0] as Job;
}

export async function updateJob(id: number, updates: UpdateJobRequest): Promise<Job | null> {
  const setClause = Object.keys(updates)
    .map((key, index) => {
      const dbKey = key === 'salaryRange' ? 'salary_range' : key;
      return `${dbKey} = $${index + 2}`;
    })
    .join(', ');

  if (!setClause) {
    return getJobById(id);
  }

  const result = await sql`
    UPDATE jobs 
    SET ${sql.unsafe(setClause)}, updated_at = NOW()
    WHERE id = $1
    RETURNING id, company, position, salary_range as "salaryRange", location, 
             description, requirements, status, 
             created_at as "createdAt", updated_at as "updatedAt"
  `;

  return result.length > 0 ? result[0] as Job : null;
}

export async function deleteJob(id: number): Promise<boolean> {
  const result = await sql`DELETE FROM jobs WHERE id = ${id}`;
  return result.length > 0;
}

// Offers CRUD operations  
export async function getOffers(params: OfferQueryParams = {}): Promise<PaginatedResponse<Offer>> {
  const { page = 1, limit = 10, status, jobId, candidate } = params;
  const offset = (page - 1) * limit;

  let whereConditions = [];
  let queryParams: (string | number)[] = [limit, offset];
  let paramIndex = 3;

  if (status) {
    whereConditions.push(`status = $${paramIndex}`);
    queryParams.push(status);
    paramIndex++;
  }

  if (jobId) {
    whereConditions.push(`job_id = $${paramIndex}`);
    queryParams.push(jobId);
    paramIndex++;
  }

  if (candidate) {
    whereConditions.push(`candidate ILIKE $${paramIndex}`);
    queryParams.push(`%${candidate}%`);
    paramIndex++;
  }

  const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

  const countResult = await sql`SELECT COUNT(*) as total FROM offers ${whereClause ? sql.unsafe(whereClause.replace(/\$\d+/g, (match) => queryParams[parseInt(match.slice(1)) - 1] as string)) : sql``}`;
  const total = parseInt(countResult[0].total);

  const offers = await sql`
    SELECT 
      id, job_id as "jobId", candidate, status, subject, message,
      created_at as "createdAt", updated_at as "updatedAt"
    FROM offers 
    ${whereClause ? sql.unsafe(whereClause.replace(/\$\d+/g, (match) => queryParams[parseInt(match.slice(1)) - 1] as string)) : sql``}
    ORDER BY created_at DESC 
    LIMIT $1 OFFSET $2
  `;

  return {
    data: offers as Offer[],
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export async function getOfferById(id: number): Promise<Offer | null> {
  const result = await sql`
    SELECT 
      id, job_id as "jobId", candidate, status, subject, message,
      created_at as "createdAt", updated_at as "updatedAt"
    FROM offers 
    WHERE id = ${id}
  `;
  
  return result.length > 0 ? result[0] as Offer : null;
}

export async function createOffer(offer: CreateOfferRequest): Promise<Offer> {
  const result = await sql`
    INSERT INTO offers (job_id, candidate, subject, message)
    VALUES (${offer.jobId}, ${offer.candidate}, ${offer.subject}, ${offer.message})
    RETURNING id, job_id as "jobId", candidate, status, subject, message,
             created_at as "createdAt", updated_at as "updatedAt"
  `;
  
  return result[0] as Offer;
}

export async function updateOffer(id: number, updates: UpdateOfferRequest): Promise<Offer | null> {
  const setClause = Object.keys(updates)
    .map((key, index) => {
      const dbKey = key === 'jobId' ? 'job_id' : key;
      return `${dbKey} = $${index + 2}`;
    })
    .join(', ');

  if (!setClause) {
    return getOfferById(id);
  }

  const result = await sql`
    UPDATE offers 
    SET ${sql.unsafe(setClause)}, updated_at = NOW()
    WHERE id = $1
    RETURNING id, job_id as "jobId", candidate, status, subject, message,
             created_at as "createdAt", updated_at as "updatedAt"
  `;

  return result.length > 0 ? result[0] as Offer : null;
}

export async function deleteOffer(id: number): Promise<boolean> {
  const result = await sql`DELETE FROM offers WHERE id = ${id}`;
  return result.length > 0;
}

// Rules CRUD operations
export async function getRules(params: RuleQueryParams = {}): Promise<PaginatedResponse<Rule>> {
  const { page = 1, limit = 10, isActive, scope } = params;
  const offset = (page - 1) * limit;

  let whereConditions = [];
  let queryParams: (string | number | boolean)[] = [limit, offset];
  let paramIndex = 3;

  if (isActive !== undefined) {
    whereConditions.push(`is_active = $${paramIndex}`);
    queryParams.push(isActive);
    paramIndex++;
  }

  if (scope) {
    whereConditions.push(`scope ILIKE $${paramIndex}`);
    queryParams.push(`%${scope}%`);
    paramIndex++;
  }

  const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

  const countResult = await sql`SELECT COUNT(*) as total FROM rules ${whereClause ? sql.unsafe(whereClause.replace(/\$\d+/g, (match) => queryParams[parseInt(match.slice(1)) - 1] as string)) : sql``}`;
  const total = parseInt(countResult[0].total);

  const rules = await sql`
    SELECT 
      id, scope, target, overview, details, is_active as "isActive",
      created_at as "createdAt", updated_at as "updatedAt"
    FROM rules 
    ${whereClause ? sql.unsafe(whereClause.replace(/\$\d+/g, (match) => queryParams[parseInt(match.slice(1)) - 1] as string)) : sql``}
    ORDER BY created_at DESC 
    LIMIT $1 OFFSET $2
  `;

  return {
    data: rules as Rule[],
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
}

export async function getRuleById(id: number): Promise<Rule | null> {
  const result = await sql`
    SELECT 
      id, scope, target, overview, details, is_active as "isActive",
      created_at as "createdAt", updated_at as "updatedAt"
    FROM rules 
    WHERE id = ${id}
  `;
  
  return result.length > 0 ? result[0] as Rule : null;
}

export async function createRule(rule: CreateRuleRequest): Promise<Rule> {
  const result = await sql`
    INSERT INTO rules (scope, target, overview, details)
    VALUES (${rule.scope}, ${rule.target}, ${rule.overview}, ${rule.details})
    RETURNING id, scope, target, overview, details, is_active as "isActive",
             created_at as "createdAt", updated_at as "updatedAt"
  `;
  
  return result[0] as Rule;
}

export async function updateRule(id: number, updates: UpdateRuleRequest): Promise<Rule | null> {
  const setClause = Object.keys(updates)
    .map((key, index) => {
      const dbKey = key === 'isActive' ? 'is_active' : key;
      return `${dbKey} = $${index + 2}`;
    })
    .join(', ');

  if (!setClause) {
    return getRuleById(id);
  }

  const result = await sql`
    UPDATE rules 
    SET ${sql.unsafe(setClause)}, updated_at = NOW()
    WHERE id = $1
    RETURNING id, scope, target, overview, details, is_active as "isActive",
             created_at as "createdAt", updated_at as "updatedAt"
  `;

  return result.length > 0 ? result[0] as Offer : null;
}

export async function deleteRule(id: number): Promise<boolean> {
  const result = await sql`DELETE FROM rules WHERE id = ${id}`;
  return result.length > 0;
}