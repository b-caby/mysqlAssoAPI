import * as mySQL from "mysql";
import pool       from "../../shared/mysqlconfig";

class UsersService {

  public getAllUsers = async () => {
    const getAllUsersQuery = `SELECT
      id_musiciens AS id,
      civilite AS honorifics,
      Nom AS name,
      prenom AS firstname,
      Adresse AS adress,
      CP AS postalCode,
      Ville AS city,
      \`E-mail\` AS email,
      Fixe AS phone,
      Portable AS mobile,
      Instrument AS instrument FROM musiciens`;

    const [rows, fields] = await pool.query<mySQL.RowDataPacket[]>(getAllUsersQuery);
    return rows;
  };

  public getUserDetails = async (userId: number) => {
    const inserts = [userId];
    const getUserQuery = `SELECT
      id_musiciens AS id,
      civilite AS honorifics,
      Nom AS name,
      prenom AS firstname,
      date_naissance AS birthdate,
      Adresse AS adress,
      CP AS postalCode,
      Ville AS city,
      \`E-mail\` AS email,
      Fixe AS phone,
      Portable AS mobile,
      Instrument AS instrument,
      Type AS type,
      Marque AS brand,
      num_serie AS serialNumber,
      date_entree AS joinedOn,
      musicien_login AS login,
      musicien_mdp AS password FROM musiciens WHERE id_musiciens = ?`;

    const [rows, fields] = await pool.query<mySQL.RowDataPacket[]>(getUserQuery, inserts);
    return rows;
  };
}

export default UsersService;