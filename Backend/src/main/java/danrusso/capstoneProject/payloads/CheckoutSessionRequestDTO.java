package danrusso.capstoneProject.payloads;

import jakarta.validation.constraints.NotBlank;

public record CheckoutSessionRequestDTO(
        @NotBlank String priceId,
        @NotBlank String successUrl,
        @NotBlank String cancelUrl,
        @NotBlank String userEmail

) {
}