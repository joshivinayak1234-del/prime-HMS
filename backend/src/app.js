import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { router } from './routes/index.js';

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));
app.use(
  rateLimit({
    windowMs: 60_000,
    max: 300,
  }),
);

app.use('/api/v1', router);

app.use((err, _req, res, _next) => {
  console.error('Unhandled error', err);
  res.status(500).json({ message: 'Something went wrong' });
});
