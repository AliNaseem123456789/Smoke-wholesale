import React, { useState } from "react";
import { createPortal } from "react-dom";
import { X, Minus, Plus, Trash2 } from "lucide-react";

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

const QuickOrderModal: React.FC<QuickOrderModalProps> = ({
  isOpen,
  onClose,
  product,
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  if (!isOpen) return null;

  const updateQty = (variant: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [variant]: Math.max(0, (prev[variant] || 0) + delta),
    }));
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1a1a24] rounded-xl shadow-2xl overflow-hidden">
        <div className="bg-[#003366] text-white px-6 py-4 flex justify-between">
          <h2 className="font-black uppercase">Wholesale Quick Order</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-6">
          <div className="flex gap-4 mb-6">
            <img src={product.imageUrl} className="w-20 h-20 object-contain" />
            <div>
              <p className="text-xs font-bold text-cyan-500 uppercase">
                {product.brand}
              </p>
              <h3 className="font-black uppercase">{product.title}</h3>
            </div>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {product.variants.map((v) => (
              <div
                key={v}
                className="flex justify-between items-center p-3 bg-gray-50 rounded"
              >
                <span className="font-bold text-sm">{v}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(v, -1)}>
                    <Minus size={14} />
                  </button>
                  <span className="w-6 text-center">{quantities[v] || 0}</span>
                  <button onClick={() => updateQty(v, 1)}>
                    <Plus size={14} />
                  </button>
                  <button onClick={() => setQuantities((p) => ({ ...p, [v]: 0 }))}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default QuickOrderModal;
