import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Estudiante } from 'src/app/model/estudiante';
import { EstudianteService } from 'src/app/service/estudiante.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-estudiante-insertar',
  templateUrl: './estudiante-insertar.component.html',
  styleUrls: ['./estudiante-insertar.component.css']
})
export class EstudianteInsertarComponent {
  form:FormGroup=new FormGroup({});
  estudiante:Estudiante=new Estudiante();
  mensaje:string='';
  constructor(private pS: EstudianteService, private route:Router){}
  ngOnInit(): void {
  this.form=new FormGroup({
  id:new FormControl(),
  nombre: new FormControl(),
  apellido: new FormControl(),
  telefono: new FormControl(),
  correo:new FormControl()
  });
 }
  aceptar():void{
 this.estudiante.id=this.form.value['id'];
 this.estudiante.nombre=this.form.value['nombre'];
 this.estudiante.apellido=this.form.value['apellido'];
 this.estudiante.telefono=this.form.value['telefono'];
 this.estudiante.correo=this.form.value['correo'];
 if(this.form.value['nombre'].length> 0){
  this.pS.insert(this.estudiante).subscribe((data)=>{
    this.pS.list().subscribe((data)=>{
      this.pS.setlist(data);
    });
  });
  this.route.navigate(['estudiantes']);
 }else{
  this.mensaje='Ingrese el nombre del estudiante!!!'
 }
 }



}

