package danrusso.capstoneProject.controllers;

import danrusso.capstoneProject.entities.Animal;
import danrusso.capstoneProject.payloads.AnimalRespDTO;
import danrusso.capstoneProject.payloads.NewAnimalDTO;
import danrusso.capstoneProject.services.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @GetMapping
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public Page<Animal> findAll(@RequestParam(defaultValue = "0") int page,
                                @RequestParam(defaultValue = "10") int size,
                                @RequestParam(defaultValue = "id") String sortBy,
                                @RequestParam(required = false) String gender,
                                @RequestParam(required = false) String status,
                                @RequestParam(required = false) String species,
                                @RequestParam(required = false) String breed,
                                @RequestParam(required = false) String provice) {
        return this.animalService.findAll(page, size, sortBy, gender, status, species, breed, provice);
    }

    @GetMapping("/{animalId}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public Animal findById(@PathVariable long animalId) {
        return this.animalService.findById(animalId);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public AnimalRespDTO save(@RequestBody @Validated NewAnimalDTO payload, BindingResult validation) {
        this.animalService.checkValidationErrors(validation);
        Animal newAnimal = this.animalService.save(payload);
        return new AnimalRespDTO(newAnimal.getId());
    }

    @PutMapping("/{animalId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public AnimalRespDTO update(@RequestBody @Validated NewAnimalDTO payload, BindingResult validation, @PathVariable long animalId) {
        this.animalService.checkValidationErrors(validation);
        Animal updatedAnimal = this.animalService.findByIdAndUpdate(payload, animalId);
        return new AnimalRespDTO(updatedAnimal.getId());
    }

    @DeleteMapping("/{animalId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable long animalId) {
        this.animalService.findByIdAndDelete(animalId);
    }
}
