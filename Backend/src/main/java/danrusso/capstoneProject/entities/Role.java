package danrusso.capstoneProject.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "role")
    private String roleDef;
    @ManyToMany(mappedBy = "roles")
    private List<User> users;

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
