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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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

    public Animal findById(long animalId) {
        return this.animalRepository.findById(animalId).orElseThrow(() -> new NotFoundException(animalId, "Animale"));
    }

    public void checkValidationErrors(BindingResult validation) {
        if (validation.hasErrors()) {
            throw new ValidationException(validation.getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList());
        }
    }

    public Gender checkGenderValue(String payloadGender) {
        return switch (payloadGender.toUpperCase()) {
            case "MALE" -> Gender.MALE;
            case "FEMALE" -> Gender.FEMALE;
            default -> throw new BadRequestException("Genere " + payloadGender + " non valido.");
        };
    }

    public AnimalStatus checkStatusValue(String payloadStatus) {
        return switch (payloadStatus.toUpperCase()) {
            case "HOSPITALIZED" -> AnimalStatus.HOSPITALIZED;
            case "RELEASED" -> AnimalStatus.RELEASED;
            case "DEAD" -> AnimalStatus.DEAD;
            default -> throw new BadRequestException("Status " + payloadStatus + " non valido.");
        };
    }

    public Page<Animal> findAll(int pageNum, int pageSize, String sortBy, String genderFilter, String statusFilter, String species, String breed, String province) {
        Specification<Animal> spec = Specification.allOf((root, query, cb) -> cb.conjunction());
        if (pageSize > 10) pageSize = 10;


        if (genderFilter != null) {
            Gender gender = this.checkGenderValue(genderFilter);
            spec = spec.and((root, query, cb) -> cb.equal(root.get("gender"), gender));
        }

        if (statusFilter != null) {
            AnimalStatus status = this.checkStatusValue(statusFilter);
            spec = spec.and((root, query, cb) -> cb.equal(root.get("status"), status));
        }

        if (species != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("species"), species));
        }

        if (breed != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("breed"), breed));
        }

        if (province != null) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("province"), province));
        }

        Pageable pageable = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));

        return this.animalRepository.findAll(spec, pageable);
    }

    public Animal save(NewAnimalDTO payload) {

        Gender gender = this.checkGenderValue(payload.gender());
        AnimalStatus status = this.checkStatusValue(payload.status());

        // TODO - Se l'utente viene creato con una password temporanea, mandare email per fargliela modificare.
        User userFound = this.userRepository.findByEmail(payload.userEmail()).orElseGet(() -> {
            NewUserDTO newUser = new NewUserDTO(payload.userName(), payload.userSurname(), payload.userEmail(), "1234?Ciao", payload.userPhoneNumber());
            return this.userService.save(newUser);
        });

        String imageUrl = "http://localhost:5173/src/assets/Logo-Rifugio-Mamo.jpg";
        if (!(payload.imageUrl().isEmpty())) imageUrl = payload.imageUrl();

        Animal newAnimal = new Animal(payload.name(), payload.age(), gender, payload.species(), payload.breed(), payload.description(), payload.clinicalCondition(), status, imageUrl, LocalDate.now(), true, payload.city(), payload.province(), payload.region(), userFound);
        return this.animalRepository.save(newAnimal);
    }

    public Animal findByIdAndUpdate(NewAnimalDTO payload, long animalId) {

        Gender gender = this.checkGenderValue(payload.gender());
        AnimalStatus status = this.checkStatusValue(payload.status());

        Animal foundAnimal = this.findById(animalId);
        User foundUser = null;
        if (!payload.userEmail().equals(foundAnimal.getFoundBy().getEmail())) {
            foundUser = this.userRepository.findByEmail(payload.userEmail()).orElseGet(() -> {
                NewUserDTO newUser = new NewUserDTO(payload.userName(), payload.userSurname(), payload.userEmail(), "1234?Ciao", payload.userPhoneNumber());
                return this.userService.save(newUser);
            });
        } else {
            foundUser = this.userRepository.findByEmail(foundAnimal.getFoundBy().getEmail()).orElseThrow(() -> new BadRequestException("C'è qualcosa che non va."));
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
        if (status.equals(AnimalStatus.DEAD) || status.equals(AnimalStatus.RELEASED)) foundAnimal.setAdoptable(false);
        else foundAnimal.setAdoptable(payload.isAdoptable());
        foundAnimal.setCity(payload.city());
        foundAnimal.setProvince(payload.province());
        foundAnimal.setRegion(payload.region());
        foundAnimal.setFoundBy(foundUser);
        foundAnimal.setDeathDate(payload.deathDate());
        foundAnimal.setDeathCause(payload.deathCause());

        return this.animalRepository.save(foundAnimal);
    }

    public void findByIdAndDelete(long animalId) {
        Animal found = this.findById(animalId);
        this.animalRepository.delete(found);
    }


}
