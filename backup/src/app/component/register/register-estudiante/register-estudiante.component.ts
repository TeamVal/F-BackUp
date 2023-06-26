import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Estudiante } from 'src/app/model/estudiante';
import { Roles } from 'src/app/model/roles';
import { Users } from 'src/app/model/users';
import { EstudianteService } from 'src/app/service/estudiante.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register-estudiante',
  templateUrl: './register-estudiante.component.html',
  styleUrls: ['./register-estudiante.component.css']
})
export class RegisterEstudianteComponent implements OnInit{
  id: number = 0;
  edicion: boolean = false;
  form: FormGroup = new FormGroup({});
  estudiante: Estudiante = new Estudiante();
  users: Users=new Users();
  mensaje: string = "";

  aaaaaaa: String="";

  constructor(
    private pS: EstudianteService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}
  ngOnInit(): void {


    this.form = new FormGroup({
      idEstudiante: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      telefono: new FormControl(),
      correo: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
    });
  }
  aceptar(): void {
    this.estudiante.idEstudiante = this.form.value["idEstudiante"];
  this.estudiante.nombre = this.form.value["nombre"];
  this.estudiante.apellido = this.form.value["apellido"];
  this.estudiante.telefono = this.form.value["telefono"];
  this.estudiante.correo = this.form.value["correo"];

  if (this.form.value["nombre"].length > 0) {
    this.users.id = 0;
    this.users.enabled = true;
    this.users.username = this.form.value["username"];
    this.users.password = this.form.value["password"];

    let e = new Roles();
    e.id = 1;
    e.rol = "ESTUDIANTE";

    this.users.role = e;

    this.aaaaaaa=  this.users.role.id.toString();

    console.log(this.aaaaaaa); 
    console.log( this.users.role.rol); 
  

    this.pS.listbyuser(this.users.username).subscribe(
      (data) => {
        if (data.idEstudiante>0) {
          this.mensaje = 'Ya existe un estudiante con ese username';
        } else {
          console.log( data.idEstudiante); 

          this.userService.insert(this.users).subscribe(
            (data) => {
              this.userService.last().subscribe(
                (data) => {
      
      
                  let e = new Users();
                  e.id = data.id;
                  console.log(e.id);
                  this.estudiante.users = e;
          
                  this.pS.insertnuevo(this.estudiante).subscribe(
                    () => {
                      this.router.navigate(['/loginestudiante']);
                    }
                  );
      
      
                },
              );
            },
          );
        }
      }
    );



    







    
  } else {
    this.mensaje = "Ingrese el nombre del estudiante!!!";
  }
  }
}
