import { NextRequest, NextResponse } from 'next/server';
import { getJobs, createJob } from '@/lib/db';
import type { JobQueryParams, JobInput, ApiResponse, Job } from '@/types';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    
    const queryParams: JobQueryParams = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      company: searchParams.get('company') || undefined,
      location: searchParams.get('location') || undefined,
      employment_type: (searchParams.get('employment_type') as JobQueryParams['employment_type']) || undefined,
      experience_level: (searchParams.get('experience_level') as JobQueryParams['experience_level']) || undefined,
      remote_option: searchParams.get('remote_option') === 'true' ? true : undefined,
      search: searchParams.get('search') || undefined,
    };

    const page = queryParams.page || 1;
    const limit = queryParams.limit || 10;
    const offset = (page - 1) * limit;

    const filters = {
      company: queryParams.company,
      location: queryParams.location,
      employment_type: queryParams.employment_type,
      experience_level: queryParams.experience_level,
      remote_option: queryParams.remote_option,
    };

    const { jobs, total } = await getJobs({ page, limit, offset }, filters);
    
    const response: ApiResponse<Job[]> = {
      data: jobs,
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch jobs',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: JobInput = await request.json();
    
    // Validate required fields
    const requiredFields: (keyof JobInput)[] = [
      'title', 'company', 'location', 'salary_range', 'description', 
      'requirements', 'employment_type', 'experience_level'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: 'Validation failed', message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const job = await createJob({
      ...body,
      remote_option: body.remote_option || false,
    });

    const response: ApiResponse<Job> = { data: job };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Failed to create job:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create job',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}