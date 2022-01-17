/**
 * @description Clase que prepara la cadena de conexion y configuraciones para ejecutrar Queries | Usando ORM.
 * @author William Cauich
 * @creationDate 13 de enero del 2022
 */
import winston from 'winston'
import { enumDB, enumDBEngine, enumConfigSource } from './enums'
import { KnexManager } from './knexManager'
import { DbParameter } from '../model/dbParameter'

/**
 *Manejador de conexiones
 */
export class OrmManager {
  private _dbName!: enumDB
  private _dbEngine!: enumDBEngine
  private _dbConnManager!: KnexManager
  private _configurationMode!: enumConfigSource

  /**
   * Constructor
   */
  constructor() {
    this._configurationMode = Number(process.env.CONFIG_MODE ?? '1')
  }

  /**
   * Asigna la configuracion y motor de BD
   * @param {enumDB} db Nombre de la BD
   * @param {enumDBEngine} dbEngine Motor de Base de datos
   */
  public setConfiguration(db: enumDB, dbEngine: enumDBEngine): void {
    this._dbName = db
    this._dbEngine = dbEngine
    switch (this._dbEngine) {
      case enumDBEngine.mysql:
        // this._dbConnManager = new MysqlManager(db, this._configurationMode)
        this._dbConnManager = new KnexManager(db, this._configurationMode)
        break
    }
  }
  /**
   * Obtiene la instancia del ORM
   * @return {getInstance}
   */
  public getInstance() {
    return this._dbConnManager.getConnection()
  }
}