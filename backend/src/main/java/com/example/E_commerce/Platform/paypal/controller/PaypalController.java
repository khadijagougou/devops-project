package com.example.E_commerce.Platform.paypal.controller;

import com.example.E_commerce.Platform.paypal.service.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/paypal")
@CrossOrigin("*")
public class PaypalController {

    @Autowired
    private PaypalService paypalService;

    @PostMapping("/pay")
    public String payment(
            @RequestParam Double amount)
            throws PayPalRESTException {

        Payment payment =
                paypalService.createPayment(amount);

        for(Links link : payment.getLinks()) {

            if(link.getRel().equals("approval_url")) {

                return link.getHref();
            }
        }

        return "";
    }
    @PostMapping("/execute")
    public String executePayment(
            @RequestParam String paymentId,
            @RequestParam String payerId
    ) throws PayPalRESTException {

        Payment payment = paypalService.executePayment(paymentId, payerId);

        System.out.println("PAYPAL STATE = " + payment.getState());

        if (!"approved".equalsIgnoreCase(payment.getState())) {
            throw new RuntimeException("Payment not approved");
        }

        return "Payment successful";
    }
}
