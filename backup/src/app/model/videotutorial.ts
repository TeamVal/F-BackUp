import { Asesor } from "./asesor"
import { Lenguaje } from "./lenguaje"

export class VideoTutorial{
    idVideoTutorial:number=0
    titulo:string=""
    fechaSubida:Date=new Date(Date.now())
    url:string=""
    asesor:Asesor=new Asesor();
    lenguaje:Lenguaje=new Lenguaje();
}