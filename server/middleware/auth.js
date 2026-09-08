// server/middleware/auth.js — API key authentication middleware
import dotenv from 'dotenv';
dotenv.config();

const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

export const requireAdminKey = (req, res, next) => {
  const key = req.headers['x-admin-key'];
  if (!key || key !== ADMIN_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing admin API key' });
  }
  next();
};
