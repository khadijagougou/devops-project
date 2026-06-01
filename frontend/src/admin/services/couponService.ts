import { Coupon, CouponFormData } from "@/types";
import api from "@/axiosConfig.ts";
const API_URL = `/coupon`;

export const couponService = {
    async getByName(name: string): Promise<any> {
        const { data } = await api.get<any>(`${API_URL}/name/${name}`);
        return data;
    },
    async getAll(): Promise<Coupon[]> {
        const {data} = await api.get<Coupon[]>(API_URL);
        return data;
    },

    async getById(id: number): Promise<Coupon> {
        const { data } = await api.get<Coupon>(`${API_URL}/${id}`);
        return data;
    },

    async create(data: CouponFormData): Promise<Coupon> {
        const { data: created } = await api.post<Coupon>(API_URL, data);
        return created;
    },

    async update(id: number, data: CouponFormData): Promise<Coupon> {
        const { data: updated } = await api.put<Coupon>(`${API_URL}/id/${id}`, data);
        return updated;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`${API_URL}/id/${id}`);
    },
}
