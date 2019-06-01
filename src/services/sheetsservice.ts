import * as mySQL from "mysql";
import db         from "../mysqlconfig";

/**
 * Gets all the sheets information
 * @param callback The function to execute after the SQL query
 */
const getAllSheets = (callback: any) => {
  const getAllSheetsQuery = `SELECT
    num_partition AS id,
    titre_oeuvre AS title,
    auteur_oeuvre AS author,
    compositeur_oeuvre AS composer,
    genre_oeuvre AS genre FROM partitions`;

  db.query(getAllSheetsQuery, (err, data) => {
    callback(err, data);
  });
};

/**
 * Get detail AND concerts information for one sheet
 * @param sheetId The id (num_partition) of the sheet
 * @param callback The function to execute after the SQL query
 */
const getSheetDetails = (sheetId: number, callback: any) => {
  const inserts = [sheetId];
  const nestedSheetQuery = `SELECT
    num_partition AS id,
    titre_oeuvre AS title,
    auteur_oeuvre AS author,
    compositeur_oeuvre AS composer,
    genre_oeuvre as genre,
    boite_rangement AS boxNumber,
    edition_oeuvre AS publisher,
    remarques_oeuvre AS details,
    enregistrement_oeuvre AS recordingDate FROM partitions WHERE num_partition = ?`;
  const getSheetQuery = mySQL.format(nestedSheetQuery, inserts);

  const nestedConcertsQuery = `SELECT
    concerts.date_concert AS date,
    concerts.nom_concert AS name,
    concerts.lieu_concert AS location FROM programmes
    JOIN concerts ON programmes.\`#num_concert\` = concerts.num_concert
    WHERE \`#num_partition\` = ?`;
  const getConcertQuery = mySQL.format(nestedConcertsQuery, inserts);

  db.query(getSheetQuery, (err, detailsData) => {
    if (err) {
      callback(err, detailsData);
      return;
    }
    db.query(getConcertQuery, (err, concertsData) => {
      // First call made on the PRIMARY KEY num_partition - we ONLY have one result
      detailsData[0].concerts = concertsData;
      callback(err, detailsData);
    });
  });
};

export = {
  getAllSheets: getAllSheets,
  getSheetDetails: getSheetDetails
};

