import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    name:String,
    id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
    }
   
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  helpfulCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  operator: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  address: {
    type: String,
    required: true
  },
  chargerTypes: [{
    type: String,
    required: true
  }],
  pricePerKwh: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'occupied', 'offline'],
    default: 'available'
  },
  amenities: [{
    type: {
      type: String,
      required: true
    },
    available: {
      type: Boolean,
      default: true
    }
  }],
  reviews: [reviewSchema],
  rating: {
    type: Number,
    default: 0
  },
  images: [String],
  contactPhone: String,
  openingHours: [{
    days: String,
    hours: String
  }]
}, { timestamps: true });

stationSchema.index({ location: '2dsphere' });

const Station = mongoose.model('Station', stationSchema);

export default Station;