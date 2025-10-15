package danrusso.capstoneProject.services;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StripeService {

    @Value("${stripe.apikey}")
    private String stripeSecretKey;

    public String createSubscriptionCheckoutSession(String priceId, String userId,
                                                    String successUrl, String cancelUrl) {

        // inizializzo Stripe con la secret key
        Stripe.apiKey = stripeSecretKey;

        Map<String, Object> params = new HashMap<>();

        // modalità abbonamento
        params.put("mode", "subscription");

        // Price ID del piano di abbonamento
        params.put("line_items", List.of(
                Map.of("price", priceId, "quantity", 1)
        ));

        // URL con esito positivo
        params.put("success_url", successUrl);

        // URL per la cancellazione
        params.put("cancel_url", cancelUrl);

        // reindirizzamento automatico dopo il pagamento
        params.put("automatic_tax", Map.of("enabled", true));

        try {
            // Crea la sessione di checkout su Stripe
            Session session = Session.create(params);

            return session.getUrl();

        } catch (StripeException e) {
            throw new RuntimeException("Errore nella creazione della sessione Stripe", e);
        }
    }
}