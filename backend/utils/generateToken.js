import jwt from 'jsonwebtoken';



export function generateToken(payload,expiresIn) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn:expiresIn?expiresIn: "15m" });
};

export default generateToken;