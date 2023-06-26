import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Foro } from 'src/app/model/foro';
import * as moment from 'moment'
import { Estudiante } from 'src/app/model/estudiante';
import { MetodopagoService } from 'src/app/service/metodopago.service';
import { ForoService } from 'src/app/service/foro.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EstudianteService } from 'src/app/service/estudiante.service';

@Component({
  selector: 'app-e-foro-insertar',
  templateUrl: './e-foro-insertar.component.html',
  styleUrls: ['./e-foro-insertar.component.css']
})
export class EForoInsertarComponent implements OnInit{
  idestudiante:any;

  form:FormGroup=new FormGroup({});
  foro: Foro=new Foro();
  edicion:boolean=false;
  mensaje: string='';
  id:number=0;
  isHidden:boolean=true;

  maxFecha: Date=moment().add().toDate();

  lista: Estudiante[] = [];
  idEstudianteSeleccionado: number = 0;
 

  constructor(private pS:ForoService, 
    private router:Router,
    private route:ActivatedRoute,
    private eS:EstudianteService){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idestudiante = params['idestudiante'];
    })

    this.eS.list().subscribe(data => { this.lista = data });
    this.route.params.subscribe((data:Params)=>{
      this.id=data['idforo'];
      this.edicion=data['idforo']!=null
      this.init();
    })

      this.form=new FormGroup({
        idforo:new FormControl(),
        titulo:new FormControl(),
        texto:new FormControl(),
      })
  }
  aceptar(): void {
    this.foro.idforo = this.form.value['idforo']; 
    this.foro.titulo = this.form.value['titulo'];
    this.foro.fechacreacion = new Date(Date.now());
    this.foro.texto = this.form.value['texto'];
    
    if (this.idestudiante > 0) {
      if (this.form.value['titulo'].length > 0) {
    let e =new Estudiante();
        e.idEstudiante=this.idestudiante;
        this.foro.estudiante=e;
        if(this.edicion){
          this.pS.update(this.foro).subscribe(data=>{
            this.pS.list().subscribe(data=>{
              this.pS.setList(data)
            }
            )
          }
          )
        }else{
          this.pS.insert(this.foro).subscribe(data=>{
            this.pS.list().subscribe(data=>{
              this.pS.setList(data)
            }
            )
          }
          )
        }
  
        this.router.navigate(['/pages','homeestudiante', this.idestudiante, 'e-foro', this.idestudiante])
      }
  
    }
  }
  init(){
    if(this.edicion){
      this.pS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          idforo:new FormControl(data.idforo),
          titulo:new FormControl(data.titulo),
          texto:new FormControl(data.texto)          
        })
      })
    }
  }
}
