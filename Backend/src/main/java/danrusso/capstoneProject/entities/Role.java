package danrusso.capstoneProject.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "role")
    private String roleDef;

    public Role() {
    }

    public Role(String roleDef) {
        this.roleDef = roleDef;
    }

    public long getId() {
        return id;
    }

    public String getRoleDef() {
        return roleDef;
    }
}
