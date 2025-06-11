import { useState, useEffect } from 'react';

interface Receipt {
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

interface ReceiptListProps {
  refreshTrigger: number;
}

export default function ReceiptList({ refreshTrigger }: ReceiptListProps) {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);

  const fetchReceipts = async () => {
    try {
      const response = await fetch('/api/receipts');
      if (response.ok) {
        const data = await response.json();
        setReceipts(data);
      } else {
        console.error('Failed to fetch receipts');
      }
    } catch (error) {
      console.error('Error fetching receipts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteReceipt = async (id: string) => {
    if (!confirm('Are you sure you want to delete this receipt?')) {
      return;
    }

    try {
      const response = await fetch(`/api/receipts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReceipts(receipts.filter(receipt => receipt.id !== id));
        if (selectedReceipt?.id === id) {
          setSelectedReceipt(null);
        }
      } else {
        alert('Failed to delete receipt');
      }
    } catch (error) {
      console.error('Error deleting receipt:', error);
      alert('Error deleting receipt');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Receipts</h2>
        <button
          onClick={fetchReceipts}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Refresh
        </button>
      </div>

      {receipts.length === 0 ? (
        <div className="text-center py-8">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 text-lg">No receipts uploaded yet</p>
          <p className="text-gray-400">Upload your first receipt to get started</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {receipts.map((receipt) => (
            <div
              key={receipt.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{receipt.filename}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(receipt.status)}`}>
                      {receipt.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    Uploaded: {formatDate(receipt.uploadDate)}
                  </p>

                  {receipt.status === 'completed' && receipt.extractedData.merchantName && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Merchant:</span>
                          <p className="text-gray-900">{receipt.extractedData.merchantName}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Date:</span>
                          <p className="text-gray-900">{receipt.extractedData.date}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Total:</span>
                          <p className="text-gray-900 font-semibold">${receipt.extractedData.total?.toFixed(2)}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Items:</span>
                          <p className="text-gray-900">{receipt.extractedData.items?.length || 0} items</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {receipt.status === 'processing' && (
                    <div className="flex items-center gap-2 text-sm text-yellow-600">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                      Processing receipt data...
                    </div>
                  )}

                  {receipt.status === 'error' && (
                    <div className="text-sm text-red-600">
                      Failed to process receipt. Please try uploading again.
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  {receipt.status === 'completed' && (
                    <button
                      onClick={() => setSelectedReceipt(receipt)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                    >
                      View Details
                    </button>
                  )}
                  <button
                    onClick={() => deleteReceipt(receipt.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Receipt Details Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Receipt Details</h3>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Basic Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p><span className="font-medium">Filename:</span> {selectedReceipt.filename}</p>
                    <p><span className="font-medium">Merchant:</span> {selectedReceipt.extractedData.merchantName}</p>
                    <p><span className="font-medium">Date:</span> {selectedReceipt.extractedData.date}</p>
                    <p><span className="font-medium">Total:</span> ${selectedReceipt.extractedData.total?.toFixed(2)}</p>
                  </div>
                </div>

                {selectedReceipt.extractedData.items && selectedReceipt.extractedData.items.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Items</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-2">
                        {selectedReceipt.extractedData.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                            <div>
                              <span className="font-medium">{item.name}</span>
                              {item.quantity && <span className="text-gray-600 ml-2">x{item.quantity}</span>}
                            </div>
                            <span className="font-semibold">${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
