package danrusso.capstoneProject.payloads;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDate;

public record NewArticleDTO(
        @NotEmpty(message = "Il titolo è obbligatorio.")
        String title,
        @FutureOrPresent(message = "La data non può essere passata.")
        LocalDate publicationDate,
        @NotEmpty(message = "Il contenuto è obbligatorio.")
        String content
) {
}
