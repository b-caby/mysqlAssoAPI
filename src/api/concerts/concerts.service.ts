import db       from "../../shared/mysqlconfig";
import concert  from "../../models/concert";

class ConcertsService {

  public getAllConcerts = (callback: any) => {
    const getAllConcertsQuery = `SELECT
      num_concert AS id,
      date_concert AS date,
      nom_concert AS name,
      lieu_concert AS location FROM concerts`;

    db.query(getAllConcertsQuery, (err, data) => {
      callback(err, data);
    });
  };

  public getConcertDetails = (concertId: number, callback: any) => {
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

    db.query(getConcertQuery, inserts, (err, detailsData) => {
      if (err) callback(err, detailsData);
      else {
        db.query(getSheetsQuery, inserts, (err, sheetsData) => {
          // First call made on the PRIMARY KEY num_concert - we ONLY have one result
          detailsData[0].sheets = sheetsData;
          callback(err, detailsData);
        });
      }
    });
  };

  public createConcert = (concert: concert, callback: any) => {
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

    db.query(createConcertQuery, inserts, (err, data) => {
      callback(err, data);
    });
  };

  public updateConcert = (concertId: number, concert: concert, callback: any) => {
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

    db.query(updateConcertQuery, inserts, (err, data) => {
      callback(err, data);
    });
  };

  public deleteConcert = (concertId: number, callback: any) => {
    const inserts = [concertId];
    const deleteConcertQuery = `DELETE FROM concerts WHERE num_concert = ?`;

    db.query(deleteConcertQuery, inserts, (err, data) => {
      callback(err, data);
    });
  };
}

export default ConcertsService;