import { NextRequest, NextResponse } from 'next/server';
import { getJobById, updateJob, deleteJob } from '@/lib/db';
import type { JobInput, ApiResponse, Job } from '@/types';

interface RouteParams {
  params: { id: string };
}

export async function GET(
  request: NextRequest, 
  { params }: { params: { id: string } } // ← このように修正
) 
: Promise<NextResponse> {
  try {
    const job = await getJobById(params.id);
    
    if (!job) {
      return NextResponse.json(
        { error: 'Not found', message: 'Job not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse<Job> = { data: job };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to fetch job:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch job',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest, 
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const body: Partial<JobInput> = await request.json();
    
    const job = await updateJob(params.id, body);
    
    if (!job) {
      return NextResponse.json(
        { error: 'Not found', message: 'Job not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse<Job> = { data: job };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to update job:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update job',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest, 
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const success = await deleteJob(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Not found', message: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Failed to delete job:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete job',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}