import * as mySQL          from "mysql2/promise";
import pool                from "../../shared/mysqlconfig";
import { Concert }         from "../../models/concert";
import { NotFoundError }   from "../../shared/errors";
import { UnexpectedError } from "../../shared/errors";
import logger              from "../../shared/logger";

class ConcertsService {

  public getAllConcerts = async () => {
    const getAllConcertsQuery = `SELECT
      num_concert AS id,
      date_concert AS date,
      nom_concert AS name,
      lieu_concert AS location FROM concerts`;

    // This query should always return results
    const [rows] = await pool.query<mySQL.RowDataPacket[]>(getAllConcertsQuery);
    if (!rows.length) throw new NotFoundError;
    logger.debug(`getAllConcerts - ${rows.length} rows returned`);

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

    // This query should always return a unique result
    const [detailsRows] = await pool.query<mySQL.RowDataPacket[]>(getConcertQuery, [concertId]);
    if (!detailsRows.length) throw new NotFoundError;
    if (detailsRows.length !== 1) throw new UnexpectedError;

    const [sheetRows] = await pool.query<mySQL.RowDataPacket[]>(getSheetsQuery, [concertId]);
    logger.debug(`getConcertDetails - ${sheetRows.length} sheets returned for concert ${concertId}`);
    if (sheetRows.length) detailsRows[0].sheets = sheetRows;

    return detailsRows;
  };

  public createConcert = async (concert: Concert) => {
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

    // This request should only affect a single row
    const [rows] = await pool.query<mySQL.OkPacket>(createConcertQuery, inserts);
    logger.debug(`createConcert - concert id: ${rows.insertId} added`);

    return rows;
  };

  public updateConcert = async (concertId: number, concert: Concert) => {
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

    // This query should only affect a single row
    const [rows] = await pool.query<mySQL.OkPacket>(updateConcertQuery, inserts);
    if (!rows.affectedRows) throw new NotFoundError;
    logger.debug(`updateConcert - ${rows.affectedRows} rows affected`);
  };

  public deleteConcert = async (concertId: number) => {
    const deleteConcertQuery = `DELETE FROM concerts WHERE num_concert = ?`;
    const deleteForeignKeyQuery = `DELETE FROM programmes WHERE \`#num_concert\` = ?`;

    // This query should only affect a single row
    const [concertRows] = await pool.query<mySQL.OkPacket>(deleteConcertQuery, [concertId]);
    if (!concertRows.affectedRows) throw new NotFoundError;

    const [foreignKeyRows] = await pool.query<mySQL.OkPacket>(deleteForeignKeyQuery, [concertId]);
    logger.debug(`deleteConcert - ${foreignKeyRows.affectedRows} foreign keys deleted`);
  };

  public addSheetsToConcert = async (sheetIds: number[], concertId: number) => {
    const queryParameters = this.getAddSheetsQueryParameters(sheetIds, concertId);
    const addSheetsToConcertQuery = `INSERT INTO programmes (
      \`#num_concert\`,
      \`#num_partition\`)
      VALUES ${queryParameters}`;

    const [rows] = await pool.query<mySQL.OkPacket>(addSheetsToConcertQuery, sheetIds);
    logger.debug(`addSheetsToConcert - ${rows.affectedRows} sheets added for concert ${concertId}`);
  };

  public removeSheetsFromConcert = async (sheetIds: number[], concertId: number) => {
    const queryParameters = this.getRemoveSheetsQueryParameters(sheetIds, concertId);
    const removeSheetsFromConcertQuery = `DELETE FROM programmes WHERE ${queryParameters}`;

    const [rows] = await pool.query<mySQL.OkPacket>(removeSheetsFromConcertQuery, sheetIds);
    logger.debug(`removeSheetsFromConcert - ${rows.affectedRows} sheets removed for concert ${concertId}`);
  };

  private getAddSheetsQueryParameters = (sheetIds: number[], concertId: number) => {
    let queryParameters: string = "";
    for (let i = 0; i < sheetIds.length - 1; i++) queryParameters += `(${concertId}, ?),`;
    queryParameters += `(${concertId}, ?)`;
    return queryParameters;
  };

  private getRemoveSheetsQueryParameters = (sheetIds: number[], concertId: number) => {
    let queryParameters: string = "";
    for (let i = 0; i < sheetIds.length - 1; i++) {
      queryParameters += `(\`#num_concert\` = ${concertId} AND \`#num_partition\` = ?) OR `;
    }
    queryParameters += `(\`#num_concert\` = ${concertId} AND \`#num_partition\` = ?)`;
    return queryParameters;
  };
}

export default ConcertsService;