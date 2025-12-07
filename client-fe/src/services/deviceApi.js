import axios from "axios";

const API_BASE_URL = "/api/v1"; // Sử dụng đường dẫn tương đối để proxy hoạt động

const api = axios.create({
  baseURL: API_BASE_URL,
});

const deviceApi = {
  async getAll({ page = 1, limit = 10}) {
    const res = await api.get("/device", {
      params: { page, limit },
    });
    return res.data.metadata; // Trả về phần metadata chứa data và pagination
  },

  async add(data) {
    const res = await api.post("/device", data);
    return res.data;
  },

  async update(id, data) {
    const res = await api.put(`/device/${id}`, data);
    return res.data;
  },

  async delete(id) {
    const res = await api.delete(`/device/${id}`);
    return res.data;
  },
};

export default deviceApi;
