"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const frame1 = "/images/Frame1.png";
const frame2 = "/images/Frame2.png";
const frame3 = "/images/Frame3.png";
const frame4 = "/images/requirements.png";
export default function SignIn() {
  const userData =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userData"))
      : [];
  console.log("userData=======", userData);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="dashboard-con">
      <div className="container-fluid">
        <div className="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
          <div>
            <h2 className="main-content-title fs-24 mb-1">
              Welcome To Dashboard
            </h2>
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="javascript:void(0)">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Dashboard
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
