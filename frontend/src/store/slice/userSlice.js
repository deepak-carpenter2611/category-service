import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Initial state
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('credentials', credentials);
      
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        credentials
      );

      const { token } = response.data;
      localStorage.setItem("authToken", token); 
      return { token };
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Invalid email or password"
      );
    }
  }
);

// Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("authToken"); // Remove token from local storage
      localStorage.removeItem("userData"); // Remove user data from local storage
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
  },
});

export const { resetState } = userSlice.actions;
export default userSlice.reducer;
