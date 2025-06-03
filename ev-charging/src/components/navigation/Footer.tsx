import React from 'react';
import { Link } from 'react-router-dom';
import { BatteryCharging, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <BatteryCharging className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-semibold">EV Charge Finder</span>
            </div>
            <p className="mt-4 text-gray-300">
              Helping EV owners find available charging stations with real-time information and
              user reviews. Making electric vehicle charging easier for everyone.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Navigation</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/map" className="text-base text-gray-300 hover:text-white">Find Stations</Link>
              </li>
              <li>
                <Link to="/login" className="text-base text-gray-300 hover:text-white">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-base text-gray-300 hover:text-white">Register</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-300 hover:text-white">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} EV Charge Finder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;