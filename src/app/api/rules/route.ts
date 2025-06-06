import { NextRequest, NextResponse } from 'next/server';
import { getRules, createRule } from '@/lib/db';
import type { RuleQueryParams, RuleInput, ApiResponse, Rule } from '@/types';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    
    const queryParams: RuleQueryParams = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      type: (searchParams.get('type') as RuleQueryParams['type']) || undefined,
      is_active: searchParams.get('is_active') ? searchParams.get('is_active') === 'true' : undefined,
      search: searchParams.get('search') || undefined,
    };

    const page = queryParams.page || 1;
    const limit = queryParams.limit || 10;
    const offset = (page - 1) * limit;

    const filters = {
      type: queryParams.type,
      is_active: queryParams.is_active,
    };

    const { rules, total } = await getRules({ page, limit, offset }, filters);
    
    const response: ApiResponse<Rule[]> = {
      data: rules,
      meta: {
        total,
        page,
        limit,
        total_pages: Math.ceil(total / limit),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Failed to fetch rules:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch rules',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: RuleInput = await request.json();
    
    // Validate required fields
    const requiredFields: (keyof RuleInput)[] = [
      'name', 'description', 'type', 'conditions', 'actions'
    ];
    
    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json(
          { error: 'Validation failed', message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const rule = await createRule({
      ...body,
      is_active: body.is_active !== undefined ? body.is_active : true,
    });

    const response: ApiResponse<Rule> = { data: rule };
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Failed to create rule:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create rule',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}