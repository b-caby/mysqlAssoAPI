import * as mySQL          from "mysql2/promise";
import pool                from "../../shared/mysqlconfig";
import sheet               from "../../models/sheet";
import { NotFoundError }   from "../../shared/errors";
import { UnexpectedError } from "../../shared/errors";
import logger              from "../../shared/logger";

class SheetsService {

  public getAllSheets = async () => {
    const getAllSheetsQuery = `SELECT
      num_partition AS id,
      titre_oeuvre AS title,
      auteur_oeuvre AS author,
      compositeur_oeuvre AS composer,
      genre_oeuvre AS genre FROM partitions`;

    // This query should always return results
    const [rows] = await pool.query<mySQL.RowDataPacket[]>(getAllSheetsQuery);
    if (!rows.length) throw new NotFoundError;
    logger.debug(`getAllSheets - ${rows.length} rows returned`);

    return rows;
  };

  public getSheetDetails = async (sheetId: number) => {
    const getSheetQuery = `SELECT
      num_partition AS id,
      titre_oeuvre AS title,
      auteur_oeuvre AS author,
      compositeur_oeuvre AS composer,
      genre_oeuvre AS genre,
      type_oeuvre AS type,
      edition_oeuvre AS publisher,
      remarques_oeuvre AS details,
      boite_rangement AS boxNumber,
      num_conducteur AS trayNumber,
      enregistrement_oeuvre AS recordingDate FROM partitions WHERE num_partition = ?`;

    const getConcertQuery = `SELECT
      concerts.num_concert AS id,
      concerts.date_concert AS date,
      concerts.nom_concert AS name,
      concerts.lieu_concert AS location FROM programmes
      JOIN concerts ON programmes.\`#num_concert\` = concerts.num_concert
      WHERE \`#num_partition\` = ?`;

    // This query should always return a unique result
    const [detailsRows] = await pool.query<mySQL.RowDataPacket[]>(getSheetQuery, [sheetId]);
    if (!detailsRows.length) throw new NotFoundError;
    if (detailsRows.length !== 1) throw new UnexpectedError;

    const [concertRows] = await pool.query<mySQL.RowDataPacket[]>(getConcertQuery, [sheetId]);
    logger.debug(`getSheetDetails - ${concertRows.length} concerts returned for sheet ${sheetId}`);
    if (concertRows.length) detailsRows[0].concerts = concertRows;

    return detailsRows[0];
  };

  public createSheet = async (sheet: sheet) => {
    const inserts = [
      sheet.title,
      sheet.author,
      sheet.composer,
      sheet.genre,
      sheet.type,
      sheet.publisher,
      sheet.details,
      sheet.boxNumber,
      sheet.trayNumber,
      sheet.recordingDate];
    const createSheetQuery = `INSERT INTO partitions (
      titre_oeuvre,
      auteur_oeuvre,
      compositeur_oeuvre,
      genre_oeuvre,
      type_oeuvre,
      edition_oeuvre,
      remarques_oeuvre,
      boite_rangement,
      num_conducteur,
      enregistrement_oeuvre)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [rows] = await pool.query<mySQL.OkPacket>(createSheetQuery, inserts);
    logger.debug(`createSheet - sheet id: ${rows.insertId} added`);
  };

  public updateSheet = async (sheetId: number, sheet: sheet) => {
    const inserts = [
      sheet.title,
      sheet.author,
      sheet.composer,
      sheet.genre,
      sheet.type,
      sheet.publisher,
      sheet.details,
      sheet.boxNumber,
      sheet.trayNumber,
      sheet.recordingDate,
      sheetId];
      const updateSheetQuery = `UPDATE partitions SET
      titre_oeuvre = ?,
      auteur_oeuvre = ?,
      compositeur_oeuvre = ?,
      genre_oeuvre = ?,
      type_oeuvre = ?,
      edition_oeuvre = ?,
      remarques_oeuvre = ?,
      boite_rangement = ?,
      num_conducteur = ?,
      enregistrement_oeuvre = ? WHERE num_partition = ?`;

    // This query should only affect a single row
    const [rows] = await pool.query<mySQL.OkPacket>(updateSheetQuery, inserts);
    if (!rows.affectedRows) throw new NotFoundError;
    logger.debug(`updateSheet - ${rows.affectedRows} rows affected`);
  };

  public deleteSheet = async (sheetId: number) => {
    const deleteSheetQuery = `DELETE FROM partitions WHERE num_partition = ?`;
    const deleteForeignKeyQuery = `DELETE FROM programmes WHERE \`#num_partition\` = ?`;

    // This query should only affect a single row
    const [sheetRows] = await pool.query<mySQL.OkPacket>(deleteSheetQuery, [sheetId]);
    if (!sheetRows.affectedRows) throw new NotFoundError;

    const [foreignKeyRows] = await pool.query<mySQL.OkPacket>(deleteForeignKeyQuery, [sheetId]);
    logger.debug(`deleteSheet - ${foreignKeyRows.affectedRows} foreign keys deleted`);
  };
}

export default new SheetsService;