"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authService } from "@/app/auth/services/authService";
import { LogOut, ChevronDown } from "lucide-react";

interface HeaderProps {
  mainMenuItems: { label: string; path: string }[];
  settingsItems: { label: string; path: string }[];
}

export function AdminHeader({ mainMenuItems, settingsItems }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const allMenuItems = [...mainMenuItems, ...settingsItems];
  const currentRoute =
    allMenuItems.find((item) => pathname.startsWith(item.path)) ?? null;

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await authService.logout();
      console.log("[Logout] Berhasil logout");
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("[Logout] Error:", error);
      alert("Gagal logout. Silakan coba lagi.");
    } finally {
      setIsLoggingOut(false);
      setShowDropdown(false);
    }
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-gray-50 shadow-md">
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          {currentRoute?.label ?? "Admin Panel"}
        </h1>
        <p className="text-sm text-gray-500">
          {currentRoute?.label
            ? `Kelola ${currentRoute.label}`
            : "Kelola sistem administrasi desa"}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex items-center space-x-3 border-l pl-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">Admin Desa</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>

          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full text-white font-bold cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            <span className="w-full text-center">A</span>
          </button>

          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronDown
              size={20}
              className={`transition-transform ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogOut size={16} />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}
