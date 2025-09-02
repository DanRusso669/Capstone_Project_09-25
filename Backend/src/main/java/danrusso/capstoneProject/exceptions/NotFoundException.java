package danrusso.capstoneProject.exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(Long id){
      super("Utente con id " + id + " non trovato.");
    }
}
