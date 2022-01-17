import  moment  from "moment-timezone";
moment.locale('es');
moment().tz("America/Los_Angeles").format();
/**
 * @description Lamda que calcula el tiempo faltante para salir de trabajar
 * @author William Cauich
 * @creationDate 11 de enero del 2022
 */
interface DatosHoraSalida{
    FechaHoy: Date;
    FechaEntrada: any;
    FechaSalida: any;
    FechaFinal?: any;
}

export class TiempoSalida {
    // private tiempoSec = moment(); //new Date().getTime();
    private tiempoTZ = moment("01-13-2022", "MM-DD-YYYY");
    private Fecha:any;

    constructor() {
         this.Fecha = this.Asignacion();
    }

    private Asignacion():DatosHoraSalida{
        let Fecha = new Date();
        let Datos: DatosHoraSalida ={
            FechaHoy:Fecha,
            FechaEntrada:  moment("01-13-2022", "MM-DD-YYYY"),
            FechaSalida: moment( this.tiempoTZ.format('YYYY')+'-'+this.tiempoTZ.format('M')+'-'+this.tiempoTZ.format('D') + '  16:30')
        }
        return Datos;
    }

    private Comparar():DatosHoraSalida{
        this.Fecha.FechaFinal =this.Fecha.FechaEntrada.diff(this.tiempoTZ,'hours')+'h '+ moment( this.Fecha.FechaSalida.diff(this.tiempoTZ)).format("m[m] s[s]");
        return this.Fecha;
    }
    
    public getResultado():String{
        this.Comparar();
        let result = `Faltan ${this.Fecha.FechaFinal} PD: Beto ctm y gerardo se la come;`;
        
        return result;
    }
}