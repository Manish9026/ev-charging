import React, { useState } from 'react';
import ChargingMap from '../components/map/ChargingMap';
import FilterPanel from '../components/map/FilterPanel';
import { useStations } from '../contexts/StationContext';
import StationCard from '../components/stations/StationCard';
import { useStationsQuery } from '@/services/station';

const MapPage: React.FC = () => {
  const [filters, setFilters] = useState({});
  const [showListView, setShowListView] = useState(true);
  const { stations, loading } = useStations();
const {data}=useStationsQuery(undefined,{
    refetchOnFocus:true,
    refetchOnReconnect:true
  })
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col ">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Find Charging Stations</h1>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-md ${
                !showListView
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setShowListView(false)}
            >
              Map View
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                showListView
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setShowListView(true)}
            >
              List View
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto hidden md:block">
          <FilterPanel onFilterChange={handleFilterChange} />
          
          {showListView && loading && (
            <div className="mt-4 flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          )}
          
          {!showListView && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Nearby Stations</h2>
              <div className="space-y-4">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-white rounded-lg shadow-md p-4">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                        <div className="flex justify-between">
                          <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  data?.stations.slice(0, 3).map((station:any) => (
                    <StationCard key={station._id} station={station} />
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {!showListView ? (
            <ChargingMap filters={filters}  stations={data?.stations}/>
          ) : (
            <div className="p-4 h-full overflow-y-auto">
              <div className="md:hidden mb-4">
                <FilterPanel onFilterChange={handleFilterChange} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                  <div className="col-span-full flex items-center justify-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
                  </div>
                ) : (
                  data?.stations.map((station:any) => (
                    <StationCard key={station._id} station={station} />
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;