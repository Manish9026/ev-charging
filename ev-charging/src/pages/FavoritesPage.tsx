import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin } from 'lucide-react';
import { useStations } from '../contexts/StationContext';
import StationCard from '../components/stations/StationCard';

const FavoritesPage: React.FC = () => {
  const { getFavoriteStations, loading } = useStations();
  const favoriteStations = getFavoriteStations();

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Favorite Stations</h1>
          <Link to="/map" className="btn btn-primary">
            <MapPin className="h-5 w-5 mr-2" />
            Find Stations
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        ) : favoriteStations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteStations.map(station => (
              <StationCard key={station._id} station={station} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-gray-700 mb-2">No favorite stations yet</h2>
            <p className="text-gray-500 mb-6">
              You haven't added any charging stations to your favorites yet.
              Explore the map to find and save your preferred stations.
            </p>
            <Link to="/map" className="btn btn-primary">
              Explore Charging Stations
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;