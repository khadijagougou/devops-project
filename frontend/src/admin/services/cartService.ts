import api from "@/axiosConfig.ts";


const API_URL = "/cart";

export const cartService = {
    async findCartByUserId(userId: number): Promise<any> {
        const response = await api.get(`${API_URL}/user/${userId}`);
        return response.data;
    },
     removeCartItem(
        cartId:number,
        cartItemId:number
    ):Promise<any>{
        return  api.delete(`${API_URL}/remove/cartId/${cartId}/cartItemId/${cartItemId}`);
    },

};