import { Estudiante } from "./estudiante"

export class Foro{
    idforo:number=0
    titulo:string=""
    fechacreacion:Date=new Date(Date.now())
    texto:string=""
    estudiante:Estudiante=new Estudiante();
}