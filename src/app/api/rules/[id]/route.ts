import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { Rule, UpdateRuleRequest, ApiResponse } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const result = await sql`
      SELECT * FROM rules WHERE id = ${id}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Rule not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse<Rule> = {
      success: true,
      data: result[0] as Rule
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body: UpdateRuleRequest = await request.json();

    // Check if rule exists
    const existingRule = await sql`
      SELECT id FROM rules WHERE id = ${id}
    `;

    if (existingRule.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Rule not found' },
        { status: 404 }
      );
    }

    // Validate scope if provided
    if (body.scope) {
      const validScopes = ['全体', '職種', '顧客', '求人'];
      if (!validScopes.includes(body.scope)) {
        return NextResponse.json(
          { success: false, error: 'Invalid scope value' },
          { status: 400 }
        );
      }
    }

    // Build update query dynamically
    const updateFields = [];
    const values = [];
    
    Object.entries(body).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'rule_details') {
          updateFields.push(`${key} = $${values.length + 1}`);
          values.push(JSON.stringify(value));
        } else {
          updateFields.push(`${key} = $${values.length + 1}`);
          values.push(value);
        }
      }
    });

    if (updateFields.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    // Add updated_at
    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);

    const result = await sql`
      UPDATE rules 
      SET ${sql.unsafe(updateFields.join(', '))}
      WHERE id = ${id}
      RETURNING *
    `;

    const response: ApiResponse<Rule> = {
      success: true,
      data: result[0] as Rule,
      message: 'Rule updated successfully'
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Check if rule exists
    const existingRule = await sql`
      SELECT id FROM rules WHERE id = ${id}
    `;

    if (existingRule.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Rule not found' },
        { status: 404 }
      );
    }

    await sql`
      DELETE FROM rules WHERE id = ${id}
    `;

    const response: ApiResponse<null> = {
      success: true,
      message: 'Rule deleted successfully'
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