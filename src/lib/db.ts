import { neon } from '@neondatabase/serverless';
import type { Job, Offer, Rule, PaginationOptions } from '@/types';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sql = neon(process.env.DATABASE_URL);

// Database initialization
export async function initializeDatabase(): Promise<void> {
  // Create jobs table
  await sql`
    CREATE TABLE IF NOT EXISTS jobs (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      location TEXT NOT NULL,
      salary_range TEXT NOT NULL,
      description TEXT NOT NULL,
      requirements TEXT NOT NULL,
      employment_type TEXT NOT NULL CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'internship')),
      experience_level TEXT NOT NULL CHECK (experience_level IN ('entry', 'mid', 'senior', 'executive')),
      remote_option BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  // Create offers table
  await sql`
    CREATE TABLE IF NOT EXISTS offers (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      job_id TEXT NOT NULL,
      candidate_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'interviewed', 'offered', 'accepted', 'rejected')),
      cover_letter TEXT NOT NULL,
      resume_url TEXT,
      notes TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  // Create rules table
  await sql`
    CREATE TABLE IF NOT EXISTS rules (
      id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('screening', 'evaluation', 'notification', 'workflow')),
      conditions JSONB NOT NULL DEFAULT '{}',
      actions JSONB NOT NULL DEFAULT '{}',
      is_active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  // Insert sample data
  await sql`
    INSERT INTO jobs (title, company, location, salary_range, description, requirements, employment_type, experience_level, remote_option)
    SELECT 'Software Engineer', 'Tech Corp', 'Tokyo', '¥5,000,000 - ¥8,000,000', 'Full-stack development role', 'React, Node.js, TypeScript', 'full-time', 'mid', true
    WHERE NOT EXISTS (SELECT 1 FROM jobs WHERE title = 'Software Engineer' AND company = 'Tech Corp')
  `;

  await sql`
    INSERT INTO offers (job_id, candidate_name, email, phone, cover_letter, status)
    SELECT (SELECT id FROM jobs LIMIT 1), '田中太郎', 'tanaka@example.com', '090-1234-5678', '応募させていただきます。', 'pending'
    WHERE EXISTS (SELECT 1 FROM jobs) AND NOT EXISTS (SELECT 1 FROM offers WHERE candidate_name = '田中太郎')
  `;

  await sql`
    INSERT INTO rules (name, description, type, conditions, actions, is_active)
    SELECT 'Auto Screen', 'Automatically screen applications', 'screening', '{"min_experience": 2}', '{"send_email": true}', true
    WHERE NOT EXISTS (SELECT 1 FROM rules WHERE name = 'Auto Screen')
  `;
}

// Jobs operations
export async function getJobs(options: PaginationOptions, filters: Record<string, unknown> = {}): Promise<{ jobs: Job[]; total: number }> {
  let whereClause = '';
  const params: unknown[] = [];
  let paramIndex = 1;

  if (filters.company) {
    whereClause += `${whereClause ? ' AND' : 'WHERE'} company ILIKE $${paramIndex}`;
    params.push(`%${filters.company}%`);
    paramIndex++;
  }

  if (filters.location) {
    whereClause += `${whereClause ? ' AND' : 'WHERE'} location ILIKE $${paramIndex}`;
    params.push(`%${filters.location}%`);
    paramIndex++;
  }

  if (filters.employment_type) {
    whereClause += `${whereClause ? ' AND' : 'WHERE'} employment_type = $${paramIndex}`;
    params.push(filters.employment_type);
    paramIndex++;
  }

  const countResult = await sql`SELECT COUNT(*) as count FROM jobs ${whereClause}`;
  const total = parseInt(countResult[0].count as string);

  const jobs = await sql`
    SELECT * FROM jobs 
    ${whereClause}
    ORDER BY created_at DESC 
    LIMIT ${options.limit} OFFSET ${options.offset}
  `;

  return { jobs: jobs as Job[], total };
}

export async function getJobById(id: string): Promise<Job | null> {
  const result = await sql`SELECT * FROM jobs WHERE id = ${id}`;
  return result[0] as Job || null;
}

export async function createJob(job: Omit<Job, 'id' | 'created_at' | 'updated_at'>): Promise<Job> {
  const result = await sql`
    INSERT INTO jobs (title, company, location, salary_range, description, requirements, employment_type, experience_level, remote_option)
    VALUES (${job.title}, ${job.company}, ${job.location}, ${job.salary_range}, ${job.description}, ${job.requirements}, ${job.employment_type}, ${job.experience_level}, ${job.remote_option})
    RETURNING *
  `;
  return result[0] as Job;
}

export async function updateJob(id: string, job: Partial<Omit<Job, 'id' | 'created_at' | 'updated_at'>>): Promise<Job | null> {
  const updates = Object.entries(job).filter(([, value]) => value !== undefined);
  if (updates.length === 0) return null;

  const setClauses = updates.map(([key], index) => `${key} = $${index + 2}`).join(', ');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _values = [id, ...updates.map(([, value]) => value)];

  const result = await sql`
    UPDATE jobs 
    SET ${setClauses}, updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `;
  return result[0] as Job || null;
}

export async function deleteJob(id: string): Promise<boolean> {
  const result = await sql`DELETE FROM jobs WHERE id = ${id}`;
  return result.length > 0;
}

// Offers operations
export async function getOffers(options: PaginationOptions, filters: Record<string, unknown> = {}): Promise<{ offers: Offer[]; total: number }> {
  let whereClause = '';
  const params: unknown[] = [];
  let paramIndex = 1;

  if (filters.job_id) {
    whereClause += `${whereClause ? ' AND' : 'WHERE'} job_id = $${paramIndex}`;
    params.push(filters.job_id);
    paramIndex++;
  }

  if (filters.status) {
    whereClause += `${whereClause ? ' AND' : 'WHERE'} status = $${paramIndex}`;
    params.push(filters.status);
    paramIndex++;
  }

  const countResult = await sql`SELECT COUNT(*) as count FROM offers ${whereClause}`;
  const total = parseInt(countResult[0].count as string);

  const offers = await sql`
    SELECT * FROM offers 
    ${whereClause}
    ORDER BY created_at DESC 
    LIMIT ${options.limit} OFFSET ${options.offset}
  `;

  return { offers: offers as Offer[], total };
}

export async function getOfferById(id: string): Promise<Offer | null> {
  const result = await sql`SELECT * FROM offers WHERE id = ${id}`;
  return result[0] as Offer || null;
}

export async function createOffer(offer: Omit<Offer, 'id' | 'created_at' | 'updated_at'>): Promise<Offer> {
  const result = await sql`
    INSERT INTO offers (job_id, candidate_name, email, phone, status, cover_letter, resume_url, notes)
    VALUES (${offer.job_id}, ${offer.candidate_name}, ${offer.email}, ${offer.phone}, ${offer.status || 'pending'}, ${offer.cover_letter}, ${offer.resume_url || null}, ${offer.notes || null})
    RETURNING *
  `;
  return result[0] as Offer;
}

export async function updateOffer(id: string, offer: Partial<Omit<Offer, 'id' | 'created_at' | 'updated_at'>>): Promise<Offer | null> {
  const updates = Object.entries(offer).filter(([, value]) => value !== undefined);
  if (updates.length === 0) return null;

  const setClauses = updates.map(([key], index) => `${key} = $${index + 2}`).join(', ');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _values = [id, ...updates.map(([, value]) => value)];

  const result = await sql`
    UPDATE offers 
    SET ${setClauses}, updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `;
  return result[0] as Offer || null;
}

export async function deleteOffer(id: string): Promise<boolean> {
  const result = await sql`DELETE FROM offers WHERE id = ${id}`;
  return result.length > 0;
}

// Rules operations
export async function getRules(options: PaginationOptions, filters: Record<string, unknown> = {}): Promise<{ rules: Rule[]; total: number }> {
  let whereClause = '';
  const params: unknown[] = [];
  let paramIndex = 1;

  if (filters.type) {
    whereClause += `${whereClause ? ' AND' : 'WHERE'} type = $${paramIndex}`;
    params.push(filters.type);
    paramIndex++;
  }

  if (filters.is_active !== undefined) {
    whereClause += `${whereClause ? ' AND' : 'WHERE'} is_active = $${paramIndex}`;
    params.push(filters.is_active);
    paramIndex++;
  }

  const countResult = await sql`SELECT COUNT(*) as count FROM rules ${whereClause}`;
  const total = parseInt(countResult[0].count as string);

  const rules = await sql`
    SELECT * FROM rules 
    ${whereClause}
    ORDER BY created_at DESC 
    LIMIT ${options.limit} OFFSET ${options.offset}
  `;

  return { rules: rules as Rule[], total };
}

export async function getRuleById(id: string): Promise<Rule | null> {
  const result = await sql`SELECT * FROM rules WHERE id = ${id}`;
  return result[0] as Rule || null;
}

export async function createRule(rule: Omit<Rule, 'id' | 'created_at' | 'updated_at'>): Promise<Rule> {
  const result = await sql`
    INSERT INTO rules (name, description, type, conditions, actions, is_active)
    VALUES (${rule.name}, ${rule.description}, ${rule.type}, ${JSON.stringify(rule.conditions)}, ${JSON.stringify(rule.actions)}, ${rule.is_active})
    RETURNING *
  `;
  return result[0] as Rule;
}

export async function updateRule(id: string, rule: Partial<Omit<Rule, 'id' | 'created_at' | 'updated_at'>>): Promise<Rule | null> {
  const updates = Object.entries(rule).filter(([, value]) => value !== undefined);
  if (updates.length === 0) return null;

  const setClauses = updates.map(([key], index) => {
    if (key === 'conditions' || key === 'actions') {
      return `${key} = $${index + 2}::jsonb`;
    }
    return `${key} = $${index + 2}`;
  }).join(', ');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _values = [id, ...updates.map(([key, value]) => {
    if (key === 'conditions' || key === 'actions') {
      return JSON.stringify(value);
    }
    return value;
  })];

  const result = await sql`
    UPDATE rules 
    SET ${setClauses}, updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `;
  return result[0] as Rule || null;
}

export async function deleteRule(id: string): Promise<boolean> {
  const result = await sql`DELETE FROM rules WHERE id = ${id}`;
  return result.length > 0;
}