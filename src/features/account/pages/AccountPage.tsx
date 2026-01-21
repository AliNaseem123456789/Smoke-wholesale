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
import { CreditTab } from "../components/tabs/CreditTab";
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
  const filteredTabs = TABS.filter((tab) => {
    if (tab.id === "subaccounts" && user?.role === "SUBACCOUNT") {
      return false;
    }
    return true;
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersTab />;
      case "addresses":
        return <AddressesTab />;
      case "details":
        return <AccountDetailsTab />;
      case "subaccounts":
        // Fallback safety: even if they guess the URL, show restricted message
        if (user?.role === "SUBACCOUNT") {
          return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-amber-50 p-4 rounded-full mb-4">
                <Users className="text-amber-600 w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Access Restricted
              </h3>
              <p className="text-gray-500 max-w-xs mt-2">
                As a subaccount, you do not have permission to manage or create
                additional team members.
              </p>
            </div>
          );
        }
        return <TeamTab />;
      case "saved-carts":
        return <SavedCartsTab />;
      case "payments":
        return <PaymentsTab />;
      case "credit":
        return <CreditTab />;
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
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-bold text-gray-900">My Account</h2>
                {/* 2. Added Role Badge */}
                {user?.role === "SUBACCOUNT" && (
                  <span className="text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    Subaccount
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>

            <nav className="p-2">
              {/* 3. Use filteredTabs instead of TABS */}
              {filteredTabs.map((tab) => {
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
          </header>

          <div className="p-8">{renderTabContent()}</div>
        </main>
      </div>
    </div>
  );
};
