import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const users = [
  {
    id: '1',
    username: 'admin',
    role: 'ADMIN',
    passwordHash: bcrypt.hashSync('admin123', 10),
  },
  {
    id: '2',
    username: 'billing',
    role: 'BILLING',
    passwordHash: bcrypt.hashSync('billing123', 10),
  },
];

export function login(req, res) {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, {
    expiresIn: '10h',
  });

  return res.json({ token, role: user.role, userId: user.id });
}
