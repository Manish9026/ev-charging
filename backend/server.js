import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { initSocket } from './socket.js';
import stationRoutes from './routes/stationRoutes.js';
import userRoutes from './routes/userRoutes.js';
import Station from './models/Station.js';

dotenv.config();

// Connect to database
connectDB();

const app = express();
const httpServer = createServer(app);
const io = initSocket(httpServer);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/stations', stationRoutes);
app.use('/api/users', userRoutes);

// Simulate status changes for demo purposes
// setInterval(async () => {
//   try {
//     const stations = await Station.find({});
//     stations.forEach(async (station) => {
//       if (Math.random() < 0.1) {
//         const statuses = ['available', 'occupied', 'offline'];
//         const currentIndex = statuses.indexOf(station.status);
//         let newIndex;
//         console.log(station);
        
        
//         do {
//           newIndex = Math.floor(Math.random() * statuses.length);
//         } while (newIndex === currentIndex);
        
//         station.status = statuses[newIndex];
//         await station.save();
        
//         io.emit('stationStatusUpdated', {
//           stationId: station._id,
//           status: station.status
//         });
//       }
//     });
    
//     console.log('Updated station statuses');
//   } catch (error) {
//     console.error('Error updating stations:', error);
//   }
// }, 30000);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});