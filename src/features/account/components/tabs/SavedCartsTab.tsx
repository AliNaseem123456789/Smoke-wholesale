import React, { useState, useEffect } from "react";
import { useSavedCarts } from "../../../cart/hooks/useSavedCarts";
import { getSavedCartById } from "../../../cart/api/cartApi";
import {
  Loader2,
  Package,
  Eye,
  Printer,
  ArrowLeft,
  ShoppingCart,
  Tag,
  Hash,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

export const SavedCartsTab: React.FC = () => {
  const { templates, loading: listLoading } = useSavedCarts();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [detailData, setDetailData] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  useEffect(() => {
    if (selectedId) {
      const fetchDetails = async () => {
        setDetailLoading(true);
        try {
          const data = await getSavedCartById(selectedId);
          setDetailData(data);
        } catch (err) {
          toast.error("Failed to load cart details");
          setSelectedId(null);
        } finally {
          setDetailLoading(false);
        }
      };
      fetchDetails();
    }
  }, [selectedId]);

  if (listLoading)
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );

  // --- DETAIL VIEW ---
  if (selectedId && detailData) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <button
          onClick={() => {
            setSelectedId(null);
            setDetailData(null);
          }}
          className="flex items-center gap-2 text-blue-600 font-medium hover:underline mb-4"
        >
          <ArrowLeft size={18} /> Back to Saved Carts
        </button>

        <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900">
              {detailData.cart_name}
            </h2>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Hash size={14} /> ID: {detailData.id}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} /> Saved on{" "}
                {new Date(detailData.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-50 font-bold text-sm transition-colors">
              <Printer size={18} /> Print Template
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">
              <ShoppingCart size={18} /> Restore to Active Cart
            </button>
          </div>
        </div>

        <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">
                  Product
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-center">
                  Quantity
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">
                  Unit Price
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {detailData.products_details.map((item: any) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <p className="text-xs text-blue-600 uppercase font-medium">
                        {item.brand}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center font-bold">
                    {item.quantity}
                  </td>
                  {/* <td className="px-6 py-4 text-right text-gray-500">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td> */}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-blue-50/50">
                <td
                  colSpan={3}
                  className="px-6 py-4 text-right font-bold text-gray-900"
                >
                  Total Estimated Amount
                </td>
                <td className="px-6 py-4 text-right text-xl font-black text-blue-600">
                  ${detailData.total_amount.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }

  if (detailLoading)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-blue-600 mb-2" />
        <p className="text-sm text-gray-500">Loading details...</p>
      </div>
    );

  // --- LIST VIEW (Your Table) ---
  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">
                Cart ID#
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">
                Cart Name
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">
                Cart Items
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500">
                Created On
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {templates.map((template) => {
              const totalUnits = template.items.reduce(
                (acc: number, item: any) => acc + item.quantity,
                0,
              );
              return (
                <tr
                  key={template.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-mono text-sm text-gray-600">
                    #{template.id.toString().padStart(4, "0")}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {template.cart_name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-gray-900 font-medium">
                        {totalUnits} Units
                      </p>
                      <p className="text-gray-500 text-xs">
                        {template.items.length} Products
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(template.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedId(template.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center gap-1 text-sm font-bold transition-colors"
                      >
                        <Eye size={18} /> View
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1 text-sm font-bold">
                        <Printer size={18} /> Print
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
