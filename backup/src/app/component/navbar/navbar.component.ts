import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  idestudiante:any;
  idasesor:any;
  role:string="";
  constructor(public route: ActivatedRoute,private loginService: LoginService){

  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idestudiante = params['idestudiante'];
    });
    this.route.params.subscribe((params: Params) => {
      this.idasesor = params['idasesor'];
    });
  }

  verificar() {
    this.role=this.loginService.showRole();
    return this.loginService.verificar();
  }
  validarRol(){
    if(this.role=='ESTUDIANTE' || this.role=='ASESOR'|| this.role=='ADMINISTRADOR'){
      return true;
    }else{
      return false;
    }
  }

  cerrar() {
    sessionStorage.clear();
  }


}
