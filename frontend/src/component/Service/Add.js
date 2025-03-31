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
  const { id, categoryId } = useParams();

  const { categories } = useSelector((state) => state.category);

  const [formData, setFormData] = useState({
    name: "",
    categoryId: categoryId || "",
    servicePriceOptions: [{ price: "", type: "Hourly", duration: "1 hour" }],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchCategories());
    if (id && categoryId) {
      const fetchService = async () => {
        const serviceData = await dispatch(
          fetchServiceById({ id, categoryId })
        );
        console.log("serviceData=======", serviceData);

        setFormData({
          name: serviceData?.payload?.name || "",
          categoryId: serviceData?.payload?.categoryId || categoryId,
          servicePriceOptions: serviceData?.payload?.servicePriceOptions || [
            { price: "", type: "Hourly", duration: "1 hour" },
          ],
        });
      };
      fetchService();
    } else {
      setFormData({
        ...formData,
        categoryId: categoryId,
      });
    }
  }, [id, categoryId, dispatch]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Service name is required"),
    servicePriceOptions: Yup.array().of(
      Yup.object().shape({
        price: Yup.number()
          .required("Price is required")
          .positive("Price must be positive"),
        type: Yup.string().required("Type is required"),
        duration: Yup.string().required("Duration is required"),
      })
    ),
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPriceOptions = [...formData.servicePriceOptions];
    updatedPriceOptions[index][name] = value;
    setFormData({ ...formData, servicePriceOptions: updatedPriceOptions });
  };

  const handleAddPriceOption = () => {
    setFormData({
      ...formData,
      servicePriceOptions: [
        ...formData.servicePriceOptions,
        { price: "", type: "Hourly", duration: "1 hour" },
      ],
    });
  };

  const handleRemovePriceOption = (index) => {
    const updatedPriceOptions = formData.servicePriceOptions.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, servicePriceOptions: updatedPriceOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      if (id && categoryId) {
        await dispatch(
          updateService({ serviceData: formData, id, categoryId })
        ).unwrap();
      } else {
        await dispatch(
          addService({ serviceData: formData, categoryId })
        ).unwrap();
      }

      router.push(`/service/${categoryId}`); // Redirect to the category's service list
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors?.inner?.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  // Get the category name based on the categoryId
  const selectedCategory = categories.find(
    (cat) => cat.id === formData.categoryId
  );

  return (
    <div className="container mt-2">
      <div className="card p-4 addEdit-page-card">
        <span className="sm-header add-edit-page-title">
          {id ? "Edit Service" : "Create Service"}
        </span>
        <hr style={{ color: "#E7E7E7" }} />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
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

          {/* Display the category name (but don't allow editing) */}
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
            {formData.servicePriceOptions.map((option, index) => (
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
                  {errors?.servicePriceOptions?.[index]?.price && (
                    <small className="text-danger">
                      {errors.servicePriceOptions[index].price}
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
                  {errors?.servicePriceOptions?.[index]?.type && (
                    <small className="text-danger">
                      {errors.servicePriceOptions[index].type}
                    </small>
                  )}
                </div>
                <div className="d-flex flex-column ms-2">
                  <label className="form-label">Duration</label>
                  <select
                    name="duration"
                    className="form-control"
                    value={option.duration}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="1 hour">1 hour</option>
                    <option value="3 hours">3 hours</option>
                    <option value="1 day">1 day</option>
                    <option value="3 days">3 days</option>
                    <option value="1 week">1 week</option>
                    <option value="3 weeks">3 weeks</option>
                  </select>
                  {errors?.servicePriceOptions?.[index]?.duration && (
                    <small className="text-danger">
                      {errors.servicePriceOptions[index].duration}
                    </small>
                  )}
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
