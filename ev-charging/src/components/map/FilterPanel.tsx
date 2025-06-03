import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterPanelProps {
  onFilterChange: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [chargerTypes, setChargerTypes] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1]);
  const [maxPrice, setMaxPrice] = useState<number>(1);
  
  const togglePanel = () => setIsOpen(!isOpen);
  
  const handleChargerTypeChange = (type: string) => {
    if (chargerTypes.includes(type)) {
      setChargerTypes(chargerTypes.filter(t => t !== type));
    } else {
      setChargerTypes([...chargerTypes, type]);
    }
  };
  
  const handleAvailabilityChange = (value: string) => {
    setAvailability(value === availability ? '' : value);
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPriceRange([0, value]);
  };
  
  const applyFilters = () => {
    onFilterChange({
      chargerType: chargerTypes,
      availability,
      priceRange: priceRange[1] > 0 ? priceRange : undefined,
    });
  };
  
  const clearFilters = () => {
    setChargerTypes([]);
    setAvailability('');
    setPriceRange([0, maxPrice]);
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200">
      <div 
        className="px-4 py-3 bg-gray-50 flex items-center justify-between cursor-pointer"
        onClick={togglePanel}
      >
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="font-medium">Filters</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </div>
      
      {isOpen && (
        <div className="p-4">
          {/* Charger Type */}
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-sm text-gray-700">Charger Type</h4>
            <div className="space-y-2">
              {['Type 2', 'CCS', 'CHAdeMO', 'Tesla'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-primary-600 rounded focus:ring-primary-500"
                    checked={chargerTypes.includes(type)}
                    onChange={() => handleChargerTypeChange(type)}
                  />
                  <span className="ml-2 text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Availability */}
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-sm text-gray-700">Availability</h4>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 text-sm rounded-full ${
                  availability === 'available'
                    ? 'bg-success-100 text-success-800 border border-success-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
                onClick={() => handleAvailabilityChange('available')}
              >
                Available
              </button>
              <button
                className={`px-3 py-1 text-sm rounded-full ${
                  availability === 'occupied'
                    ? 'bg-error-100 text-error-800 border border-error-300'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
                onClick={() => handleAvailabilityChange('occupied')}
              >
                In Use
              </button>
            </div>
          </div>
          
          {/* Price Range */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-sm text-gray-700">Max Price</h4>
              <span className="text-sm text-gray-600">${priceRange[1].toFixed(2)}/kWh</span>
            </div>
            <input
              type="range"
              min="0"
              max={maxPrice}
              step="0.01"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={applyFilters}
              className="btn btn-primary py-2 flex-1"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="btn btn-secondary py-2 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;