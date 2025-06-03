import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MapPin, Users, Settings, LogOut, BatteryCharging } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/admin', icon: <LayoutDashboard className="h-5 w-5" />, label: 'Dashboard' },
    { path: '/admin/stations', icon: <MapPin className="h-5 w-5" />, label: 'Stations' },
    { path: '/admin/add-station', icon: <MapPin className="h-5 w-5" />, label: 'New Station' },
    { path: '/admin/users', icon: <Users className="h-5 w-5" />, label: 'Users' },
    { path: '/admin/settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' },

  ];

  return (
    <div className="bg-gray-900 text-white w-64 flex-shrink-0 hidden md:block">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <Link to="/admin" className="flex items-center">
          <BatteryCharging className="h-7 w-7 text-primary-400" />
          <span className="ml-2 text-lg font-semibold">Admin Panel</span>
        </Link>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-gray-800 text-primary-400'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-64 border-t border-gray-800">
        <div className="px-4 py-4">
          <Link to="/" className="flex items-center px-4 py-2 text-gray-300 hover:text-white">
            <span className="mr-3">← Back to site</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 w-full text-left text-gray-300 hover:text-white"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;