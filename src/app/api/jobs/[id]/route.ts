import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Job, ApiResponse } from '@/types';

interface Params {
  id: string;
}

// GET /api/jobs/[id] - Get a specific job
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    const result = await sql`
      SELECT * FROM jobs WHERE job_id = ${id}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    const job = result[0];
    const response: ApiResponse<Job> = {
      success: true,
      data: {
        ...job,
        creation_date: job.creation_date.toISOString().split('T')[0],
        created_at: job.created_at?.toISOString(),
        updated_at: job.updated_at?.toISOString(),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch job' },
      { status: 500 }
    );
  }
}

// PUT /api/jobs/[id] - Update a specific job
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { client_name, job_title, job_category, salary_range } = body;

    // Check if job exists
    const existingJob = await sql`
      SELECT * FROM jobs WHERE job_id = ${id}
    `;

    if (existingJob.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    // Update job
    const result = await sql`
      UPDATE jobs 
      SET 
        client_name = ${client_name || existingJob[0].client_name},
        job_title = ${job_title || existingJob[0].job_title},
        job_category = ${job_category || existingJob[0].job_category},
        salary_range = ${salary_range || existingJob[0].salary_range},
        updated_at = CURRENT_TIMESTAMP
      WHERE job_id = ${id}
      RETURNING *
    `;

    const updatedJob = result[0];
    const response: ApiResponse<Job> = {
      success: true,
      data: {
        ...updatedJob,
        creation_date: updatedJob.creation_date.toISOString().split('T')[0],
        created_at: updatedJob.created_at?.toISOString(),
        updated_at: updatedJob.updated_at?.toISOString(),
      },
      message: 'Job updated successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update job' },
      { status: 500 }
    );
  }
}

// DELETE /api/jobs/[id] - Delete a specific job
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    // Check if job exists
    const existingJob = await sql`
      SELECT * FROM jobs WHERE job_id = ${id}
    `;

    if (existingJob.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    // Delete related offers first
    await sql`DELETE FROM offers WHERE job_id = ${id}`;

    // Delete job
    await sql`DELETE FROM jobs WHERE job_id = ${id}`;

    const response: ApiResponse<null> = {
      success: true,
      message: 'Job deleted successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete job' },
      { status: 500 }
    );
  }
}