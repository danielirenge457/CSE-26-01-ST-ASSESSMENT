# Rimon-Temesgen

This project has:

- a Vue frontend in the root folder
- an Express and MongoDB backend inside `backend`

## Frontend Setup

1. Copy `.env.example` to `.env`
2. Make sure `VITE_API_URL` points to the backend
3. Run:

```sh
npm install
npm run dev
```

Frontend default URL:

```sh
http://localhost:5173
```

## Backend Setup

1. Go into the backend folder
2. Copy `.env.example` to `.env`
3. Add your MongoDB connection string
4. Run:

```sh
cd backend
npm install
npm run dev
```

Backend default URL:

```sh
http://localhost:5000
```

## API Route Used By The Form

```sh
POST /api/beneficiaries
```

## Build Frontend

```sh
npm run build
```
