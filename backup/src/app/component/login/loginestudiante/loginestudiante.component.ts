import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params,Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtRequest } from 'src/app/model/jwtRequest';
import { EstudianteService } from 'src/app/service/estudiante.service';

@Component({
  selector: 'app-loginestudiante',
  templateUrl: './loginestudiante.component.html',
  styleUrls: ['./loginestudiante.component.css']
})
export class LoginestudianteComponent implements OnInit{
  idestudiante:number=0;

  form:FormGroup=new FormGroup({});

  username: string = ""
  password: string = ""
  mensaje: string = ""

  
  constructor(private snackBar: MatSnackBar,private router:Router,private loginService: LoginService,private route:ActivatedRoute, private student:EstudianteService){}
  ngOnInit(): void {
      this.form=new FormGroup({
        idestudiante:new FormControl(),
        username:new FormControl(),
        password:new FormControl(),
      })
  }
  aceptar():void{


    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;
    this.loginService.login(request).subscribe((data: any) => {
      sessionStorage.setItem("token", data.jwttoken);


      this.username=this.form.value['username']; 


      this.student.listbyuser(this.username).subscribe((data) => {
        this.idestudiante=data.idEstudiante;


        console.log('ID del estudiante:', this.idestudiante);

        this.router.navigate(['/pages/homeestudiante', this.idestudiante])

      });





    }, error => {
      this.mensaje = "Credenciales incorrectas!!!"
      this.snackBar.open(this.mensaje, "Aviso",{duration:2000});
    });


    
  }

  cerrar() {
    sessionStorage.clear();
  }
}
