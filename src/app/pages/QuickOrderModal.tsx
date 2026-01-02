import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    brand: string;
    imageUrl: string;
    variants: string[];
  };
}

export const QuickOrderModal: React.FC<QuickOrderModalProps> = ({ isOpen, onClose, product }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const updateQty = (v: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [v]: Math.max(0, (prev[v] || 0) + delta)
    }));
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200">
        
        {/* Deep Purple Header from your image */}
        <div className="bg-[#2D0345] text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase tracking-tight">Quick Order</h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform cursor-pointer">
            <X size={28} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-8 mb-8 items-center">
            <div className="w-32 h-32 border border-gray-100 rounded p-2 bg-white shrink-0 shadow-sm">
              <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 leading-tight">
                {product.title} By {product.brand}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                {/* Red label from your screenshots */}
                <span className="w-1.5 h-5 bg-[#D91B24]"></span>
                <span className="text-[#D91B24] font-bold text-sm uppercase">Login to view prices</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 border-b-2 border-black pb-2 px-2 font-bold text-gray-700">
            <div className="col-span-8">Nicotine / Option</div>
            <div className="col-span-4 text-right pr-14">Quantity</div>
          </div>

          <div className="max-h-[350px] overflow-y-auto">
            {product.variants.map((v) => (
              <div key={v} className="grid grid-cols-12 items-center py-4 px-2 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="col-span-8 flex items-center gap-2">
                  <span className="font-bold text-gray-900">{v}</span>
                  <span className="w-[1px] h-4 bg-[#D91B24] mx-1"></span>
                  <span className="text-[#D91B24] text-xs font-bold uppercase">Login to view prices</span>
                </div>
                
                <div className="col-span-4 flex items-center justify-end gap-2">
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden shadow-sm">
                    <input 
                      type="number" 
                      value={quantities[v] || 0}
                      onChange={(e) => updateQty(v, parseInt(e.target.value) || 0)}
                      className="w-12 text-center py-1.5 font-bold outline-none bg-white text-gray-800"
                    />
                    <button onClick={() => updateQty(v, -1)} className="px-2.5 py-1.5 border-l border-gray-300 hover:bg-gray-100 cursor-pointer">
                      <Minus size={14} className="text-gray-600" />
                    </button>
                    <button onClick={() => updateQty(v, 1)} className="px-2.5 py-1.5 border-l border-gray-300 hover:bg-gray-100 cursor-pointer">
                      <Plus size={14} className="text-gray-600" />
                    </button>
                  </div>
                  <button onClick={() => setQuantities(prev => ({...prev, [v]: 0}))} className="text-gray-300 hover:text-red-500 cursor-pointer ml-1">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Action Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            <button className="bg-[#E47CBB] hover:bg-[#D46CAA] text-white px-8 py-3 rounded font-bold transition-all shadow-[0_4px_14px_0_rgba(228,124,187,0.39)] active:scale-95 cursor-pointer uppercase text-sm tracking-widest">
              Request product
            </button>
            <button 
              onClick={() => setQuantities({})}
              className="bg-[#71767A] hover:bg-[#5F6367] text-white px-8 py-3 rounded font-bold transition-all shadow-md active:scale-95 cursor-pointer uppercase text-sm tracking-widest"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};