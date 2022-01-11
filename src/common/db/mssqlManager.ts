/**
 * @description Clase que se encarga de configurar la conexion a una db MSSQL
 * @author Rafael Cetina
 * @creationDate 13 de Diciembre del 2021
 */
import { ColumnValue, Connection, Request, TYPES } from 'tedious'
import { DbConfigManager } from './dbConfigManager'
import { enumDB, enumDBEngine, enumConfigSource } from './enums'
import { DbParameter } from '../model/dbParameter'

/**
 * Manejador de MSSQL
 */
export class MssqlManager {
  private _conn!: Connection
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
   * @return {Connection} Configuracion de mssql
   */
  private setConnection(): Connection {
    const dbConfigManager = new DbConfigManager(this._dbName, this._configurationMode, enumDBEngine.mssql)

    const config = dbConfigManager.buildConfiguration()
    return new Connection(config ?? {})
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
      // Se inicializa la conexion
      this._conn = this.setConnection()
      // Se crea el comando a ajecutar en bd
      const req = new Request(query, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })

      if (params.length > 0) {
        params.forEach((param) => {
          req.addParameter(param.columnName, param.type ?? TYPES.VarChar, param.value)
        })
      }

      // Se extraen los valores del resultado
      req.on('row', (columns: ColumnValue[]) => {
        const item: { [name: string]: any } = {}
        for (const name in columns) {
          if (name) {
            item[name] = columns[name].value
          }
        }
        result.push(item)
      })
      // Se inicializa la conexion y ejecuta la consulta
      this._conn.on('connect', (err) => {
        if (err) {
          reject(err)
        } else {
          this._conn.execSql(req)
        }
      })
      // Se abre conexion
      this._conn.connect()
    })
}
