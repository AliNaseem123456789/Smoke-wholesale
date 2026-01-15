import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Package,
  MapPin,
  User,
  Users,
  ShoppingBag,
  CreditCard,
  Wallet,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../auth/context/AuthContext";
import { OrdersTab } from "../components/tabs/OrdersTab";
// import { AddressTab } from "../components/tabs/AddressTab";
import { AddressesTab } from "../components/tabs/AddressesTab";
import { AccountDetailsTab } from "../components/tabs/AccountDetailsTab";
import { TeamTab } from "../components/tabs/TeamTab";
import { SavedCartsTab } from "../components/tabs/SavedCartsTab";
import PactCompliance from "../components/tabs/PactTab";
import { PaymentsTab } from "../components/tabs/PaymentsTab";
const TABS = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "details", label: "Account Details", icon: User },
  { id: "subaccounts", label: "Subaccounts", icon: Users },
  { id: "saved-carts", label: "Saved Carts", icon: ShoppingBag },
  { id: "payments", label: "Payment History", icon: CreditCard },
  { id: "credit", label: "Total Credit", icon: Wallet },
  { id: "PACT", label: "PACT", icon: Wallet },
];

export const AccountPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "orders";

  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersTab />;
      case "addresses":
        return <AddressesTab />;
      case "details":
        return <AccountDetailsTab />;
      case "subaccounts":
        return <TeamTab />;
      case "saved-carts":
        return <SavedCartsTab />;
      case "payments":
        return <PaymentsTab />;
      case "credit":
        return <div className="p-4">Credit Ledger (Tab 7)</div>;
      case "PACT":
        return <PactCompliance />;
      default:
        return <div className="p-4">Select a tab</div>;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-7xl mx-auto w-full px-4 py-10 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-72 shrink-0">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-bold text-gray-900">My Account</h2>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <nav className="p-2">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSearchParams({ tab: tab.id })}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      {tab.label}
                    </div>
                    {isActive && <ChevronRight size={14} />}
                  </button>
                );
              })}

              <hr className="my-2 border-gray-100" />

              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut size={18} />
                Logout
              </button>
            </nav>
          </div>
        </aside>
        <main className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm min-h-[600px]">
          <header className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900 capitalize">
              {activeTab.replace("-", " ")}
            </h1>
            {activeTab === "subaccounts" && (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
                + Add Subaccount
              </button>
            )}
          </header>

          <div className="p-8">{renderTabContent()}</div>
        </main>
      </div>
    </div>
  );
};
