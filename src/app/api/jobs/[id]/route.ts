import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Job, UpdateJobRequest, ApiResponse } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const result = await sql`
      SELECT * FROM jobs WHERE id = ${id}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse<Job> = {
      success: true,
      data: result[0] as Job
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body: UpdateJobRequest = await request.json();

    // Check if job exists
    const existingJob = await sql`
      SELECT id FROM jobs WHERE id = ${id}
    `;

    if (existingJob.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    // Build update query dynamically
    const updateFields = [];
    const values = [];
    
    Object.entries(body).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        updateFields.push(`${key} = $${values.length + 1}`);
        values.push(value);
      }
    });

    if (updateFields.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    // Add updated_at
    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);

    const result = await sql`
      UPDATE jobs 
      SET ${sql.unsafe(updateFields.join(', '))}
      WHERE id = ${id}
      RETURNING *
    `;

    const response: ApiResponse<Job> = {
      success: true,
      data: result[0] as Job,
      message: 'Job updated successfully'
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Check if job exists
    const existingJob = await sql`
      SELECT id FROM jobs WHERE id = ${id}
    `;

    if (existingJob.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    // Check if job has associated offers
    const associatedOffers = await sql`
      SELECT COUNT(*) as count FROM offers WHERE job_id = ${id}
    `;

    if (parseInt(associatedOffers[0].count) > 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete job with associated offers' },
        { status: 400 }
      );
    }

    await sql`
      DELETE FROM jobs WHERE id = ${id}
    `;

    const response: ApiResponse<null> = {
      success: true,
      message: 'Job deleted successfully'
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