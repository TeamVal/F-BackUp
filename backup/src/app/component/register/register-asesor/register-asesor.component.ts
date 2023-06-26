import { Component,OnInit } from '@angular/core';
import { Asesor } from 'src/app/model/asesor';
import { FormControl, FormGroup } from '@angular/forms';
import { Users } from 'src/app/model/users';
import { AsesorService } from 'src/app/service/asesor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Roles } from 'src/app/model/roles';

@Component({
  selector: 'app-register-asesor',
  templateUrl: './register-asesor.component.html',
  styleUrls: ['./register-asesor.component.css']
})
export class RegisterAsesorComponent implements OnInit{
  id: number = 0;
  form: FormGroup = new FormGroup({});
  asesor: Asesor = new Asesor();
  users: Users=new Users();
  mensaje: string = "";

  selectedFile: any;
  namearch: string = '';


  constructor(
    private pS: AsesorService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}
  ngOnInit(): void {


    this.form = new FormGroup({
      idAsesor: new FormControl(),
      ape: new FormControl(),
      nom: new FormControl(),
      tel: new FormControl(),
      correo: new FormControl(),
      arch: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
    });
  }
  aceptar(): void {
    this.asesor.idAsesor = this.form.value["idAsesor"];
    this.asesor.ape = this.form.value["ape"];
    this.asesor.nom = this.form.value["nom"];
    this.asesor.tel = this.form.value["tel"];
    this.asesor.correo = this.form.value["correo"];
    this.asesor.arch = this.form.value["arch"];

  if (this.form.value["nom"].length > 0) {
    this.users.id = 0;
    this.users.enabled = true;
    this.users.username = this.form.value["username"];
    this.users.password = this.form.value["password"];

    let e = new Roles();
    e.id = 2;
    e.rol = "ASESOR";

    this.users.role = e;

    console.log( this.users.role.rol); 

    this.pS.listbyuser(this.users.username).subscribe(
      (data) => {
        if (data.idAsesor>0) {
          this.mensaje = 'Ya existe un asesor con ese username';
        } else {
          this.userService.insert(this.users).subscribe(
            (data) => {
              this.userService.last().subscribe(
                (data) => {
      
      
                  let e = new Users();
                  e.id = data.id;
                  console.log(e.id);
                  this.asesor.users = e;
          
                  this.pS.insertnuevo(this.asesor).subscribe(
                    () => {
                      this.router.navigate(['/loginasesor']);
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

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.asesor.arch = event.target.files[0].name;
    this.namearch = event.target.files[0].name;

  }


  
}
