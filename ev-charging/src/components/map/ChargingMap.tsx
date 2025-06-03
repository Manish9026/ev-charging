import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { Navigation } from 'lucide-react';
import { useStations } from '../../contexts/StationContext';
import StationPopup from './StationPopup';

// Custom marker icons
const createMarkerIcon = (status: string) => {
  return L.divIcon({
    className: `rounded-full h-6 w-6 flex items-center justify-center station-marker-${status}`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Component to handle user location
const LocationMarker: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 13 });
    
    map.on('locationfound', (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    });
    
    map.on('locationerror', () => {
      console.log('Location access denied or unavailable');
      // Default to a central location if geolocation fails
      map.setView([37.7749, -122.4194], 10);
    });
    
    return () => {
      map.off('locationfound');
      map.off('locationerror');
    };
  }, [map]);

  return position === null ? null : (
    <Marker 
      position={position}
      icon={L.divIcon({
        className: 'bg-blue-500 rounded-full border-2 border-white',
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      })}
    >
      <Popup>You are here</Popup>
    </Marker>
  );
};

interface ChargingMapProps {
  filters?: {
    chargerType?: string[];
    availability?: string;
    priceRange?: [number, number];
  };
  stations?:object
}

const ChargingMap: React.FC<ChargingMapProps> = ({ stations,filters }) => {
  const navigate = useNavigate();
  const {  loading } = useStations();
  const [filteredStations, setFilteredStations] = useState(stations);


  // useEffect(() => {
  //   if (stations.length > 0 && filters) {
  //     const filtered = stations.filter((station) => {
  //       // Filter by charger type
  //       if (filters.chargerType && filters.chargerType.length > 0) {
  //         if (!station.chargerTypes.some(type => filters.chargerType?.includes(type))) {
  //           return false;
  //         }
  //       }
        
  //       // Filter by availability
  //       if (filters.availability) {
  //         if (filters.availability === 'available' && station.status !== 'available') {
  //           return false;
  //         } else if (filters.availability === 'occupied' && station.status !== 'occupied') {
  //           return false;
  //         }
  //       }
        
  //       // Filter by price range
  //       if (filters.priceRange) {
  //         const [min, max] = filters.priceRange;
  //         if (station.pricePerKwh < min || station.pricePerKwh > max) {
  //           return false;
  //         }
  //       }
        
  //       return true;
  //     });
      
  //     setFilteredStations(filtered);
  //   } else {
  //     setFilteredStations(stations);
  //   }
  // }, [stations, filters]);

  const handleStationClick = (stationId: string) => {
    navigate(`/stations/${stationId}`);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative">
      <MapContainer  center={[37.7749, -122.4194]} zoom={12} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        
        {filteredStations.map((station) => (
          <Marker
            key={station._id}
            position={[station.location.coordinates[1], station.location.coordinates[0]]}
            icon={createMarkerIcon(station.status)}
          >
            <Popup className="station-popup">
              <StationPopup 
                station={station} 
                onViewDetails={() => handleStationClick(station._id)} 
              />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <button 
        className="absolute bottom-6 right-6 z-[1000] bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
        onClick={() => {
          const map = document.querySelector('.leaflet-container')?._leaflet_map;
          if (map) {
            map.locate({ setView: true, maxZoom: 14 });
          }
        }}
      >
        <Navigation className="h-6 w-6" />
      </button>
    </div>
  );
};

export default ChargingMap;