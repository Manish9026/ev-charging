export interface GeoLocation {
  type: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  helpfulCount: number;
}

export interface Amenity {
  type: string;
  available: boolean;
}

export interface Station {
  _id: string;
  name: string;
  operator: string;
  address: string;
  location: GeoLocation;
  chargerTypes: string[];
  status: 'available' | 'occupied' | 'offline';
  pricePerKwh: number;
  rating: number;
  reviews: Review[];
  amenities: Amenity[];
  images: string[];
  contactPhone?: string;
  openingHours?: {
    days: string;
    hours: string;
  }[];
}