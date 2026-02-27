CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(30) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uhid VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  date_of_birth DATE NOT NULL,
  mobile VARCHAR(15) NOT NULL,
  address TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE opd_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  doctor_id UUID REFERENCES users(id),
  appointment_time TIMESTAMP,
  token_no INT,
  diagnosis TEXT,
  prescription JSONB,
  billed_amount NUMERIC(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ipd_admissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  admission_no VARCHAR(30) UNIQUE NOT NULL,
  ward VARCHAR(50) NOT NULL,
  bed_no VARCHAR(20) NOT NULL,
  admit_time TIMESTAMP DEFAULT NOW(),
  discharge_time TIMESTAMP,
  status VARCHAR(20) DEFAULT 'ADMITTED'
);

CREATE TABLE billing_invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_no VARCHAR(30) UNIQUE NOT NULL,
  patient_id UUID REFERENCES patients(id),
  bill_type VARCHAR(20) NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  gst_amount NUMERIC(10,2) NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  payment_mode VARCHAR(20),
  payment_status VARCHAR(20) DEFAULT 'PAID',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pharmacy_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_name VARCHAR(120) NOT NULL,
  batch_no VARCHAR(40) NOT NULL,
  expiry_date DATE NOT NULL,
  stock_qty INT NOT NULL,
  mrp NUMERIC(10,2) NOT NULL,
  sale_rate NUMERIC(10,2) NOT NULL
);

CREATE TABLE lab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id),
  test_code VARCHAR(30),
  test_name VARCHAR(120),
  sample_status VARCHAR(20),
  result_data JSONB,
  reported_at TIMESTAMP
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action VARCHAR(100),
  module VARCHAR(50),
  entity_id VARCHAR(80),
  payload JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
