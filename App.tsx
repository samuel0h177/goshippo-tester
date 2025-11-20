import React, { useState } from 'react';
import { Package, Settings, Truck, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import AddressForm from './components/AddressForm';
import ParcelForm from './components/ParcelForm';
import SmartParser from './components/SmartParser';
import { Address, Parcel, Rate, AppStatus } from './types';
import { DEFAULT_SENDER, DEFAULT_RECEIVER, DEFAULT_PARCEL } from './constants';
import { fetchRates } from './services/shippoService';

const App: React.FC = () => {
  const [shippoKey, setShippoKey] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  
  const [sender, setSender] = useState<Address>(DEFAULT_SENDER);
  const [receiver, setReceiver] = useState<Address>(DEFAULT_RECEIVER);
  const [parcel, setParcel] = useState<Parcel>(DEFAULT_PARCEL);
  
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [rates, setRates] = useState<Rate[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSenderChange = (field: keyof Address, value: string) => {
    setSender(prev => ({ ...prev, [field]: value }));
  };

  const handleReceiverChange = (field: keyof Address, value: string) => {
    setReceiver(prev => ({ ...prev, [field]: value }));
  };

  const handleParcelChange = (field: keyof Parcel, value: string) => {
    setParcel(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculateRates = async () => {
    setStatus(AppStatus.FETCHING_RATES);
    setError(null);
    setRates([]);

    try {
      const response = await fetchRates(sender, receiver, parcel, shippoKey);
      if (response.rates && response.rates.length > 0) {
        setRates(response.rates);
        setStatus(AppStatus.SUCCESS);
      } else {
        setError("No rates found for this shipment configuration.");
        setStatus(AppStatus.ERROR);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setStatus(AppStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg">
                <Package className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="text-xl font-bold text-slate-900 leading-none">Shippo Rate Explorer</h1>
                <p className="text-xs text-slate-500 mt-1">React + TypeScript + Gemini</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-full transition-colors ${showSettings ? 'bg-slate-100 text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        {/* API Key Settings Drawer */}
        {showSettings && (
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-4">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="flex-1 w-full">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Shippo Live/Test API Token</label>
                        <input 
                            type="password" 
                            value={shippoKey}
                            onChange={(e) => setShippoKey(e.target.value)}
                            placeholder="shippo_test_..."
                            className="w-full rounded-md border-slate-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm py-2 px-3"
                        />
                        <p className="text-[10px] text-slate-500 mt-1">
                            Leave empty to use Mock Mode (simulated data). 
                            Warning: Client-side calls may be blocked by CORS if not using a proxy.
                        </p>
                    </div>
                </div>
            </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Sender Section */}
            <section>
                <SmartParser target="Sender" onAddressParsed={setSender} />
                <AddressForm 
                    title="Sender Address (From)" 
                    address={sender} 
                    onChange={handleSenderChange} 
                />
            </section>

            {/* Receiver Section */}
            <section>
                <SmartParser target="Receiver" onAddressParsed={setReceiver} />
                <AddressForm 
                    title="Receiver Address (To)" 
                    address={receiver} 
                    onChange={handleReceiverChange} 
                />
            </section>

             {/* Parcel Section */}
             <section>
                <ParcelForm parcel={parcel} onChange={handleParcelChange} />
            </section>

            {/* Action Button */}
            <div className="sticky bottom-4 z-40">
                <button
                    onClick={handleCalculateRates}
                    disabled={status === AppStatus.FETCHING_RATES}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-green-600/20 transform transition-all hover:-translate-y-0.5 flex justify-center items-center gap-3"
                >
                    {status === AppStatus.FETCHING_RATES ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Calculating Best Rates...
                        </>
                    ) : (
                        <>
                            <Truck className="w-5 h-5" />
                            Get Shipping Rates
                        </>
                    )}
                </button>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-5">
             <div className="sticky top-24 space-y-4">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    Available Rates
                    {rates.length > 0 && <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">{rates.length}</span>}
                </h2>

                {/* Default State */}
                {status === AppStatus.IDLE && (
                    <div className="bg-white border border-slate-200 border-dashed rounded-xl p-8 text-center">
                        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-slate-900 font-medium mb-1">Ready to Ship?</h3>
                        <p className="text-slate-500 text-sm">Fill out the address and parcel details to compare shipping rates.</p>
                    </div>
                )}

                {/* Error State */}
                {status === AppStatus.ERROR && (
                    <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-red-900 font-medium text-sm">Calculation Failed</h3>
                            <p className="text-red-700 text-xs mt-1">{error}</p>
                        </div>
                    </div>
                )}

                {/* Results List */}
                <div className="space-y-3">
                    {rates.map((rate) => (
                        <div 
                            key={rate.object_id} 
                            className="bg-white border border-slate-200 rounded-xl p-4 hover:border-green-500 hover:shadow-md transition-all duration-200 group cursor-pointer relative overflow-hidden"
                        >
                             {/* Best Value Badge (Mock logic) */}
                             {rate.attributes.includes("BEST_VALUE") && (
                                 <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">
                                     BEST VALUE
                                 </div>
                             )}

                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-50 rounded-lg p-1 flex items-center justify-center border border-slate-100">
                                        <img src={rate.provider_image_75} alt={rate.provider} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">{rate.provider}</h4>
                                        <p className="text-xs text-slate-500">{rate.servicelevel.name}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-lg font-bold text-slate-900">${rate.amount}</span>
                                    <span className="text-xs text-slate-400">{rate.currency}</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                                    {rate.estimated_days ? `Est. ${rate.estimated_days} Days` : 'Transit time varied'}
                                </div>
                                <button className="text-xs font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Select Rate →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;