import * as mySQL from "mysql";
import db         from "../../shared/mysqlconfig";

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
    const nestedConcertQuery = `SELECT
      num_concert AS id,
      date_concert AS date,
      nom_concert AS name,
      lieu_concert AS location,
      nbre_musiciens AS playerNumber,
      nbre_auditeurs AS spectatorNumber,
      duree_concert AS length FROM concerts WHERE num_concert = ?`;
    const getConcertQuery = mySQL.format(nestedConcertQuery, inserts);

    const nestedSheetsQuery = `SELECT
      partitions.num_partition AS id,
      partitions.titre_oeuvre AS title FROM programmes
      JOIN partitions ON programmes.\`#num_partition\` = partitions.num_partition
      WHERE \`#num_concert\` = ?`;
    const getSheetsQuery = mySQL.format(nestedSheetsQuery, inserts);

    db.query(getConcertQuery, (err, detailsData) => {
      if (err) callback(err, detailsData);
      else {
        db.query(getSheetsQuery, (err, sheetsData) => {
          // First call made on the PRIMARY KEY num_concert - we ONLY have one result
          detailsData[0].sheets = sheetsData;
          callback(err, detailsData);
        });
      }
    });
  };
}

export default ConcertsService;