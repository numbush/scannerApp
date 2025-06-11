export interface Receipt {
  id: string;
  filename: string;
  uploadDate: string;
  extractedData: {
    merchantName?: string;
    date?: string;
    total?: number;
    items?: Array<{
      name: string;
      price: number;
      quantity?: number;
    }>;
  };
  status: 'processing' | 'completed' | 'error';
}

// Mock database - in a real app, this would be a proper database
let receipts: Receipt[] = [
  {
    id: '1',
    filename: 'grocery-receipt-001.jpg',
    uploadDate: '2024-01-15T10:30:00Z',
    extractedData: {
      merchantName: 'SuperMart',
      date: '2024-01-15',
      total: 45.67,
      items: [
        { name: 'Milk', price: 3.99, quantity: 1 },
        { name: 'Bread', price: 2.50, quantity: 2 },
        { name: 'Eggs', price: 4.99, quantity: 1 }
      ]
    },
    status: 'completed'
  },
  {
    id: '2',
    filename: 'restaurant-receipt-002.jpg',
    uploadDate: '2024-01-16T19:45:00Z',
    extractedData: {
      merchantName: 'Pizza Palace',
      date: '2024-01-16',
      total: 28.50,
      items: [
        { name: 'Large Pizza', price: 18.99, quantity: 1 },
        { name: 'Soda', price: 2.99, quantity: 2 },
        { name: 'Garlic Bread', price: 3.50, quantity: 1 }
      ]
    },
    status: 'completed'
  }
];

export const mockDatabase = {
  getAllReceipts: (): Receipt[] => {
    return receipts;
  },

  getReceiptById: (id: string): Receipt | undefined => {
    return receipts.find(receipt => receipt.id === id);
  },

  addReceipt: (receipt: Omit<Receipt, 'id'>): Receipt => {
    const newReceipt: Receipt = {
      ...receipt,
      id: Date.now().toString()
    };
    receipts.push(newReceipt);
    return newReceipt;
  },

  updateReceipt: (id: string, updates: Partial<Receipt>): Receipt | undefined => {
    const index = receipts.findIndex(receipt => receipt.id === id);
    if (index === -1) return undefined;
    
    receipts[index] = { ...receipts[index], ...updates };
    return receipts[index];
  },

  deleteReceipt: (id: string): boolean => {
    const index = receipts.findIndex(receipt => receipt.id === id);
    if (index === -1) return false;
    
    receipts.splice(index, 1);
    return true;
  }
};
