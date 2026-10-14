# ASTRION 2K26 — Venture Launchpad Workshop Website

> **Venture Launchpad: From Idea Generation to Business Creation**  
> Organized by the **Institution's Innovation Council (IIC), VVIT University**  
> Companion workshop experience to [ASTRION 2K26](https://astrion2k26-iic.vercel.app/)

---

## 🏗️ Architecture Overview

The repository is organized into dedicated, independently deployable **Frontend** and **Backend** directories with Supabase PostgreSQL as the database layer:

```
astrion_workshop/
├── frontend/                     # React 19 + Vite + Three.js application
│   ├── public/                   # Static assets & textures
│   ├── src/
│   │   ├── components/           # 3D canvas, Navigation, Flowchart Schedule, Speaker Cards, Registration
│   │   │   └── sections/
│   │   │       ├── SpeakersSection.jsx  # Speaker cards + infinite carousel
│   │   │       ├── ScheduleSection.jsx  # Horizontal milestone flowchart
│   │   │       └── RegistrationSection.jsx # Form with honeypot & confirmation UI
│   │   ├── services/             # API client (registrationService.js)
│   │   ├── data/                 # Workshop schedule & speaker data (Day 1 & Day 2)
│   │   └── ...
│   ├── .env.example              # Frontend environment template
│   ├── package.json              # Frontend scripts & dependencies
│   └── vite.config.js            # Vite configuration
│
├── backend/                      # Node.js + Express (ES Modules) API
│   ├── src/
│   │   ├── config/               # Supabase database client initialization
│   │   ├── controllers/          # Registration business logic & conflict handling
│   │   ├── middleware/           # Zod validator, rate limiters, error & 404 handlers
│   │   ├── routes/               # API endpoint routing
│   │   ├── app.js                # Express app setup (Helmet, CORS, rate limits, health check)
│   │   └── server.js             # HTTP server entry point & graceful shutdown
│   ├── supabase/
│   │   └── schema.sql            # Supabase PostgreSQL database migration
│   ├── .env.example              # Backend environment template
│   └── package.json              # Backend scripts & dependencies
│
├── supabase_schema.sql           # Root copy of Supabase migration script
├── .gitignore                    # Git rules (protects all .env files & node_modules)
└── README.md                     # Documentation & deployment guides
```

---

## 🚀 Quick Start (Local Development)

### 1. Database Setup (Supabase)

1. Create a project at [supabase.com](https://supabase.com).
2. In the Supabase Dashboard, open the **SQL Editor** tab.
3. Paste and run the contents of [`supabase_schema.sql`](./supabase_schema.sql).
   This creates:
   - `registrations` table with UUID primary key.
   - Unique case-insensitive index on email: `idx_registrations_email_unique` on `LOWER(TRIM(email))`.
   - Row Level Security (RLS) policies protecting registrant PII from public reads while allowing backend insertion.
4. Copy your project credentials from **Project Settings → API**:
   - Project URL (`SUPABASE_URL`)
   - `service_role` secret key (`SUPABASE_SERVICE_ROLE_KEY`)

---

### 2. Backend Setup (`/backend`)

```bash
cd backend
npm install
```

Create `.env` inside `/backend` (copied from `.env.example`):

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173,https://astrion2k26-iic.vercel.app

# Supabase PostgreSQL Credentials
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
SUPABASE_REGISTRATIONS_TABLE=registrations
```

Run backend:
```bash
# Production start
npm start

# Development mode with auto-reload
npm run dev
```

Verify backend health:
- `http://localhost:5000/api/health`
  Returns:
  ```json
  {
    "status": "ok",
    "service": "astrion-workshop-backend",
    "version": "1.0.0",
    "databaseConfigured": true
  }
  ```

---

### 3. Frontend Setup (`/frontend`)

```bash
cd frontend
npm install
```

Create `.env` inside `/frontend` (copied from `.env.example`):

```env
VITE_API_URL=http://localhost:5000
```

Start the Vite development server:
```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 👥 Speaker Cards

The speaker cards feature:
- **Card Dimensions:** Exact width (`320px` desktop, `280px` mobile), height, padding, and spacing.
- **Dedicated Portrait Area:** Softly rounded 68px circular frame with subtle cyan/violet border and soft radial glassmorphism background.
- **Graceful Fallback:** If `photo` / `imageUrl` is `null`, missing, or fails to load, it automatically renders a minimal user silhouette with no broken image icons.
- **Reusable Data Schema:**
  ```javascript
  {
    id: 'ravi-shankar',
    day: 'Day 1 (23 Oct)',
    name: 'Ravi Shankar sir',
    role: 'Session Speaker',
    session: 'Solar + EV Charging Session (statutory aspects)',
    timing: '11:00 AM – 1:00 PM',
    photo: null, // Supports local path (e.g. '/speakers/ravi.jpg') or external URL
    accent: '#00e5ff',
    icon: '⚡',
    badge: 'Solar & EV Mobility',
    note: 'Sharing expertise on solar energy systems, EV charging infrastructure, and statutory aspects.',
  }
  ```
- **Text Hierarchy & Overflow Protection:** Names and roles use single-line ellipsis truncation, session titles are clamped to 2 lines, and notes to 3 lines.
- **Accessibility:** Duplicate track cards for the infinite carousel are marked with `aria-hidden="true"` and `tabIndex={-1}` to prevent redundant announcements to screen readers.

---

## 📝 Registration Workflow

### Registration Endpoint: `POST /api/registrations`

**Request Body**:
```json
{
  "name": "Santhosh Kumar",
  "email": "santhosh@vvit.net",
  "phone": "+91 98765 43210",
  "college": "VVIT University",
  "department": "Computer Science & Engineering",
  "year": "3",
  "website": ""
}
```

> **Anti-Bot Honeypot**: The hidden `website` field traps automated web bots. Populated submissions are rejected immediately (`400 Bad Request`).

### Workflow Rules:
1. **Input Validation:** Zod validates field lengths, formats, and phone numbers.
2. **Authoritative Database Insert:** The record is inserted into Supabase (`registrations`).
   - If email is duplicate, Supabase unique index triggers HTTP `409 Conflict`.
   - If database insert fails, HTTP `500` is returned.
3. **Response (`201 Created`):**
   ```json
   {
     "success": true,
     "message": "Registration confirmed! Welcome to Venture Launchpad at ASTRION 2K26.",
     "data": {
       "id": "67b938f3-4e4b-4b2a-a924-f7e9140f80bc",
       "name": "Santhosh Kumar",
       "email": "santhosh@vvit.net",
       "college": "VVIT University",
       "createdAt": "2026-10-13T17:35:00.000Z"
     }
   }
   ```

---

## 🌐 Production Deployment

### Backend on Render
1. Configure Web Service on [render.com](https://render.com):
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/api/health`
2. Add Environment Variables in Render Dashboard:
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: `https://astrion2k26-iic.vercel.app`
   - `SUPABASE_URL`: `https://your-project.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY`: `your-supabase-service-role-key`
   - `SUPABASE_REGISTRATIONS_TABLE`: `registrations`
3. Deploy! Verify health check at `https://your-render-api.onrender.com/api/health`.

### Frontend on Vercel
1. Set Environment Variable:
   - `VITE_API_URL`: `https://your-render-api.onrender.com`
2. Deploy frontend with `npm run build`.
