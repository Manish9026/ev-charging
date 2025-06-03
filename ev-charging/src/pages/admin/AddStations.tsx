import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Zap, DollarSign, Coffee, Car, Users, AlertTriangle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {LocationPicker} from '../../components/admin/LocationPicker'
const stationSchema = z.object({
  name: z.string().min(3, 'Station name must be at least 3 characters'),
  address: z.string().min(10, 'Address must be at least 10 characters'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  operator: z.string().min(2, 'Operator name is required'),
  chargerTypes: z.array(z.enum(['AC', 'DC', 'CCS', 'CHAdeMO'])).min(1, 'At least one charger type is required'),
  totalPorts: z.number().min(1, 'Must have at least 1 port'),
  power: z.number().min(1, 'Power rating is required'),
  pricePerKwh: z.number().min(0, 'Price cannot be negative'),
  amenities: z.array(z.string()),
  initialRating: z.number().min(1).max(5).optional(),
  initialReview: z.string().optional(),
  faultReport: z.string().optional(),
});

type StationFormData = z.infer<typeof stationSchema>;

const chargerOptions = [
  { value: 'AC', label: 'AC Charging' },
  { value: 'DC', label: 'DC Fast Charging' },
  { value: 'CCS', label: 'CCS Combo' },
  { value: 'CHAdeMO', label: 'CHAdeMO' },
];

const amenityOptions = [
  { value: 'parking', label: 'Parking', icon: Car },
  { value: 'restroom', label: 'Restroom', icon: Users },
  { value: 'cafe', label: 'Café', icon: Coffee },
  { value: 'wifi', label: 'WiFi' },
  { value: 'shop', label: 'Shop' },
  { value: 'food_court', label: 'Food Court' },
  { value: 'metro_access', label: 'Metro Access' },
];

export const AddStationForm = () => {
  const form = useForm<StationFormData>({
    resolver: zodResolver(stationSchema),
    defaultValues: {
      name: '',
      address: '',
      latitude: 0,
      longitude: 0,
      operator: '',
      chargerTypes: [],
      totalPorts: 1,
      power: 22,
      pricePerKwh: 8,
      amenities: [],
      initialRating: 4,
      initialReview: '',
      faultReport: '',
    },
  });

  const onSubmit = (data: StationFormData) => {
    console.log('New station data:', data);
    // TODO: Implement actual submission logic
    alert('Station added successfully! (This is a demo)');
    form.reset();
  };

  const handleLocationChange = (lat: number, lng: number) => {
    form.setValue('latitude', lat);
    form.setValue('longitude', lng);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Station Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter station name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="operator"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operator</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Tata Power, Statiq" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter complete address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Picker */}
            <LocationPicker
              latitude={form.watch('latitude')}
              longitude={form.watch('longitude')}
              onLocationChange={handleLocationChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="latitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="any" 
                        placeholder="28.4595" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Longitude</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="any" 
                        placeholder="77.0266" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Charging Infrastructure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Charging Infrastructure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="chargerTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Charger Types</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {chargerOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.value}
                          checked={field.value?.includes(option.value as any)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, option.value]);
                            } else {
                              field.onChange(field.value?.filter((value) => value !== option.value));
                            }
                          }}
                        />
                        <label htmlFor={option.value} className="text-sm font-medium">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="totalPorts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Ports</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="power"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Power Rating (kW)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="pricePerKwh"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price per kWh (₹)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Amenities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5" />
              Amenities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Amenities</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {amenityOptions.map((amenity) => (
                      <div key={amenity.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity.value}
                          checked={field.value?.includes(amenity.value)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, amenity.value]);
                            } else {
                              field.onChange(field.value?.filter((value) => value !== amenity.value));
                            }
                          }}
                        />
                        <label htmlFor={amenity.value} className="text-sm font-medium flex items-center gap-1">
                          {amenity.icon && <amenity.icon className="h-4 w-4" />}
                          {amenity.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Initial Review & Rating */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Initial Review & Rating
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="initialRating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Rating (1-5 stars)</FormLabel>
                  <Select onValueChange={(value) => field.onChange(parseFloat(value))}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 Star</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="initialReview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Review (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add an initial review for this station..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Fault Report */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Fault Report (Optional)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="faultReport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Known Issues or Maintenance Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Report any known issues or maintenance requirements..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset Form
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            Add Station
          </Button>
        </div>
      </form>
    </Form>
  );
};
