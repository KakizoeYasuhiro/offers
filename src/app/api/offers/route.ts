import { NextRequest, NextResponse } from 'next/server';
import { getOffers, createOffer } from '@/lib/db';
import type { CreateOfferRequest, OfferQueryParams } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryParams: OfferQueryParams = {
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      status: searchParams.get('status') as 'pending' | 'accepted' | 'rejected' | undefined,
      jobId: searchParams.get('jobId') ? parseInt(searchParams.get('jobId')!) : undefined,
      candidate: searchParams.get('candidate') || undefined,
    };

    const result = await getOffers(queryParams);
    return NextResponse.json({ success: true, ...result });
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
    
    // Validate required fields
    if (!body.jobId || !body.candidate || !body.subject || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const offer = await createOffer(body);
    return NextResponse.json({ success: true, data: offer }, { status: 201 });
  } catch (error) {
    console.error('Error creating offer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create offer' },
      { status: 500 }
    );
  }
}