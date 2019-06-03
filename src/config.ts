import dotenv       from "dotenv";
import fs           from "fs";

if (fs.existsSync(".env")) {
    dotenv.config({path: ".env"});
}

const port = process.env["NODE_ENV"] === "production" ? 80 : 789;
const host = process.env["HOST"];
const user = process.env["USER"];
const password = process.env["PASSWORD"];
const database = process.env["DATABASE"];
const secret = process.env["SECRET"];

export { port, host, user, password, database, secret };