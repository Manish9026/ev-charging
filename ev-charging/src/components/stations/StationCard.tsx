import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Battery, Zap, Heart } from 'lucide-react';
import { Station } from '../../types/Station';
import { useAuth } from '../../contexts/AuthContext';
import { useStations } from '../../contexts/StationContext';

interface StationCardProps {
  station: Station;
}

const StationCard: React.FC<StationCardProps> = ({ station }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useStations();
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'badge-available';
      case 'occupied':
        return 'badge-occupied';
      default:
        return 'badge-offline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return 'Available';
      case 'occupied':
        return 'In Use';
      default:
        return 'Offline';
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user) {
      toggleFavorite(station._id);
    } else {
      navigate('/login');
    }
  };

  const isStationFavorite = user ? isFavorite(station._id) : false;

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/stations/${station._id}`)}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg mb-1">{station.name}</h3>
          <button 
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={handleFavoriteClick}
          >
            <Heart 
              className={`h-5 w-5 ${isStationFavorite ? 'fill-error-500 text-error-500' : 'text-gray-400'}`} 
            />
          </button>
        </div>
        
        <div className="flex items-center mb-3">
          <span className={`badge ${getStatusClass(station.status)} mr-2`}>
            {getStatusText(station.status)}
          </span>
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{station.rating.toFixed(1)} ({station.reviews.length})</span>
          </div>
        </div>
        
        <p className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">{station.address}</span>
        </p>
        
        <p className="flex items-center text-sm text-gray-600 mb-2">
          <Battery className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>{station.chargerTypes.join(', ')}</span>
        </p>
        
        <div className="flex items-center justify-between mt-4">
          <p className="flex items-center font-medium text-primary-700">
            <Zap className="h-4 w-4 mr-1" />
            ${station.pricePerKwh.toFixed(2)}/kWh
          </p>
          <button
            className="btn btn-primary py-1 px-3 text-sm"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/stations/${station._id}`);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default StationCard;