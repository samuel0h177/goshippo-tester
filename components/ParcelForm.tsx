import React from 'react';
import { Parcel } from '../types';
import { Box, Scale } from 'lucide-react';

interface ParcelFormProps {
  parcel: Parcel;
  onChange: (field: keyof Parcel, value: string) => void;
}

const ParcelForm: React.FC<ParcelFormProps> = ({ parcel, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
        <Box className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-slate-800">Parcel Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dimensions */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <label className="block text-xs font-bold text-slate-700 mb-3 uppercase">Dimensions</label>
            <div className="flex gap-2 items-end">
                <div className="flex-1">
                    <label className="block text-[10px] text-slate-500 mb-1">Length</label>
                    <input
                        type="number"
                        value={parcel.length}
                        onChange={(e) => onChange('length', e.target.value)}
                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                    />
                </div>
                <span className="mb-2 text-slate-400">x</span>
                <div className="flex-1">
                    <label className="block text-[10px] text-slate-500 mb-1">Width</label>
                    <input
                        type="number"
                        value={parcel.width}
                        onChange={(e) => onChange('width', e.target.value)}
                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                    />
                </div>
                <span className="mb-2 text-slate-400">x</span>
                <div className="flex-1">
                    <label className="block text-[10px] text-slate-500 mb-1">Height</label>
                    <input
                        type="number"
                        value={parcel.height}
                        onChange={(e) => onChange('height', e.target.value)}
                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                    />
                </div>
            </div>
            <div className="mt-3">
                 <label className="block text-[10px] text-slate-500 mb-1">Unit</label>
                 <select
                    value={parcel.distance_unit}
                    onChange={(e) => onChange('distance_unit', e.target.value as any)}
                    className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 bg-white"
                 >
                     <option value="in">Inches (in)</option>
                     <option value="cm">Centimeters (cm)</option>
                 </select>
            </div>
        </div>

        {/* Weight */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
             <div className="flex items-center gap-2 mb-3">
                <Scale className="w-4 h-4 text-slate-500" />
                <label className="block text-xs font-bold text-slate-700 uppercase">Weight</label>
             </div>
            
             <div className="grid grid-cols-2 gap-3">
                 <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Weight</label>
                    <input
                        type="number"
                        value={parcel.weight}
                        onChange={(e) => onChange('weight', e.target.value)}
                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Unit</label>
                    <select
                        value={parcel.mass_unit}
                        onChange={(e) => onChange('mass_unit', e.target.value as any)}
                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 bg-white"
                    >
                        <option value="lb">Pounds (lb)</option>
                        <option value="kg">Kilograms (kg)</option>
                    </select>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default ParcelForm;