import { NextRequest, NextResponse } from 'next/server';
import { getRules, createRule } from '@/lib/db';
import type { CreateRuleRequest, RuleQueryParams } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const queryParams: RuleQueryParams = {
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      isActive: searchParams.get('isActive') ? searchParams.get('isActive') === 'true' : undefined,
      scope: searchParams.get('scope') || undefined,
    };

    const result = await getRules(queryParams);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error('Error fetching rules:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rules' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateRuleRequest = await request.json();
    
    // Validate required fields
    if (!body.scope || !body.target || !body.overview || !body.details) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const rule = await createRule(body);
    return NextResponse.json({ success: true, data: rule }, { status: 201 });
  } catch (error) {
    console.error('Error creating rule:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create rule' },
      { status: 500 }
    );
  }
}