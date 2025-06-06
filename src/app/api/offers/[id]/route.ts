import { NextRequest, NextResponse } from 'next/server';
import { getOfferById, updateOffer, deleteOffer } from '@/lib/db';
import type { UpdateOfferRequest } from '@/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const offerId = parseInt(id);
    
    if (isNaN(offerId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid offer ID' },
        { status: 400 }
      );
    }

    const offer = await getOfferById(offerId);
    
    if (!offer) {
      return NextResponse.json(
        { success: false, error: 'Offer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: offer });
  } catch (error) {
    console.error('Error fetching offer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch offer' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const offerId = parseInt(id);
    
    if (isNaN(offerId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid offer ID' },
        { status: 400 }
      );
    }

    const body: UpdateOfferRequest = await request.json();
    const offer = await updateOffer(offerId, body);
    
    if (!offer) {
      return NextResponse.json(
        { success: false, error: 'Offer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: offer });
  } catch (error) {
    console.error('Error updating offer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update offer' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const offerId = parseInt(id);
    
    if (isNaN(offerId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid offer ID' },
        { status: 400 }
      );
    }

    const success = await deleteOffer(offerId);
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Offer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Offer deleted successfully' });
  } catch (error) {
    console.error('Error deleting offer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete offer' },
      { status: 500 }
    );
  }
}