export async function createOpdBill(req, res) {
  return res.status(201).json({
    invoiceNo: `OPD-${Date.now()}`,
    patientId: req.body.patientId,
    doctorFee: req.body.doctorFee,
    status: 'PAID',
    paymentMode: req.body.paymentMode,
  });
}

export async function admitIpd(req, res) {
  return res.status(201).json({
    admissionNo: `IPD-${Date.now()}`,
    patientId: req.body.patientId,
    ward: req.body.ward,
    bedNo: req.body.bedNo,
    status: 'ADMITTED',
  });
}

export async function pharmacyBill(req, res) {
  const total = (req.body.items || []).reduce(
    (sum, item) => sum + item.qty * item.rate,
    0,
  );
  return res.status(201).json({
    invoiceNo: `PHA-${Date.now()}`,
    total,
    status: 'PAID',
  });
}
