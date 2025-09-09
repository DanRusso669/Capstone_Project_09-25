package danrusso.capstoneProject.controllers;

import danrusso.capstoneProject.entities.User;
import danrusso.capstoneProject.payloads.CheckPasswordDTO;
import danrusso.capstoneProject.payloads.CheckPasswordRespDTO;
import danrusso.capstoneProject.payloads.NewUserDTO;
import danrusso.capstoneProject.payloads.RoleAssignRespDTO;
import danrusso.capstoneProject.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public Page<User> findAll(@RequestParam(defaultValue = "0") int page,
                              @RequestParam(defaultValue = "10") int size,
                              @RequestParam(defaultValue = "id") String sortBy) {
        return this.userService.findAll(page, size, sortBy);
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public User findUserById(@PathVariable long userId) {
        return this.userService.findById(userId);
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserById(@PathVariable long userId) {
        this.userService.findByIdAndDelete(userId);
    }

    @PatchMapping("/{userId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public RoleAssignRespDTO assignAdminRoleById(@PathVariable long userId, @AuthenticationPrincipal User currentAuthenticatedUser, @RequestParam(defaultValue = "add") String action) {
        String result = this.userService.assignOrRemoveRoleById(userId, currentAuthenticatedUser, action);
        return new RoleAssignRespDTO(result);
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public User getOwnProfile(@AuthenticationPrincipal User currentAuthenticatedUser) {
        return this.userService.findById(currentAuthenticatedUser.getId());
    }

    @PutMapping("/me")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public User updateOwnProfile(@AuthenticationPrincipal User currentAuthenticatedUser, @RequestBody @Validated NewUserDTO payload, BindingResult validation) {
        this.userService.checkValidationErrors(validation);
        return this.userService.findByIdAndUpdate(payload, currentAuthenticatedUser.getId());
    }

    @DeleteMapping("/me")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOwnProfile(@AuthenticationPrincipal User currentAuthenticatedUser) {
        this.userService.findByIdAndDelete(currentAuthenticatedUser.getId());
    }

    @PostMapping("/me/password-check")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public CheckPasswordRespDTO checkPassword(@AuthenticationPrincipal User currentAuthenticatedUser, @RequestBody CheckPasswordDTO payload) {
        boolean check = this.userService.checkIfPasswordIsCorrect(currentAuthenticatedUser.getId(), payload.password());
        if (check) return new CheckPasswordRespDTO("Password corretta.");
        else return new CheckPasswordRespDTO("Password errata.");
    }

}
