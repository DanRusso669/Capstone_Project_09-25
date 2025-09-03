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
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String species;
    private String breed;
    private String description;
    @Column(name = "clinical_condition")
    private String clinicalCondition;
    @Enumerated(EnumType.STRING)
    private AnimalStatus status;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "entry_date")
    private LocalDate entryDate;
    @Column(name = "release_date")
    private LocalDate releaseDate;
    @Column(name = "is_adoptable")
    private boolean isAdoptable;
    private String city;
    private String province;
    private String region;
    @JoinColumn(name = "found_by")
    @ManyToOne
    private User foundBy;
    @Column(name = "death_date")
    private LocalDate deathDate;
    @Column(name = "death_cause")
    private String deathCause;

    public Animal() {
    }

    public Animal(String name, int age, Gender gender, String species, String breed, String description, String clinicalCondition, AnimalStatus status, String imageUrl,LocalDate entryDate, String city, String province, String region, User foundBy) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.species = species;
        this.breed = breed;
        this.description = description;
        this.clinicalCondition = clinicalCondition;
        this.status = status;
        this.imageUrl = imageUrl;
        this.entryDate = entryDate;
        this.city = city;
        this.province = province;
        this.region = region;
        this.foundBy = foundBy;
    }

    public long getId() {
        return id;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getClinicalCondition() {
        return clinicalCondition;
    }

    public void setClinicalCondition(String clinicalCondition) {
        this.clinicalCondition = clinicalCondition;
    }

    public AnimalStatus getStatus() {
        return status;
    }

    public void setStatus(AnimalStatus status) {
        this.status = status;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public boolean isAdoptable() {
        return isAdoptable;
    }

    public void setAdoptable(boolean adoptable) {
        isAdoptable = adoptable;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public User getFoundBy() {
        return foundBy;
    }

    public void setFoundBy(User foundBy) {
        this.foundBy = foundBy;
    }

    public LocalDate getDeathDate() {
        return deathDate;
    }

    public void setDeathDate(LocalDate deathDate) {
        this.deathDate = deathDate;
    }

    public String getDeathCause() {
        return deathCause;
    }

    public void setDeathCause(String deathCause) {
        this.deathCause = deathCause;
    }
}
