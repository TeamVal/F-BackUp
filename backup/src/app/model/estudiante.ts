import { Users } from "./users"

export class Estudiante{
  idEstudiante:number=0
  nombre:string=""
  apellido:string=""
  telefono:number=0
  correo:string=""
  users: Users=new Users();
}

