package danrusso.capstoneProject.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public record NewPasswordDTO(@NotEmpty(message = "La nuova password è obbligatoria.")
                             @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", message = "La nuova password deve contenere: almeno 8 caratteri, almeno un carattere maiuscolo e uno minuscolo, un numero e un carattere speciale (#?!@$%^&*-).")
                             String newPassword,
                             @NotEmpty(message = "La nuova password è obbligatoria.")
                             @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", message = "La nuova password deve contenere: almeno 8 caratteri, almeno un carattere maiuscolo e uno minuscolo, un numero e un carattere speciale (#?!@$%^&*-).")
                             String newPasswordRepeated,
                             @NotEmpty(message = "La vecchia password è obbligatoria.")
                             String oldPassword) {
}