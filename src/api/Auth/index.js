import apiClient from "../apiClient";

export const adminLogin = (body) => {
  return apiClient.post(`/auth/login/admin`, body);
};

export const adminRegister = (body) => {
  return apiClient.post(`/auth/register/admin`, body);
};

export const login = (body) => {
  return apiClient.post(`/auth/login`, body);
};

export const register = (body) => {
  return apiClient.post(`/auth/register`, body);
};
