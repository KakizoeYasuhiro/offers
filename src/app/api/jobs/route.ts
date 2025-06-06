import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Job, CreateJobRequest, JobQueryParams, ApiResponse, PaginatedResponse } from '@/types';

function generateJobId(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `JID-${timestamp}${random}`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const client_name = searchParams.get('client_name');
    const job_category = searchParams.get('job_category');
    const status = searchParams.get('status');

    const offset = (page - 1) * limit;

    // Build where clause
    const conditions = [];
    const params = [];
    
    if (client_name) {
      conditions.push(`client_name ILIKE $${params.length + 1}`);
      params.push(`%${client_name}%`);
    }
    
    if (job_category) {
      conditions.push(`job_category = $${params.length + 1}`);
      params.push(job_category);
    }
    
    if (status) {
      conditions.push(`status = $${params.length + 1}`);
      params.push(status);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get total count
    const countResult = await sql`
      SELECT COUNT(*) as total 
      FROM jobs 
      ${whereClause ? sql.unsafe(whereClause) : sql``}
    `;
    
    const total = parseInt(countResult[0].total);

    // Get jobs with pagination
    const jobs = await sql`
      SELECT * FROM jobs 
      ${whereClause ? sql.unsafe(whereClause) : sql``}
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;

    const response: ApiResponse<PaginatedResponse<Job>> = {
      success: true,
      data: {
        data: jobs as Job[],
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateJobRequest = await request.json();
    
    const {
      client_name,
      job_title,
      job_category,
      salary_range,
      description,
      required_skills,
      preferred_skills,
      work_location,
      employment_type
    } = body;

    // Validate required fields
    if (!client_name || !job_title || !job_category || !salary_range) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const jobId = generateJobId();
    const creationDate = new Date().toISOString().split('T')[0];

    const result = await sql`
      INSERT INTO jobs (
        id, creation_date, client_name, job_title, job_category, 
        salary_range, description, required_skills, preferred_skills,
        work_location, employment_type
      ) VALUES (
        ${jobId}, ${creationDate}, ${client_name}, ${job_title}, 
        ${job_category}, ${salary_range}, ${description}, 
        ${required_skills}, ${preferred_skills}, ${work_location}, 
        ${employment_type}
      )
      RETURNING *
    `;

    const response: ApiResponse<Job> = {
      success: true,
      data: result[0] as Job,
      message: 'Job created successfully'
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create job' },
      { status: 500 }
    );
  }
}