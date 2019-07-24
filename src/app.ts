import express      from "express";
import bodyParser   from "body-parser";
import { port }     from "./config";
import routes       from "./api/routes";
import helmet       from "helmet";
import cors         from "cors";

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
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

// Primary app routes
app.use("/api", routes);

export default app;