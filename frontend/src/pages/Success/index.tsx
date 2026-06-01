import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { paypalService } from "@admin/services/paypalService.ts";
import { orderService } from "@admin/services/orderService.ts";
import {useToast} from "@components/UI/Toast.tsx";

const Success = () => {
    const {addToast} = useToast();

    const [params] = useSearchParams();
    const navigate = useNavigate();

    const executed = useRef(false);

    useEffect(() => {
        const run = async () => {

            const paymentId = params.get("paymentId");
            const payerId = params.get("PayerID");

            if (!paymentId || !payerId) return;

            const key = `paypal_${paymentId}`;

            if (sessionStorage.getItem(key)) return;
            sessionStorage.setItem(key, "true");

            try {

                console.log("EXECUTE PAYMENT");

                await paypalService.executePayment(paymentId, payerId);

                console.log("PAYMENT OK");

                const pending = localStorage.getItem("pendingOrder");
                if (!pending) return;

                const order = JSON.parse(pending);

                console.log("CREATE ORDER");

                await orderService.create(order);

                console.log("ORDER OK");

                localStorage.removeItem("pendingOrder");

                window.dispatchEvent(new Event("cartUpdated"));

                navigate("/");
                addToast('Paiement et commande effectués avec succès', 'success');


            } catch (error: any) {

                console.log("ERROR STATUS:", error?.response?.status);
                console.log("ERROR DATA:", error?.response?.data);
                console.log("ERROR URL:", error?.config?.url);

                console.error(error);

                navigate("/cancel");
            }
        };

        run();
    }, []);    return <div>Paiement en cours...</div>;
};

export default Success;