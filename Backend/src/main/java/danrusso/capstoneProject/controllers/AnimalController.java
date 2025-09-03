package danrusso.capstoneProject.controllers;

import danrusso.capstoneProject.entities.Animal;
import danrusso.capstoneProject.payloads.AnimalRespDTO;
import danrusso.capstoneProject.payloads.NewAnimalDTO;
import danrusso.capstoneProject.services.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/animals")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public AnimalRespDTO save(@RequestBody @Validated NewAnimalDTO payload, BindingResult validation){
        this.animalService.checkValidationErrors(validation);
        Animal newAnimal = this.animalService.save(payload);
        return new AnimalRespDTO(newAnimal.getId());
    }

    @PutMapping("/{animalId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public AnimalRespDTO update(@RequestBody @Validated NewAnimalDTO payload, BindingResult validation, @PathVariable long animalId){
        this.animalService.checkValidationErrors(validation);
        Animal updatedAnimal = this.animalService.findByIdAndUpdate(payload, animalId);
        return new AnimalRespDTO(updatedAnimal.getId());
    }
}
