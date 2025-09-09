package danrusso.capstoneProject.services;

import danrusso.capstoneProject.entities.Role;
import danrusso.capstoneProject.entities.User;
import danrusso.capstoneProject.exceptions.BadRequestException;
import danrusso.capstoneProject.exceptions.ForbiddenException;
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

    public User findById(long userId) {
        return this.userRepository.findById(userId).orElseThrow(() -> new NotFoundException(userId, "Utente"));
    }

    public void checkEmailAvailability(String email) {
        this.userRepository.findByEmail(email).ifPresent(user -> {
            throw new BadRequestException("L'email " + email + " è già in uso.");
        });
    }

    public boolean checkIfPasswordIsCorrect(long userId, String password) {
        User found = this.findById(userId);
        return bcrypt.matches(password, found.getPassword());
    }

    public void checkValidationErrors(BindingResult validation) {
        if (validation.hasErrors()) {
            throw new ValidationException(validation.getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage).toList());
        }
    }

    public User findByEmail(String email) {
        return this.userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Nessun utente con email " + email + " trovato."));
    }

    public Page<User> findAll(int pageNumber, int pageSize, String sortBy) {
        if (pageSize > 20) pageSize = 20;
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        return this.userRepository.findAll(pageable);
    }

    public User save(NewUserDTO payload) {
        this.checkEmailAvailability(payload.email());

        User newUser = new User(payload.name(), payload.surname(), payload.email(), bcrypt.encode(payload.password()), payload.phoneNumber());

        Role userRole = this.roleRepository.findByRoleDef("USER").orElseThrow(() -> new NotFoundException("Ruolo USER non trovato."));
        newUser.getRoles().add(userRole);

        return this.userRepository.save(newUser);
    }

    public User findByIdAndUpdate(NewUserDTO payload, long userId) {
        User found = this.findById(userId);

        if (!found.getEmail().equals(payload.email())) {
            this.checkEmailAvailability(payload.email());
        }

        found.setName(payload.name());
        found.setSurname(payload.surname());
        found.setEmail(payload.email());
        found.setPassword(bcrypt.encode(payload.password()));
        found.setPhoneNumber(payload.phoneNumber());

        return this.userRepository.save(found);
    }

    public void findByIdAndDelete(long userId) {
        User found = this.findById(userId);
        this.userRepository.delete(found);
    }

    public String assignOrRemoveRoleById(long userId, User currentUser, String action) {
        if (currentUser.getId() == userId) throw new ForbiddenException("Non puoi modificare i tuoi stessi ruoli.");
        User found = this.findById(userId);

        found.getRoles().forEach(role -> {
            if (role.getRoleDef().equals("ADMIN") && action.equalsIgnoreCase("add"))
                throw new BadRequestException("Impossibile aggiungere il ruolo ADMIN: questo utente possiede già questo ruolo.");
            else if (action.equalsIgnoreCase("remove")) {
                boolean isAdmin = found.getRoles().stream().anyMatch(r -> r.getRoleDef().equalsIgnoreCase("ADMIN"));
                if (!isAdmin)
                    throw new BadRequestException("Impossibile rimuovere il ruolo ADMIN: l'utente non possiede questo ruolo.");
            }
        });
        Role adminRole = this.roleRepository.findByRoleDef("ADMIN").orElseThrow(() -> new NotFoundException("Ruolo ADMIN non trovato."));
        switch (action.toLowerCase()) {
            case "add" -> {
                found.getRoles().add(adminRole);
                this.userRepository.save(found);
                return "Ruolo aggiunto con successo: " + found.getName() + " " + found.getSurname() + " è diventato un admin.";
            }
            case "remove" -> {
                found.getRoles().remove(adminRole);
                this.userRepository.save(found);
                return "Ruolo rimosso con successo: " + found.getName() + " " + found.getSurname() + " non è più un admin.";
            }
            default -> throw new BadRequestException("Azione non valida.");
        }
    }

}