import { NextRequest, NextResponse } from 'next/server';
import { hybridOcrService } from '../../../../lib/hybridOcrService';

export async function GET() {
  try {
    const currentMode = hybridOcrService.getOcrMode();
    return NextResponse.json({ 
      mode: currentMode,
      isRealOcr: currentMode === 'Real OCR'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get OCR mode' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { useRealOcr } = await request.json();
    
    if (typeof useRealOcr !== 'boolean') {
      return NextResponse.json(
        { error: 'useRealOcr must be a boolean' },
        { status: 400 }
      );
    }

    hybridOcrService.setOcrMode(useRealOcr);
    
    return NextResponse.json({ 
      mode: hybridOcrService.getOcrMode(),
      isRealOcr: useRealOcr,
      message: `OCR mode switched to ${useRealOcr ? 'Real OCR' : 'Fast Mock'}`
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to set OCR mode' },
      { status: 500 }
    );
  }
}
