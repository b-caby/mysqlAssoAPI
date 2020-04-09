import express               from "express";
import bodyParser            from "body-parser";
import { port, frontendURL } from "./config";
import routes                from "./api/routes";
import helmet                from "helmet";
import cors                  from "cors";

// Create Express server
const app = express();

// Express configuration
app.set("port", port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.disable("x-powered-by");
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", frontendURL);
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, Content-type");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Primary app routes
app.use("/api", routes);

export default app;