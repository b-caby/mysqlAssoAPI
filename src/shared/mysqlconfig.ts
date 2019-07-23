import * as mySQL                         from "mysql2/promise";
import { host, user, password, database } from "../config";
import logger                             from "../shared/logger";

const query = `SELECT num_banque FROM banques`;
const connectionConfig: mySQL.PoolOptions = {
  connectionLimit: 10,
  host: host,
  user: user,
  password: password,
  database: database
};

const pool = mySQL.createPool(connectionConfig);
if (!pool) logger.error("The connection to the database failed");
else {
  pool.query<mySQL.OkPacket[]>(query).then(() => {
    logger.info("The connection to the database is complete");
  });
}

export default pool;
