"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/component/Sidebar";

export default function DefaultLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="page">
        <Sidebar />
        <div className="main-content app-content mt-2">{children}</div>
      </div>
    </>
  );
}
