import { NextRequest, NextResponse } from 'next/server';
import { getOfferById, updateOffer, deleteOffer } from '@/lib/db';
import type { OfferInput, ApiResponse, Offer } from '@/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest, 
  context: RouteParams
): Promise<NextResponse> {
  try {
    const params = await context.params;
    const offer = await getOfferById(params.id);
    
    if (!offer) {
      return NextResponse.json(
        { error: 'Not found', message: 'Offer not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse<Offer> = { data: offer };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to fetch offer:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch offer',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest, 
  context: RouteParams
): Promise<NextResponse> {
  try {
    const params = await context.params;
    const body: Partial<OfferInput> = await request.json();
    
    const offer = await updateOffer(params.id, body);
    
    if (!offer) {
      return NextResponse.json(
        { error: 'Not found', message: 'Offer not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse<Offer> = { data: offer };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to update offer:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update offer',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest, 
  context: RouteParams
): Promise<NextResponse> {
  try {
    const params = await context.params;
    const success = await deleteOffer(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Not found', message: 'Offer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Offer deleted successfully' });
  } catch (error) {
    console.error('Failed to delete offer:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete offer',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}