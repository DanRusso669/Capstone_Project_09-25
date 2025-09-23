package danrusso.capstoneProject.controllers;

import danrusso.capstoneProject.entities.Article;
import danrusso.capstoneProject.entities.User;
import danrusso.capstoneProject.payloads.CreationRespDTO;
import danrusso.capstoneProject.payloads.NewArticleDTO;
import danrusso.capstoneProject.services.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/articles")
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    @GetMapping
    public Page<Article> findAll(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size,
                                 @RequestParam(defaultValue = "publicationDate") String sortBy,
                                 @RequestParam(defaultValue = "desc") String sortByDirection) {
        return this.articleService.findAll(page, size, sortBy, sortByDirection);
    }

    @GetMapping("/{articleId}")
    public Article findById(@PathVariable long articleId) {
        return this.articleService.findById(articleId);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public CreationRespDTO save(@RequestBody @Validated NewArticleDTO payload, BindingResult validation, @AuthenticationPrincipal User currentAuthenticatedUser) {
        this.articleService.checkValidationErrors(validation);
        Article newArticle = this.articleService.save(currentAuthenticatedUser.getId(), payload);
        return new CreationRespDTO(newArticle.getId());
    }

    @PutMapping("/{articleId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public CreationRespDTO update(@RequestBody @Validated NewArticleDTO payload, BindingResult validation, @PathVariable long articleId) {
        this.articleService.checkValidationErrors(validation);
        Article updatedArticle = this.articleService.findByIdAndUpdate(payload, articleId);
        return new CreationRespDTO(updatedArticle.getId());
    }


    @DeleteMapping("/{articleId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable long articleId) {
        this.articleService.findByIdAndDelete(articleId);
    }

}
