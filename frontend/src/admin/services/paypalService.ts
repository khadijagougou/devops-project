import api from "@/axiosConfig.ts";

export const paypalService = {

    async handlePaypal(amount: number): Promise<string> {

        const response = await api.post(
            "/paypal/pay",
            null,
            {
                params: {
                    amount: amount
                }
            }
        );

        return response.data;
    },
    async executePayment(paymentId: string, payerId: string) {

        const response = await api.post(
            "/paypal/execute",
            null,
            {
                params: {
                    paymentId,
                    payerId
                }
            }
        );

        return response.data;
    }
};