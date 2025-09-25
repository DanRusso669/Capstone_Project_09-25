package danrusso.capstoneProject.exceptions;

public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(long id, String record){
      super(record + " con id " + id + " non trovato.");
    }
}
