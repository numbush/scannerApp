import { NextRequest, NextResponse } from 'next/server';
import { mockDatabase } from '../../../../../lib/mockDatabase';
import { mockReceiptService } from '../../../../../lib/mockReceiptService';
import { hybridOcrService } from '../../../../../lib/hybridOcrService';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('receipt') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file
    const validation = mockReceiptService.validateReceiptFile({
      name: file.name,
      size: file.size,
      type: file.type
    });

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Convert file to buffer for OCR processing
    const arrayBuffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    // Create initial receipt record
    const newReceipt = mockDatabase.addReceipt({
      filename: file.name,
      uploadDate: new Date().toISOString(),
      extractedData: {},
      status: 'processing'
    });

    // Start OCR processing in background
    setTimeout(async () => {
      try {
        console.log(`Processing receipt ${file.name} with ${hybridOcrService.getOcrMode()}...`);
        const extractedData = await hybridOcrService.processReceiptImage(imageBuffer, file.name);
        
        console.log('OCR extraction completed:', extractedData);
        
        mockDatabase.updateReceipt(newReceipt.id, {
          extractedData,
          status: 'completed'
        });
      } catch (error) {
        console.error('OCR processing failed:', error);
        mockDatabase.updateReceipt(newReceipt.id, {
          status: 'error'
        });
      }
    }, 1000); // Give a bit more time for processing

    return NextResponse.json(newReceipt);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload receipt' },
      { status: 500 }
    );
  }
}
