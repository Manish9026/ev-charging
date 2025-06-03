import React from 'react';
import { Link } from 'react-router-dom';
import { BatteryCharging, MapPin, Star, ZapOff } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Find the perfect charging station for your electric vehicle
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Real-time availability, detailed station information, and user reviews to make
                charging your EV hassle-free.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/map" className="btn bg-white text-primary-700 hover:bg-gray-100 py-3 px-6 text-lg font-medium">
                  Find Stations
                </Link>
                <Link to="/register" className="btn bg-transparent border-2 border-white hover:bg-white/10 py-3 px-6 text-lg font-medium">
                  Sign Up Free
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.pexels.com/photos/3459616/pexels-photo-3459616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Electric Vehicle Charging" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EV Charge Finder?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make finding and using EV charging stations simple, reliable, and stress-free.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <MapPin className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Mapping</h3>
              <p className="text-gray-600">
                Find charging stations near you with our interactive map showing real-time availability.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-success-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <BatteryCharging className="h-7 w-7 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Live Availability</h3>
              <p className="text-gray-600">
                See which stations are available, in-use, or offline before you drive there.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="bg-warning-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                <Star className="h-7 w-7 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Reviews</h3>
              <p className="text-gray-600">
                Read authentic reviews from other EV drivers about charging experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Finding and using a charging station has never been easier.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold mb-2">Locate</h3>
              <p className="text-gray-600">Find stations near you using our interactive map</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold mb-2">Filter</h3>
              <p className="text-gray-600">Filter by charger type, availability, and pricing</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold mb-2">Navigate</h3>
              <p className="text-gray-600">Get directions directly to your chosen station</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-lg font-semibold mb-2">Charge</h3>
              <p className="text-gray-600">Charge your vehicle and rate your experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to find your next charging station?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of EV drivers who use EV Charge Finder to make their electric journeys seamless.
          </p>
          <Link 
            to="/map" 
            className="btn bg-white text-primary-700 hover:bg-gray-100 py-3 px-8 text-lg font-medium inline-block"
          >
            Find a Station Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;