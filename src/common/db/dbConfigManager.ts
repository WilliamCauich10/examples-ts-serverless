/**
 * @description Clase que se encarga de preparar la cadena de conexion con los datos de las variables de entorno o en su defecto de secret
 * @author Rafael Cetina
 * @creationDate 13 de Diciembre del 2021
 */
import { enumDB, enumDBEngine, enumConfigSource } from './enums'
import { EnviromentManager } from '../helpers/enviromentManager'
import { SecretManager } from '../aws/secretsManager'
import winston from 'winston'

/**
 * Manejador de Configuracion de BD
 */
export class DbConfigManager {
  private envManager: EnviromentManager
  private scrtManager: SecretManager
  private config: { [key: string]: any }

  /**
   * Constructor de la clase
   * @param {enumDB} _dbName Nombre de la BD
   * @param {enumConfigSource}  _mode Modo de conexion
   * @param {enumDBEngine}  _conn Motor de la BD
   */
  constructor(private _dbName: enumDB, private _mode: enumConfigSource, private _conn: enumDBEngine) {
    this._dbName = _dbName
    this._mode = _mode
    this._conn = _conn
    this.envManager = new EnviromentManager()
    this.scrtManager = new SecretManager()
    this.config =
      _mode == enumConfigSource.env
        ? this.envManager.getDbConfigFromEnv() ?? {}
        : this.scrtManager.getSecretValue() ?? {}
  }

  /**
   * Obtiene el nombre de la db
   */
  private get dbName(): string {
    if (this._mode == 1) {
      return this.config.dbConfig[this._dbName].DB_NAME
    } else {
      return ''
    }
  }

  /**
   * Obtiene el nombre del servidor
   */
  private get dbServer(): string {
    if (this._mode == 1) {
      return this.config.dbConfig[this._dbName].DB_SERVER
    } else {
      return ''
    }
  }

  /**
   * Obtiene el nombre de la instancia
   */
  private get dbInstance(): string {
    if (this._mode == 1) {
      return this.config.dbConfig[this._dbName].DB_INSTANCE
    } else {
      return ''
    }
  }

  /**
   * Obtiene el usuario de db
   */
  private get dbUser(): string {
    if (this._mode == 1) {
      return this.config.dbConfig[this._dbName].DB_USER
    } else {
      return ''
    }
  }

  /**
   * Obtiene el pass de la bd
   */
  private get dbPass(): string {
    if (this._mode == 1) {
      return this.config.dbConfig[this._dbName].DB_PASS
    } else {
      return ''
    }
  }

  /**
   * Obtiene el puerto de la bd
   */
  private get dbPort(): string {
    if (this._mode == 1) {
      return this.config.dbConfig[this._dbName].DB_PORT
    } else {
      return ''
    }
  }

  /**
   * Obtiene la colacion de la bd
   */
  private get dbCharset(): string {
    if (this._mode == 1) {
      return this.config.dbConfig[this._dbName].DB_CHARSET
    } else {
      return ''
    }
  }

  /**
   * Genera la configuracion para conexiones a MSSQL
   * @return {object} Configuraciones de servidor
   */
  private prepareConfig(): { [key: string]: any } {
    switch (this._conn) {
      case enumDBEngine.mssql:
        return {
          server: this.dbServer,
          authentication: {
            type: 'default',
            options: {
              userName: this.dbUser,
              password: this.dbPass
            }
          },
          options: {
            instanceName: this.dbInstance,
            database: this.dbName,
            encrypt: false,
            rowCollectionOnDone: true,
            useColumnNames: true
          }
        }
      case enumDBEngine.mysql:
        return {
          host: this.dbServer,
          user: this.dbUser,
          password: this.dbPass,
          database: this.dbName,
          port: this.dbPort,
          charset: this.dbCharset
        }
      default:
        return {}
    }
  }

  /**
   * Genera la configuracion de las BD's
   * @return {object} Configuraciones de BD's
   */
  buildConfiguration(): { [key: string]: any } | undefined {
    try {
      return this.prepareConfig()
    } catch (err) {
      console.log(err)
      // winston.error(err)
      return undefined
    }
  }
}
