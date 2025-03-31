import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const initialState = {
  services: [],
  service: null,
  loading: false,
  error: null,
};

// Fetch all services for a category
export const fetchServices = createAsyncThunk(
  "service/fetchAll",
  async (categoryId, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.get(
        `${API_BASE_URL}/category/${categoryId}/services`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch services"
      );
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  "service/fetchServiceById",
  async ({ id, categoryId }, { rejectWithValue }) => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `${API_BASE_URL}/category/${categoryId}/services/${id}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add a new service to a category
export const addService = createAsyncThunk(
  "service/add",
  async ({ categoryId, serviceData }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.post(
        `${API_BASE_URL}/category/${categoryId}/services`,
        serviceData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Service added successfully.");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add service");
      return rejectWithValue(
        error.response?.data?.message || "Failed to add service"
      );
    }
  }
);

// Update an existing service
export const updateService = createAsyncThunk(
  "service/update",
  async ({ categoryId, serviceId, serviceData }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.put(
        `${API_BASE_URL}/category/${categoryId}/services/${serviceId}`,
        serviceData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Service updated successfully.");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update service");
      return rejectWithValue(
        error.response?.data?.message || "Failed to update service"
      );
    }
  }
);

// Delete a service
export const deleteService = createAsyncThunk(
  "service/delete",
  async ({ categoryId, serviceId }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.delete(
        `${API_BASE_URL}/category/${categoryId}/services/${serviceId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      toast.success("Service deleted successfully.");
      return serviceId;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete service");
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete service"
      );
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
        state.error = null;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addService.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
        state.error = null;
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateService.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.map((service) =>
          service.id === action.payload.id ? action.payload : service
        );
        state.error = null;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(
          (service) => service.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceSlice.reducer;
