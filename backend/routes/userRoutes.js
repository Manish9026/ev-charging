import express from 'express';
import {
  authUser,
  registerUser,
  toggleFavorite
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);
router.route('/favorites/:stationId')
  .post(protect, toggleFavorite);

export default router;