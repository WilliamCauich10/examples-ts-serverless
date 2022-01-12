/**
 * @description Lamda que calcula el tiempo faltante para salir de trabajar
 * @author William Cauich
 * @creationDate 11 de enero del 2022
 */
interface DatosHoraSalida{
    FechaHoy: Date;
    HoraEntrada: number;
    HoraSalida: number;
    HoraFinal?: number;
    MinutoFinal?: number;
}

export class TiempoSalida {
    private Fecha:any;
    constructor() {
        this.Fecha = this.Asignacion();
    }

    private Asignacion():DatosHoraSalida{
        let Fecha = new Date();
        let Datos: DatosHoraSalida ={
            FechaHoy:Fecha,
            HoraEntrada: (Fecha.getHours() * 60) + Fecha.getMinutes(),
            HoraSalida: (16 * 60) + 30
        }
        return Datos;
    }

    private Comparar():DatosHoraSalida{
        let diferencia = this.Fecha.HoraSalida - this.Fecha.HoraEntrada;
        this.Fecha.HoraFinal = Math.floor(diferencia / 60);
        this.Fecha.MinutoFinal = diferencia % 60;
        return this.Fecha;
    }
    
    public getResultado():void{
        this.Comparar();
        console.log(`Faltan ${this.Fecha.HoraFinal} : ${this.Fecha.MinutoFinal}
        PD: Beto ctm y gerardo se la come`);
    }
}