import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminHeader: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm z-10 h-16">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center md:hidden">
          <button className="text-gray-500 focus:outline-none">
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        <div className="relative flex-1 max-w-md ml-4 md:ml-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search..."
          />
        </div>
        
        <div className="flex items-center">
          <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
          </button>
          
          <div className="ml-3 relative flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
              {user?.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;