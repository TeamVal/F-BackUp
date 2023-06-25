import { Recurso } from "./Recurso"
import { MicroCurso } from "./microcurso"
export class Modulo{
    idmodulo:number=0
    titulo: string=""
    descripcion: string=""
    estado: string=""
    recurso: Recurso=new Recurso();
    microcurso:MicroCurso=new MicroCurso();
  }
  