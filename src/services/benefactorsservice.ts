import * as mySQL from "mysql";
import db         from "../mysqlconfig";

/**
 * Gets all benefactors info
 * @param callback The function to execute after the SQL query
 */
const getAllBenefactors = (callback: any) => {
  const getAllBenefactorsQuery = `SELECT
    num_identite AS id,
    civilite_identite AS honorifics,
    nom_identite AS name,
    prenom_identite AS firstname,
    adresse_identite AS adress,
    code_postal_identite AS postalCode,
    ville_identite AS city,
    telephone_identite AS phone,
    portable_identite AS mobile,
    mail_identite AS email FROM bienfaiteurs`;

  db.query(getAllBenefactorsQuery, (err, data) => {
    callback(err, data);
  });
};

/**
 * Gets the detail information about one benefactor
 * @param benefactorId The id (num_identite) of the benefactor
 * @param callback The function to execute after the SQL query
 */
const getBenefactorDetails = (benefactorId: number, callback: any) => {
  const inserts = [benefactorId];
  const nestedBenefactorQuery = `SELECT
    num_identite AS id,
    civilite_identite AS honorifics,
    nom_identite AS name,
    prenom_identite AS firstname,
    adresse_identite AS adress,
    adresse_cplt_identite AS adress2,
    code_postal_identite AS postalCode,
    ville_identite AS city,
    telephone_identite AS phone,
    portable_identite AS mobile,
    divers_identite AS misc,
    verifie_le AS verifiedDate FROM bienfaiteurs WHERE num_identite = ?`;
  const getBenefactorQuery = mySQL.format(nestedBenefactorQuery, inserts);

  const nestedGiftsQuery = `SELECT
    num_versement AS id,
    date_versement AS date,
    mode_versement AS mode,
    numero_versement AS number,
    nom_banque AS bank,
    montant_versement AS amount FROM versements
    LEFT JOIN banques on banques.num_banque = versements.banque_versement
    WHERE \`#num_identite\` = ?`;
  const getGiftsQuery = mySQL.format(nestedGiftsQuery, inserts);

  db.query(getBenefactorQuery, (err, detailsData) => {
    if (err) {
      callback(err, detailsData);
      return;
    }
    db.query(getGiftsQuery, (err, giftsData) => {
      // First call made on the PRIMARY KEY num_identite - we ONLY have one result
      detailsData[0].gifts = giftsData;
      callback(err, detailsData);
    });
  });
};

export = {
  getAllBenefactors: getAllBenefactors,
  getBenefactorDetails: getBenefactorDetails
};