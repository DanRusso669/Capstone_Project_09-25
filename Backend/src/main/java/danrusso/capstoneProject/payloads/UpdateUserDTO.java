package danrusso.capstoneProject.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record UpdateUserDTO(@NotEmpty(message = "Il nome è obbligatorio.")
                            @Size(min = 2, max = 20, message = "Il nome deve essere lungo da 2 a 20 caratteri.")
                            String name,
                            @NotEmpty(message = "Il cognome è obbligatorio.")
                            @Size(min = 2, max = 20, message = "Il cognome deve essere lungo da 2 a 20 caratteri.")
                            String surname,
                            @Email(message = "Formato email non valido.")
                            @NotEmpty(message = "L'email è obbligatoria.")
                            String email,
                            @NotEmpty(message = "Il numero di telefono è obbligatorio.")
                            String phoneNumber) {
}