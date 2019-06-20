import * as mySQL                         from "mysql2/promise";
import { host, user, password, database } from "../config";

const connectionConfig: mySQL.PoolOptions = {
  connectionLimit: 10,
  host: host,
  user: user,
  password: password,
  database: database
};

const pool = mySQL.createPool(connectionConfig);
console.log("The connection to the database is complete");

export default pool;
