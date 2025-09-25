package danrusso.capstoneProject.repositories;

import danrusso.capstoneProject.entities.Adoption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdoptionRepository extends JpaRepository<Adoption, Long>, JpaSpecificationExecutor<Adoption> {

    @Query("SELECT a FROM Adoption a WHERE a.user.id = :userId AND a.endDate IS NULL")
    List<Adoption> findActiveAdoptionsByUserId(@Param("userId") long userId);
}
