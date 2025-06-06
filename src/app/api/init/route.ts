import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db';

export async function POST() {
  try {
    const result = await initializeDatabase();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Database initialization failed:', error);
    return NextResponse.json(
      { success: false, error: 'Database initialization failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}