import { query } from '../utils/db.js';

export async function createPatient(payload) {
  const sql = `
    INSERT INTO patients (uhid, full_name, gender, date_of_birth, mobile, address, created_by)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
  `;
  const values = [
    payload.uhid,
    payload.fullName,
    payload.gender,
    payload.dateOfBirth,
    payload.mobile,
    payload.address,
    payload.createdBy,
  ];
  const { rows } = await query(sql, values);
  return rows[0];
}

export async function searchPatients(searchTerm) {
  const sql = `
    SELECT id, uhid, full_name, mobile, created_at
    FROM patients
    WHERE full_name ILIKE $1 OR mobile ILIKE $1 OR uhid ILIKE $1
    ORDER BY created_at DESC
    LIMIT 25
  `;
  const { rows } = await query(sql, [`%${searchTerm}%`]);
  return rows;
}
