import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Estudiante } from 'src/app/model/estudiante';
import { Solicitud } from 'src/app/model/solicitud';
import { EstudianteService } from 'src/app/service/estudiante.service';
import { SolicitudService } from 'src/app/service/solicitud.service';

@Component({
  selector: 'app-e-solicitud-insertar',
  templateUrl: './e-solicitud-insertar.component.html',
  styleUrls: ['./e-solicitud-insertar.component.css']
})
export class ESolicitudInsertarComponent implements OnInit{
  idestudiante:any;

  form:FormGroup=new FormGroup({});
  solicitud: Solicitud=new Solicitud();
  edicion:boolean=false;
  mensaje: string='';
  id:number=0;

  maxFecha: Date=moment().add().toDate();

  lista: Estudiante[] = [];
  idEstudianteSeleccionado: number = 0;
 

  constructor(private pS:SolicitudService, 
    private router:Router,
    private route:ActivatedRoute,
    private eS:EstudianteService){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idestudiante = params['idestudiante'];
    })

    this.eS.list().subscribe(data => { this.lista = data });
    this.route.params.subscribe((data:Params)=>{
      this.id=data['idsolicitud'];
      this.edicion=data['idsolicitud']!=null
      this.init();
    })

      this.form=new FormGroup({
        idsolicitud:new FormControl(),
        nombre:new FormControl(),
        descrip:new FormControl(),
        fechasol:new FormControl(),
      })
  }
  aceptar(): void {
    this.solicitud.idsolicitud = this.form.value['idsolicitud']; 
    this.solicitud.nombre = this.form.value['nombre'];
    this.solicitud.descrip = this.form.value['descrip'];
    this.solicitud.fechasol = this.form.value['fechasol'];
    
    if (this.idestudiante > 0) {
      if (this.form.value['nombre'].length > 0) {
    let e =new Estudiante();
        e.idEstudiante=this.idestudiante;
        this.solicitud.estudiante=e;
        if(this.edicion){
          this.pS.updateID(this.solicitud).subscribe(data=>{
            this.pS.listID(this.idestudiante).subscribe(data=>{
              this.pS.setListID(data)
            }
            )
          }
          )
        }else{
          this.pS.insertID(this.solicitud).subscribe(data=>{
            this.pS.listID(this.idestudiante).subscribe(data=>{
              this.pS.setListID(data)
            }
            )
          }
          )
        }
  
        this.router.navigate(['/pages','homeestudiante', this.idestudiante, 'e-solicitud', this.idestudiante])
      }
  
    }
  }
  init(){
    if(this.edicion){
      this.pS.listIdID(this.id).subscribe(data=>{
        this.form=new FormGroup({
          idsolicitud:new FormControl(data.idsolicitud),
          nombre:new FormControl(data.nombre),
          descrip:new FormControl(data.descrip),
          fechasol:new FormControl(data.fechasol)          
        })
      })
    }
  }
}
