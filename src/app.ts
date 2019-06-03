import express      from "express";
import bodyParser   from "body-parser";
import { port }     from "./config";
import routes       from "./api/routes";

// Create Express server
const app = express();

// Express configuration
app.set("port", port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Primary app routes
app.use("/api", routes);

export default app;