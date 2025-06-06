import { NextRequest, NextResponse } from 'next/server';
import { getRuleById, updateRule, deleteRule } from '@/lib/db';
import type { RuleInput, ApiResponse, Rule } from '@/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest, 
  context: RouteParams
): Promise<NextResponse> {
  try {
    const params = await context.params;
    const rule = await getRuleById(params.id);
    
    if (!rule) {
      return NextResponse.json(
        { error: 'Not found', message: 'Rule not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse<Rule> = { data: rule };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to fetch rule:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch rule',
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
    const body: Partial<RuleInput> = await request.json();
    
    const rule = await updateRule(params.id, body);
    
    if (!rule) {
      return NextResponse.json(
        { error: 'Not found', message: 'Rule not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse<Rule> = { data: rule };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to update rule:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update rule',
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
    const success = await deleteRule(params.id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Not found', message: 'Rule not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Rule deleted successfully' });
  } catch (error) {
    console.error('Failed to delete rule:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete rule',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}