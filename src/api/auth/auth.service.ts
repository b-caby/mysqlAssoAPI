import * as mySQL from "mysql";
import pool       from "../../shared/mysqlconfig";

class AuthService {

  public getAuthentification = async (login: string, password: string) => {
    const inserts = [login, password];
    const getAuthentificationQuery = `SELECT
        id_musiciens AS id,
        Nom AS name,
        prenom AS firstname,
        musicien_login AS login,
        musicien_user AS role FROM musiciens
        WHERE musicien_login = ? AND musicien_mdp = ?`;

    const [rows, fields] = await pool.query<mySQL.RowDataPacket[]>(getAuthentificationQuery, inserts);
    return rows;
  };
}

export default AuthService;