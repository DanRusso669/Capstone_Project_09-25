package danrusso.capstoneProject.tools;

import danrusso.capstoneProject.entities.User;
import kong.unirest.core.HttpResponse;
import kong.unirest.core.JsonNode;
import kong.unirest.core.Unirest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MailSender {

    private String apiKey;
    private String domain;


    public MailSender(@Value("${mailgun.apikey}") String apiKey, @Value("${mailgun.domain}") String domain) {
        this.apiKey = apiKey;
        this.domain = domain;
    }

    public void sendThanksEmail(User recipient) {
        HttpResponse<JsonNode> response = Unirest.post("https://api.mailgun.net/v3/" + this.domain + "/messages")
                .basicAuth("api", this.apiKey)
                .queryString("from", "rifugiomamo@gmail.com")
                .queryString("to", "mhanzdnd@gmail.com")
                .queryString("subject", "Registrazione effettuata con successo!")
                .queryString("text", recipient.getName() + " " + recipient.getSurname() + ", la tua registrazione è avvenuta con successo.\n Grazie di esserti unito a oltre mille iscritti che supportano il Rifugio Mamo.")
                .asJson();
        System.out.println(response.getBody());
    }

    public void sendTemporaryPasswordEmail(User recipient) {
        HttpResponse<JsonNode> response = Unirest.post("https://api.mailgun.net/v3/" + this.domain + "/messages")
                .basicAuth("api", this.apiKey)
                .queryString("from", "rifugiomamo@gmail.com")
                .queryString("to", "mhanzdnd@gmail.com")
                .queryString("subject", "La tua password temporanea!")
                .queryString("html", "<p>" + recipient.getName() + " " + recipient.getSurname() + ", la tua registrazione è avvenuta con successo.</p>" +
                        "<p>Questa è la tua <em>password temporanea</em>: <strong>1234?Ciao</strong></p>" + "<p>Una volta effettuato il primo accesso, recati nella sezione <em>I tuoi dati</em> e cambia la password come desideri.</p>" + "<p>Grazie di esserti unito a oltre mille iscritti che supportano il Rifugio Mamo.</p>")
                .asJson();
        System.out.println(response.getBody());
    }
}
