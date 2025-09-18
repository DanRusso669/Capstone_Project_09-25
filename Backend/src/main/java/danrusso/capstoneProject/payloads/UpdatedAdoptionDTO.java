package danrusso.capstoneProject.payloads;

import jakarta.validation.constraints.FutureOrPresent;

import java.time.LocalDate;

public record UpdatedAdoptionDTO(
        String status,
        @FutureOrPresent(message = "La data di inizio adozione non può essere passata.")
        LocalDate startDate
) {
}
