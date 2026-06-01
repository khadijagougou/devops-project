import {Product} from '../../types';
import api from "@/axiosConfig.ts";

const API_URL = `/product`;

export const productService = {

  async getAll(): Promise<Product[]> {
    const { data } = await api.get<Product[]>(API_URL);

    return data;
  },

  async getById(id: number): Promise<Product> {
    const { data } = await api.get<Product>(`${API_URL}/id/${id}`);
    return data;
  },

  async create(data: FormData): Promise<Product> {
    const { data: created } = await api.post<Product>(API_URL, data);
    return created;
  },

  async update(id: number, data: FormData): Promise<Product> {
    const { data: updated } = await api.put<Product>(`${API_URL}/id/${id}`, data);
    return updated;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`${API_URL}/id/${id}`);
  },

};
