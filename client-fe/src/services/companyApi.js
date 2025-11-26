// src/services/companyApi.js
import axios from "axios";

const API_BASE_URL = "/api/v1"; // Sử dụng đường dẫn tương đối để proxy hoạt động

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const companyApi = {
  async getAll() {
    const res = await api.get("/company", {
      //params: { page, limit },
    });
    return res.data.metadata; // Trả về phần metadata chứa data và pagination
  },
};

export default api;
