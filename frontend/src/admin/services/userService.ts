import { User, UserFormData } from '../../types';
import api from "@/axiosConfig.ts";

const API_URL = '/user';

export const userService = {

    async getAll(): Promise<User[]> {
        const { data } = await api.get<User[]>(API_URL);
        return data;
    },

    async getById(id: number): Promise<User> {
        const { data } = await api.get<User>(`${API_URL}/id/${id}`);
        return data;
    },


    async create(data: FormData): Promise<User> {
        const { data: created } = await api.post<User>(API_URL, data);
        return created;
    },

    async update(id: number, data: UserFormData): Promise<User> {
        const { data: updated } = await api.put<User>(`${API_URL}/id/${id}`, data);
        return updated;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`${API_URL}/id/${id}`);
    },

    async login(data: any): Promise<any> {
        const { data: res } = await api.post(
            "/v1/auth/authenticate",
            data
        );
        return res;
    },

    async register(data: any): Promise<any> {
        const { data: res } = await api.post(
            "/v1/auth/register",
            data
        );
        return res;
    },

    async me(): Promise<User> {
        const { data } = await api.get("/v1/auth/me");
        return data;
    }
};