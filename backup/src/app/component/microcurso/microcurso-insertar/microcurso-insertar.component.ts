import { Component,OnInit } from '@angular/core';
import { Asesor } from 'src/app/model/asesor';
import { Lenguaje } from 'src/app/model/lenguaje';
import { FormControl, FormGroup } from '@angular/forms';
import { MicroCurso } from 'src/app/model/microcurso';
import { MicroCursoService } from 'src/app/service/microcurso.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AsesorService } from 'src/app/service/asesor.service';
import { LenguajeService } from 'src/app/service/lenguaje.service';

@Component({
  selector: 'app-microcurso-insertar',
  templateUrl: './microcurso-insertar.component.html',
  styleUrls: ['./microcurso-insertar.component.css']
})
export class MicrocursoInsertarComponent implements OnInit{
  id:number=0;
  edicion:boolean=false;

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
  
      this.route.params.subscribe((data:Params)=>{
        this.id=data['id'];
        this.edicion=data['id']!=null
        this.init();
      })
  
        this.form=new FormGroup({
          idMicroCurso:new FormControl(),
          titulo:new FormControl(),
          descrip:new FormControl(),
          tema:new FormControl(),
          asesor:new FormControl(),
          lenguaje:new FormControl(),
        })
  }
  aceptar(): void {
    this.micro.idMicroCurso = this.form.value['idMicroCurso'];
    this.micro.titulo = this.form.value['titulo'];
    this.micro.descrip = this.form.value['descrip'];
    this.micro.tema = this.form.value['tema'];
  
    if (this.idAsesorSeleccionado > 0 && this.idLenguajeSeleccionado > 0) {
      if (this.form.value['titulo'].length > 0) {
        let asesor = new Asesor();
        asesor.idAsesor = this.idAsesorSeleccionado;
        asesor.correo = "this.idAsesorSeleccionado";

        this.micro.asesor = asesor;
  
        let lenguaje = new Lenguaje();
        lenguaje.idLenguaje = this.idLenguajeSeleccionado;
        this.micro.lenguaje = lenguaje;
  
        if(this.edicion){
          this.pS.update(this.micro).subscribe(data=>{
            this.pS.list().subscribe(data=>{
              this.pS.setList(data)
            }
            )
          }
          )
        }else{
          this.pS.insert(this.micro).subscribe(data=>{
            this.pS.list().subscribe(data=>{
              this.pS.setList(data)
            }
            )
          }
          )
        }
  
        
  
  
  
  
  
        this.router.navigate(['/pages/homeadmin/microcursos'])
      } else {
        this.mensaje = "Introduzca un título para el microcurso, por favor";
      }
    } else {
      this.mensaje = "Por favor, seleccione un microcurso y un lenguaje";
    }
  }
  init(){
    if(this.edicion){
      this.pS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          idMicroCurso:new FormControl(data.idMicroCurso),
          titulo:new FormControl(data.titulo),
          descrip:new FormControl(data.descrip),
          tema:new FormControl(data.tema),
          asesor:new FormControl(data.asesor.nom),
          lenguaje:new FormControl(data.lenguaje.tipoLeng),

        })
      })
    }
  }
}
