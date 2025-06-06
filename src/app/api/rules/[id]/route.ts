import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Rule, ApiResponse, RuleScope } from '@/types';

interface Params {
  id: string;
}

// GET /api/rules/[id] - Get a specific rule
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    const result = await sql`
      SELECT * FROM rules WHERE rule_id = ${id}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Rule not found' },
        { status: 404 }
      );
    }

    const rule = result[0];
    const response: ApiResponse<Rule> = {
      success: true,
      data: {
        ...rule,
        creation_date: rule.creation_date.toISOString().split('T')[0],
        created_at: rule.created_at?.toISOString(),
        updated_at: rule.updated_at?.toISOString(),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching rule:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rule' },
      { status: 500 }
    );
  }
}

// PUT /api/rules/[id] - Update a specific rule
export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { scope, target, summary, rule_content, is_active } = body;

    // Check if rule exists
    const existingRule = await sql`
      SELECT * FROM rules WHERE rule_id = ${id}
    `;

    if (existingRule.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Rule not found' },
        { status: 404 }
      );
    }

    // Validate scope if provided
    if (scope) {
      const validScopes: RuleScope[] = ['全体', '職種', '顧客', '求人'];
      if (!validScopes.includes(scope)) {
        return NextResponse.json(
          { success: false, error: 'Invalid scope' },
          { status: 400 }
        );
      }
    }

    // Update rule
    const result = await sql`
      UPDATE rules 
      SET 
        scope = ${scope || existingRule[0].scope},
        target = ${target || existingRule[0].target},
        summary = ${summary || existingRule[0].summary},
        rule_content = ${rule_content !== undefined ? rule_content : existingRule[0].rule_content},
        is_active = ${is_active !== undefined ? is_active : existingRule[0].is_active},
        updated_at = CURRENT_TIMESTAMP
      WHERE rule_id = ${id}
      RETURNING *
    `;

    const updatedRule = result[0];
    const response: ApiResponse<Rule> = {
      success: true,
      data: {
        ...updatedRule,
        creation_date: updatedRule.creation_date.toISOString().split('T')[0],
        created_at: updatedRule.created_at?.toISOString(),
        updated_at: updatedRule.updated_at?.toISOString(),
      },
      message: 'Rule updated successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating rule:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update rule' },
      { status: 500 }
    );
  }
}

// DELETE /api/rules/[id] - Delete a specific rule
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params;

    // Check if rule exists
    const existingRule = await sql`
      SELECT * FROM rules WHERE rule_id = ${id}
    `;

    if (existingRule.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Rule not found' },
        { status: 404 }
      );
    }

    // Delete rule
    await sql`DELETE FROM rules WHERE rule_id = ${id}`;

    const response: ApiResponse<null> = {
      success: true,
      message: 'Rule deleted successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting rule:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete rule' },
      { status: 500 }
    );
  }
}