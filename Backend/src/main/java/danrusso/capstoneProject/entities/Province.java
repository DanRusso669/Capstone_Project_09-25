package danrusso.capstoneProject.entities;


import jakarta.persistence.*;

@Entity
@Table(name = "provinces")
public class Province {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String acronym;
    private String name;
    @ManyToOne
    private Region region;

    public Province() {
    }

    public Province(String acronym, String name, Region region) {
        this.acronym = acronym;
        this.name = name;
        this.region = region;
    }

    public long getId() {
        return id;
    }

    public String getAcronym() {
        return acronym;
    }

    public String getName() {
        return name;
    }

    public Region getRegion() {
        return region;
    }
}
