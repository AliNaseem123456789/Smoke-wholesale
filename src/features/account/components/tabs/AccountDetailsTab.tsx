import React, { useState } from "react";
import { useAuth } from "../../../auth/context/AuthContext";
import { Save, User, Building, Phone, Mail, CheckCircle } from "lucide-react";
import axios from "axios"; // or your api util

export const AccountDetailsTab: React.FC = () => {
  const { user, setUser } = useAuth(); // Assume setUser is in your context to update local state
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    businessName: user?.businessName || "",
    phone: user?.phone || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await axios.patch(
        "http://localhost:5000/api/auth/update-profile",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.data.user) {
        setUser(response.data.user); // Update global auth state
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              First Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">Last Name</label>
            <input
              type="text"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>
        </div>

        {/* Business Info */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">
            Business Name
          </label>
          <div className="relative">
            <Building
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.businessName}
              onChange={(e) =>
                setFormData({ ...formData, businessName: e.target.value })
              }
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700">
            Phone Number
          </label>
          <div className="relative">
            <Phone
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="tel"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
        </div>

        {/* Email - Disabled */}
        <div className="space-y-2 opacity-60">
          <label className="text-sm font-bold text-gray-500">
            Email Address (Cannot be changed)
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="email"
              disabled
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl cursor-not-allowed"
              value={user?.email}
            />
          </div>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95 disabled:bg-blue-300"
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                <Save size={18} /> Save Changes
              </>
            )}
          </button>

          {success && (
            <span className="text-green-600 font-bold flex items-center gap-1 animate-bounce">
              <CheckCircle size={18} /> Updated!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
