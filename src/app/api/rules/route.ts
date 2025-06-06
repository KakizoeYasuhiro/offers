import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Rule, CreateRuleRequest, RuleQueryParams, ApiResponse, PaginatedResponse } from '@/types';

function generateRuleId(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `RUL-${timestamp}${random}`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const scope = searchParams.get('scope');
    const is_active = searchParams.get('is_active');

    const offset = (page - 1) * limit;

    // Build where clause
    const conditions = [];
    const params = [];
    
    if (scope) {
      conditions.push(`scope = $${params.length + 1}`);
      params.push(scope);
    }
    
    if (is_active !== null) {
      conditions.push(`is_active = $${params.length + 1}`);
      params.push(is_active === 'true');
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Get total count
    const countResult = await sql`
      SELECT COUNT(*) as total 
      FROM rules 
      ${whereClause ? sql.unsafe(whereClause) : sql``}
    `;
    
    const total = parseInt(countResult[0].total);

    // Get rules with pagination
    const rules = await sql`
      SELECT * FROM rules 
      ${whereClause ? sql.unsafe(whereClause) : sql``}
      ORDER BY created_at DESC 
      LIMIT ${limit} OFFSET ${offset}
    `;

    const response: ApiResponse<PaginatedResponse<Rule>> = {
      success: true,
      data: {
        data: rules as Rule[],
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    };

    return NextResponse.json(response);
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
    
    const {
      scope,
      target,
      summary,
      rule_details
    } = body;

    // Validate required fields
    if (!scope || !target || !summary) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate scope
    const validScopes = ['全体', '職種', '顧客', '求人'];
    if (!validScopes.includes(scope)) {
      return NextResponse.json(
        { success: false, error: 'Invalid scope value' },
        { status: 400 }
      );
    }

    const ruleId = generateRuleId();

    const result = await sql`
      INSERT INTO rules (
        id, scope, target, summary, rule_details
      ) VALUES (
        ${ruleId}, ${scope}, ${target}, ${summary}, ${JSON.stringify(rule_details || {})}
      )
      RETURNING *
    `;

    const response: ApiResponse<Rule> = {
      success: true,
      data: result[0] as Rule,
      message: 'Rule created successfully'
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating rule:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create rule' },
      { status: 500 }
    );
  }
}