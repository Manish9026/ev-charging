import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();

export function generateToken(payload,expiresIn) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:expiresIn?expiresIn: "15m" });
};

export default generateToken;