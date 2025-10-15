package danrusso.capstoneProject.controllers;

import danrusso.capstoneProject.entities.User;
import danrusso.capstoneProject.payloads.CheckoutSessionRequestDTO;
import danrusso.capstoneProject.payloads.CheckoutSessionResponseDTO;
import danrusso.capstoneProject.services.StripeService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {

    private final StripeService stripeService;

    public SubscriptionController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/create-checkout-session")
    public CheckoutSessionResponseDTO createCheckoutSession(
            @RequestBody CheckoutSessionRequestDTO payload,
            @AuthenticationPrincipal User currentAuthenticatedUser) {

        String userId = String.valueOf(currentAuthenticatedUser.getId());

        String checkoutUrl = stripeService.createSubscriptionCheckoutSession(
                payload.priceId(),
                userId,
                payload.successUrl(),
                payload.cancelUrl(),
                payload.userEmail()
        );

        return new CheckoutSessionResponseDTO(checkoutUrl);
    }
}