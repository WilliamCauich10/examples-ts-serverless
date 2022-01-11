/**
 * @description Clase que se encarga de consultar la informacion del secret de aws
 * @author Rafael Cetina
 * @creationDate 13 de Diciembre del 2021
 */

import AWS from 'aws-sdk'
import winston from 'winston'
/**
 * Manejador de AWS Secrets
 */
export class SecretManager {
  private _client: AWS.SecretsManager
  private _region: string = ''
  private _secretName: string = ''
  private _secret: string = ''
  private _decodedBinarySecret: string = ''

  /**
   * Constructor de la clase
   */
  constructor() {
    this._client = new AWS.SecretsManager({ region: this._region })
  }

  /**
   * Obtiene el valor del secret
   * @return {string} Objeto desealizado
   */
  getSecretValue = (): Promise<{ [key: string]: any } | undefined> =>
    new Promise<{ [key: string]: any } | undefined>((resolve, reject) => {
      this._client.getSecretValue({ SecretId: this._secretName }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          if ('SecretString' in data) {
            this._secret = data.SecretString ?? ''
          } else {
            const buff = Buffer.from(data.SecretBinary?.toString() ?? '', 'base64')
            this._decodedBinarySecret = buff.toString('ascii')
          }
          resolve(JSON.parse(this._secret))
        }
      })
    })
      .then()
      .catch((err) => {
        if (err) {
          winston.error(err)
          return undefined
        }
      })
}
