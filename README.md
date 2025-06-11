# Receipt Scanner App

A full-stack receipt scanning application with mock OCR functionality.

## Project Structure

```
receipt-scanner-app/
├── client/                 # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── App.tsx        # Main React component
│   │   ├── main.tsx       # React entry point
│   │   ├── index.css      # Tailwind CSS styles
│   │   └── App.css        # Component styles
│   ├── package.json       # Frontend dependencies
│   ├── vite.config.ts     # Vite configuration
│   ├── tsconfig.json      # TypeScript config
│   ├── tailwind.config.js # Tailwind CSS config
│   └── index.html         # HTML template
├── server/                # Next.js backend API
│   ├── src/app/api/
│   │   └── receipts/      # Receipt API endpoints
│   │       ├── route.ts           # GET /api/receipts
│   │       ├── upload/route.ts    # POST /api/receipts/upload
│   │       └── [id]/route.ts      # GET/DELETE /api/receipts/:id
│   ├── lib/
│   │   ├── mockDatabase.ts        # Mock database
│   │   └── mockReceiptService.ts  # Mock OCR service
│   ├── package.json       # Backend dependencies
│   ├── next.config.js     # Next.js configuration
│   └── tsconfig.json      # TypeScript config
└── README.md              # This file
```

## Features

- **File Upload**: Upload receipt images (JPEG, PNG, GIF)
- **Mock OCR Processing**: Simulates text extraction from receipts
- **Receipt Management**: View, list, and delete receipts
- **Real-time Updates**: Processing status updates
- **Responsive Design**: Built with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install client dependencies:**
   ```bash
   cd client
   npm install
   ```

2. **Install server dependencies:**
   ```bash
   cd ../server
   npm install
   ```

### Development

1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```
   Server runs on http://localhost:3002

2. **Start the frontend client:**
   ```bash
   cd client
   npm run dev
   ```
   Client runs on http://localhost:3001

### API Endpoints

- `GET /api/receipts` - Get all receipts
- `POST /api/receipts/upload` - Upload a new receipt
- `GET /api/receipts/:id` - Get a specific receipt
- `DELETE /api/receipts/:id` - Delete a receipt

### Mock Data

The app uses mock services to simulate:
- OCR text extraction from receipt images
- Database storage and retrieval
- File validation and processing

### Technology Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS

**Backend:**
- Next.js 14
- TypeScript
- Mock services for OCR and database

## Notes

This is a development version with mock services. In production, you would integrate:
- Real OCR service (Google Vision API, AWS Textract, etc.)
- Actual database (PostgreSQL, MongoDB, etc.)
- File storage service (AWS S3, etc.)
- Authentication and authorization
