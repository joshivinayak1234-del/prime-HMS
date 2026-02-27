import { Router } from 'express';
import { login } from '../controllers/authController.js';
import {
  createPatientHandler,
  searchPatientHandler,
} from '../controllers/patientController.js';
import {
  createOpdBill,
  admitIpd,
  pharmacyBill,
} from '../controllers/workflowController.js';
import { authenticate, authorize } from '../middleware/auth.js';

export const router = Router();

router.post('/auth/login', login);

router.use(authenticate);

router.post('/patients', createPatientHandler);
router.get('/patients/search', searchPatientHandler);

router.post('/opd/billing', authorize('ADMIN', 'BILLING'), createOpdBill);
router.post('/ipd/admissions', authorize('ADMIN', 'RECEPTION'), admitIpd);
router.post('/pharmacy/billing', authorize('ADMIN', 'BILLING'), pharmacyBill);

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', moduleCoverage: ['OPD', 'IPD', 'Pharmacy', 'Billing'] });
});
