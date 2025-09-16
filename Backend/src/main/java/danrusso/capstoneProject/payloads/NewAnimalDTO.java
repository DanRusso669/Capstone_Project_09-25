package danrusso.capstoneProject.payloads;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record NewAnimalDTO(
        @NotEmpty(message = "Il nome è obbligatorio.")
        @Size(min = 2, max = 20, message = "Il nome deve essere lungo da 2 a 20 caratteri.")
        String name,
        @NotNull(message = "L'età è obbligatoria.")
        @Positive(message = "L'età non può essere un numero negativo.")
        int age,
        @NotEmpty(message = "Il genere è obbligatorio.")
        String gender,
        @NotEmpty(message = "La specie è obbligatoria.")
        @Size(min = 2, max = 20, message = "La specie deve essere lungo da 2 a 20 caratteri.")
        String species,
        @NotEmpty(message = "La razza è obbligatoria.")
        @Size(min = 2, max = 20, message = "La razza deve essere lungo da 2 a 20 caratteri.")
        String breed,
        @NotEmpty(message = "La descrizione è obbligatoria.")
        @Size(min = 10, max = 200, message = "La descrizione può essere lunga massimo 200 caratteri.")
        String description,
        @NotEmpty(message = "La condizione clinica è obbligatoria.")
        String clinicalCondition,
        @NotEmpty(message = "Lo status è obbligatorio.")
        String status,
        String imageUrl,
        LocalDate releaseDate,
        boolean isAdoptable,
        @NotEmpty(message = "La città è obbligatoria.")
        String city,
        @NotEmpty(message = "La provincia è obbligatoria.")
        String province,
        @NotEmpty(message = "La regione è obbligatoria.")
        String region,
        @NotEmpty(message = "L'email è obbligatoria.")
        @Email(message = "Formato email non valido.")
        String userEmail,
        @NotEmpty(message = "Il nome è obbligatorio.")
        @Size(min = 2, max = 20, message = "Il nome deve essere lungo da 2 a 20 caratteri.")
        String userName,
        @NotEmpty(message = "Il cognome è obbligatorio.")
        @Size(min = 2, max = 20, message = "Il cognome deve essere lungo da 2 a 20 caratteri.")
        String userSurname,
        @NotEmpty(message = "Il numero di telefono è obbligatorio.")
        String userPhoneNumber,
        @PastOrPresent(message = "La data di decesso non può essere futura.")
        LocalDate deathDate,
        @Size(min = 10, max = 200, message = "La descrizione può essere lunga massimo 200 caratteri.")
        String deathCause
) {
}
