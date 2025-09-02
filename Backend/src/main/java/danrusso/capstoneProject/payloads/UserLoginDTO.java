package danrusso.capstoneProject.payloads;

import jakarta.validation.constraints.Email;

public record UserLoginDTO(
        @Email
        String email,
        String password) {
}
