import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, MapPin, Phone, Battery, Zap, Info, Heart, ChevronLeft, Navigation } from 'lucide-react';
import { useStations } from '../contexts/StationContext';
import { useAuth } from '../contexts/AuthContext';
import StationReviewItem from '../components/stations/StationReviewItem';
import AddReviewForm from '../components/stations/AddReviewForm';
import { useStationByIdQuery, useStationsQuery } from '@/services/station';

const StationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getStation, toggleFavorite, isFavorite } = useStations();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('details');
  const [showAddReview, setShowAddReview] = useState(false);
  const {data}=useStationByIdQuery(id,{
    refetchOnFocus:true,
    refetchOnReconnect:true
  })
  const [station, setStation] = useState(data?.station);

  // console.log(data,"date");
  
  useEffect(() => {
    // Re-fetch station when coming back to this page
    if (id) {
      
      setStation(data?.station);
    }
  }, [id,data]);
  
  if (!station) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-medium text-gray-700">Loading station details...</h2>
        </div>
      </div>
    );
  }
  
  const handleFavoriteToggle = () => {
    toggleFavorite(station._id);
    // Update local state
    setStation(getStation(station._id));
  };
  
  const handleReviewSuccess = () => {
    setShowAddReview(false);
    // Update station data to show new review
    // setStation(getStation(station._id));
  };
  
  const isStationFavorite = user ? isFavorite(station._id) : false;
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-success-100 text-success-800 border-success-300';
      case 'occupied':
        return 'bg-error-100 text-error-800 border-error-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
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
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Station Header */}
      <div 
        className="bg-cover bg-center h-64 relative"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${station.images[0] || 'https://images.pexels.com/photos/110844/pexels-photo-110844.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'})` 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-6">
          <Link to="/map" className="text-white mb-4 inline-flex items-center hover:underline">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to map
          </Link>
          <div className="flex flex-wrap items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{station.name}</h1>
              <div className="flex flex-wrap items-center text-white">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusClass(station.status)}`}>
                  {getStatusText(station.status)}
                </span>
                <div className="flex items-center ml-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1">{station.rating.toFixed(1)} ({station.reviews.length} reviews)</span>
                </div>
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  {station.address}
                </span>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              {user && (
                <button 
                  onClick={handleFavoriteToggle}
                  className="btn bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
                >
                  <Heart className={`h-5 w-5 mr-2 ${isStationFavorite ? 'fill-error-500 text-error-500' : ''}`} />
                  {isStationFavorite ? 'Saved' : 'Save'}
                </button>
              )}
              <a 
                href={`https://maps.google.com/maps?q=${station.location.coordinates[1]},${station.location.coordinates[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-primary-600 hover:bg-primary-700 text-white"
              >
                <Navigation className="h-5 w-5 mr-2" />
                Directions
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'details'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Details
            </button>
            <button
              className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({station.reviews.length})
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {activeTab === 'details' ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Charging Station Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">About</h3>
                    <p className="text-gray-700">
                      {station.name} is operated by {station.operator} and offers multiple charging options for electric vehicles.
                      Located conveniently in a central area with nearby amenities.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Charger Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {station.chargerTypes.map((type:string) => (
                        <span key={type} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {station.amenities.map((amenity:any) => (
                        <div key={amenity.type} className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${amenity.available ? 'bg-success-500' : 'bg-gray-300'}`}></div>
                          <span className={amenity.available ? 'text-gray-800' : 'text-gray-500'}>
                            {amenity.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Hours of Operation</h3>
                    {station.openingHours ? (
                      <div className="space-y-2">
                        {station.openingHours.map((hours:any, index:number) => (
                          <div key={index} className="flex items-start">
                            <Clock className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                            <div>
                              <span className="font-medium">{hours.days}:</span>
                              <span className="ml-1 text-gray-700">{hours.hours}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-700 flex items-center">
                        <Clock className="h-5 w-5 text-gray-500 mr-2" />
                        24/7 Operation
                      </p>
                    )}
                  </div>
                  
                  {station.contactPhone && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Contact</h3>
                      <p className="flex items-center text-gray-700">
                        <Phone className="h-5 w-5 text-gray-500 mr-2" />
                        {station.contactPhone}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Customer Reviews</h2>
                  {user && !showAddReview && (
                    <button 
                      onClick={() => setShowAddReview(true)}
                      className="btn btn-primary"
                    >
                      Write a Review
                    </button>
                  )}
                </div>
                
                {showAddReview && (
                  <div className="mb-8">
                    <AddReviewForm stationId={station._id} onSuccess={handleReviewSuccess} />
                  </div>
                )}
                
                <div className="divide-y divide-gray-200">
                  {station.reviews.length > 0 ? (
                    station.reviews.map((review:any) => (
                      <StationReviewItem key={review._id} review={review} />
                    ))
                  ) : (
                    <div className="py-6 text-center">
                      <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Pricing</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Standard Rate</span>
                <span className="font-medium text-primary-700">${station.pricePerKwh.toFixed(2)}/kWh</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Payment Methods</span>
                <span>Credit Card, App</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Operator</span>
                  <span className="font-medium">{station.operator}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Power Output</span>
                  <span className="font-medium">50-150 kW</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Number of Ports</span>
                  <span className="font-medium">{station.chargerTypes.length * 2}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <iframe 
                  title="Station Location"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${station.location.coordinates[0] - 0.01},${station.location.coordinates[1] - 0.01},${station.location.coordinates[0] + 0.01},${station.location.coordinates[1] + 0.01}&layer=mapnik&marker=${station.location.coordinates[1]},${station.location.coordinates[0]}`}
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2">Location</h3>
                <p className="text-gray-700 mb-3">{station.address}</p>
                <a 
                  href={`https://maps.google.com/maps?q=${station.location.coordinates[1]},${station.location.coordinates[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 font-medium hover:text-primary-700 flex items-center"
                >
                  <Navigation className="h-4 w-4 mr-1" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationDetailsPage;