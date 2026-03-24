# Loan App

A full-stack application for loan management built with React (frontend) and Node.js/Express (backend).

## Project Structure

```
loan.app/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── public/
│   └── package.json
├── backend/           # Node.js/Express API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── config/
│   └── package.json
└── README.md
```

## Getting Started

### Backend Setup

```bash
cd backend
npm install
npm start
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Application runs on `http://localhost:5173`

## Environment Variables

See `.env.example` files in respective directories.
