package danrusso.capstoneProject.payloads;

import jakarta.validation.constraints.NotEmpty;

public record NewArticleDTO(
        String articleImg,
        @NotEmpty(message = "Il titolo è obbligatorio.")
        String title,
        @NotEmpty(message = "Il contenuto è obbligatorio.")
        String content
) {
}
