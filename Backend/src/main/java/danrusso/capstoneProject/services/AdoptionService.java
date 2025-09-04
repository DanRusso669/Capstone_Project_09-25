package danrusso.capstoneProject.services;

import danrusso.capstoneProject.entities.Adoption;
import danrusso.capstoneProject.entities.AdoptionStatus;
import danrusso.capstoneProject.entities.Animal;
import danrusso.capstoneProject.entities.User;
import danrusso.capstoneProject.exceptions.*;
import danrusso.capstoneProject.payloads.UpdatedAdoptionDTO;
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
import java.util.List;

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
        List<Adoption>  activeAdoption = this.adoptionRepository.findActiveAdoptionsByUserId(userId);
        if (activeAdoption.size() > 5) throw new BadRequestException("Un utente può avere massimo 5 adozioni in corso.");
        User foundUser = this.userService.findById(userId);

        Adoption newAdoption = new Adoption(foundUser, foundAnimal, LocalDate.now(), AdoptionStatus.PENDING);
        return this.adoptionRepository.save(newAdoption);
    }

    public Adoption findByIdAndUpdate (long adoptionId, UpdatedAdoptionDTO payload){
        Adoption found = this.findById(adoptionId);

        found.setStatus(payload.status());
        found.setStartDate(payload.startDate());

        return this.adoptionRepository.save(found);
    }

    public Adoption findByIdAndEndIt (long adoptionId){
        Adoption found = this.findById(adoptionId);

        if (found.getStatus().equals(AdoptionStatus.PENDING)) throw new BadRequestException("Non puoi terminare un'adozione non accettata.");
        else if (found.getStatus().equals(AdoptionStatus.DENIED)) throw new BadRequestException("Non puoi terminare un'adozione rifiutata.");
        else if (found.getStatus().equals(AdoptionStatus.ENDED)) throw new BadRequestException("Questa adozione è già stata terminata.");
        found.setEndDate(LocalDate.now());
        found.setStatus(AdoptionStatus.ENDED);
        return this.adoptionRepository.save(found);
    }

    public Adoption endOwnAdoption (long adoptionId, long userId){
        Adoption found = this.findById(adoptionId);
        if (found.getUser().getId() != userId) throw new UnauthorizedException("Non puoi terminare le adozioni degli altri utenti.");

        if (found.getStatus().equals(AdoptionStatus.PENDING)) throw new BadRequestException("Non puoi terminare un'adozione non accettata.");
        else if (found.getStatus().equals(AdoptionStatus.DENIED)) throw new BadRequestException("Non puoi terminare un'adozione rifiutata.");
        else if (found.getStatus().equals(AdoptionStatus.ENDED)) throw new BadRequestException("Questa adozione è già stata terminata.");

        found.setEndDate(LocalDate.now());
        found.setStatus(AdoptionStatus.ENDED);;
        return this.adoptionRepository.save(found);
    }

    public void findByIdAndDelete(long adoptionId){
        Adoption found = this.findById(adoptionId);
        this.adoptionRepository.delete(found);
    }

}
