import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationPickerProps {
  latitude: number;
  longitude: number;
  onLocationChange: (lat: number, lng: number) => void;
}

const blueIcon = new L.Icon({
  iconUrl: 'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png',
  iconSize: [24, 24],
  iconAnchor: [12, 24]
});

export const LocationPicker: React.FC<LocationPickerProps> = ({
  latitude,
  longitude,
  onLocationChange,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const initializeMap = () => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView(
      [latitude || 28.6139, longitude || 77.2090],
      10
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    mapRef.current = map;
    setIsMapLoaded(true);

    if (latitude && longitude) {
      const marker = L.marker([latitude, longitude], { draggable: true }).addTo(map);

      marker.on('dragend', () => {
        const position = marker.getLatLng();
        onLocationChange(position.lat, position.lng);
      });

      markerRef.current = marker;
    }

    map.on('click', (event: L.LeafletMouseEvent) => {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;

      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }

      const newMarker = L.marker([lat, lng], { draggable: true }).addTo(map);
      newMarker.on('dragend', () => {
        const position = newMarker.getLatLng();
        onLocationChange(position.lat, position.lng);
      });

      markerRef.current = newMarker;
      onLocationChange(lat, lng);
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          onLocationChange(lat, lng);

          const map = mapRef.current;
          if (map) {
            map.setView([lat, lng], 15);

            if (markerRef.current) {
              map.removeLayer(markerRef.current);
            }

            const newMarker = L.marker([lat, lng], {
              draggable: true,
              icon: blueIcon,
            }).addTo(map);

            newMarker.on('dragend', () => {
              const position = newMarker.getLatLng();
              onLocationChange(position.lat, position.lng);
            });

            markerRef.current = newMarker;
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  useEffect(() => {
    initializeMap();
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && markerRef.current && latitude && longitude) {
      markerRef.current.setLatLng([latitude, longitude]);
      mapRef.current.setView([latitude, longitude]);
    }
  }, [latitude, longitude]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Select Location on Map</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={getCurrentLocation}
          className="flex items-center gap-2"
        >
          <MapPin className="h-4 w-4" />
          Use Current Location
        </Button>
      </div>

      <div
        ref={mapContainerRef}
        style={{ height: '200px' }}
        className="w-full h-[200px] rounded-lg border bg-gray-100 flex items-center justify-center"
      >
        {!isMapLoaded && <div className="text-gray-500">Loading map...</div>}
      </div>

      <p className="text-sm text-gray-600">
        Click on the map to place a marker, or drag the existing marker to adjust the location.
      </p>
    </div>
  );
};
