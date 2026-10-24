# PeerForge Frontend

PeerForge is a mentoring marketplace for software engineers and people learning technology. This repository contains the React single-page application; the Spring Boot API is in the [backend repository](https://github.com/vdushyant/PeerForge).

## What the app supports

- Discover mentors, view profiles, skills, availability, and reviews.
- Create an account and sign in with email and password.
- Manage a learner profile and skills.
- Apply as a mentor and manage mentor availability and sessions.
- Book and manage sessions, exchange session messages, and share a meeting link.
- Pay for a booked session using a Razorpay UPI QR code.
- View in-app notifications, ratings, and role-specific dashboards.
- Administrator workflows for mentor applications and review moderation.

## Stack

- React 19, TypeScript, and Vite
- React Router for navigation
- TanStack Query for server state
- Axios for API requests
- Tailwind CSS and Radix-based UI components

## Run locally

Prerequisites: Node.js/npm and a running PeerForge backend.

```bash
npm install
```

Set the backend API base URL before starting Vite. The variable must include `/api/v1`:

```powershell
$env:VITE_API_BASE_URL = "http://localhost:8080/api/v1"
npm run dev
```

For macOS/Linux shells:

```bash
VITE_API_BASE_URL=http://localhost:8080/api/v1 npm run dev
```

Vite displays the local URL (normally `http://localhost:5173`). Create accounts through the UI or use an existing development account.

## Build and preview

```bash
npm run build
npm run preview
```

Set `VITE_API_BASE_URL` to the intended API base URL before building for deployment. The static production output is in `dist/`. For a single-page app host, configure unknown paths to serve `index.html` so client-side routes such as `/login` continue to work after refresh.

## Useful scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create the production bundle |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production bundle locally |

## API and CORS

The API URL is read from `VITE_API_BASE_URL` in `src/config/env.ts`. The backend must allow the exact frontend origin in its CORS configuration. If API Gateway is used, add the same origin to API Gateway CORS as well. The frontend sends bearer access tokens for authenticated API calls and handles refresh-token flow through its auth API/interceptors.

See the backend repository README for database configuration, API documentation, Postman collection, payment setup, and other service details.
