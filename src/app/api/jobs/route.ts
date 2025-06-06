import { NextRequest, NextResponse } from 'next/server';
import { getJobs, createJob } from '@/lib/db';
import type { CreateJobRequest, JobQueryParams } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryParams: JobQueryParams = {
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      status: searchParams.get('status') as 'active' | 'inactive' | undefined,
      company: searchParams.get('company') || undefined,
      position: searchParams.get('position') || undefined,
    };

    const result = await getJobs(queryParams);
    return NextResponse.json({ success: true, ...result });
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
    
    // Validate required fields
    if (!body.company || !body.position || !body.salaryRange || !body.location || !body.description || !body.requirements) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const job = await createJob(body);
    return NextResponse.json({ success: true, data: job }, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create job' },
      { status: 500 }
    );
  }
}