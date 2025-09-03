package danrusso.capstoneProject.services;

import danrusso.capstoneProject.entities.Role;
import danrusso.capstoneProject.entities.User;
import danrusso.capstoneProject.exceptions.BadRequestException;
import danrusso.capstoneProject.exceptions.NotFoundException;
import danrusso.capstoneProject.exceptions.ValidationException;
import danrusso.capstoneProject.payloads.NewUserDTO;
import danrusso.capstoneProject.repositories.RoleRepository;
import danrusso.capstoneProject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder bcrypt;

    public User findById (long userId){
        return this.userRepository.findById(userId).orElseThrow(() -> new NotFoundException(userId, "Utente"));
    }

    public void checkEmailAvailability(String email) {
        this.userRepository.findByEmail(email).ifPresent(user -> {
            throw new BadRequestException("L'email " + email + " è già in uso.");
        });
    }

    public void checkValidationErrors(BindingResult validation){
        if (validation.hasErrors()){
            throw new ValidationException(validation.getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList());
        }
    }

    public User findByEmail(String email){
        return this.userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Nessun utente con email " + email + " trovato."));
    }

    public Page<User> findAll (int pageNumber, int pageSize, String sortBy){
        if (pageSize > 20) pageSize = 20;
        Pageable pageable = PageRequest.of(pageNumber,pageSize, Sort.by(sortBy));
        return this.userRepository.findAll(pageable);
    }

    public User save(NewUserDTO payload){
        this.checkEmailAvailability(payload.email());

        User newUser = new User(payload.name(), payload.surname(), payload.email(), bcrypt.encode(payload.password()), payload.phoneNumber());

        Role userRole = this.roleRepository.findByRoleDef("USER").orElseThrow(() -> new NotFoundException("Ruolo USER non trovato."));
        newUser.getRoles().add(userRole);

        return this.userRepository.save(newUser);
    }

    public User findByIdAndUpdate(NewUserDTO payload, long userId){
        User found = this.findById(userId);

        if (!found.getEmail().equals(payload.email())){
            this.checkEmailAvailability(payload.email());
        }

        found.setName(payload.name());
        found.setSurname(payload.surname());
        found.setEmail(payload.email());
        found.setPassword(bcrypt.encode(payload.password()));
        found.setPhoneNumber(payload.phoneNumber());

        return this.userRepository.save(found);
    }

    public void findByIdAndDelete(long userId){
        User found = this.findById(userId);
        this.userRepository.delete(found);
    }

}