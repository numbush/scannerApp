import { Receipt } from './mockDatabase';

export const mockReceiptService = {
  // Simulate OCR processing of a receipt image
  processReceiptImage: async (filename: string): Promise<Receipt['extractedData']> => {
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock extracted data based on filename patterns
    const mockData: Receipt['extractedData'] = {
      merchantName: 'Mock Store',
      date: new Date().toISOString().split('T')[0],
      total: Math.round((Math.random() * 100 + 10) * 100) / 100,
      items: [
        {
          name: 'Sample Item 1',
          price: Math.round((Math.random() * 20 + 5) * 100) / 100,
          quantity: Math.floor(Math.random() * 3) + 1
        },
        {
          name: 'Sample Item 2',
          price: Math.round((Math.random() * 15 + 3) * 100) / 100,
          quantity: Math.floor(Math.random() * 2) + 1
        }
      ]
    };

    // Customize mock data based on filename
    if (filename.toLowerCase().includes('grocery')) {
      mockData.merchantName = 'Fresh Grocery';
      mockData.items = [
        { name: 'Bananas', price: 2.99, quantity: 1 },
        { name: 'Milk', price: 3.49, quantity: 1 },
        { name: 'Bread', price: 2.79, quantity: 1 }
      ];
    } else if (filename.toLowerCase().includes('restaurant')) {
      mockData.merchantName = 'Tasty Restaurant';
      mockData.items = [
        { name: 'Burger', price: 12.99, quantity: 1 },
        { name: 'Fries', price: 4.99, quantity: 1 },
        { name: 'Drink', price: 2.99, quantity: 1 }
      ];
    } else if (filename.toLowerCase().includes('gas')) {
      mockData.merchantName = 'QuickFuel Station';
      mockData.items = [
        { name: 'Gasoline', price: 45.67, quantity: 1 }
      ];
    }

    // Recalculate total based on items
    if (mockData.items) {
      mockData.total = mockData.items.reduce((sum, item) => 
        sum + (item.price * (item.quantity || 1)), 0
      );
      mockData.total = Math.round(mockData.total * 100) / 100;
    }

    return mockData;
  },

  // Validate uploaded file
  validateReceiptFile: (file: { name: string; size: number; type: string }): { valid: boolean; error?: string } => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Invalid file type. Please upload a JPEG, PNG, or GIF image.'
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File too large. Please upload an image smaller than 5MB.'
      };
    }

    return { valid: true };
  }
};
