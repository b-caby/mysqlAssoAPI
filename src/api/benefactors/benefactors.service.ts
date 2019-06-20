import * as mySQL from "mysql2/promise";
import pool       from "../../shared/mysqlconfig";


class BenefactorsService {

  public getAllBenefactors = async () => {
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

    const [rows, fields] = await pool.query<mySQL.RowDataPacket[]>(getAllBenefactorsQuery);
    return rows;
  };

  public getBenefactorDetails = async (benefactorId: number) => {
    const inserts = [benefactorId];
    const getBenefactorQuery = `SELECT
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

    const getGiftsQuery = `SELECT
      num_versement AS id,
      date_versement AS date,
      mode_versement AS mode,
      numero_versement AS number,
      nom_banque AS bank,
      montant_versement AS amount FROM versements
      LEFT JOIN banques on banques.num_banque = versements.banque_versement
      WHERE \`#num_identite\` = ?`;

    const [detailsRows, detailsFields] = await pool.query<mySQL.RowDataPacket[]>(getBenefactorQuery, inserts);
    const [giftRows, giftFields] = await pool.query<mySQL.RowDataPacket[]>(getGiftsQuery, inserts);
    if (giftRows.length) detailsRows[0].gifts = giftRows;

    return detailsRows;
  };
}

export default BenefactorsService;