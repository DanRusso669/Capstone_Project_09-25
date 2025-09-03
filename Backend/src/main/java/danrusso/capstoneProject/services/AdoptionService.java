package danrusso.capstoneProject.services;

import danrusso.capstoneProject.entities.Adoption;
import danrusso.capstoneProject.entities.AdoptionStatus;
import danrusso.capstoneProject.entities.Animal;
import danrusso.capstoneProject.entities.User;
import danrusso.capstoneProject.exceptions.BadRequestException;
import danrusso.capstoneProject.exceptions.ForbiddenException;
import danrusso.capstoneProject.exceptions.NotFoundException;
import danrusso.capstoneProject.exceptions.ValidationException;
import danrusso.capstoneProject.repositories.AdoptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.time.LocalDate;

@Service
public class AdoptionService {

    @Autowired
    private AdoptionRepository adoptionRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private AnimalService animalService;

    public Adoption findById (long adoptionId){
        return this.adoptionRepository.findById(adoptionId).orElseThrow(() -> new NotFoundException(adoptionId, "Adozione"));
    }

    public void checkValidationErrors(BindingResult validation){
        if (validation.hasErrors()){
            throw new ValidationException(validation.getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList());
        }
    }

    public Page<Adoption> findAll (int pageNumber, int pageSize, String sortBy){
        if (pageSize > 20) pageSize = 20;
        Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by(sortBy));
        return this.adoptionRepository.findAll(pageable);
    }

    public Adoption save (long userId, long animalId){
        Animal foundAnimal = this.animalService.findById(animalId);
        if (!foundAnimal.isAdoptable()) throw new BadRequestException("L'animale selezionato non può essere adottato.");
        foundAnimal.setAdoptable(false);
        User foundUser = this.userService.findById(userId);

        Adoption newAdoption = new Adoption(foundUser, foundAnimal, LocalDate.now(), AdoptionStatus.PENDING);
        return this.adoptionRepository.save(newAdoption);
    }

}
