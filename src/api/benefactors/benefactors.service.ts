import * as mySQL          from "mysql2/promise";
import pool                from "../../shared/mysqlconfig";
import { NotFoundError }   from "../../shared/errors";
import { UnexpectedError } from "../../shared/errors";
import logger              from "../../shared/logger";


class BenefactorsService {

  public getAllBenefactors = async () => {
    const getAllBenefactorsQuery = `SELECT
      num_identite AS id,
      civilite_identite AS honorifics,
      nom_identite AS name,
      prenom_identite AS firstname,
      telephone_identite AS phone,
      portable_identite AS mobile,
      mail_identite AS email FROM bienfaiteurs`;

    // This query should always return results
    const [rows] = await pool.query<mySQL.RowDataPacket[]>(getAllBenefactorsQuery);
    if (!rows.length) throw new NotFoundError;
    logger.debug(`getAllBenefactors - ${rows.length} rows returned`);

    return rows;
  };

  public getBenefactorDetails = async (benefactorId: number) => {
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

    // This query should always return a unique result
    const [detailsRows] = await pool.query<mySQL.RowDataPacket[]>(getBenefactorQuery, [benefactorId]);
    if (!detailsRows.length) throw new NotFoundError;
    if (detailsRows.length != 1 ) throw new UnexpectedError;

    const [giftRows] = await pool.query<mySQL.RowDataPacket[]>(getGiftsQuery, [benefactorId]);
    logger.debug(`getBenefactorDetails - ${giftRows.length} gifts for benefactor ${benefactorId}`);
    if (giftRows.length) detailsRows[0].gifts = giftRows;

    return detailsRows[0];
  };
}

export default new BenefactorsService;