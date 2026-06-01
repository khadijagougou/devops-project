import {Category, CategoryFormData} from '../../types';
import api from "@/axiosConfig.ts";

const API_URL = `/category`;


export const categoryService = {

    async getAll(): Promise<Category[]> {
        const {data} = await api.get<Category[]>(API_URL);
        return data;
    },

    async getById(id: number): Promise<Category> {
        const { data } = await api.get<Category>(`${API_URL}/${id}`);
        return data;
    },

    async create(data: CategoryFormData): Promise<Category> {
        const { data: created } = await api.post<Category>(API_URL, data);
        return created;
    },

    async update(id: number, data: CategoryFormData): Promise<Category> {
        const { data: updated } = await api.put<Category>(`${API_URL}/id/${id}`, data);
        return updated;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`${API_URL}/id/${id}`);
    },
};
