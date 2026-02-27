# API Contract (v1)

Base URL: `/api/v1`

## Auth
- `POST /auth/login`
  - body: `{ "username": "admin", "password": "admin123" }`
  - response: `{ "token": "...", "role": "ADMIN", "userId": "1" }`

## Patients
- `POST /patients`
  - headers: `Authorization: Bearer <token>`
  - body: `{ "uhid":"UHID001", "fullName":"Asha Sharma", "gender":"Female", "dateOfBirth":"1994-08-10", "mobile":"9876543210", "address":"Delhi" }`

- `GET /patients/search?q=asha`
  - headers: `Authorization: Bearer <token>`

## OPD
- `POST /opd/billing`
  - roles: `ADMIN`, `BILLING`
  - body: `{ "patientId":"uuid", "doctorFee":600, "paymentMode":"UPI" }`

## IPD
- `POST /ipd/admissions`
  - roles: `ADMIN`, `RECEPTION`
  - body: `{ "patientId":"uuid", "ward":"General", "bedNo":"G-12" }`

## Pharmacy
- `POST /pharmacy/billing`
  - roles: `ADMIN`, `BILLING`
  - body: `{ "items":[{"name":"Paracetamol", "qty":2, "rate":15}] }`

## Health
- `GET /health`
