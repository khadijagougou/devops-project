import {CartItem} from "@/types";
import api from "@/axiosConfig.ts";

const API_URL = "/cart-item";

export const cartItemService = {

    async addCartItemToCart(
        userId: number,
        productId: number,
        quantity: number
    ): Promise<CartItem> {

        return  await api.post(
            `${API_URL}/userId/${userId}/productId/${productId}`,
            null,
            {
                params: {
                    quantity
                }
            }
        );


    },
    async updateCartItemQuantity(id:number, quantity:number):Promise<any>{
        const response = await api.put(`${API_URL}/update/cartItemId/${id}`,null,
            {
                params: {
                    quantity
                }
            });
        return response.data;
    }


}