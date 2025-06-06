import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Rule, CreateRuleRequest, ApiResponse, PaginatedResponse, RuleScope } from '@/types';

// GET /api/rules - Get all rules with pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const scope = searchParams.get('scope') as RuleScope;
    const active = searchParams.get('active');
    const offset = (page - 1) * limit;

    // Build where clause
    let whereConditions: string[] = [];
    let params: any[] = [];
    
    if (scope) {
      whereConditions.push(`scope = $${params.length + 1}`);
      params.push(scope);
    }
    
    if (active !== null) {
      whereConditions.push(`is_active = $${params.length + 1}`);
      params.push(active === 'true');
    }

    const whereClause = whereConditions.length > 0 ? 'WHERE ' + whereConditions.join(' AND ') : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM rules ${whereClause}`;
    const countResult = await sql(countQuery, ...params);
    const total = parseInt(countResult[0].count);

    // Get rules with pagination
    const query = `
      SELECT * FROM rules 
      ${whereClause}
      ORDER BY creation_date DESC, created_at DESC 
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;
    const rules = await sql(query, ...params, limit, offset);

    const response: PaginatedResponse<Rule> = {
      success: true,
      data: rules.map(rule => ({
        ...rule,
        creation_date: rule.creation_date.toISOString().split('T')[0],
        created_at: rule.created_at?.toISOString(),
        updated_at: rule.updated_at?.toISOString(),
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
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

// POST /api/rules - Create a new rule
export async function POST(request: NextRequest) {
  try {
    const body: CreateRuleRequest = await request.json();
    const { scope, target, summary, rule_content } = body;

    // Validate required fields
    if (!scope || !target || !summary) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate scope
    const validScopes: RuleScope[] = ['全体', '職種', '顧客', '求人'];
    if (!validScopes.includes(scope)) {
      return NextResponse.json(
        { success: false, error: 'Invalid scope' },
        { status: 400 }
      );
    }

    // Generate rule ID (RUL-XXX format)
    const countResult = await sql`SELECT COUNT(*) as count FROM rules`;
    const count = parseInt(countResult[0].count);
    const rule_id = `RUL-${String(count + 1).padStart(3, '0')}`;

    // Insert new rule
    const result = await sql`
      INSERT INTO rules (rule_id, scope, target, summary, rule_content)
      VALUES (${rule_id}, ${scope}, ${target}, ${summary}, ${rule_content || ''})
      RETURNING *
    `;

    const newRule = result[0];
    const response: ApiResponse<Rule> = {
      success: true,
      data: {
        ...newRule,
        creation_date: newRule.creation_date.toISOString().split('T')[0],
        created_at: newRule.created_at?.toISOString(),
        updated_at: newRule.updated_at?.toISOString(),
      },
      message: 'Rule created successfully',
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