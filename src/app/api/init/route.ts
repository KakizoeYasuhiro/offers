import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db';

export async function POST(): Promise<NextResponse> {
  try {
    await initializeDatabase();
    return NextResponse.json({ 
      message: 'Database initialized successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database initialization failed:', error);
    return NextResponse.json(
      { 
        error: 'Failed to initialize database',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}