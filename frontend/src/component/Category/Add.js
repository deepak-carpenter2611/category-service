"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  addCategory,
  fetchCategoryById,
  updateCategory,
} from "@/store/slice/categorySlice";

export default function AddCategory() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      const categoryData = await dispatch(fetchCategoryById(id));
      console.log("categoryData", categoryData);
      setFormData({ name: categoryData?.payload?.name });
    };
    if (id) fetchCategory();
  }, [id, dispatch]);

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Category is required"),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      if (id) {
        await dispatch(updateCategory({ categoryData: formData, id })).unwrap();
      } else {
        await dispatch(addCategory(formData)).unwrap();
      }

      router.push("/categories");
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors?.inner?.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="container mt-2">
      <div className="card p-4 addEdit-page-card">
        <span className="sm-header add-edit-page-title">Create Category</span>
        <hr style={{ color: "#E7E7E7" }} />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label addEdit-form-label">Category</label>
            <input
              type="text"
              name="name"
              className="form-control addEdit-form-input-field"
              placeholder="Enter Category Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <small className="text-danger">{errors.name}</small>
            )}
          </div>
          <div className="d-flex justify-content-end addEdit-form-btn-div">
            <button
              type="button"
              className="btn me-2 addEdit-form-cancel-btn"
              onClick={() => router.push("/categories")}
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
}
