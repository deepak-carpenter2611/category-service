"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import * as Yup from "yup";
import {
  addService,
  fetchServiceById,
  updateService,
} from "@/store/slice/serviceSlice";
import { fetchCategories } from "@/store/slice/categorySlice";

const AddService = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const categoryId = params.categoryId || params.id;

  console.log("id============", id);
  console.log("categoryId============", categoryId);

  const { categories } = useSelector((state) => state.category);

  const [formData, setFormData] = useState({
    name: "",
    type: "Normal",
    categoryId: categoryId || "",
    ServicePriceOptions: [{ price: "", type: "Hourly", duration: "" }],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCategories());
    if (id && categoryId && id !== categoryId) {
      const fetchService = async () => {
        const serviceData = await dispatch(
          fetchServiceById({ id, categoryId })
        );

        if (serviceData?.payload) {
          setFormData({
            name: serviceData.payload.name || "",
            type: serviceData.payload.type || "Normal",
            categoryId: serviceData.payload.categoryId || categoryId,
            ServicePriceOptions: serviceData.payload.ServicePriceOptions?.map(
              (option) => ({
                price: option.price || "",
                type: option.type || "Hourly",
                duration: option.duration || "",
              })
            ) || [{ price: "", type: "Hourly", duration: "1 hour" }],
          });
        }
      };
      fetchService();
    }
  }, [id, categoryId, dispatch]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Service name is required"),
    type: Yup.string()
      .oneOf(["VIP", "Normal"])
      .required("Service type is required"),
    ServicePriceOptions: Yup.array().of(
      Yup.object().shape({
        price: Yup.number()
          .required("Price is required")
          .positive("Price must be positive"),
        type: Yup.string().required("Type is required"),
        duration: Yup.string().required("Duration is required"),
      })
    ),
  });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      const updatedPriceOptions = [...formData.ServicePriceOptions];
      updatedPriceOptions[index] = {
        ...updatedPriceOptions[index],
        [name]: value,
      };
      setFormData({ ...formData, ServicePriceOptions: updatedPriceOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddPriceOption = () => {
    setFormData({
      ...formData,
      ServicePriceOptions: [
        ...formData.ServicePriceOptions,
        { price: "", type: "Hourly", duration: "1 hour" },
      ],
    });
  };

  const handleRemovePriceOption = (index) => {
    const updatedPriceOptions = formData.ServicePriceOptions.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, ServicePriceOptions: updatedPriceOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const payload = {
        ...formData,
        priceOptions: formData.ServicePriceOptions.map((option) => ({
          duration: option.duration,
          price: Number(option.price), // Convert price to number
          type: option.type,
        })),
      };

      console.log("id && categoryId", id);
      console.log("id && categoryId", categoryId);

      if (id && categoryId && id !== categoryId) {
        await dispatch(
          updateService({ serviceData: payload, serviceId: id, categoryId })
        ).unwrap();
      } else {
        await dispatch(
          addService({ serviceData: payload, categoryId })
        ).unwrap();
      }

      router.push(`/service`);
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors?.inner?.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  const selectedCategory = categories.find(
    (cat) => cat.id === formData.categoryId
  );

  return (
    <div className="container mt-2">
      <div className="card p-4 addEdit-page-card">
        <span className="sm-header add-edit-page-title">
          {id && categoryId && id !== categoryId
            ? "Edit Service"
            : "Create Service"}
        </span>
        <hr style={{ color: "#E7E7E7" }} />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="me-3" style={{ flex: 1 }}>
              <label className="form-label addEdit-form-label">
                Service Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control addEdit-form-input-field"
                placeholder="Enter Service Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label addEdit-form-label">
                Service Type
              </label>
              <select
                name="type"
                className="form-control"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Normal">Normal</option>
                <option value="VIP">VIP</option>
              </select>
              {errors.type && (
                <small className="text-danger">{errors.type}</small>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label addEdit-form-label">Category</label>
            <input
              type="text"
              className="form-control"
              value={selectedCategory ? selectedCategory.name : "Loading..."}
              disabled
            />
          </div>

          {/* Service Price Options */}
          <div>
            <label className="form-label addEdit-form-label">
              Price Options
            </label>
            {formData.ServicePriceOptions.map((option, index) => (
              <div key={index} className="mb-3 d-flex justify-content-between">
                <div className="d-flex flex-column">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="Enter Price"
                    value={option.price}
                    onChange={(e) => handleChange(e, index)}
                  />
                  {errors?.ServicePriceOptions?.[index]?.price && (
                    <small className="text-danger">
                      {errors.ServicePriceOptions[index].price}
                    </small>
                  )}
                </div>
                <div className="d-flex flex-column ms-2">
                  <label className="form-label">Type</label>
                  <select
                    name="type"
                    className="form-control"
                    value={option.type}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="Hourly">Hourly</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                  {errors?.ServicePriceOptions?.[index]?.type && (
                    <small className="text-danger">
                      {errors.ServicePriceOptions[index].type}
                    </small>
                  )}
                </div>
                <div className="d-flex flex-column ms-2">
                  <label className="form-label">Duration</label>
                  <input
                    type="text"
                    name="duration"
                    className="form-control"
                    placeholder="Enter Duration"
                    value={option.duration}
                    onChange={(e) => handleChange(e, index)}
                    required
                  />
                </div>

                {/* Remove price option button */}
                <button
                  type="button"
                  className="btn btn-danger ms-2 mt-2"
                  onClick={() => handleRemovePriceOption(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Add Price Option Button */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddPriceOption}
            >
              Add Price Option
            </button>
          </div>

          <div className="d-flex justify-content-end addEdit-form-btn-div">
            <button
              type="button"
              className="btn me-2 addEdit-form-cancel-btn"
              onClick={() => router.push(`/service/${categoryId}`)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary submit-buttton addEdit-form-submit-btn"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
