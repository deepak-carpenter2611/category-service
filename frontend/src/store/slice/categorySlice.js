import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const initialState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  "category/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      console.log("API_BASE_URL", API_BASE_URL);

      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(`${API_BASE_URL}/categories`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get categories"
      );
    }
  }
);

// Add a new match category
export const addCategory = createAsyncThunk(
  "category/add",
  async (categoryData, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.post(
        `${API_BASE_URL}/category`,
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Category added successfully.");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add category");
      return rejectWithValue(
        error.response?.data?.message || "Failed to add category"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/add",
  async ({ categoryData, id }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.put(
        `${API_BASE_URL}/category/${id}`,
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Category updated successfully.");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add category");
      return rejectWithValue(
        error.response?.data?.message || "Failed to add category"
      );
    }
  }
);
export const fetchCategoryById = createAsyncThunk(
  "category/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(`${API_BASE_URL}/category/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch category"
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.delete(`${API_BASE_URL}/category/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      toast.success("Category deleted successfully.");
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete category");
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete category"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
        state.error = null;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Category
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
        state.error = null;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
