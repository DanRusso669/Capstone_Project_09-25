package danrusso.capstoneProject.payloads;

import danrusso.capstoneProject.entities.AdoptionStatus;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.PastOrPresent;

import java.time.LocalDate;

public record UpdatedAdoptionDTO(
    AdoptionStatus status,
    @FutureOrPresent(message = "La data di inizio adozione non può essere passata.")
    LocalDate startDate
) {
}
