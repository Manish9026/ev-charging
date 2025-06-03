import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, RefreshCw, BatteryCharging } from 'lucide-react';
import { useStations } from '../../contexts/StationContext';
import { Link } from 'react-router-dom';

const StationsPage: React.FC = () => {
  const { stations } = useStations();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  const filteredStations = stations.filter(station => {
    // Apply search filter
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply status filter
    const matchesStatus = filterStatus ? station.status === filterStatus : true;
    
    return matchesSearch && matchesStatus;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-success-100 text-success-800">Available</span>;
      case 'occupied':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-error-100 text-error-800">In Use</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Offline</span>;
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Charging Stations</h1>
          <p className="text-gray-600">Manage your network of charging stations</p>
        </div>
        <Link to={'/admin/add-station'}>
         <button className="mt-4 sm:mt-0 btn btn-primary">
          <Plus className="h-5 w-5 mr-2" />
          Add New Station
        </button>
        </Link>
       
      </div>
      
      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 input"
            placeholder="Search stations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="sm:w-64">
          <select
            className="input"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="occupied">In Use</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      </div>
      
      {/* Stations Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Station
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Charger Types
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStations.map((station) => (
                <tr key={station._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <BatteryCharging className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{station.name}</div>
                        <div className="text-sm text-gray-500">{station.operator}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{station.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(station.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{station.chargerTypes.join(', ')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{station.rating.toFixed(1)}</div>
                      <div className="ml-1 text-yellow-400">★</div>
                      <div className="ml-1 text-sm text-gray-500">({station.reviews.length})</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <RefreshCw className="h-5 w-5 text-gray-500 hover:text-primary-600" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <Edit className="h-5 w-5 text-gray-500 hover:text-primary-600" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <Trash2 className="h-5 w-5 text-gray-500 hover:text-error-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredStations.length === 0 && (
          <div className="py-12 text-center">
            <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No matching stations</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredStations.length}</span> of{' '}
          <span className="font-medium">{filteredStations.length}</span> results
        </div>
        
        <div className="flex space-x-2">
          <button className="btn btn-secondary py-1 px-3 text-sm" disabled>
            Previous
          </button>
          <button className="btn btn-secondary py-1 px-3 text-sm" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StationsPage;