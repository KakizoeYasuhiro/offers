import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Job, CreateJobRequest, ApiResponse, PaginatedResponse } from '@/types';

// GET /api/jobs - Get all jobs with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Get total count
    const countResult = await sql`SELECT COUNT(*) as count FROM jobs`;
    const total = parseInt(countResult[0].count);

    // Get jobs with pagination
    const jobs = await sql`
      SELECT * FROM jobs 
      ORDER BY creation_date DESC, created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;

    const response: PaginatedResponse<Job> = {
      success: true,
      data: jobs.map(job => ({
        ...job,
        creation_date: job.creation_date.toISOString().split('T')[0],
        created_at: job.created_at?.toISOString(),
        updated_at: job.updated_at?.toISOString(),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
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

// POST /api/jobs - Create a new job
export async function POST(request: NextRequest) {
  try {
    const body: CreateJobRequest = await request.json();
    const { client_name, job_title, job_category, salary_range } = body;

    // Validate required fields
    if (!client_name || !job_title || !job_category || !salary_range) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate job ID (JID-XXXX format)
    const countResult = await sql`SELECT COUNT(*) as count FROM jobs`;
    const count = parseInt(countResult[0].count);
    const job_id = `JID-${String(count + 1001).padStart(4, '0')}`;

    // Insert new job
    const result = await sql`
      INSERT INTO jobs (job_id, client_name, job_title, job_category, salary_range)
      VALUES (${job_id}, ${client_name}, ${job_title}, ${job_category}, ${salary_range})
      RETURNING *
    `;

    const newJob = result[0];
    const response: ApiResponse<Job> = {
      success: true,
      data: {
        ...newJob,
        creation_date: newJob.creation_date.toISOString().split('T')[0],
        created_at: newJob.created_at?.toISOString(),
        updated_at: newJob.updated_at?.toISOString(),
      },
      message: 'Job created successfully',
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