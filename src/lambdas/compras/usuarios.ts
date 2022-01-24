/**
 * @description Lambda del proceso usuarios
 * @author William Cauich
 * @creationDate 17 de enero del 2022
 */
 import winston from 'winston'
 import { CommonResponse } from '../../common/model/commonResponse'
 import { ResponseManager } from '../../common/helpers/responseManager'
 import { errorConstants } from '../../common/helpers/errorConstants'
 import { UsuarioManager } from './usuariosBD'


  /**
  * Funcion para obtener catalo de Usuarioas
  * @param {any} event Parametro enviado por API Gateway
  * @param {any} context Parametro enviado por API Gateway
  * @return {Promise<CommonResponse>} result Objeto serializado en JSON
  */
   export async function getData(event: any, context: any): Promise<CommonResponse> {
    // Variables
    const usuarioManager = new UsuarioManager()
    const responseManager = new ResponseManager()
  
    try {
      // En el parametro event se encuentran los valores del Path y Query Params
      // Se realiza la consulta
      const result = await usuarioManager.getUsuarios()
      if (typeof result === 'undefined') {
        return responseManager.handleError(errorConstants.UNEXPECTED_ERROR)
      }
      // Se genera el response
      return responseManager.handleResponse(result)
    } catch (err) {
      console.log(err)
      // Se registra el error presentado
      winston.error(err)
      // Se entrega el error al lambda
      return responseManager.handleError(errorConstants.UNEXPECTED_ERROR)
    }
  }
  
  /**
   * Funcion para obtener catalo de Programas
   * @param {any} event Parametro enviado por API Gateway
   * @param {any} context Parametro enviado por API Gateway
   * @return {Promise<CommonResponse>} result Objeto serializado en JSON
   */
  export async function getDataById(event: any, context: any): Promise<CommonResponse> {
    // Variables
    const usuarioManager = new UsuarioManager()
    const responseManager = new ResponseManager()
  
    try {
      // En el parametro event se encuentran los valores del Path y Query Params
      // Se realiza la consulta
      const result = await usuarioManager.getUsuarios(event.pathParameters.id)
      // Se genera el response
      return responseManager.handleResponse(result)
    } catch (err) {
      // Se registra el error presentado
      winston.error(err)
      // Se entrega el error al lambda
      return responseManager.handleError(errorConstants.UNEXPECTED_ERROR)
    }
  }
/**
  * Funcion para crear Usuarios
  * @param {any} event Parametro enviado por API Gateway
  * @param {any} context Parametro enviado por API Gateway
  * @return {Promise<CommonResponse>} result Objeto serializado en JSON
  */
 export async function postUser(event: any): Promise<CommonResponse> {
    // Variables
    const usuarioManager = new UsuarioManager()
    const responseManager = new ResponseManager()
  
    try {
      const body = JSON.parse(event.body)
      const result = await usuarioManager.postUsuario(body)
     if (typeof result === 'undefined') {
       return responseManager.handleError(errorConstants.UNEXPECTED_ERROR)
     }
     // Se genera el response
     return responseManager.handleResponse(result)
    } catch (err) {
      console.log(err)
      // Se registra el error presentado
      winston.error(err)
      // Se entrega el error al lambda
      return responseManager.handleError(errorConstants.UNEXPECTED_ERROR)
    }
}