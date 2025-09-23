package danrusso.capstoneProject.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "articles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;
    @Column(name = "publication_date")
    private LocalDate publicationDate;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String content;
    @Column(name = "article_image")
    @JsonProperty("articleImg")
    private String articleImg;
    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    public Article() {
    }

    public Article(String title, LocalDate publicationDate, String content, String articleImg, User author) {
        this.title = title;
        this.publicationDate = publicationDate;
        this.content = content;
        this.articleImg = articleImg;
        this.author = author;
    }

    public String getArticleImg() {
        return articleImg;
    }

    public void setArticleImg(String articleImg) {
        this.articleImg = articleImg;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(LocalDate publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }
}
