export const authMiddleware = (store) => (next) => (action) => {
  if (action.payload === "Unauthorized") {
    localStorage.removeItem("authToken");
    window.location.href = "/";
    return;
  }
  return next(action);
};
