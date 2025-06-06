import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Offer, CreateOfferRequest, OfferQueryParams, ApiResponse, PaginatedResponse } from '@/types';

function generateOfferId(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `OFF-${timestamp}${random}`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const job_id = searchParams.get('job_id');

    const offset = (page - 1) * limit;

    // Build where clause
    const conditions = [];
    const params = [];
    
    if (status) {
      conditions.push(`o.status = $${params.length + 1}`);
      params.push(status);
    }
    
    if (job_id) {
      conditions.push(`o.job_id = $${params.length + 1}`);
      params.push(job_id);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get total count
    const countResult = await sql`
      SELECT COUNT(*) as total 
      FROM offers o
      ${whereClause ? sql.unsafe(whereClause) : sql``}
    `;
    
    const total = parseInt(countResult[0].total);

    // Get offers with job information
    const offers = await sql`
      SELECT 
        o.*,
        j.job_title,
        j.client_name
      FROM offers o
      LEFT JOIN jobs j ON o.job_id = j.id
      ${whereClause ? sql.unsafe(whereClause) : sql``}
      ORDER BY o.created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;

    const response: ApiResponse<PaginatedResponse<Offer>> = {
      success: true,
      data: {
        data: offers as Offer[],
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
    console.error('Error fetching offers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch offers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOfferRequest = await request.json();
    
    const {
      job_id,
      candidate_name,
      candidate_email,
      subject,
      body_text
    } = body;

    // Validate required fields
    if (!job_id || !candidate_name || !subject) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate job exists
    const jobExists = await sql`
      SELECT id FROM jobs WHERE id = ${job_id}
    `;

    if (jobExists.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 400 }
      );
    }

    const offerId = generateOfferId();

    const result = await sql`
      INSERT INTO offers (
        id, job_id, candidate_name, candidate_email, subject, body_text
      ) VALUES (
        ${offerId}, ${job_id}, ${candidate_name}, ${candidate_email}, ${subject}, ${body_text}
      )
      RETURNING *
    `;

    const response: ApiResponse<Offer> = {
      success: true,
      data: result[0] as Offer,
      message: 'Offer created successfully'
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