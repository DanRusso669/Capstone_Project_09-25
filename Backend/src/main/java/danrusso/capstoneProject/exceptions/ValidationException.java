package danrusso.capstoneProject.exceptions;

import java.util.List;

public class ValidationException extends RuntimeException {

    private List<String> errorMessages;

    public ValidationException(List<String> errorMessages) {
        super("Errori di validazione");
        this.errorMessages = errorMessages;
    }

    public ValidationException(String msg) {
        super(msg);
    }

    public List<String> getErrorMessages() {
        return errorMessages;
    }
}
