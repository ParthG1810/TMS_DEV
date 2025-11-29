# TMS Desktop Application

A desktop application built with Electron, React, and Express.

## Architecture

This application has been converted from a Next.js web application to an Electron desktop application with the following structure:

- **Electron Main Process** (`electron/`) - Controls the application window and lifecycle
- **React Frontend** (`client/`) - Vite-based React SPA with Material-UI
- **Express Backend** (`backend-server/`) - REST API server running locally

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

Install all dependencies:

```bash
npm install
```

This will automatically install dependencies for the backend-server and client directories as well.

## Development

Run the application in development mode:

```bash
npm run dev
```

This command will:
1. Start the Express backend server on port 3000
2. Start the Vite dev server on port 5173
3. Launch the Electron application

### Run Individual Services

- Backend only: `npm run dev:backend`
- Frontend only: `npm run dev:vite`
- Electron only: `npm run dev:electron`

## Building

Build the application for distribution:

```bash
npm run build
```

This will:
1. Build the Vite frontend to `/dist`
2. Build the backend server to `/backend-server/dist`
3. Package the Electron application

## Project Structure

```
TMS_DEV/
├── electron/              # Electron main process
│   ├── main.js           # Main process entry
│   └── preload.js        # Preload script
├── client/               # React frontend (Vite)
│   ├── main.tsx          # App entry point
│   ├── App.tsx           # Root component
│   ├── routes/           # React Router configuration
│   ├── shims/            # Next.js compatibility shims
│   └── config.ts         # Client configuration
├── backend-server/       # Express API server
│   └── src/
│       ├── server.ts     # Server entry point
│       ├── routes/       # API routes
│       └── _mock/        # Mock data
├── Frontend-Full/        # Original frontend source
│   └── src/
│       ├── components/
│       ├── layouts/
│       ├── sections/
│       └── ...
└── package.json          # Root package.json

```

## Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **UI Library**: Material-UI (MUI) v5
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Forms**: React Hook Form + Yup
- **Charts**: ApexCharts
- **Styling**: Emotion (CSS-in-JS)

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Authentication**: JWT

### Desktop
- **Framework**: Electron 25
- **IPC**: Context Bridge for security

## Key Features

- ✅ Desktop application with native window controls
- ✅ Local backend server bundled with the app
- ✅ Material-UI based responsive interface
- ✅ JWT authentication
- ✅ Redux state management
- ✅ Full TypeScript support
- ✅ Hot reload in development

## API Endpoints

The backend server runs on `http://localhost:3000` and provides:

- `/api/account` - Authentication (login, register, my-account)
- `/api/products` - Product management
- `/api/blog` - Blog posts
- `/api/calendar` - Calendar events
- `/api/chat` - Chat/messaging
- `/api/kanban` - Kanban board
- `/api/mail` - Mail system

## Notes

### Next.js to Vite Migration

The application has been migrated from Next.js to standard React with Vite. Key changes:

- `next/link` → React Router `Link` (shimmed)
- `next/router` → React Router hooks (shimmed)
- `next/head` → react-helmet-async (shimmed)
- Server-side rendering → Client-side only
- API routes → Express server

### Configuration

- Frontend API URL is hardcoded to `http://localhost:3000`
- Backend port can be configured via `PORT` environment variable

## Troubleshooting

If you encounter issues:

1. Delete `node_modules` and reinstall: `rm -rf node_modules backend-server/node_modules client/node_modules && npm install`
2. Clear build artifacts: `rm -rf dist backend-server/dist .next`
3. Check that ports 3000 and 5173 are available

## License

Private
