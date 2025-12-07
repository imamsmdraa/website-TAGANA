"use client";

import { ReactNode } from "react";
import Sidebar from "../components/sidebar/page";
import Header from "../components/Header/page";
import { AlertProvider } from "../ui/allert/page";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AlertProvider>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Sidebar - Fixed & Sticky */}
        <aside className="hidden lg:block lg:w-64 fixed left-0 top-0 h-full z-30">
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:ml-64">
          {/* Header - Sticky */}
          <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
            <Header />
          </header>

          {/* Content - Scrollable */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AlertProvider>
  );
}
