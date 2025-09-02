package danrusso.capstoneProject.payloads;

import jakarta.validation.constraints.*;

public record NewUserDTO(
        @NotEmpty(message = "Il nome è obbligatorio.")
        @Size(min = 2, max = 20, message = "Il nome deve essere lungo da 2 a 20 caratteri.")
        String name,
        @NotEmpty(message = "Il cognome è obbligatorio.")
        @Size(min = 2, max = 20, message = "Il cognome deve essere lungo da 2 a 20 caratteri.")
        String surname,
        @Email(message = "Formato email non valido.")
        @NotEmpty(message = "L'email è obbligatoria.")
        String email,
        @NotEmpty(message = "Password is mandatory.")
        @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$", message = "La password deve contenere: almeno 8 caratteri, almeno un carattere maiuscolo e uno minuscolo, un numero e un carattere speciale.")
        String password,
        @NotEmpty(message = "Il numero di telefono è obbligatorio.")
        String phoneNumber
) {
}