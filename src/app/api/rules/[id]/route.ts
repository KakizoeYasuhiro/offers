import { NextRequest, NextResponse } from 'next/server';
import { getRuleById, updateRule, deleteRule } from '@/lib/db';
import type { UpdateRuleRequest } from '@/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const ruleId = parseInt(id);
    
    if (isNaN(ruleId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid rule ID' },
        { status: 400 }
      );
    }

    const rule = await getRuleById(ruleId);
    
    if (!rule) {
      return NextResponse.json(
        { success: false, error: 'Rule not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rule });
  } catch (error) {
    console.error('Error fetching rule:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rule' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const ruleId = parseInt(id);
    
    if (isNaN(ruleId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid rule ID' },
        { status: 400 }
      );
    }

    const body: UpdateRuleRequest = await request.json();
    const rule = await updateRule(ruleId, body);
    
    if (!rule) {
      return NextResponse.json(
        { success: false, error: 'Rule not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: rule });
  } catch (error) {
    console.error('Error updating rule:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update rule' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const ruleId = parseInt(id);
    
    if (isNaN(ruleId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid rule ID' },
        { status: 400 }
      );
    }

    const success = await deleteRule(ruleId);
    
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Rule not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Rule deleted successfully' });
  } catch (error) {
    console.error('Error deleting rule:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete rule' },
      { status: 500 }
    );
  }
}