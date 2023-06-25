import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Asesor } from 'src/app/model/asesor';
import { Asesoria } from 'src/app/model/asesoria';
import { Solicitud } from 'src/app/model/solicitud';
import { AsesoriaService } from 'src/app/service/asesoria.service';

@Component({
  selector: 'app-a-asesoriainsertar',
  templateUrl: './a-asesoriainsertar.component.html',
  styleUrls: ['./a-asesoriainsertar.component.css']
})
export class AAsesoriainsertarComponent implements OnInit{
  id:number=0;
  edicion:boolean=false;
  idasesor:any;
  idsolicitud:any;

  form:FormGroup=new FormGroup({});
  asesoria: Asesoria=new Asesoria();
  mensaje: string='';


  constructor(private pS:AsesoriaService, 
    private router:Router,
    private route:ActivatedRoute,){}
  
    ngOnInit(): void {

      this.route.params.subscribe((params: Params) => {
      this.idasesor = params['idasesor'];
    })
    this.route.params.subscribe((params: Params) => {
      this.idsolicitud = params['idsolicitud'];
    })

      this.route.params.subscribe((data:Params)=>{
        this.id=data['idmicro'];
        this.edicion=data['idmicro']!=null
        this.init();
      })
  
        this.form=new FormGroup({
          idasesoria:new FormControl(),
          tiempo:new FormControl(),
          precio:new FormControl(),

        })
  }
  aceptar(): void {
    this.asesoria.idasesoria = this.form.value['idasesoria'];
    this.asesoria.tiempo = this.form.value['tiempo'];
    this.asesoria.fechaacep = new Date(Date.now())
    this.asesoria.precio = this.form.value['precio'];
  
      if (this.form.value['precio'].length > 0) {
        let asesor = new Asesor();
        asesor.idAsesor = this.idasesor;

        this.asesoria.asesor = asesor;
  
        let soli = new Solicitud();
        soli.idsolicitud = this.idsolicitud;
        this.asesoria.solicitud = soli;
  
        if(this.edicion){
          this.pS.updateID(this.asesoria).subscribe(data=>{
            this.pS.listID(this.idasesor).subscribe(data=>{
              this.pS.setListID(data)
            }
            )
          }
          )
        }else{
          this.pS.insertID(this.asesoria).subscribe(data=>{
            this.pS.listID(this.idasesor).subscribe(data=>{
              this.pS.setListID(data)
            }
            )
          }
          )
        }
  
        
  
  
  
  
  
        this.router.navigate(['/pages','homeasesor', this.idasesor, 'a-solicitud', this.idasesor])
      } else {
        this.mensaje = "Introduzca un título para el microcurso, por favor";
      }
    
  }
  init(){
    if(this.edicion){
      this.pS.listIdID(this.id).subscribe(data=>{
        this.form=new FormGroup({
          idasesoria:new FormControl(data.idasesoria),
          tiempo:new FormControl(data.tiempo),
          precio:new FormControl(data.precio)

        })
      })
    }
  }
}
