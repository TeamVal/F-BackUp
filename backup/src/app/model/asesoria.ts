import { Asesor } from "./asesor"
import { Solicitud } from "./solicitud"

export class Asesoria{
    idasesoria:number=0
    tiempo:number=0
    fechaacep:Date=new Date(Date.now())
    precio:number=0
    asesor:Asesor=new Asesor();
    solicitud:Solicitud=new Solicitud();
}