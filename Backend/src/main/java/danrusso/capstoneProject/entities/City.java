package danrusso.capstoneProject.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "cities")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String cityCode;
    private String name;
    @ManyToOne
    private Province province;

    public City() {
    }

    public City(String cityCode, String name, Province province) {
        this.cityCode = cityCode;
        this.name = name;
        this.province = province;
    }

    public long getId() {
        return id;
    }

    public String getCityCode() {
        return cityCode;
    }

    public String getName() {
        return name;
    }

    public Province getProvince() {
        return province;
    }
}
