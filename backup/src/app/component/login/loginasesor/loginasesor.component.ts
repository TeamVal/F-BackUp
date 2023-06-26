import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtRequest } from 'src/app/model/jwtRequest';
import { LoginService } from 'src/app/service/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsesorService } from 'src/app/service/asesor.service';

@Component({
  selector: 'app-loginasesor',
  templateUrl: './loginasesor.component.html',
  styleUrls: ['./loginasesor.component.css']
})
export class LoginasesorComponent implements OnInit{
  idasesor:number=0;

  form:FormGroup=new FormGroup({});

  username: string = ""
  password: string = ""
  mensaje: string = ""

  constructor(private asesor: AsesorService,private snackBar: MatSnackBar,private loginService: LoginService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
      this.form=new FormGroup({
        idasesor:new FormControl(),
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

      this.asesor.listbyuser(this.username).subscribe((data) => {
        this.idasesor=data.idAsesor;


        console.log('ID del asesor:', this.idasesor);

        this.router.navigate(['/pages/homeasesor', this.idasesor])

      });


    }, error => {
      this.mensaje = "Credenciales incorrectas!!!"
      this.snackBar.open(this.mensaje, "Aviso",{duration:2000});
    });
  }
}
