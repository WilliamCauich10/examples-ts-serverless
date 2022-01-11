/**
 * @description Interfaz que define el contrato para crear un parametro de base de datos (MSSQL y MySQL)
 * @author Rafael Cetina
 * @creationDate 13 de Diciembre del 2021
 */
import { TediousType } from 'tedious'

export interface DbParameter {
  columnName: string
  value: any
  type?: TediousType
}
