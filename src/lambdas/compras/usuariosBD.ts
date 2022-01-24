/**
 * @description Logica de negocio del proceso usuarios
 * @author William Cauich
 * @creationDate 24 de enero del 2022
 */
 import { OrmManager } from '../../common/db/ormManager'
 import { enumDB, enumDBEngine } from '../../common/db/enums'
 /**
 * Logica de negocios program
 */
export class UsuarioManager {
    private dbManager: OrmManager
    /**
     * Contructor
    */
    constructor() {
        // Se inicializa el manejador de BD
        this.dbManager = new OrmManager()
        // Se asigna la configuracion y motor de BD
        this.dbManager.setConfiguration(enumDB.agenciadirecta, enumDBEngine.mysql)
    }

    /**
     *
     * @param {string?} userId
     * @return {"collection"}
     */
    getUsuarios(userId?: string) {
        // const params: DbParameter[] = []
        // const params = { id: userId }
        const instance = this.dbManager.getInstance()
        try {
            // query
            const query = instance('User').select('UserName', 'UserLastName' ,'UserPhone' ,'UserEmail' ,'UserPassword ')
            if (userId) query.where({ id: userId }).select()
            return query
        } catch (err) {
            console.log(err)
        }
    }
    
    /**
     *
     * @param {object?} data
     * @return {"collection"}
     */
     postUsuario(data: any) {
        const instance = this.dbManager.getInstance()
        try {
          return instance('User').insert(data)
        } catch (err) {
          console.log(err)
        }
      }
    
    /**
     *
     * @param {string} userId
     * @param {"any"} body
     * @return {"collection"}
     */
    updateUsuario(userId: string, body: any) {
        const instance = this.dbManager.getInstance()
        try {
            return instance('User').where('UserId', userId).update(body)
        } catch (err) {
            console.log(err)
        }
    }

    /**
     *
     * @param {string} userId
     * @return {"collection"}
     */
    deleteUsuario(userId: string) {
        const instance = this.dbManager.getInstance()
        try {
            return instance('User').where('UserId', userId).delete()
        } catch (err) {
            console.log(err)
        }
    }
}