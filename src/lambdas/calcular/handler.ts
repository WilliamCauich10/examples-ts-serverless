/**
 * @description Lamda que calcula el tiempo faltante para salir de trabajar
 * @author William Cauich
 * @creationDate 11 de enero del 2022
 */
 import { CommonResponse } from '../../common/model/commonResponse'
 import { ResponseManager } from '../../common/helpers/responseManager'
 import { errorConstants } from '../../common/helpers/errorConstants'
 import { TiempoSalida } from './manager'
/**
 * @param {any} event Parametro enviado por API Gateway
 */
export async function getTiempo(event: any){
    const tiempoSalida = new TiempoSalida();
    const responseManager = new ResponseManager();
    try{
        const result = tiempoSalida.getResultado();
        return responseManager.handleResponse(result)
    }catch(err){
        // Se registra el error presentado
        // winston.error(err)
        // Se entrega el error al lambda
        return responseManager.handleError(errorConstants.UNEXPECTED_ERROR)
    }
}