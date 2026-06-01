package com.example.E_commerce.Platform.paypal.service;

import com.example.E_commerce.Platform.entities.Order;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class PaypalService {

    @Autowired
    private APIContext apiContext;
    public Payment createPayment(Double total) throws PayPalRESTException {

        if (total == null) {
            throw new RuntimeException("Amount is null");
        }

        Amount amount = new Amount();
        amount.setCurrency("USD");

        amount.setTotal(String.format(Locale.US, "%.2f", total));

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl("http://localhost:5173/cancel");
        redirectUrls.setReturnUrl("http://localhost:5173/success");

        payment.setRedirectUrls(redirectUrls);

        return payment.create(apiContext);
    }

    public Payment executePayment(String paymentId, String payerId)
            throws PayPalRESTException {

        try {

            Payment payment = new Payment();
            payment.setId(paymentId);

            PaymentExecution paymentExecution = new PaymentExecution();
            paymentExecution.setPayerId(payerId);

            System.out.println("PAYPAL EXECUTE HIT");
            System.out.println(paymentId);
            System.out.println(payerId);

            return payment.execute(apiContext, paymentExecution);

        } catch (PayPalRESTException e) {

            System.out.println("========== PAYPAL ERROR ==========");
            System.out.println("MESSAGE: " + e.getMessage());
            System.out.println("CODE: " + e.getResponsecode());

            if (e.getDetails() != null) {
                System.out.println("DETAILS: " + e.getDetails().toString());
            }

            throw e;
        }
    }
}
