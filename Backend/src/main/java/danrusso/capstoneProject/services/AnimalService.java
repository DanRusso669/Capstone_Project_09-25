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

    public Gender checkGenderValue (String payloadGender){
        return switch (payloadGender.toUpperCase()){
            case "MALE" -> Gender.MALE;
            case "FEMALE" -> Gender.FEMALE;
            default -> throw new BadRequestException("Genere " + payloadGender + " non valido.");
        };
    }

    public AnimalStatus checkStatusValue (String payloadStatus){
        return switch (payloadStatus.toUpperCase()){
            case "HOSPITALIZED" -> AnimalStatus.HOSPITALIZED;
            case "RELEASED" -> AnimalStatus.RELEASED;
            case "DEAD" -> AnimalStatus.DEAD;
            default -> throw new BadRequestException("Status " + payloadStatus + " non valido.");
        };
    }

    public Animal save (NewAnimalDTO payload){

        Gender gender = this.checkGenderValue(payload.gender());
        AnimalStatus status = this.checkStatusValue(payload.status());

        // TODO - Se l'utente viene creato con una password temporanea, mandare email per fargliela modificare.
        User userFound = this.userRepository.findByEmail(payload.userEmail()).orElseGet(() -> {
            NewUserDTO newUser = new NewUserDTO(payload.userName(), payload.userSurname(), payload.userEmail(), bcrypt.encode("1234?Ciao"), payload.userPhoneNumber());
            return this.userService.save(newUser);
        });

        String imageUrl = "https://www.stfrancisanimalwelfare.co.uk/wp-content/uploads/placeholder-logo-3-300x300.png";
        if (!(payload.imageUrl() == null)) imageUrl = payload.imageUrl();

        Animal newAnimal = new Animal(payload.name(), payload.age(), gender, payload.species(), payload.breed(), payload.description(), payload.clinicalCondition(), status, imageUrl, LocalDate.now(), payload.city(), payload.province(), payload.region(), userFound);
        return this.animalRepository.save(newAnimal);
    }

    public Animal findByIdAndUpdate(NewAnimalDTO payload, long animalId){

        Gender gender = this.checkGenderValue(payload.gender());
        AnimalStatus status = this.checkStatusValue(payload.status());

        Animal foundAnimal = this.findById(animalId);
        User foundUser = null;
        if (!payload.userEmail().equals(foundAnimal.getFoundBy().getEmail())) {
           foundUser = this.userRepository.findByEmail(payload.userEmail()).orElseGet(() -> {
               NewUserDTO newUser = new NewUserDTO(payload.userName(), payload.userSurname(), payload.userEmail(), bcrypt.encode("1234?Ciao"), payload.userPhoneNumber());
               return this.userService.save(newUser);
           });
        }

        foundAnimal.setName(payload.name());
        foundAnimal.setAge(payload.age());
        foundAnimal.setGender(gender);
        foundAnimal.setSpecies(payload.species());
        foundAnimal.setBreed(payload.breed());
        foundAnimal.setDescription(payload.description());
        foundAnimal.setClinicalCondition(payload.clinicalCondition());
        foundAnimal.setStatus(status);
        foundAnimal.setImageUrl(payload.imageUrl());
        foundAnimal.setReleaseDate(payload.releaseDate());
        foundAnimal.setAdoptable(payload.isAdoptable());
        foundAnimal.setCity(payload.city());
        foundAnimal.setProvince(payload.province());
        foundAnimal.setRegion(payload.region());
        foundAnimal.setFoundBy(foundUser);
        foundAnimal.setDeathDate(payload.deathDate());
        foundAnimal.setDeathCause(payload.deathCause());

        return this.animalRepository.save(foundAnimal);
    }













}
