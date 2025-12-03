# Frontend Developer Task (React + Express + MongoDB)

## Overview
This repository contains a simple full-stack app with JWT authentication and a tasks CRUD dashboard.

## Setup

### Backend
1. `cd backend`
2. Create `.env` from `.env.example` and set `MONGODB_URI` and `JWT_SECRET`.
3. `npm install`
4. `npm run dev` (requires nodemon) or `npm start`

API server runs on `http://localhost:5000` by default.

### Frontend
1. `cd frontend`
2. `npm install`
3. Create `.env` with `VITE_API_BASE=http://localhost:5000/api` (optional)
4. `npm run dev`

Frontend runs on `http://localhost:5173` (Vite default).

## Postman
Import `postman_collection.json` and set `baseUrl` to `http://localhost:5000`.

## Deliverables
- Functional authentication (signup/login/logout)
- Dashboard with user profile and tasks CRUD
- Postman collection included
- Notes on scaling are at the end of this README

## Notes on scaling & production-readiness
- Move JWT to HttpOnly cookie; add CSRF protection.
- Use a reverse proxy (Nginx) and HTTPS with certs.
- Containerize with Docker; deploy on ECS/GKE.
- Use Redis for session caching / rate limiting.
- Use a managed DB (Atlas / RDS) with connection pooling and read replicas.
- Add monitoring (Prometheus/Grafana) and centralized logging (ELK).
