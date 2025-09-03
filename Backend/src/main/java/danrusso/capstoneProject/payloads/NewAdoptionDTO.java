package danrusso.capstoneProject.payloads;

import danrusso.capstoneProject.entities.AdoptionStatus;
import jakarta.persistence.Column;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;

import java.time.LocalDate;

public record NewAdoptionDTO(
    AdoptionStatus status,
    @FutureOrPresent(message = "La data di inizio adozione non può essere passata.")
    LocalDate startDate,
    @PastOrPresent(message = "La data di cessata adozione non può essere futura.")
    LocalDate endDate
) {
}
