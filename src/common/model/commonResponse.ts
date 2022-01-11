/**
 * @description Entidad CommonResponse
 * @author Rafael Cetina
 * @creationDate 13 de Diciembre del 2021
 */
import { Header } from './headers'

export type CommonResponse = {
  statusCode: number
  body: string
  headers: Header
}
