/**
 * @description Archivo que almacena los enumerados que se utilizan en las lambdas
 * @author Rafael Cetina
 * @creationDate 13 de Diciembre del 2021
 */
export enum enumDBEngine {
  mssql = 1,
  mysql,
  dynamoDB
}

export enum enumConfigSource {
  env = 1,
  scrt
}

export enum enumDB {
  im = 'IM',
  rds = 'RDSCurso',
  chb = 'CHB'
}
