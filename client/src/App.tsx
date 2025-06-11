import { useState, useEffect } from 'react'
import './App.css'
import ReceiptUpload from './components/ReceiptUpload'
import ReceiptList from './components/ReceiptList'

function App() {
  const [activeTab, setActiveTab] = useState<'upload' | 'list'>('upload')
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [isRealOcr, setIsRealOcr] = useState(true)
  const [ocrMode, setOcrMode] = useState('Real OCR')

  const handleUploadSuccess = () => {
    setRefreshTrigger(prev => prev + 1)
    setActiveTab('list')
  }

  const fetchOcrMode = async () => {
    try {
      const response = await fetch('/api/ocr-mode')
      if (response.ok) {
        const data = await response.json()
        setIsRealOcr(data.isRealOcr)
        setOcrMode(data.mode)
      }
    } catch (error) {
      console.error('Failed to fetch OCR mode:', error)
    }
  }

  const toggleOcrMode = async () => {
    try {
      const response = await fetch('/api/ocr-mode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ useRealOcr: !isRealOcr }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setIsRealOcr(data.isRealOcr)
        setOcrMode(data.mode)
      }
    } catch (error) {
      console.error('Failed to toggle OCR mode:', error)
    }
  }

  useEffect(() => {
    fetchOcrMode()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Receipt Scanner App</h1>
            <p className="text-lg text-gray-600">Upload, process, and manage your receipts with OCR technology</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('upload')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'upload'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload Receipt
              </div>
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'list'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                My Receipts
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'upload' && (
          <div className="space-y-8">
            {/* Upload Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload New Receipt</h2>
              <ReceiptUpload onUploadSuccess={handleUploadSuccess} />
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Drag & Drop Upload</h3>
                  <p className="text-gray-600 text-sm">Simply drag your receipt images or click to browse</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart OCR Processing</h3>
                  <p className="text-gray-600 text-sm">Automatically extract merchant, date, total, and items</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Organized Storage</h3>
                  <p className="text-gray-600 text-sm">View, search, and manage all your receipts in one place</p>
                </div>
              </div>
            </div>

            {/* OCR Mode Control */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">OCR Processing Mode</h3>
                  <p className="text-sm text-gray-600">
                    {isRealOcr 
                      ? 'Intelligent OCR analyzes your images for realistic data (2-3 seconds)'
                      : 'Fast Mock generates smart sample data (instant)'
                    }
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    isRealOcr 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {ocrMode}
                  </div>
                  <button
                    onClick={toggleOcrMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isRealOcr ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isRealOcr ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              {!isRealOcr && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs text-yellow-700">
                    <strong>Fast Mode:</strong> Using intelligent mock data generation. 
                    Switch to Real OCR for actual text extraction from your images.
                  </p>
                </div>
              )}
              
              {isRealOcr && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-xs text-green-700">
                    <strong>Intelligent OCR Mode:</strong> Advanced analysis of your receipt images to generate 
                    realistic data based on filename, image size, and content patterns. Much faster than traditional OCR!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'list' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <ReceiptList refreshTrigger={refreshTrigger} />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
