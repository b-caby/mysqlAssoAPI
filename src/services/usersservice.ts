import * as mySQL from "mysql";
import db         from "../mysqlconfig";

class UsersService {

  public static getAllUsers = (callback: any) => {
    const getAllUsersQuery = `SELECT
      id_musiciens AS id,
      civilite AS honorifics,
      Nom AS name,
      prenom AS firstname,
      Adresse AS adress,
      CP AS postalCode,
      Ville AS city,
      \`E-mail\` AS email,
      Fixe AS phone,
      Portable AS mobile,
      Instrument AS instrument FROM musiciens`;

    db.query(getAllUsersQuery, (err, data) => {
      callback(err, data);
    });
  };

  public static getUserDetails = (userId: number, callback: any) => {
    const inserts = [userId];
    const nestedUserQuery = `SELECT
      id_musiciens AS id,
      civilite AS honorifics,
      Nom AS name,
      prenom AS firstname,
      date_naissance AS birthdate,
      Adresse AS adress,
      CP AS postalCode,
      Ville AS city,
      \`E-mail\` AS email,
      Fixe AS phone,
      Portable AS mobile,
      Instrument AS instrument,
      Type AS type,
      Marque AS brand,
      num_serie AS serialNumber,
      date_entree AS joinedOn,
      musicien_login AS login,
      musicien_mdp AS password FROM musiciens WHERE id_musiciens = ?`;
    const getUserQuery = mySQL.format(nestedUserQuery, inserts);

    db.query(getUserQuery, (err, data) => {
      callback(err, data);
    });
  };
}

export default UsersService;