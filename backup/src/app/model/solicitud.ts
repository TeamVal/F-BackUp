import { Estudiante } from "./estudiante";
export class Solicitud{
    idsolicitud: number=0
    nombre: string=""
    descrip: string=""
    fechasol:Date=new Date( )
    estudiante:Estudiante=new Estudiante();
}