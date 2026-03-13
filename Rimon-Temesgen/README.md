# Rimon-Temesgen

This project has:

- a Vue frontend inside `frontend`
- an Express and MongoDB backend inside `backend`

## Frontend Setup

1. Go into the frontend folder
2. Copy `.env.example` to `.env`
3. Make sure `VITE_API_URL` points to the backend
4. Run:

```sh
cd frontend
npm install
npm run dev
```

Frontend files are inside:

```sh
frontend
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
cd frontend
npm run build
```
