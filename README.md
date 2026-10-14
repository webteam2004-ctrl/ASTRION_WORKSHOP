# ASTRION 2K26 — Venture Launchpad Workshop Website

> **Venture Launchpad: From Idea Generation to Business Creation**  
> Organized by the **Institution's Innovation Council (IIC), VVIT University**  
> Companion workshop experience to [ASTRION 2K26](https://astrion2k26-iic.vercel.app/)

---

## 🏗️ Architecture Overview

The repository is organized into dedicated, independently deployable **Frontend** and **Backend** directories with Supabase PostgreSQL as the database layer and Resend for transactional confirmation emails:

```
astrion_workshop/
├── frontend/                     # React 19 + Vite + Three.js application
│   ├── public/                   # Static assets & textures
│   ├── src/
│   │   ├── components/           # 3D canvas, Navigation, Flowchart Schedule, Speaker Cards, Registration
│   │   │   └── sections/
│   │   │       ├── SpeakersSection.jsx  # Redesigned speaker cards + infinite carousel
│   │   │       ├── ScheduleSection.jsx  # Horizontal milestone flowchart
│   │   │       └── RegistrationSection.jsx # Form with honeypot & email status feedback
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
│   │   ├── controllers/          # Registration business logic, conflict handling, email dispatch
│   │   ├── services/             # Resend email service (emailService.js)
│   │   ├── middleware/           # Zod validator, rate limiters, error & 404 handlers
│   │   ├── routes/               # API endpoint routing
│   │   ├── app.js                # Express app setup (Helmet, CORS, rate limits, health check)
│   │   └── server.js             # HTTP server entry point & graceful shutdown
│   ├── supabase/
│   │   └── schema.sql            # Supabase PostgreSQL database migration
│   ├── .env.example              # Backend environment template
│   └── package.json              # Backend scripts & dependencies (includes 'resend')
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

### 2. Email Service Setup (Resend)

1. Sign up for [Resend](https://resend.com).
2. Generate an API Key under **API Keys** (`RESEND_API_KEY`).
3. Add and verify your custom sending domain under **Domains**:
   - Add DKIM, SPF, and DMARC DNS records provided by Resend to your domain registrar.
4. Configure an authenticated sender address (e.g. `ASTRION 2K26 <registrations@your-verified-domain.com>`).
   *(For quick local testing prior to domain verification, Resend provides `onboarding@resend.dev` to test sending to your registered account email).*

---

### 3. Backend Setup (`/backend`)

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

# Resend Email Credentials
RESEND_API_KEY=re_your_api_key
EMAIL_FROM=ASTRION 2K26 <registrations@your-verified-domain.com>
EMAIL_REPLY_TO=iic@vvit.net
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
    "databaseConfigured": true,
    "emailConfigured": true
  }
  ```

---

### 4. Frontend Setup (`/frontend`)

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

## 👥 Speaker Cards (Part 1 Redesign)

The speaker cards feature:
- **Preserved Dimensions:** Exact width (`320px` desktop, `280px` mobile), height, padding, and spacing.
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

## ✉️ Registration & Email Workflow (Part 2)

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
2. **Authoritative Database Insert:** The record is first inserted into Supabase (`registrations`).
   - If email is duplicate, Supabase unique index triggers HTTP `409 Conflict`. **No email is ever sent for duplicate registrations.**
   - If database insert fails, HTTP `500` is returned. **No email is sent for failed inserts.**
3. **Transactional Email Dispatch:** After successful database insert, the backend calls Resend.
   - User inputs are escaped (`escapeHtml`) to prevent HTML injection in email clients.
   - Dispatches a branded HTML confirmation email alongside a plain-text fallback.
4. **Resilient Status Reporting:**
   - **Email Sent (`201 Created`):**
     ```json
     {
       "success": true,
       "message": "Registration confirmed! A confirmation email has been dispatched to your email address.",
       "emailStatus": "sent",
       "emailMessageId": "msg_01jh82..."
     }
     ```
   - **Email Provider Failure / Unconfigured (`201 Created`):**
     ```json
     {
       "success": true,
       "message": "Registration successfully confirmed! (Confirmation email delivery was unavailable or skipped).",
       "emailStatus": "failed",
       "emailNotice": "Your registration is safely recorded in the database, but the confirmation email could not be sent."
     }
     ```
   - Database registration is never deleted or duplicated due to email failure.

---

## 🛡️ Email Deliverability, SPF, DKIM & DMARC

To guarantee legitimate inbox delivery and prevent classification as spam:

1. **Verify Your Custom Domain in Resend:**
   - Go to [Resend Dashboard → Domains](https://resend.com/domains) and click **Add Domain**.
   - Resend provides DNS records:
     - **DKIM (CNAME):** Cryptographically signs emails proving they originate from your authorized server.
     - **SPF (TXT / MX):** Authorizes Resend's mail servers to send emails on behalf of your domain.
     - **DMARC (TXT):** Add a DMARC policy record:
       ```
       _dmarc.yourdomain.com  TXT  v=DMARC1; p=none; rua=mailto:dmarc-reports@yourdomain.com
       ```
2. **Sender Address Alignment:**
   - Set `EMAIL_FROM` to an address on your verified domain (e.g. `ASTRION 2K26 <registrations@yourdomain.com>`).
   - Never use generic free webmail addresses (`@gmail.com`, `@yahoo.com`) as `EMAIL_FROM`.
3. **Monitoring Delivery & Bounces:**
   - Inspect the **Logs** and **Emails** tab in the Resend Dashboard to track delivery events (`delivered`, `opened`, `bounced`, `complained`).

---

## 🌐 Production Deployment

### Backend on Render
1. Add Environment Variables in Render Dashboard:
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: `https://astrion2k26-iic.vercel.app`
   - `SUPABASE_URL`: `https://your-project.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY`: `your-supabase-service-role-key`
   - `SUPABASE_REGISTRATIONS_TABLE`: `registrations`
   - `RESEND_API_KEY`: `re_your_live_api_key`
   - `EMAIL_FROM`: `ASTRION 2K26 <registrations@your-verified-domain.com>`
   - `EMAIL_REPLY_TO`: `iic@vvit.net`
2. Deploy! Verify health check at `https://your-render-api.onrender.com/api/health`.

### Frontend on Vercel
1. Set Environment Variable:
   - `VITE_API_URL`: `https://your-render-api.onrender.com`
2. Deploy frontend with `npm run build`.
