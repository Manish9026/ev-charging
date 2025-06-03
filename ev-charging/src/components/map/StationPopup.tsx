import React from 'react';
import { Star, Clock, Battery, MapPin } from 'lucide-react';
import { Station } from '../../types/Station';

interface StationPopupProps {
  station: Station;
  onViewDetails: () => void;
}

const StationPopup: React.FC<StationPopupProps> = ({ station, onViewDetails }) => {
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

  return (
    <div className="min-w-[220px]">
      <h3 className="font-semibold text-lg mb-1">{station.name}</h3>
      <div className="flex items-center mb-2">
        <span className={`badge ${getStatusClass(station.status)} mr-2`}>
          {getStatusText(station.status)}
        </span>
        <div className="flex items-center text-yellow-500">
          <Star className="h-4 w-4 fill-current" />
          <span className="ml-1 text-sm text-gray-600">{station.rating.toFixed(1)}</span>
        </div>
      </div>
      <p className="flex items-center text-sm text-gray-600 mb-1">
        <MapPin className="h-4 w-4 mr-1" />
        {station.address}
      </p>
      <p className="flex items-center text-sm text-gray-600 mb-1">
        <Battery className="h-4 w-4 mr-1" />
        {station.chargerTypes.join(', ')}
      </p>
      <p className="flex items-center text-sm text-gray-600 mb-3">
        <Clock className="h-4 w-4 mr-1" />
        Open 24/7
      </p>
      <div className="flex items-center justify-between">
        <p className="font-medium text-primary-700">
          ${station.pricePerKwh.toFixed(2)}/kWh
        </p>
        <button
          onClick={onViewDetails}
          className="btn btn-primary py-1 px-3 text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default StationPopup;