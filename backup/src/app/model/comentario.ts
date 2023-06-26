import { Estudiante } from "./estudiante"
import { Foro } from "./foro"

export class Comentario{
    idcomentario:number=0
    fechapublic:Date=new Date(Date.now())
    texto:string=""
    estudiante:Estudiante=new Estudiante();
    foro:Foro=new Foro();

}