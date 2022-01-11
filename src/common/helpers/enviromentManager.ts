/**
 * @description Helper que permite obtener la configuracion de una db desde una Variable de entorno.
 * @author Rafael Cetina
 * @creationDate 13 de Diciembre del 2021
 */
import { Base64Manager } from './base64Manager'
import winston from 'winston'
/**
 * Manejador de variable de entorno
 */
export class EnviromentManager {
  private _bs: Base64Manager
  /**
   * Contructor
   */
  constructor() {
    this._bs = new Base64Manager()
  }
  /**
   *
   * @return {undefined}
   */
  getDbConfigFromEnv(): { [key: string]: any } | undefined {
    try {
      const res = this._bs.decode(process.env.DB_CONFIG ?? '')
      return JSON.parse(res)
    } catch (err) {
      console.log(err)
      // winston.error(err)
      return undefined
    }
  }
}
