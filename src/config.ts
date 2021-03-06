import dotenv       from "dotenv";
import fs           from "fs";

if (fs.existsSync(".env")) {
    dotenv.config({path: ".env"});
}

const debugLevel = process.env["NODE_ENV"] === "production" ? "info" : "debug";
const port = process.env.PORT || 789;
const host = process.env["HOST"];
const user = process.env["USER"];
const password = process.env["PASSWORD"];
const database = process.env["DATABASE"];
const secret = process.env["SECRET"];
const frontendURL = process.env["FRONTENDURL"];

export { debugLevel, port, host, user, password, database, secret, frontendURL };