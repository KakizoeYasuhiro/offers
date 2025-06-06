import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Offer, ApiResponse, OfferStatus } from '@/types';

interface Params {
  id: string;
}

// GET /api/offers/[id] - Get a specific offer
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    const result = await sql`
      SELECT * FROM offers WHERE offer_id = ${id}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Offer not found' },
        { status: 404 }
      );
    }

    const offer = result[0];
    const response: ApiResponse<Offer> = {
      success: true,
      data: {
        ...offer,
        creation_date: offer.creation_date.toISOString(),
        created_at: offer.created_at?.toISOString(),
        updated_at: offer.updated_at?.toISOString(),
      },
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

// PUT /api/offers/[id] - Update a specific offer
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { job_name, candidate_name, subject, content, status, job_id } = body;

    // Check if offer exists
    const existingOffer = await sql`
      SELECT * FROM offers WHERE offer_id = ${id}
    `;

    if (existingOffer.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Offer not found' },
        { status: 404 }
      );
    }

    // Validate status if provided
    const validStatuses: OfferStatus[] = ['下書き', '送信準備完了', '送信済', '開封済', '返信あり'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Update offer
    const result = await sql`
      UPDATE offers 
      SET 
        job_name = ${job_name || existingOffer[0].job_name},
        candidate_name = ${candidate_name || existingOffer[0].candidate_name},
        subject = ${subject || existingOffer[0].subject},
        content = ${content !== undefined ? content : existingOffer[0].content},
        status = ${status || existingOffer[0].status},
        job_id = ${job_id !== undefined ? job_id : existingOffer[0].job_id},
        updated_at = CURRENT_TIMESTAMP
      WHERE offer_id = ${id}
      RETURNING *
    `;

    const updatedOffer = result[0];
    const response: ApiResponse<Offer> = {
      success: true,
      data: {
        ...updatedOffer,
        creation_date: updatedOffer.creation_date.toISOString(),
        created_at: updatedOffer.created_at?.toISOString(),
        updated_at: updatedOffer.updated_at?.toISOString(),
      },
      message: 'Offer updated successfully',
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

// DELETE /api/offers/[id] - Delete a specific offer
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    // Check if offer exists
    const existingOffer = await sql`
      SELECT * FROM offers WHERE offer_id = ${id}
    `;

    if (existingOffer.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Offer not found' },
        { status: 404 }
      );
    }

    // Delete offer
    await sql`DELETE FROM offers WHERE offer_id = ${id}`;

    const response: ApiResponse<null> = {
      success: true,
      message: 'Offer deleted successfully',
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