import { NextRequest, NextResponse } from 'next/server';
import { createTables } from '@/lib/db';
import { ApiResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    await createTables();
    
    const response: ApiResponse<null> = {
      success: true,
      message: 'Database tables created successfully'
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error initializing database:', error);
    
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to initialize database'
    };

    return NextResponse.json(response, { status: 500 });
  }
}