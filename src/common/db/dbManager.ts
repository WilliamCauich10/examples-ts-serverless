/**
 * @description Clase que prepara la cadena de conexion y configuraciones para ejecutrar Queries.
 * @author Rafael Cetina
 * @creationDate 13 de Diciembre del 2021
 */
import winston from 'winston'
import { enumDB, enumDBEngine, enumConfigSource } from './enums'
import { MssqlManager } from './mssqlManager'
import { MysqlManager } from './mysqlManager'
import { DbParameter } from '../model/dbParameter'

/**
 *Manejador de conexiones
 */
export class DbManager {
  private _dbName!: enumDB
  private _dbEngine!: enumDBEngine
  private _dbConnManager!: MssqlManager | MysqlManager
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
      case enumDBEngine.mssql:
        this._dbConnManager = new MssqlManager(db, this._configurationMode)
        break
      case enumDBEngine.mysql:
        this._dbConnManager = new MysqlManager(db, this._configurationMode)
        break
    }
  }

  /**
   * Ejecuta un comando de BD
   * @param {string} query Sentencia SQL
   * @param {object} [params] Parametros de sentencia
   * @return {Promise<object[] | undefined>} Resultado de la BD
   */
  async executeStatement(query: string, params: DbParameter[] = []): Promise<object[] | undefined> {
    if (!this._dbName) {
      winston.error('No DB set')
      return undefined
    }

    let result: object[] | undefined = []

    await this._dbConnManager
      .executeQuery(query, params)
      .then((value) => {
        if (value) {
          result = value
        }
      })
      .catch((err: string) => {
        if (err) {
          winston.error(err)
          result = undefined
        }
      })

    return result
  }
}
