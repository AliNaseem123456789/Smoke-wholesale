import React, { useState } from "react";
import { Users, Package, LayoutDashboard, Settings } from "lucide-react";
import { UserManagement } from "./UserManagement";
import { ProductManagement } from "./ProductManagement";
import { FeatureSettings } from "./FeaturesManagement";

type AdminTab = "users" | "products" | "features";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("products");

  const tabs = [
    { id: "products", label: "Inventory", icon: Package },
    { id: "users", label: "Users", icon: Users },
    { id: "features", label: "Site Features", icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar / Header Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Settings className="text-white" size={20} />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">
                Admin<span className="text-blue-600">Portal</span>
              </span>
            </div>

            <nav className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all
                    ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700 shadow-sm"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Dynamic Content Area */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {activeTab === "products" && <ProductManagement />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "features" && <FeatureSettings />}
        </div>
      </main>
    </div>
  );
};
