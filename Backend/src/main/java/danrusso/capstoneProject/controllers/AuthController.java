package danrusso.capstoneProject.controllers;

import danrusso.capstoneProject.entities.User;
import danrusso.capstoneProject.payloads.LoginRespDTO;
import danrusso.capstoneProject.payloads.NewUserDTO;
import danrusso.capstoneProject.payloads.UserLoginDTO;
import danrusso.capstoneProject.payloads.UserRespDTO;
import danrusso.capstoneProject.services.AuthService;
import danrusso.capstoneProject.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserRespDTO register(@RequestBody @Validated NewUserDTO payload, BindingResult validation){
        this.userService.checkValidationErrors(validation);

        User newUser = this.userService.save(payload);
        return new UserRespDTO(newUser.getId());

    }

    @PostMapping("/login")
    public LoginRespDTO login (@RequestBody @Validated UserLoginDTO payload, BindingResult validation){
        this.userService.checkValidationErrors(validation);
        return new LoginRespDTO(authService.generateAccessToken(payload));
    }
}
