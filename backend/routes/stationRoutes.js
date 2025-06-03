import express from 'express';
import {
  getStations,
  getStationById,
  createStation,
  updateStation,
  updateStationStatus,
  addReview
} from '../controllers/stationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getStations)
  .post(protect, admin, createStation);

router.route('/:id')
  .get(getStationById)
  .put(protect, admin, updateStation);

router.route('/:id/status')
  .put(protect, admin, updateStationStatus);

router.route('/:id/reviews')
  .post(protect, addReview);

export default router;