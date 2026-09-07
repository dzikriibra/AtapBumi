import api from "../../services/api";

export const registerUser = (data) => {
  return api.post("/register", data);
};

export const loginUser = (data) => {
  return api.post("/login", data);
};

export const getCurrentUser = () => {
  return api.get("/users/me");
};
