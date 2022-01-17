/**
 * @description Clase que se encarga de configurar la conexion a una db MySql con Knex
 * @author William Cauich
 * @creationDate 13 de enero del 2022
 */
 import { Knex, knex } from 'knex'

 import { DbParameter } from '../model/dbParameter'
 import { DbConfigManager } from './dbConfigManager'
 import { enumConfigSource, enumDB, enumDBEngine } from './enums'
 
 /**
  * Manejador de Knex
  */
 export class KnexManager {
   private _conn!: Knex.Config
   private _dbName!: enumDB
   private _configurationMode: enumConfigSource
 
   /**
    * Constructor de la clase
    * @param  {enumDB} dbName
    * @param  {enumConfigSource} configMode
    */
   constructor(dbName: enumDB, configMode: enumConfigSource) {
     this._configurationMode = configMode
     this._dbName = dbName
   }
 
   /**
    * Crea la configuracion para el conector de bd
    * @return {Knex.Config} Configuracion de mysql
    */
   private setConnection() {
     const dbConfigManager = new DbConfigManager(this._dbName, this._configurationMode, enumDBEngine.mysql)
 
     const connection = dbConfigManager.buildConfiguration()
     const config = {
       client: 'mysql',
       connection: connection
     }
     const instance: Knex = knex(config as Knex.Config)
     return instance
   }
 
   /**
    * Ejecuta una sentecia SQL
    * @return {Promise<object[]>} Resultado de la ejecucion
    */
   public getConnection = () => {
     return this.setConnection()
   }
 }