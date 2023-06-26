import { Asesor } from "./asesor"
import { Lenguaje } from "./lenguaje"

export class MicroCurso{
    idMicroCurso:number=0
    titulo:string=""
    descrip:string=""
    tema:string=""
    asesor:Asesor=new Asesor();
    lenguaje:Lenguaje=new Lenguaje();
}