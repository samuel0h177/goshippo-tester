import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { parseAddressWithGemini } from '../services/geminiService';
import { Address } from '../types';

interface SmartParserProps {
  onAddressParsed: (address: Address) => void;
  target: "Sender" | "Receiver";
}

const SmartParser: React.FC<SmartParserProps> = ({ onAddressParsed, target }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleParse = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    
    try {
      const address = await parseAddressWithGemini(input);
      onAddressParsed(address);
      setInput(''); // Clear on success
    } catch (err) {
      setError("Could not understand the address. Please try manually filling the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 bg-indigo-100 rounded-full opacity-50 blur-xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
             <Sparkles className="w-4 h-4 text-indigo-600" />
             <span className="text-sm font-semibold text-indigo-900">AI Quick Fill ({target})</span>
          </div>
          <p className="text-xs text-indigo-700 mb-3">
            Paste a full address string below (e.g., "John Doe, 123 Main St, NY 10001") to autofill the form using Gemini 2.5.
          </p>
          
          <div className="flex gap-2">
             <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleParse()}
                placeholder={`Paste raw ${target.toLowerCase()} address here...`}
                className="flex-1 rounded-lg border-indigo-200 text-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                disabled={loading}
             />
             <button
                onClick={handleParse}
                disabled={loading || !input.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-lg px-4 py-2 transition-colors flex items-center gap-2"
             >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                <span className="text-xs font-medium hidden sm:inline">Fill</span>
             </button>
          </div>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SmartParser;