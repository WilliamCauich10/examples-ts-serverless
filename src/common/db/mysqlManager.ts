/**
 * @description Clase que se encarga de configurar la conexion a una db MySql
 * @author Rafael Cetina
 * @creationDate 13 de Diciembre del 2021
 */
import * as mysqlConn from 'mysql'
import { DbParameter } from '../model/dbParameter'
import { DbConfigManager } from './dbConfigManager'
import { enumDB, enumDBEngine, enumConfigSource } from './enums'

/**
 * Manejador de MySQL
 */
export class MysqlManager {
  private _conn!: mysqlConn.Connection
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
   * @return {mysqlConn.Connection} Configuracion de mysql
   */
  private setConnection(): mysqlConn.Connection {
    const dbConfigManager = new DbConfigManager(this._dbName, this._configurationMode, enumDBEngine.mysql)

    const config = dbConfigManager.buildConfiguration()
    return mysqlConn.createConnection(config ?? {})
  }

  /**
   * Ejecuta una sentecia SQL
   * @param  {string} query
   * @param  {DbParameter[]} params
   * @return {Promise<object[]>} Resultado de la ejecucion
   */
  public executeQuery = (query: string, params: DbParameter[]): Promise<object[]> =>
    new Promise<object[]>((resolve, reject) => {
      const result: object[] = []
      const dbparams: { [key: string]: any } = {}
      // Se inicializa la conexion
      this._conn = this.setConnection()

      this._conn.config.queryFormat = (query, values) => {
        if (!values) return query
        return query.replace(/\@(\w+)/g, (txt: string, key: any) => {
          if (values.hasOwnProperty(key)) {
            return mysqlConn.escape(values[key])
          }
          return txt
        })
      }

      // Iniciamos la conexion.
      this._conn.connect((err) => {
        if (err) {
          reject(err)
        }
      })

      if (params.length > 0) {
        params.forEach((param) => {
          dbparams[param.columnName] = param.value
        })
      }

      // Se genera el query
      this._conn.query(query, dbparams, (err, result) => {
        if (err) {
          reject(err)
        } else {
          if (result.length > 0) {
            resolve(result)
          }
        }
      })

      this._conn.end((err) => {
        if (err) {
          reject(err)
        }
      })
    })
}
