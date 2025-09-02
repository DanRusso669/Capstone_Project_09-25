package danrusso.capstoneProject.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "animals")
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private int age;
    private Gender gender;
    private String species;
    private String breed;
    private String description;
    @Column(name = "clinical_condition")
    private String clinicalCondition;
    private AnimalStatus status;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "entry_date")
    private LocalDate entryDate;
    @Column(name = "releade_date")
    private LocalDate releaseDate;
    @Column(name = "is_adoptable")
    private boolean isAdoptable;
    @ManyToOne
    private City city;
    @ManyToOne
    private Province province;
    @ManyToOne
    private Region region;
    @JoinColumn(name = "found_by")
    @ManyToOne
    private User foundBy;
    @Column(name = "death_date")
    private LocalDate deathDate;
    @Column(name = "death_cause")
    private String deathCause;

    public Animal() {
    }

    public Animal(String name, int age, Gender gender, String species, String breed, String description, String clinicalCondition, AnimalStatus status, LocalDate entryDate, City city, Province province, Region region, User foundBy) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.species = species;
        this.breed = breed;
        this.description = description;
        this.clinicalCondition = clinicalCondition;
        this.status = status;
        this.entryDate = entryDate;
        this.city = city;
        this.province = province;
        this.region = region;
        this.foundBy = foundBy;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setClinicalCondition(String clinicalCondition) {
        this.clinicalCondition = clinicalCondition;
    }

    public void setStatus(AnimalStatus status) {
        this.status = status;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public void setAdoptable(boolean adoptable) {
        isAdoptable = adoptable;
    }

    public void setDeathDate(LocalDate deathDate) {
        this.deathDate = deathDate;
    }

    public void setDeathCause(String deathCause) {
        this.deathCause = deathCause;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public Gender getGender() {
        return gender;
    }

    public String getSpecies() {
        return species;
    }

    public String getBreed() {
        return breed;
    }

    public String getDescription() {
        return description;
    }

    public String getClinicalCondition() {
        return clinicalCondition;
    }

    public AnimalStatus getStatus() {
        return status;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public boolean isAdoptable() {
        return isAdoptable;
    }

    public City getCity() {
        return city;
    }

    public Province getProvince() {
        return province;
    }

    public Region getRegion() {
        return region;
    }

    public User getFoundBy() {
        return foundBy;
    }

    public LocalDate getDeathDate() {
        return deathDate;
    }

    public String getDeathCause() {
        return deathCause;
    }
}
