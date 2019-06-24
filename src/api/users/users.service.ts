import * as mySQL          from "mysql2/promise";
import pool                from "../../shared/mysqlconfig";
import { NotFoundError }   from "../../shared/errors";

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

    const [rows] = await pool.query<mySQL.RowDataPacket[]>(getAllUsersQuery);
    if (!rows.length) throw new NotFoundError;
    return rows;
  };

  public getUserDetails = async (userId: number) => {
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

    const [rows] = await pool.query<mySQL.RowDataPacket[]>(getUserQuery, [userId]);
    if (!rows.length) throw new NotFoundError;
    return rows;
  };
}

export default UsersService;