import React from "react";
import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />

      <div className="flex-grow p-6">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
