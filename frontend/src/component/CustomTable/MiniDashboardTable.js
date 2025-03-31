"use client";

import { useRouter } from "next/navigation";
import React from "react";
import CustomTable from "./CustomTable";

const MiniDashboardTable = ({ data, route }) => {
    console.log(data,123);
    const router = useRouter();
    const columns = !route?.includes("assessment") ? [
        { key: "first_name", label: "Name" },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <button className="btn btn-sm " onClick={() => router.push(`${route}/${row.id}`)}>
                    <i className="bi bi-eye  fs-6 actionBtnEye "></i> {/* Eye Icon */}
                </button>
            ),
        },
    ] : [
        { key: "assessment_name", label: "Name" },
        {
            key: "actions",
            label: "Actions",
            render: (row) => (
                <button className="btn btn-sm " onClick={() => router.push(`${route}/${row.id}`)}>
                    <i className="bi bi-eye fs-6 actionBtnEye "></i> {/* Eye Icon */}
                </button>
            ),
        },
    ];



    return (

        <CustomTable data={data} columns={columns} hideSearch={true} />

    );
};

export default MiniDashboardTable;
