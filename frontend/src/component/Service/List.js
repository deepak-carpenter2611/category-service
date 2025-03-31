"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import CustomTable from "../CustomTable/CustomTable";
import { deleteService, fetchServices } from "@/store/slice/serviceSlice";
import { fetchCategories } from "@/store/slice/categorySlice";

const ServiceList = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);
  const { categories } = useSelector((state) => state.category);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(fetchCategories());
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchServices(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (confirmation) {
      await dispatch(deleteService(id));
    }
  };

  const columns = [
    { key: "name", label: "Services" },
    { key: "type", label: "Type" },
    {
      key: "priceOptions",
      label: "Price Options",
      render: (row) => (
        <ul>
          {row.ServicePriceOptions.map((option) => (
            <li key={option.id}>
              {option.duration} - {option.price} ({option.type})
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <>
          <button
            className="btn btn-sm list-page-edit-icon"
            onClick={() =>
              router.push(`/service/edit/${row.id}/${selectedCategory}`)
            }
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
                <span className="sm-header">Services</span>
              </div>
              <div>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="btn btn-primary ms-2 font-weight-bold addEdit-form-submit-btn"
                  onClick={() =>
                    router.push(`/service/add/${selectedCategory}`)
                  }
                  disabled={!selectedCategory}
                >
                  + Add Service
                </button>
              </div>
            </div>
            <div className="card-body overflow-auto mx-3">
              <CustomTable data={services} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
