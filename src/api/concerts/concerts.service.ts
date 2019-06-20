import pool       from "../../shared/mysqlconfig";
import concert    from "../../models/concert";
import * as mySQL from "mysql2/promise";

class ConcertsService {

  public getAllConcerts = async () => {
    const getAllConcertsQuery = `SELECT
      num_concert AS id,
      date_concert AS date,
      nom_concert AS name,
      lieu_concert AS location FROM concerts`;

    const [rows, fields] = await pool.query<mySQL.RowDataPacket[]>(getAllConcertsQuery);
    return rows;
  };

  public getConcertDetails = async (concertId: number) => {
    const inserts = [concertId];
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


    const [detailsRows, detailsFields] = await pool.query<mySQL.RowDataPacket[]>(getConcertQuery, inserts);
    const [sheetRows, sheetFields] = await pool.query<mySQL.RowDataPacket[]>(getSheetsQuery, inserts);
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

    const [rows, fields] = await pool.query<mySQL.RowDataPacket[]>(createConcertQuery);
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

    const [rows, fields] = await pool.query<mySQL.RowDataPacket[]>(updateConcertQuery);
    return rows;
  };

  public deleteConcert = async (concertId: number) => {
    const inserts = [concertId];
    const deleteConcertQuery = `DELETE FROM concerts WHERE num_concert = ?`;

    const [rows, fields] = await pool.query<mySQL.RowDataPacket[]>(deleteConcertQuery);
    return rows;
  };
}

export default ConcertsService;