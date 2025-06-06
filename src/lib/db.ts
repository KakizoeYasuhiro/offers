import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export { sql };

export async function createTables() {
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create jobs table
    await sql`
      CREATE TABLE IF NOT EXISTS jobs (
        id VARCHAR(20) PRIMARY KEY,
        creation_date DATE NOT NULL,
        client_name VARCHAR(255) NOT NULL,
        job_title VARCHAR(255) NOT NULL,
        job_category VARCHAR(100) NOT NULL,
        salary_range VARCHAR(100) NOT NULL,
        status VARCHAR(50) DEFAULT '公開中',
        description TEXT,
        required_skills TEXT,
        preferred_skills TEXT,
        work_location VARCHAR(255),
        employment_type VARCHAR(50),
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create offers table
    await sql`
      CREATE TABLE IF NOT EXISTS offers (
        id VARCHAR(20) PRIMARY KEY,
        job_id VARCHAR(20) REFERENCES jobs(id),
        candidate_name VARCHAR(255) NOT NULL,
        candidate_email VARCHAR(255),
        status VARCHAR(20) DEFAULT '下書き',
        subject VARCHAR(500) NOT NULL,
        body_text TEXT,
        sent_at TIMESTAMP,
        opened_at TIMESTAMP,
        replied_at TIMESTAMP,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create rules table
    await sql`
      CREATE TABLE IF NOT EXISTS rules (
        id VARCHAR(20) PRIMARY KEY,
        scope VARCHAR(20) NOT NULL,
        target VARCHAR(255) NOT NULL,
        summary TEXT NOT NULL,
        rule_details JSONB,
        is_active BOOLEAN DEFAULT TRUE,
        created_by INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}