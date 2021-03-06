import * as mySQL          from "mysql2/promise";
import pool                from "../../shared/mysqlconfig";
import { NotFoundError }   from "../../shared/errors";
import { UnexpectedError } from "../../shared/errors";
import logger              from "../../shared/logger";
import User                from "../../models/user";

class UsersService {

  public getAllUsers = async () => {
    const getAllUsersQuery = `SELECT
      id_musiciens AS id,
      Nom AS name,
      prenom AS firstname,
      \`E-mail\` AS email,
      Fixe AS phone,
      Portable AS mobile FROM musiciens`;

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
    date_entree AS joinedOn FROM musiciens WHERE id_musiciens = ?`;

    // This query should always return a unique result
    const [detailsRows] = await pool.query<mySQL.RowDataPacket[]>(getUserQuery, [userId]);
    if (!detailsRows.length) throw new NotFoundError;
    if (detailsRows.length !== 1) throw new UnexpectedError;

    return detailsRows[0];
  };

  public getUserAccount = async (userId: number) => {
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

  public getUserAttendance = async (userId: number) => {
    const date = new Date().toISOString();
    const concertDate = date.substring(0, 10);

    const getUserAttendanceQuery = `SELECT
    concerts.num_concert AS concertId,
    concerts.date_concert AS date,
    concerts.nom_concert AS name,
    concerts.lieu_concert AS location,
    presences.present AS present,
    presences.absent AS absent,
    presences.pas_repondu AS undefined,
    presences.peutetre AS maybe,
    presences.commentaire AS comment FROM concerts
    JOIN presences ON presences.\`#num_jour\` = concerts.num_concert AND presences.\`#num_musicien\` = ?
    WHERE date_concert > '${concertDate}'`;

    // This query should always return results
    const [rows] = await pool.query<mySQL.RowDataPacket[]>(getUserAttendanceQuery, [userId]);
    logger.debug(`getFutureConcerts - ${rows.length} rows returned`);

    return rows;
  }
}

export default new UsersService;