import {Order} from '../../types';
import {BASE_URL} from "@/environment.ts";
import api from "@/axiosConfig.ts";

const API_URL = `/order`;

export const orderService = {
    async create(data: Order): Promise<Order> {
        const { data: created } = await api.post<Order>(API_URL, data);
        return created;
    },
    async getAll(): Promise<Order[]> {
       const {data} =await api.get<Order[]>(API_URL);
       return data;
    },
    async getByUserId(id: number): Promise<Order[]> {
        const { data } = await api.get<Order[]>(`${API_URL}/user/id/${id}`);
        return data
    },
    async updateStatus(idOrder:number, status: string): Promise<Order> {
        const {data} = await api.put<Order>(`${API_URL}/${idOrder}/status/${status}`);
        return data;

    }

};
