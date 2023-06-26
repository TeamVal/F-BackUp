import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { JwtRequest } from 'src/app/model/jwtRequest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-loginadmin',
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit{

  form:FormGroup=new FormGroup({});

  username: string = ""
  password: string = ""
  mensaje: string = ""

  constructor(private snackBar: MatSnackBar,private router:Router,private loginService: LoginService,private route:ActivatedRoute){}
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
      this.router.navigate(['/pages/homeadmin'])
    }, error => {
      this.mensaje = "Credenciales incorrectas!!!"
      this.snackBar.open(this.mensaje, "Aviso",{duration:2000});
    });


    
  }

  cerrar() {
    sessionStorage.clear();
  }
}
