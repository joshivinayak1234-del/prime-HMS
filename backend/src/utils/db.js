import pkg from 'pg';
import { env } from '../config/env.js';

const { Pool } = pkg;

export const pool = new Pool({ connectionString: env.databaseUrl });

export async function query(text, params = []) {
  const start = performance.now();
  const result = await pool.query(text, params);
  const durationMs = Math.round(performance.now() - start);
  return { ...result, durationMs };
}
