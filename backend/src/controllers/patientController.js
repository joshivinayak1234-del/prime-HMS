import { z } from 'zod';
import { createPatient, searchPatients } from '../services/patientService.js';

const patientSchema = z.object({
  uhid: z.string().min(6),
  fullName: z.string().min(2),
  gender: z.enum(['Male', 'Female', 'Other']),
  dateOfBirth: z.string(),
  mobile: z.string().min(10),
  address: z.string().min(3),
});

export async function createPatientHandler(req, res) {
  const parsed = patientSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: parsed.error.flatten() });
  }

  const patient = await createPatient({ ...parsed.data, createdBy: req.user.id });
  return res.status(201).json(patient);
}

export async function searchPatientHandler(req, res) {
  const q = req.query.q || '';
  const patients = await searchPatients(String(q));
  return res.status(200).json(patients);
}
