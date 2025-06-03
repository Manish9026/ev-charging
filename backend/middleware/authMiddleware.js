import jwt from 'jsonwebtoken';
import User from '../models/User.js';

import { configDotenv } from 'dotenv';
import { badResponse } from '../utils/response.js';
configDotenv();
// Utility function to generate new tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

// Middleware
export const authenticate = async (req, res, next) => {
 const accessToken=req.cookies?.uAccessToken;
const refreshToken = req.cookies?.uRefreshToken;
console.log(accessToken,refreshToken,req.cookies);

  let user;
  // Try verifying the access token
  if (!accessToken && !refreshToken) return badResponse({res,statusCode:401,message:" Unauthorized"}) 

    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      console.log(decoded);
      
      user=await User.findById(decoded.id).select('-password');
      if(!user) throw new Error("invalid token !!");
      req.user = user;
      return next();
    } catch (err) {
      console.log(err);
      
     try {
    const decodedRefresh = jwt.verify(refreshToken, process.env.JWT_SECRET);

    // You can query user data from DB here if needed
    
      user=await User.findById(decodedRefresh.id).select('-password');
      if(!user) throw new Error("invalid token !!");
    // const user = { id: decodedRefresh.id, role: "user" }; // Mock or from DB
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens({id:user?._id,isAdmin:user?.isAdmin});
    // Set the new refresh token in the cookie
    res.cookie("uAccessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.cookie("uRefreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Attach user to request
    req.user = user;
    next();
    
  } catch (err) {
    return res.status(403).json({ message: "Session expired, please login again" });
  }
    }
  


  
};



export const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as admin' });
  }
};