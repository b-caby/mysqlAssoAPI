import pool       from "../../shared/mysqlconfig";
import sheet      from "../../models/sheet";
import * as mySQL from "mysql2/promise";

class SheetsService {

  public getAllSheets = async (): Promise<mySQL.RowDataPacket[]> => {
    const getAllSheetsQuery = `SELECT
      num_partition AS id,
      titre_oeuvre AS title,
      auteur_oeuvre AS author,
      compositeur_oeuvre AS composer,
      genre_oeuvre AS genre FROM partitions`;

    const [rows, fields] = await pool.query<mySQL.RowDataPacket[]>(getAllSheetsQuery);
    return rows;
  };

  public getSheetDetails = async (sheetId: number) => {
    const inserts = [sheetId];
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
      num_concert AS id,
      concerts.date_concert AS date,
      concerts.nom_concert AS name,
      concerts.lieu_concert AS location FROM programmes
      JOIN concerts ON programmes.\`#num_concert\` = concerts.num_concert
      WHERE \`#num_partition\` = ?`;

    const [detailsRows, detailsFields] = await pool.query<mySQL.RowDataPacket[]>(getSheetQuery, inserts);
    const [concertRows, concertFields] = await pool.query<mySQL.RowDataPacket[]>(getConcertQuery, inserts);
    if (concertRows.length) detailsRows[0].concerts = concertRows;

    return detailsRows;
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

    const [rows, fields] = await pool.query<mySQL.RowDataPacket[]>(createSheetQuery, inserts);
    return rows;
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

    const [rows, fields] = await pool.query<mySQL.RowDataPacket[]>(updateSheetQuery, inserts);
    return rows;
  };

  public deleteSheet = async (sheetId: number) => {
    const inserts = [sheetId];
    const deleteSheetQuery = `DELETE FROM partitions WHERE num_partition = ?`;

    const [rows, fields] = await pool.query<mySQL.RowDataPacket[]>(deleteSheetQuery, inserts);
    return rows;
  };
}

export default SheetsService;