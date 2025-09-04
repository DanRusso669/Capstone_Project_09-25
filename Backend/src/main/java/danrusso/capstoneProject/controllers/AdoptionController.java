package danrusso.capstoneProject.controllers;

import danrusso.capstoneProject.entities.Adoption;
import danrusso.capstoneProject.entities.User;
import danrusso.capstoneProject.payloads.CreationRespDTO;
import danrusso.capstoneProject.payloads.UpdatedAdoptionDTO;
import danrusso.capstoneProject.services.AdoptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/adoptions")
public class AdoptionController {

    @Autowired
    private AdoptionService adoptionService;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<Adoption> findAll (@RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "10") int size,
                               @RequestParam(defaultValue = "id") String sortBy) {
        return this.adoptionService.findAll(page, size, sortBy);
    }

    @GetMapping("/{adoptionId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public Adoption findById(@PathVariable long adoptionId){
        return this.adoptionService.findById(adoptionId);
    }

    @PostMapping("/{animalId}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public CreationRespDTO save (@AuthenticationPrincipal User currentAuthenticatedUser, @PathVariable long animalId){
        Adoption newAdoption = this.adoptionService.save(currentAuthenticatedUser.getId(), animalId);
        return new CreationRespDTO(newAdoption.getId());
    }

    @PutMapping("/{adoptionId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public CreationRespDTO update (@PathVariable long adoptionId, @RequestBody @Validated UpdatedAdoptionDTO payload, BindingResult validation){
        this.adoptionService.checkValidationErrors(validation);
        Adoption updatedAdoption = this.adoptionService.findByIdAndUpdate(adoptionId, payload);
        return new CreationRespDTO(updatedAdoption.getId());
    }

    @PatchMapping("/{adoptionId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public CreationRespDTO endAdoptionById (@PathVariable long adoptionId){
        Adoption endedAdoption = this.adoptionService.findByIdAndEndIt(adoptionId);
        return new CreationRespDTO(endedAdoption.getId());
    }

    @PatchMapping("/me/{adoptionId}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public CreationRespDTO endOwnAdoption (@PathVariable long adoptionId, @AuthenticationPrincipal User currentAuthenticatedUser){
        Adoption endedAdoption = this.adoptionService.endOwnAdoption(adoptionId, currentAuthenticatedUser.getId());
        return new CreationRespDTO(endedAdoption.getId());
    }

    @DeleteMapping("/{adoptionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasAuthority('ADMIN')")
    public void delete (@PathVariable long adoptionId){
        this.adoptionService.findByIdAndDelete(adoptionId);
    }
}
