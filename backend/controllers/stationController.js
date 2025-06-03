import Station from '../models/Station.js';
import { io } from '../socket.js';

// Get all stations
export const getStations = async (req, res) => {
  try {
    const stations = await Station.find({});
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get station by ID
export const getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (station) {
      res.json(station);
    } else {
      res.status(404).json({ message: 'Station not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create station
export const createStation = async (req, res) => {
  try {
    const station = new Station(req.body);
    const createdStation = await station.save();
    io.emit('stationCreated', createdStation);
    res.status(201).json(createdStation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update station
export const updateStation = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id);
    if (station) {
      Object.assign(station, req.body);
      const updatedStation = await station.save();
      io.emit('stationUpdated', updatedStation);
      res.json(updatedStation);
    } else {
      res.status(404).json({ message: 'Station not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update station status
export const updateStationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const station = await Station.findById(req.params.id);
    if (station) {
      station.status = status;
      const updatedStation = await station.save();
      io.emit('stationStatusUpdated', {
        stationId: station._id,
        status: station.status
      });
      res.json(updatedStation);
    } else {
      res.status(404).json({ message: 'Station not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add review
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const station = await Station.findById(req.params.id);
    
    if (station) {
      const review = {
        user: req.user._id,
        rating,
        comment
      };
      
      station.reviews.push(review);
      station.rating = station.reviews.reduce((acc, item) => item.rating + acc, 0) / station.reviews.length;
      
      const updatedStation = await station.save();
      io.emit('reviewAdded', {
        stationId: station._id,
        review,
        newRating: station.rating
      });
      
      res.status(201).json(updatedStation);
    } else {
      res.status(404).json({ message: 'Station not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};