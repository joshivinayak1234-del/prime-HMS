# Prime HMS (Full Stack Hospital Management Software)

Production-oriented HMS blueprint for Indian hospitals with keyboard-first operations, OPD/IPD integration, billing speed, and audit/security controls.

## 1) Project Architecture

```text
prime-HMS/
  backend/                 # Node.js + Express REST API
    src/
      config/              # env and runtime config
      middleware/          # auth/RBAC/rate limiting middleware
      controllers/         # thin HTTP handlers
      services/            # business logic + DB operations
      routes/              # module-wise API routes
      utils/               # DB and helper utilities
    prisma/schema.sql      # PostgreSQL schema
  frontend/                # React + Tailwind desktop-focused UI
    src/
      components/          # reusable UI parts
      pages/               # module pages
      hooks/               # keyboard/hotkey hooks
      shortcuts/           # centralized shortcut map
  docs/
    api-contract.md        # API structure and payload examples
    deployment.md          # production deployment steps
```

## 2) Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express (REST API)
- **Database**: PostgreSQL (`backend/prisma/schema.sql`)
- **Security**: JWT auth, role-based access control, Helmet, rate limiting, audit logs table
- **Performance target**: sub-second operations through indexed search, short payloads, and keyboard-first UX

## 3) Keyboard-First UX Model

| Shortcut | Action |
|---|---|
| F1 | New Patient Registration |
| F2 | Search Patient |
| F3 | OPD Billing |
| F4 | IPD Admission |
| F5 | Pharmacy Billing |
| F6 | Lab Test Entry |
| F7 | Discharge Summary |
| Ctrl+S | Save |
| Ctrl+P | Print Invoice |

The frontend includes a centralized shortcut map and global event hook that routes actions to the relevant module tab.

## 4) Functional Module Coverage

- ✅ Patient registration + fast search endpoint
- ✅ OPD billing sample endpoint
- ✅ IPD admission sample endpoint
- ✅ Pharmacy billing sample endpoint
- ✅ Dashboard cards (revenue, occupancy, dues)
- ✅ Role-based API route protection
- ✅ PostgreSQL schema for OPD/IPD/Billing/Pharmacy/Lab/Audit

## 5) Required Integrations (Implementation-ready plan)

- **SMS**: use providers like MSG91/Twilio through event-driven notification service.
- **Email**: SMTP worker queue for prescriptions/reports/discharge notifications.
- **Barcode printing**: generate Code128 patient/sample labels via frontend print templates.
- **Payment gateway**: Razorpay/PayU backend verification routes.
- **Printer integration**: browser print layout for A4 and 80mm thermal invoice.
- **Cloud backup**: daily PostgreSQL logical backups to S3-compatible object storage.

## 6) Quick Start

### Backend

```bash
cd backend
npm install
cp .env.example .env  # create manually if needed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 7) Production Readiness Checklist

- Enforce HTTPS + secure cookies in reverse proxy.
- Add Redis caching for high-volume queues/search suggestions.
- Add background workers for notifications and report rendering.
- Implement database indexes on `patients(uhid, full_name, mobile)` and invoice lookup fields.
- Add automated tests (API + UI shortcut coverage).
- Enable centralized logging and SIEM integration.

## 8) Default Demo Credentials

- `admin / admin123`
- `billing / billing123`

> Change credentials and JWT secret before production usage.
