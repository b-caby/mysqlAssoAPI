import * as mySQL                            from "mysql";
import { host, user, password, database }    from "../config";

const connectionConfig: mySQL.ConnectionConfig = {
    host: host,
    user: user,
    password: password,
    database: database
};

const connection = mySQL.createConnection(connectionConfig);

connection.connect((err: mySQL.MysqlError) => {
    if (err) console.log(err);
    else console.log("The connection to the database is complete");
  });

export default connection;
