import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Station, Review } from '../types/Station';
import { useAuth } from './AuthContext';
import { mockStations } from '../data/mockStations';

interface StationContextType {
  stations: Station[];
  loading: boolean;
  error: string | null;
  getStation: (id: string) => Station | undefined;
  toggleFavorite: (stationId: string) => void;
  isFavorite: (stationId: string) => boolean;
  addReview: (stationId: string, reviewData: { rating: number; comment: string }) => Promise<void>;
  getFavoriteStations: () => Station[];
}

const StationContext = createContext<StationContextType | undefined>(undefined);

interface StationProviderProps {
  children: ReactNode;
}

export const StationProvider: React.FC<StationProviderProps> = ({ children }) => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { user } = useAuth();

  // Load stations
  useEffect(() => {
    const fetchStations = async () => {
      try {
        // In a real app, this would be an API call
        // const response = await axios.get(`${API_URL}/stations`);
        // setStations(response.data);
        
        // Using mock data for demo
        setTimeout(() => {
          setStations(mockStations);
          setLoading(false);
        }, 500); // Simulate network delay
      } catch (err) {
        setError('Failed to fetch stations');
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  // Load user favorites
  useEffect(() => {
    if (user) {
      const loadFavorites = async () => {
        try {
          // In a real app, this would be an API call
          // const response = await axios.get(`${API_URL}/users/favorites`);
          // setFavorites(response.data);
          
          // Using local storage for demo
          const savedFavorites = localStorage.getItem(`favorites_${user._id}`);
          if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
          }
        } catch (err) {
          console.error('Failed to load favorites:', err);
        }
      };

      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const getStation = (id: string) => {
    return stations.find(station => station._id === id);
  };

  const toggleFavorite = (stationId: string) => {
    if (!user) return;
    
    let newFavorites: string[];
    
    if (favorites.includes(stationId)) {
      newFavorites = favorites.filter(id => id !== stationId);
    } else {
      newFavorites = [...favorites, stationId];
    }
    
    setFavorites(newFavorites);
    
    // In a real app, this would be an API call
    // await axios.post(`${API_URL}/users/favorites`, { stationId });
    
    // Using local storage for demo
    localStorage.setItem(`favorites_${user._id}`, JSON.stringify(newFavorites));
  };

  const isFavorite = (stationId: string) => {
    return favorites.includes(stationId);
  };

  const addReview = async (stationId: string, reviewData: { rating: number; comment: string }) => {
    if (!user) throw new Error('User must be logged in');
    
    try {
      // In a real app, this would be an API call
      // const response = await axios.post(`${API_URL}/stations/${stationId}/reviews`, reviewData);
      // const newReview = response.data;
      
      // Creating a mock review for demo
      const newReview: Review = {
        _id: Date.now().toString(),
        user: {
          _id: user._id,
          name: user.name || 'Anonymous',
        },
        rating: reviewData.rating,
        comment: reviewData.comment,
        createdAt: new Date().toISOString(),
        helpfulCount: 0,
      };
      
      setStations(prevStations => {
        return prevStations.map(station => {
          if (station._id === stationId) {
            const newReviews = [...station.reviews, newReview];
            const newRating = newReviews.reduce((sum, review) => sum + review.rating, 0) / newReviews.length;
            
            return {
              ...station,
              reviews: newReviews,
              rating: newRating,
            };
          }
          return station;
        });
      });
    } catch (err) {
      console.error('Failed to add review:', err);
      throw err;
    }
  };

  const getFavoriteStations = () => {
    return stations.filter(station => favorites.includes(station._id));
  };

  const value = {
    stations,
    loading,
    error,
    getStation,
    toggleFavorite,
    isFavorite,
    addReview,
    getFavoriteStations,
  };

  return <StationContext.Provider value={value}>{children}</StationContext.Provider>;
};

export const useStations = () => {
  const context = useContext(StationContext);
  if (context === undefined) {
    throw new Error('useStations must be used within a StationProvider');
  }
  return context;
};