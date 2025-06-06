import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Offer, UpdateOfferRequest, ApiResponse } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const result = await sql`
      SELECT 
        o.*,
        j.job_title,
        j.client_name
      FROM offers o
      LEFT JOIN jobs j ON o.job_id = j.id
      WHERE o.id = ${id}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Offer not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse<Offer> = {
      success: true,
      data: result[0] as Offer
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching offer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch offer' },
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
    const body: UpdateOfferRequest = await request.json();

    // Check if offer exists
    const existingOffer = await sql`
      SELECT id FROM offers WHERE id = ${id}
    `;

    if (existingOffer.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Offer not found' },
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
      UPDATE offers 
      SET ${sql.unsafe(updateFields.join(', '))}
      WHERE id = ${id}
      RETURNING *
    `;

    const response: ApiResponse<Offer> = {
      success: true,
      data: result[0] as Offer,
      message: 'Offer updated successfully'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating offer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update offer' },
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

    // Check if offer exists
    const existingOffer = await sql`
      SELECT id FROM offers WHERE id = ${id}
    `;

    if (existingOffer.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Offer not found' },
        { status: 404 }
      );
    }

    await sql`
      DELETE FROM offers WHERE id = ${id}
    `;

    const response: ApiResponse<null> = {
      success: true,
      message: 'Offer deleted successfully'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting offer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete offer' },
      { status: 500 }
    );
  }
}