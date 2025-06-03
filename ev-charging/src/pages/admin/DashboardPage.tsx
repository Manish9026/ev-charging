import React from 'react';
import { BatteryCharging, Users, MapPin, Star, ArrowUp, ArrowDown } from 'lucide-react';
import { useStations } from '../../contexts/StationContext';

const DashboardPage: React.FC = () => {
  const { stations } = useStations();
  
  // Calculate statistics
  const totalStations = stations.length;
  const availableStations = stations.filter(s => s.status === 'available').length;
  const occupiedStations = stations.filter(s => s.status === 'occupied').length;
  const offlineStations = stations.filter(s => s.status === 'offline').length;
  
  // Mock user data
  const totalUsers = 245;
  const newUsers = 12;
  
  // Mock review data
  const totalReviews = stations.reduce((sum, station) => sum + station.reviews.length, 0);
  const averageRating = stations.reduce((sum, station) => sum + station.rating, 0) / totalStations;
  
  // Mock chart data
  const chartData = {
    usage: [65, 72, 86, 92, 78, 85, 91],
    revenue: [120, 145, 132, 155, 180, 176, 192],
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your charging network</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Total Stations</h3>
            <div className="bg-primary-100 p-2 rounded-full">
              <MapPin className="h-5 w-5 text-primary-600" />
            </div>
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{totalStations}</p>
            <p className="ml-2 text-sm font-medium text-success-600">
              <ArrowUp className="inline h-4 w-4 mr-1" />
              2 new
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Active Users</h3>
            <div className="bg-success-100 p-2 rounded-full">
              <Users className="h-5 w-5 text-success-600" />
            </div>
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{totalUsers}</p>
            <p className="ml-2 text-sm font-medium text-success-600">
              <ArrowUp className="inline h-4 w-4 mr-1" />
              {newUsers} new
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Station Usage</h3>
            <div className="bg-warning-100 p-2 rounded-full">
              <BatteryCharging className="h-5 w-5 text-warning-600" />
            </div>
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{Math.round((occupiedStations / totalStations) * 100)}%</p>
            <p className="ml-2 text-sm font-medium text-success-600">
              <ArrowUp className="inline h-4 w-4 mr-1" />
              5%
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Avg. Rating</h3>
            <div className="bg-error-100 p-2 rounded-full">
              <Star className="h-5 w-5 text-error-600" />
            </div>
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{averageRating.toFixed(1)}</p>
            <p className="ml-2 text-sm font-medium text-error-600">
              <ArrowDown className="inline h-4 w-4 mr-1" />
              0.2
            </p>
          </div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Weekly Usage</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.usage.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="bg-primary-500 rounded-t w-full" 
                  style={{ height: `${value}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.revenue.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="bg-success-500 rounded-t w-full" 
                  style={{ height: `${(value / 200) * 100}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Station Status Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Station Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-success-500 mr-2"></div>
                    <span className="text-sm font-medium text-gray-900">Available</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {availableStations}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-success-500 h-2.5 rounded-full" 
                      style={{ width: `${(availableStations / totalStations) * 100}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-error-500 mr-2"></div>
                    <span className="text-sm font-medium text-gray-900">In Use</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {occupiedStations}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-error-500 h-2.5 rounded-full" 
                      style={{ width: `${(occupiedStations / totalStations) * 100}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-gray-400 mr-2"></div>
                    <span className="text-sm font-medium text-gray-900">Offline</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {offlineStations}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-gray-400 h-2.5 rounded-full" 
                      style={{ width: `${(offlineStations / totalStations) * 100}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;