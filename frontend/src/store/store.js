import { configureStore } from "@reduxjs/toolkit";
import { authMiddleware } from "./authMiddleware";
import loginReducer from "./slice/userSlice";
import categoryReducer from "./slice/categorySlice";
import serviceReducer from "./slice/serviceSlice";
export const store = configureStore({
  reducer: {
    user: loginReducer,
    category: categoryReducer,
    service: serviceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});
