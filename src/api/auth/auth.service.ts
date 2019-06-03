import * as mySQL from "mysql";
import db         from "../../shared/mysqlconfig";

class AuthService {

  public getAuthentification = (login: string, password: string, callback: any) => {
    const inserts = [login, password];
    const nestedAuthentificationQuery = `SELECT
        Nom AS name,
        prenom AS firstname,
        musicien_login AS login,
        musicien_user AS role FROM musiciens
        WHERE musicien_login = ? AND musicien_mdp = ?`;
    const getAuthentificationQuery = mySQL.format(nestedAuthentificationQuery, inserts);

    db.query(getAuthentificationQuery, (err, data) => {
      callback(err, data);
    });
  };
}

export default AuthService;