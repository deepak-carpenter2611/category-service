"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/component/Sidebar";
// import Header from "@/component/Header";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/component/Header"), { ssr: false });
export default function DefaultLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="page">
        <Header />
        <Sidebar />
        <div className="main-content app-content mt-2">{children}</div>
      </div>
    </>
  );
}
