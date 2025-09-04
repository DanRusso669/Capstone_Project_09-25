package danrusso.capstoneProject.services;

import danrusso.capstoneProject.entities.User;
import danrusso.capstoneProject.exceptions.UnauthorizedException;
import danrusso.capstoneProject.payloads.UserLoginDTO;
import danrusso.capstoneProject.tools.JWTTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder bcrypt;

    @Autowired
    private JWTTools jwtTools;

    public String generateAccessToken (UserLoginDTO payload){
        User user = this.userService.findByEmail(payload.email());
        System.out.println(user);
        if (bcrypt.matches(payload.password(), user.getPassword())){
            return jwtTools.createToken(user);
        } else {
            System.out.println(user);
            throw new UnauthorizedException("Credenziali errate.");
        }
    }
}
