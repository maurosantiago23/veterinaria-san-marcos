package cl.duoc.vet_sanmarcos_backend.config;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Redirige la raiz del backend (/) hacia la consola interactiva Swagger UI.
 * Evita que usuarios o evaluadores vean la pagina de error 404 Whitelabel.
 */
@Controller
public class RootRedirectController {

    @GetMapping("/")
    public String redirectToSwagger() {
        return "redirect:/swagger-ui/index.html";
    }
}
