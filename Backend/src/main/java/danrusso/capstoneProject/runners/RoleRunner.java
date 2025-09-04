package danrusso.capstoneProject.runners;

import danrusso.capstoneProject.entities.Role;
import danrusso.capstoneProject.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class RoleRunner implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        List<String> roles = new ArrayList<>(Arrays.asList("ADMIN","USER"));

        long rolesCount = this.roleRepository.count();

        if (rolesCount == 0) {
            for (String roleDef : roles) {
                Role newRole = new Role(roleDef);
                this.roleRepository.save(newRole);
                System.out.println("Ruoli creati.");
            }
        } else {
            for (String roleDef : roles){
                if (!this.roleRepository.existsByRoleDef(roleDef)) {
                    Role newRole = new Role(roleDef);
                    this.roleRepository.save(newRole);
                }

            }
        }
    }
}
