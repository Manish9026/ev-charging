import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { badResponse, goodResponse } from '../utils/response.js';

// Auth user & get token
export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {

      const accessToken = generateToken({userId:user._id, userRole:user.role}, "15m");
    const newRefreshToken =generateToken({userId:user._id, userRole:user.role}, "7d");
       res.cookie("uAccessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("uRefreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
      return goodResponse({res,data:{user},message:"successfully logedIn!"})
    } else {

      return badResponse({res,statusCode:401,message:"Invalid email or password"})
    }
  } catch (error) {
    return badResponse({res,statusCode:500,message:error.message})
  }
};

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }
    
    const user = await User.create({
      name,
      email,
      password
    });
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Toggle favorite station
export const toggleFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const stationId = req.params.stationId;
    
    if (user) {
      const alreadyFavorite = user.favorites.includes(stationId);
      
      if (alreadyFavorite) {
        user.favorites = user.favorites.filter(id => id.toString() !== stationId);
      } else {
        user.favorites.push(stationId);
      }
      
      await user.save();
      res.json(user.favorites);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};