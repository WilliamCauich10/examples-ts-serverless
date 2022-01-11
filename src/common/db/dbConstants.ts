/**
 * @description Namespace que se encarga de almacenar las sentencias SQL en constantes
 * @author Rafael Cetina
 * @creationDate 13 de Diciembre del 2021
 */
export namespace DbConstants {
  // Constantes para seleccionar usuarios
  export const CONST_DB_ALL_USUARIOS: string = 'SELECT * FROM usuarios'
  export const CONST_DB_USUARIO_BY_ID: string = 'SELECT * FROM usuarios WHERE id = @id'
  // imchargebacks_qa DB
  export const CONST_DB_ALL_CHBTYPES: string = 'SELECT * FROM ChargebackTypes'
  export const CONST_DB_CHBTYPE_BY_ID: string = 'SELECT * FROM ChargebackTypes WHERE chtID = @chtID'
}
