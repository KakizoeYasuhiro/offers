import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Offer, CreateOfferRequest, ApiResponse, PaginatedResponse } from '@/types';

// GET /api/offers - Get all offers with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const offset = (page - 1) * limit;

    // Build base query
    let whereClause = '';
    let params: any[] = [];
    
    if (status) {
      whereClause = 'WHERE status = $1';
      params.push(status);
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM offers ${whereClause}`;
    const countResult = await sql(countQuery, ...params);
    const total = parseInt(countResult[0].count);

    // Get offers with pagination
    const query = `
      SELECT * FROM offers 
      ${whereClause}
      ORDER BY creation_date DESC, created_at DESC 
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;
    const offers = await sql(query, ...params, limit, offset);

    const response: PaginatedResponse<Offer> = {
      success: true,
      data: offers.map(offer => ({
        ...offer,
        creation_date: offer.creation_date.toISOString(),
        created_at: offer.created_at?.toISOString(),
        updated_at: offer.updated_at?.toISOString(),
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
    console.error('Error fetching offers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch offers' },
      { status: 500 }
    );
  }
}

// POST /api/offers - Create a new offer
export async function POST(request: NextRequest) {
  try {
    const body: CreateOfferRequest = await request.json();
    const { job_name, candidate_name, subject, content, job_id } = body;

    // Validate required fields
    if (!job_name || !candidate_name || !subject) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate offer ID (OFF-XXX format)
    const countResult = await sql`SELECT COUNT(*) as count FROM offers`;
    const count = parseInt(countResult[0].count);
    const offer_id = `OFF-${String(count + 1).padStart(3, '0')}`;

    // Insert new offer
    const result = await sql`
      INSERT INTO offers (offer_id, job_name, candidate_name, subject, content, job_id)
      VALUES (${offer_id}, ${job_name}, ${candidate_name}, ${subject}, ${content || ''}, ${job_id || null})
      RETURNING *
    `;

    const newOffer = result[0];
    const response: ApiResponse<Offer> = {
      success: true,
      data: {
        ...newOffer,
        creation_date: newOffer.creation_date.toISOString(),
        created_at: newOffer.created_at?.toISOString(),
        updated_at: newOffer.updated_at?.toISOString(),
      },
      message: 'Offer created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating offer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create offer' },
      { status: 500 }
    );
  }
}