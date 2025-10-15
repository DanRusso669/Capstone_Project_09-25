package danrusso.capstoneProject.payloads;

import jakarta.validation.constraints.NotBlank;

public record CheckoutSessionResponseDTO(
        @NotBlank String url
) {
}
