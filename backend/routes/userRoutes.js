import express from 'express';
import {
  authUser,
  logout,
  registerUser,
  toggleFavorite,
  userVerify
} from '../controllers/userController.js';
import { protect,authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);
router.get('/verify-user',authenticate,userVerify);
router.get('/logout',logout);

router.route('/favorites/:stationId')
  .post(protect, toggleFavorite);

export default router;