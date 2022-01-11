/**
 * @description Configura el logger Winston para el comportamiento en las lambdas
 * @author Rafael Cetina
 * @creationDate 13 de Diciembre del 2021
 */
import winston from 'winston'

export const logger = winston.createLogger({
  level: process.env.LOGGIN_LEVEL,
  format: winston.format.colorize(),
  defaultMeta: { service: 'user-service' },
  transports: [new winston.transports.Console({ stderrLevels: ['error'] })]
})
