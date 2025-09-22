package danrusso.capstoneProject.services;

import danrusso.capstoneProject.entities.Article;
import danrusso.capstoneProject.entities.User;
import danrusso.capstoneProject.exceptions.BadRequestException;
import danrusso.capstoneProject.exceptions.NotFoundException;
import danrusso.capstoneProject.payloads.NewArticleDTO;
import danrusso.capstoneProject.repositories.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserService userService;

    public Article findById(long articleId) {
        return this.articleRepository.findById(articleId).orElseThrow(() -> new NotFoundException(articleId, "Articolo"));
    }

    public Page<Article> findAll(int pageNumber, int pageSize, String sortBy) {
        if (pageSize > 20) pageSize = 20;
        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy));
        return this.articleRepository.findAll(pageable);
    }

    public Article save(long userId, NewArticleDTO payload) {
        User foundUser = this.userService.findById(userId);
        if (foundUser.getRoles().stream().anyMatch(role -> role.getRoleDef().equalsIgnoreCase("ADMIN"))) {
            throw new BadRequestException("Questo utente non ha i permessi per pubblicare un articolo.");
        }

        Article newArticle = new Article(payload.title(), payload.publicationDate(), payload.content(), foundUser);
        return this.articleRepository.save(newArticle);
    }

    public Article findByIdAndUpdate(NewArticleDTO payload, long articleId) {
        Article articleFound = this.findById(articleId);

        articleFound.setTitle(payload.title());
        articleFound.setPublicationDate(payload.publicationDate());
        articleFound.setContent(payload.content());
        return this.articleRepository.save(articleFound);
    }

    public void findByIdAndDelete(long articleId) {
        Article found = this.findById(articleId);
        this.articleRepository.delete(found);
    }
}
