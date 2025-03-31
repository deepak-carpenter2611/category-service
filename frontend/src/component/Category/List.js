"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CustomTable from "../CustomTable/CustomTable";
import { deleteCategory, fetchCategories } from "@/store/slice/categorySlice";

const CategoryList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const data = dispatch(fetchCategories());
    }
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmation) {
      await dispatch(deleteCategory(id));
    }
  };

  const columns = [
    { key: "name", label: "Categories" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <>
          <button
            className="btn btn-sm list-page-edit-icon"
            onClick={() => router.push(`/categories/edit/${row.id}`)}
          >
            <i className="bi bi-pencil-fill fs-6"></i>
          </button>
          <button
            className="btn btn-sm list-page-delete-icon"
            onClick={() => handleDelete(row.id)}
          >
            <i className="bi bi-trash-fill fs-6"></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row row-sm">
        <div className="col-lg-12 col-md-12">
          <div className="card custom-card sm-list-card mt-5">
            <div className="card-header d-flex justify-content-between">
              <div>
                <span className="sm-header">Categories</span>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary ms-2 font-weight-bold addEdit-form-submit-btn"
                  onClick={() => router.push("/categories/add")}
                >
                  + Add Category
                </button>
              </div>
            </div>
            <div className="card-body overflow-auto mx-3">
              <CustomTable data={categories} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
