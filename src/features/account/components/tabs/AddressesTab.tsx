import React, { useState, useEffect } from "react";
import {
  MapPin,
  Plus,
  Trash2,
  Home,
  Briefcase,
  Star,
  Loader2,
  X,
} from "lucide-react";
import axios from "axios";

import { AddAddressForm } from "../AddAddressForm";
// If you have a central API config, use that instead of hardcoding localhost
const API_BASE = "http://localhost:5000/api";

export const AddressesTab = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // 1. Fetch Addresses
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/addresses`, {
        withCredentials: true,
      });
      // Accessing .data.data because of your controller structure
      setAddresses(res.data.data || []);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // 2. Delete Address
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;
    try {
      await axios.delete(`${API_BASE}/addresses/${id}`, {
        withCredentials: true,
      });
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
    } catch (err) {
      alert("Failed to delete address");
    }
  };

  // 3. Set Default
  const handleSetDefault = async (id: string) => {
    try {
      await axios.patch(
        `${API_BASE}/addresses/${id}/default`,
        {},
        { withCredentials: true }
      );
      fetchAddresses(); // Refresh list to update all badges
    } catch (err) {
      alert("Failed to update default address");
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-blue-600 mb-2" size={32} />
        <p className="text-gray-500 font-medium">
          Loading your address book...
        </p>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-gray-900">Saved Addresses</h3>
          <p className="text-gray-500 text-sm">
            Manage your shipping and billing locations.
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
            showForm
              ? "bg-gray-100 text-gray-600"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {showForm ? (
            <>
              <X size={18} /> Cancel
            </>
          ) : (
            <>
              <Plus size={18} /> Add New
            </>
          )}
        </button>
      </div>

      {/* Placeholder for the Add Form - We can build this next */}
      {showForm && (
        <AddAddressForm
          onSuccess={() => {
            setShowForm(false); // Close form
            fetchAddresses(); // Refresh the list immediately
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((addr: any) => (
          <div
            key={addr.id}
            className={`p-5 border rounded-2xl relative transition-all group ${
              addr.is_default
                ? "border-blue-600 bg-blue-50/30 ring-1 ring-blue-600"
                : "border-gray-200 bg-white hover:border-blue-300"
            }`}
          >
            {addr.is_default && (
              <span className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">
                Default {addr.address_type}
              </span>
            )}

            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-xl ${addr.is_default ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}`}
              >
                {addr.address_type === "Billing" ? (
                  <Briefcase size={20} />
                ) : (
                  <Home size={20} />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-black text-gray-900">{addr.full_name}</h4>
                <div className="mt-2 space-y-0.5">
                  <p className="text-sm text-gray-600 font-medium">
                    {addr.address_line1}
                  </p>
                  {addr.address_line2 && (
                    <p className="text-sm text-gray-500">
                      {addr.address_line2}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    {addr.city}, {addr.state} {addr.postal_code}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex gap-4">
                <button className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">
                  Edit
                </button>
                {!addr.is_default && (
                  <button
                    onClick={() => handleSetDefault(addr.id)}
                    className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Star size={14} /> Set as Default
                  </button>
                )}
              </div>

              {!addr.is_default && (
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && !showForm && (
        <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="text-gray-300" size={32} />
          </div>
          <p className="text-gray-900 font-bold">No addresses saved yet</p>
          <p className="text-gray-500 text-sm mt-1">
            Add a shipping address to speed up checkout.
          </p>
        </div>
      )}
    </div>
  );
};
