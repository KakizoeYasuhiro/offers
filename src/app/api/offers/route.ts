import { NextRequest, NextResponse } from 'next/server';
import { getOffers, createOffer } from '@/lib/db';
import type { OfferQueryParams, OfferInput, ApiResponse, Offer } from '@/types';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    
    const queryParams: OfferQueryParams = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      job_id: searchParams.get('job_id') || undefined,
      status: (searchParams.get('status') as OfferQueryParams['status']) || undefined,
      candidate_name: searchParams.get('candidate_name') || undefined,
      search: searchParams.get('search') || undefined,
    };

    const page = queryParams.page || 1;
    const limit = queryParams.limit || 10;
    const offset = (page - 1) * limit;

    const filters = {
      job_id: queryParams.job_id,
      status: queryParams.status,
      candidate_name: queryParams.candidate_name,
    };

    const { offers, total } = await getOffers({ page, limit, offset }, filters);
    
    const response: ApiResponse<Offer[]> = {
      data: offers,
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to fetch offers:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch offers',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: OfferInput = await request.json();
    
    // Validate required fields
    const requiredFields: (keyof OfferInput)[] = [
      'job_id', 'candidate_name', 'email', 'phone', 'cover_letter'
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: 'Validation failed', message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const offer = await createOffer(body);

    const response: ApiResponse<Offer> = { data: offer };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Failed to create offer:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create offer',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}