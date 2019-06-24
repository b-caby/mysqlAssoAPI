import pool                from "../../shared/mysqlconfig";
import concert             from "../../models/concert";
import * as mySQL          from "mysql2/promise";
import { NotFoundError }   from "../../shared/errors";
import { UnexpectedError } from "../../shared/errors";

class ConcertsService {

  public getAllConcerts = async () => {
    const getAllConcertsQuery = `SELECT
      num_concert AS id,
      date_concert AS date,
      nom_concert AS name,
      lieu_concert AS location FROM concerts`;

    const [rows] = await pool.query<mySQL.RowDataPacket[]>(getAllConcertsQuery);
    if (!rows.length) throw new NotFoundError;
    return rows;
  };

  public getConcertDetails = async (concertId: number) => {
    const getConcertQuery = `SELECT
      num_concert AS id,
      date_concert AS date,
      nom_concert AS name,
      lieu_concert AS location,
      nbre_musiciens AS playerNumber,
      nbre_auditeurs AS spectatorNumber,
      duree_concert AS length FROM concerts WHERE num_concert = ?`;

    const getSheetsQuery = `SELECT
      partitions.num_partition AS id,
      partitions.titre_oeuvre AS title FROM programmes
      JOIN partitions ON programmes.\`#num_partition\` = partitions.num_partition
      WHERE \`#num_concert\` = ?`;


    const [detailsRows] = await pool.query<mySQL.RowDataPacket[]>(getConcertQuery, [concertId]);
    if (!detailsRows.length) throw new NotFoundError;
    if (detailsRows.length != 1) throw new UnexpectedError;

    const [sheetRows] = await pool.query<mySQL.RowDataPacket[]>(getSheetsQuery, [concertId]);
    if (sheetRows.length) detailsRows[0].sheets = sheetRows;
    return detailsRows;
  };

  public createConcert = async (concert: concert) => {
    const inserts = [
      concert.date,
      concert.name,
      concert.location,
      concert.playerNumber,
      concert.spectatorNumber,
      concert.length];
    const createConcertQuery = `INSERT INTO concerts (
      date_concert,
      nom_concert,
      lieu_concert,
      nbre_musiciens,
      nbre_auditeurs,
      duree_concert)
      VALUES (?, ?, ?, ?, ?, ?)`;

    const [rows] = await pool.query<mySQL.OkPacket[]>(createConcertQuery, inserts);
    return rows;
  };

  public updateConcert = async (concertId: number, concert: concert) => {
    const inserts = [
      concert.date,
      concert.name,
      concert.location,
      concert.playerNumber,
      concert.spectatorNumber,
      concert.length,
      concertId];
      const updateConcertQuery = `UPDATE concerts SET
      date_concert = ?,
      nom_concert = ?,
      lieu_concert = ?,
      nbre_musiciens = ?,
      nbre_auditeurs = ?,
      duree_concert = ? WHERE num_concert = ?`;

    const [rows] = await pool.query<mySQL.OkPacket[]>(updateConcertQuery, inserts);
    return rows;
  };

  public deleteConcert = async (concertId: number) => {
    const deleteConcertQuery = `DELETE FROM concerts WHERE num_concert = ?`;
    const deleteForeignKeyQuery = `DELETE FROM programmes WHERE num_concert = ?`;

    const [concertRows] = await pool.query<mySQL.OkPacket[]>(deleteConcertQuery, [concertId]);
    const [foreignKeyRows] = await pool.query<mySQL.OkPacket[]>(deleteForeignKeyQuery, [concertId])
    return concertRows;
  };
}

export default ConcertsService;