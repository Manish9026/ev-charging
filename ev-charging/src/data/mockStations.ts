import { Station } from '../types/Station';

export const mockStations: Station[] = [
  {
    _id: '1',
    name: 'Bay Area Fast Charging',
    operator: 'EV Network',
    address: '123 Market St, San Francisco, CA',
    location: {
      type: 'Point',
      coordinates: [-122.4194, 37.7749], // SF
    },
    chargerTypes: ['CCS', 'CHAdeMO', 'Type 2'],
    status: 'available',
    pricePerKwh: 0.45,
    rating: 4.5,
    reviews: [
      {
        _id: '101',
        user: {
          _id: '1001',
          name: 'John Smith',
        },
        rating: 5,
        comment: 'Great location and always available when I need it. The charging speed is excellent.',
        createdAt: '2023-05-15T12:00:00Z',
        helpfulCount: 8,
      },
      {
        _id: '102',
        user: {
          _id: '1002',
          name: 'Emily Wong',
        },
        rating: 4,
        comment: 'Reliable chargers but a bit expensive compared to others in the area.',
        createdAt: '2023-06-20T15:30:00Z',
        helpfulCount: 3,
      },
    ],
    amenities: [
      { type: 'Restroom', available: true },
      { type: 'Café', available: true },
      { type: 'Wi-Fi', available: true },
      { type: 'Parking', available: true },
    ],
    images: [
      'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    contactPhone: '(415) 555-1234',
    openingHours: [
      { days: 'Monday - Friday', hours: '6:00 AM - 10:00 PM' },
      { days: 'Saturday - Sunday', hours: '8:00 AM - 8:00 PM' },
    ],
  },
  {
    _id: '2',
    name: 'Downtown Charging Hub',
    operator: 'ChargePoint',
    address: '456 Montgomery St, San Francisco, CA',
    location: {
      type: 'Point',
      coordinates: [-122.4024, 37.7937], // SF Financial District
    },
    chargerTypes: ['Type 2', 'CCS'],
    status: 'occupied',
    pricePerKwh: 0.39,
    rating: 4.2,
    reviews: [
      {
        _id: '201',
        user: {
          _id: '2001',
          name: 'Michael Chen',
        },
        rating: 4,
        comment: 'Good location in the heart of downtown. Sometimes busy during work hours.',
        createdAt: '2023-04-10T09:15:00Z',
        helpfulCount: 5,
      },
    ],
    amenities: [
      { type: 'Restroom', available: true },
      { type: 'Café', available: false },
      { type: 'Wi-Fi', available: true },
      { type: 'Parking', available: true },
    ],
    images: [
      'https://images.pexels.com/photos/10553953/pexels-photo-10553953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    contactPhone: '(415) 555-5678',
    openingHours: [
      { days: 'Monday - Sunday', hours: '24 hours' },
    ],
  },
  {
    _id: '3',
    name: 'Tesla Supercharger - Marina',
    operator: 'Tesla',
    address: '789 Marina Blvd, San Francisco, CA',
    location: {
      type: 'Point',
      coordinates: [-122.4352, 37.8064], // Marina area
    },
    chargerTypes: ['Tesla'],
    status: 'available',
    pricePerKwh: 0.42,
    rating: 4.8,
    reviews: [
      {
        _id: '301',
        user: {
          _id: '3001',
          name: 'Sarah Johnson',
        },
        rating: 5,
        comment: 'Super fast charging and beautiful view of the bay!',
        createdAt: '2023-07-05T18:45:00Z',
        helpfulCount: 12,
      },
      {
        _id: '302',
        user: {
          _id: '3002',
          name: 'David Miller',
        },
        rating: 5,
        comment: 'Very clean and well-maintained. Never had to wait.',
        createdAt: '2023-08-12T14:20:00Z',
        helpfulCount: 7,
      },
      {
        _id: '303',
        user: {
          _id: '3003',
          name: 'Lisa Park',
        },
        rating: 4,
        comment: 'Great location but getting busier recently.',
        createdAt: '2023-09-01T11:10:00Z',
        helpfulCount: 2,
      },
    ],
    amenities: [
      { type: 'Restroom', available: true },
      { type: 'Café', available: true },
      { type: 'Wi-Fi', available: true },
      { type: 'Parking', available: true },
      { type: 'Shopping', available: true },
    ],
    images: [
      'https://images.pexels.com/photos/3118573/pexels-photo-3118573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4069071/pexels-photo-4069071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    contactPhone: '(415) 555-9012',
    openingHours: [
      { days: 'Monday - Sunday', hours: '24 hours' },
    ],
  },
  {
    _id: '4',
    name: 'Mission District Charging',
    operator: 'EVgo',
    address: '321 Valencia St, San Francisco, CA',
    location: {
      type: 'Point',
      coordinates: [-122.4221, 37.7683], // Mission District
    },
    chargerTypes: ['CCS', 'CHAdeMO'],
    status: 'offline',
    pricePerKwh: 0.48,
    rating: 3.9,
    reviews: [
      {
        _id: '401',
        user: {
          _id: '4001',
          name: 'Robert Garcia',
        },
        rating: 4,
        comment: 'Good location but sometimes there are technical issues.',
        createdAt: '2023-03-25T13:30:00Z',
        helpfulCount: 4,
      },
      {
        _id: '402',
        user: {
          _id: '4002',
          name: 'Jennifer Lee',
        },
        rating: 3,
        comment: 'Charging speed slower than advertised.',
        createdAt: '2023-05-18T10:05:00Z',
        helpfulCount: 6,
      },
    ],
    amenities: [
      { type: 'Restroom', available: false },
      { type: 'Café', available: true },
      { type: 'Wi-Fi', available: true },
      { type: 'Parking', available: true },
    ],
    images: [
      'https://images.pexels.com/photos/5089152/pexels-photo-5089152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    contactPhone: '(415) 555-3456',
    openingHours: [
      { days: 'Monday - Friday', hours: '7:00 AM - 9:00 PM' },
      { days: 'Saturday - Sunday', hours: '9:00 AM - 7:00 PM' },
    ],
  },
  {
    _id: '5',
    name: 'Golden Gate Park Charging Station',
    operator: 'GreenCharge',
    address: '100 John F Kennedy Dr, San Francisco, CA',
    location: {
      type: 'Point',
      coordinates: [-122.4869, 37.7716], // Golden Gate Park
    },
    chargerTypes: ['Type 2', 'CCS'],
    status: 'available',
    pricePerKwh: 0.36,
    rating: 4.6,
    reviews: [
      {
        _id: '501',
        user: {
          _id: '5001',
          name: 'Thomas Brown',
        },
        rating: 5,
        comment: 'Perfect spot to charge while exploring the park.',
        createdAt: '2023-06-30T16:40:00Z',
        helpfulCount: 9,
      },
      {
        _id: '502',
        user: {
          _id: '5002',
          name: 'Amanda Wilson',
        },
        rating: 4,
        comment: 'Beautiful location. Chargers work great.',
        createdAt: '2023-07-15T11:25:00Z',
        helpfulCount: 3,
      },
    ],
    amenities: [
      { type: 'Restroom', available: true },
      { type: 'Café', available: false },
      { type: 'Wi-Fi', available: false },
      { type: 'Parking', available: true },
    ],
    images: [
      'https://images.pexels.com/photos/1591083/pexels-photo-1591083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    contactPhone: '(415) 555-7890',
    openingHours: [
      { days: 'Monday - Sunday', hours: '6:00 AM - 10:00 PM' },
    ],
  },
  {
    _id: '6',
    name: 'SoMa Rapid Charging',
    operator: 'Electrify America',
    address: '888 Brannan St, San Francisco, CA',
    location: {
      type: 'Point',
      coordinates: [-122.4050, 37.7722], // SoMa
    },
    chargerTypes: ['CCS', 'CHAdeMO', 'Type 2'],
    status: 'available',
    pricePerKwh: 0.43,
    rating: 4.3,
    reviews: [
      {
        _id: '601',
        user: {
          _id: '6001',
          name: 'James Taylor',
        },
        rating: 4,
        comment: 'Fast charging speeds and convenient location.',
        createdAt: '2023-08-05T19:15:00Z',
        helpfulCount: 5,
      },
    ],
    amenities: [
      { type: 'Restroom', available: true },
      { type: 'Café', available: true },
      { type: 'Wi-Fi', available: true },
      { type: 'Parking', available: true },
      { type: 'Shopping', available: true },
    ],
    images: [
      'https://images.pexels.com/photos/13547754/pexels-photo-13547754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    contactPhone: '(415) 555-2109',
    openingHours: [
      { days: 'Monday - Sunday', hours: '24 hours' },
    ],
  },
];