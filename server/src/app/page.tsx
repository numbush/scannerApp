'use client'

import { useState, useEffect } from 'react'

interface Receipt {
  id: string
  filename: string
  uploadDate: string
  status: 'processing' | 'completed' | 'error'
  extractedText?: string
  error?: string
}

export default function Home() {
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    fetchReceipts()
  }, [])

  const fetchReceipts = async () => {
    try {
      const response = await fetch('/api/receipts')
      if (response.ok) {
        const data = await response.json()
        setReceipts(data)
      }
    } catch (error) {
      console.error('Error fetching receipts:', error)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    const formData = new FormData()
    formData.append('receipt', selectedFile)

    try {
      const response = await fetch('/api/receipts/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const newReceipt = await response.json()
        setReceipts(prev => [newReceipt, ...prev])
        setSelectedFile(null)
        // Reset file input
        const fileInput = document.getElementById('file-input') as HTMLInputElement
        if (fileInput) fileInput.value = ''
      } else {
        console.error('Upload failed')
      }
    } catch (error) {
      console.error('Error uploading receipt:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/receipts/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setReceipts(prev => prev.filter(receipt => receipt.id !== id))
      }
    } catch (error) {
      console.error('Error deleting receipt:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Receipt Scanner</h1>
        
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Receipt</h2>
          <div className="flex items-center gap-4">
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </div>

        {/* Receipts List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Your Receipts</h2>
          </div>
          <div className="divide-y">
            {receipts.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No receipts uploaded yet. Upload your first receipt above!
              </div>
            ) : (
              receipts.map((receipt) => (
                <div key={receipt.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{receipt.filename}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Uploaded: {new Date(receipt.uploadDate).toLocaleDateString()}
                      </p>
                      <div className="mt-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          receipt.status === 'completed' 
                            ? 'bg-green-100 text-green-800'
                            : receipt.status === 'processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {receipt.status}
                        </span>
                      </div>
                      {receipt.extractedText && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-md">
                          <p className="text-sm font-medium text-gray-700 mb-1">Extracted Text:</p>
                          <p className="text-sm text-gray-600">{receipt.extractedText}</p>
                        </div>
                      )}
                      {receipt.error && (
                        <div className="mt-3 p-3 bg-red-50 rounded-md">
                          <p className="text-sm font-medium text-red-700 mb-1">Error:</p>
                          <p className="text-sm text-red-600">{receipt.error}</p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(receipt.id)}
                      className="ml-4 px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
