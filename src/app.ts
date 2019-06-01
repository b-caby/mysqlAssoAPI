import express      from "express";
import bodyParser   from "body-parser";
import { port }     from "./config";

// Controllers (route handlers)
import sheetsRoutes         from "./controllers/sheets";
import benefactorsRoutes    from "./controllers/benefactors";
import usersRoutes          from "./controllers/users";
import concertsRoutes       from "./controllers/concerts";

// Create Express server
const app = express();

// Express configuration
app.set("port", port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Primary app routes
app.use("/api/sheets", sheetsRoutes);
app.use("/api/benefactors", benefactorsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/concerts", concertsRoutes);

export default app;