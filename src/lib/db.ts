import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export { sql };

export async function initDatabase() {
  try {
    // Create jobs table
    await sql`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        job_id VARCHAR(50) UNIQUE NOT NULL,
        creation_date DATE NOT NULL DEFAULT CURRENT_DATE,
        client_name VARCHAR(255) NOT NULL,
        job_title VARCHAR(255) NOT NULL,
        job_category VARCHAR(100) NOT NULL,
        salary_range VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create offers table
    await sql`
      CREATE TABLE IF NOT EXISTS offers (
        id SERIAL PRIMARY KEY,
        offer_id VARCHAR(50) UNIQUE NOT NULL,
        creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        job_name VARCHAR(255) NOT NULL,
        candidate_name VARCHAR(255) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT '下書き',
        subject TEXT NOT NULL,
        content TEXT,
        job_id VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (job_id) REFERENCES jobs(job_id)
      )
    `;

    // Create rules table
    await sql`
      CREATE TABLE IF NOT EXISTS rules (
        id SERIAL PRIMARY KEY,
        rule_id VARCHAR(50) UNIQUE NOT NULL,
        creation_date DATE NOT NULL DEFAULT CURRENT_DATE,
        scope VARCHAR(50) NOT NULL,
        target VARCHAR(255) NOT NULL,
        summary TEXT NOT NULL,
        rule_content TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}