import React from 'react';
import { Address } from '../types';
import { MapPin, User, Building, Globe } from 'lucide-react';

interface AddressFormProps {
  title: string;
  address: Address;
  onChange: (field: keyof Address, value: string) => void;
  onSmartParse?: (text: string) => void; // Callback for smart parsing
}

const AddressForm: React.FC<AddressFormProps> = ({ title, address, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
        <MapPin className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={address.name}
              onChange={(e) => onChange('name', e.target.value)}
              className="pl-10 block w-full rounded-lg border-slate-200 bg-slate-50 border focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 transition-all duration-200"
              placeholder="Jane Doe"
            />
          </div>
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Street Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={address.street1}
              onChange={(e) => onChange('street1', e.target.value)}
              className="pl-10 block w-full rounded-lg border-slate-200 bg-slate-50 border focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 transition-all duration-200"
              placeholder="123 Main St"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">City</label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => onChange('city', e.target.value)}
            className="block w-full rounded-lg border-slate-200 bg-slate-50 border focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 transition-all duration-200"
            placeholder="San Francisco"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">State</label>
          <input
            type="text"
            value={address.state}
            onChange={(e) => onChange('state', e.target.value)}
            className="block w-full rounded-lg border-slate-200 bg-slate-50 border focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 transition-all duration-200"
            placeholder="CA"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">ZIP Code</label>
          <input
            type="text"
            value={address.zip}
            onChange={(e) => onChange('zip', e.target.value)}
            className="block w-full rounded-lg border-slate-200 bg-slate-50 border focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 px-3 transition-all duration-200"
            placeholder="94105"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Country</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={address.country}
              onChange={(e) => onChange('country', e.target.value)}
              className="pl-10 block w-full rounded-lg border-slate-200 bg-slate-50 border focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5 transition-all duration-200"
              placeholder="US"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;