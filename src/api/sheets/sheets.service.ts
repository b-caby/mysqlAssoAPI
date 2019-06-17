import db    from "../../shared/mysqlconfig";
import sheet from "../../models/sheet";

class SheetsService {

  public getAllSheets = (callback: any) => {
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

  public getSheetDetails = (sheetId: number, callback: any) => {
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

    db.query(getSheetQuery, inserts, (err, detailsData) => {
      if (err) callback(err, detailsData);
      else {
        db.query(getConcertQuery, inserts, (err, concertsData) => {
          // First call made on the PRIMARY KEY num_partition - we ONLY have one result
          detailsData[0].concerts = concertsData;
          callback(err, detailsData);
        });
      }
    });
  };

  public createSheet = (sheet: sheet, callback: any) => {
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

    db.query(createSheetQuery, inserts, (err, data) => {
      callback(err, data);
    });
  };

  public updateSheet = (sheetId: number, sheet: sheet, callback: any) => {
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

    db.query(updateSheetQuery, inserts, (err, data) => {
      callback(err, data);
    });
  };

  public deleteSheet = (sheetId: number, callback: any) => {
    const inserts = [sheetId];
    const deleteSheetQuery = `DELETE FROM partitions WHERE num_partition = ?`;

    db.query(deleteSheetQuery, inserts, (err, data) => {
      callback(err, data);
    });
  };
}

export default SheetsService;