import React from "react";
import SubSidebar from "./components/SubSidebar";

export default function SubAdminDashboard({ children }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <SubSidebar />

            {/* Main content */}
            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}
