import java.util.HashMap;
import java.util.Map;

import io.javalin.Javalin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Main {

    static Map<String, String> reservations = new HashMap<String, String>() {{
        put("saturday", "No reservation");
        put("sunday", "No reservation");
    }};

    static Logger logger = LoggerFactory.getLogger(Main.class);

    public static void main(String[] args) {

        Javalin app = Javalin.create(config -> {
            config.addStaticFiles("/public");
            config.enableCorsForAllOrigins();
        }).start(7777);

        app.post("/make-reservation", ctx -> {
            logger.info(ctx.url());
            logger.info("DAY: " + ctx.formParam("day"));
            logger.info("TIME: " + ctx.formParam("time"));
            reservations.put(ctx.formParam("day"), ctx.formParam("time"));
            ctx.html("Your reservation has been saved");
        });

        app.get("/check-reservation", ctx -> {
            logger.info(ctx.url());
            logger.info("DAY: " + ctx.queryParam("day"));
           ctx.html(reservations.get(ctx.queryParam("day")));
        });

    }

}
