package danrusso.capstoneProject.services;

import danrusso.capstoneProject.entities.Animal;
import danrusso.capstoneProject.entities.AnimalStatus;
import danrusso.capstoneProject.entities.Gender;
import danrusso.capstoneProject.entities.User;
import danrusso.capstoneProject.exceptions.BadRequestException;
import danrusso.capstoneProject.exceptions.NotFoundException;
import danrusso.capstoneProject.exceptions.ValidationException;
import danrusso.capstoneProject.payloads.NewAnimalDTO;
import danrusso.capstoneProject.payloads.NewUserDTO;
import danrusso.capstoneProject.repositories.AnimalRepository;
import danrusso.capstoneProject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.time.LocalDate;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder bcrypt;

    public Animal findById (long animalId){
        return this.animalRepository.findById(animalId).orElseThrow(() -> new NotFoundException(animalId, "Animale"));
    }

    public void checkValidationErrors(BindingResult validation){
        if (validation.hasErrors()){
            throw new ValidationException(validation.getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList());
        }
    }

    public Animal save (NewAnimalDTO payload){
        // TODO - Se l'utente viene creato con una password temporanea, mandare email per fargliela modificare.
        User userFound = this.userRepository.findByEmail(payload.userEmail()).orElseGet(() -> {
            NewUserDTO newUser = new NewUserDTO(payload.userName(), payload.userSurname(), payload.userEmail(), bcrypt.encode("1234?Ciao"), payload.userPhoneNumber());
            return this.userService.save(newUser);
        });

        Gender gender = switch (payload.gender().toUpperCase()){
            case "MALE" -> Gender.MALE;
            case "FEMALE" -> Gender.FEMALE;
            default -> throw new BadRequestException("Genere " + payload.gender() + " non valido.");
        };

        AnimalStatus status = switch (payload.status().toUpperCase()){
            case "HOSPITALIZED" -> AnimalStatus.HOSPITALIZED;
            case "RELEASED" -> AnimalStatus.RELEASED;
            case "DEAD" -> AnimalStatus.DEAD;
            default -> throw new BadRequestException("Status " + payload.status() + " non valido.");
        };

        String imageUrl = "https://www.stfrancisanimalwelfare.co.uk/wp-content/uploads/placeholder-logo-3-300x300.png";
        if (!(payload.imageUrl() == null)) imageUrl = payload.imageUrl();

        Animal newAnimal = new Animal(payload.name(), payload.age(), gender, payload.species(), payload.breed(), payload.description(), payload.clinicalCondition(), status, imageUrl, LocalDate.now(), payload.city(), payload.province(), payload.region(), userFound);
        return this.animalRepository.save(newAnimal);
    }













}
