import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Asesor } from 'src/app/model/asesor';
import { Lenguaje } from 'src/app/model/lenguaje';
import { MicroCurso } from 'src/app/model/microcurso';
import { AsesorService } from 'src/app/service/asesor.service';
import { LenguajeService } from 'src/app/service/lenguaje.service';
import { MicroCursoService } from 'src/app/service/microcurso.service';

@Component({
  selector: 'app-a-microcurso-insertar',
  templateUrl: './a-microcurso-insertar.component.html',
  styleUrls: ['./a-microcurso-insertar.component.css']
})
export class AMicrocursoInsertarComponent implements OnInit{
  id:number=0;
  edicion:boolean=false;
  idasesor:any;

  form:FormGroup=new FormGroup({});
  micro: MicroCurso=new MicroCurso();
  mensaje: string='';

  listaA: Asesor[] = [];
  idAsesorSeleccionado: number = 0;
  listaL: Lenguaje[] = [];
  idLenguajeSeleccionado: number = 0;

  constructor(private pS:MicroCursoService, 
    private router:Router,
    private route:ActivatedRoute,
    private aS:AsesorService,
    private lS:LenguajeService){}
  
    ngOnInit(): void {
      this.aS.list().subscribe(data => { this.listaA = data });
      this.lS.list().subscribe(data => { this.listaL = data });
      this.route.params.subscribe((params: Params) => {
      this.idasesor = params['idasesor'];
    })

      this.route.params.subscribe((data:Params)=>{
        this.id=data['idmicro'];
        this.edicion=data['idmicro']!=null
        this.init();
      })
  
        this.form=new FormGroup({
          idMicroCurso:new FormControl(),
          titulo:new FormControl(),
          descrip:new FormControl(),
          tema:new FormControl(),
          lenguaje:new FormControl(),
        })
  }
  aceptar(): void {
    this.micro.idMicroCurso = this.form.value['idMicroCurso'];
    this.micro.titulo = this.form.value['titulo'];
    this.micro.descrip = this.form.value['descrip'];
    this.micro.tema = this.form.value['tema'];
  
    if ( this.idLenguajeSeleccionado > 0) {
      if (this.form.value['titulo'].length > 0) {
        let asesor = new Asesor();
        asesor.idAsesor = this.idasesor;

        this.micro.asesor = asesor;
  
        let lenguaje = new Lenguaje();
        lenguaje.idLenguaje = this.idLenguajeSeleccionado;
        this.micro.lenguaje = lenguaje;
  
        if(this.edicion){
          this.pS.updateID(this.micro).subscribe(data=>{
            this.pS.listID(this.idasesor).subscribe(data=>{
              this.pS.setListID(data)
            }
            )
          }
          )
        }else{
          this.pS.insertID(this.micro).subscribe(data=>{
            this.pS.listID(this.idasesor).subscribe(data=>{
              this.pS.setListID(data)
            }
            )
          }
          )
        }
  
        
  
  
  
  
  
        this.router.navigate(['/pages','homeasesor', this.idasesor, 'a-microcurso', this.idasesor])
      } else {
        this.mensaje = "Introduzca un título para el microcurso, por favor";
      }
    } else {
      this.mensaje = "Por favor, un lenguaje";
    }
  }
  init(){
    if(this.edicion){
      this.pS.listIdID(this.id).subscribe(data=>{
        this.form=new FormGroup({
          idMicroCurso:new FormControl(data.idMicroCurso),
          titulo:new FormControl(data.titulo),
          descrip:new FormControl(data.descrip),
          tema:new FormControl(data.tema),
          lenguaje:new FormControl(data.lenguaje.tipoLeng),

        })
      })
    }
  }
}
