import * as mySQL          from "mysql2/promise";
import pool                from "../../shared/mysqlconfig";
import { NotFoundError }   from "../../shared/errors";
import { UnexpectedError } from "../../shared/errors";
import logger              from "../../shared/logger";

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

    // This query should always return results
    const [rows] = await pool.query<mySQL.RowDataPacket[]>(getAllUsersQuery);
    if (!rows.length) throw new NotFoundError;
    logger.debug(`getAllUsers - ${rows.length} rows returned`);

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

    // This query should always return a unique result
    const [rows] = await pool.query<mySQL.RowDataPacket[]>(getUserQuery, [userId]);
    if (!rows.length) throw new NotFoundError;
    if (rows.length !== 1) throw new UnexpectedError;
    logger.debug(`getUserDetails - details for user ${userId} returned`);

    return rows[0];
  };
}

export default UsersService;