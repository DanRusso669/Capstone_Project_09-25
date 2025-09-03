package danrusso.capstoneProject.controllers;

import danrusso.capstoneProject.entities.Adoption;
import danrusso.capstoneProject.entities.User;
import danrusso.capstoneProject.payloads.CreationRespDTO;
import danrusso.capstoneProject.services.AdoptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/adoptions")
public class AdoptionController {

    @Autowired
    private AdoptionService adoptionService;

    @PostMapping("/{animalId}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public CreationRespDTO save (@AuthenticationPrincipal User currentAuthenticatedUser, @PathVariable long animalId){
        Adoption newAdoption = this.adoptionService.save(currentAuthenticatedUser.getId(), animalId);
        return new CreationRespDTO(newAdoption.getId());
    }
}
