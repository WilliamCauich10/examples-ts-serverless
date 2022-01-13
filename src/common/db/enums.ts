/**
 * @description Archivo que almacena los enumerados que se utilizan en las lambdas
 * @author William Cauich
 * @creationDate 13 de Enero del 2022
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
  rds = 'RDScurso',
  rdsLocal = 'testdb',
  agenciadirecta = 'agencydirect',
  chb = 'CHB'
}