import { onRequest } from 'firebase-functions/v2/https';

export const health = onRequest({ region: 'us-central1', cors: false }, (_req, res) => {
  res.status(200).json({ status: 'ok', ts: new Date().toISOString() });
});
