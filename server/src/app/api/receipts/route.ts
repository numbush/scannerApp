import { NextRequest, NextResponse } from 'next/server';
import { mockDatabase } from '../../../../lib/mockDatabase';

export async function GET() {
  try {
    const receipts = mockDatabase.getAllReceipts();
    return NextResponse.json(receipts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch receipts' },
      { status: 500 }
    );
  }
}
