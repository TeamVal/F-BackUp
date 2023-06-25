
import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Metodopago } from 'src/app/model/metodopago';
import { Estudiante } from 'src/app/model/estudiante';
import { MetodopagoService } from 'src/app/service/metodopago.service';
import { EstudianteService } from 'src/app/service/estudiante.service';
@Component({
  selector: 'app-e-metodopago-insertar',
  templateUrl: './e-metodopago-insertar.component.html',
  styleUrls: ['./e-metodopago-insertar.component.css']
})
export class EMetodopagoInsertarComponent implements OnInit{
  idestudiante:any;

  form:FormGroup=new FormGroup({});
  metodo: Metodopago=new Metodopago();
  edicion:boolean=false;
  mensaje: string='';
  id:number=0;

  maxFecha: Date=moment().add().toDate();

  lista: Estudiante[] = [];
  idEstudianteSeleccionado: number = 0;
 

  constructor(private pS:MetodopagoService, 
    private router:Router,
    private route:ActivatedRoute,
    private eS:EstudianteService){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idestudiante = params['idestudiante'];
    })

    this.eS.list().subscribe(data => { this.lista = data });
    this.route.params.subscribe((data:Params)=>{
      this.id=data['idmetodopago'];
      this.edicion=data['idmetodopago']!=null
      this.init();
    })

      this.form=new FormGroup({
        idMetodoPago:new FormControl(),
    nombre:new FormControl(),
    tipo:new FormControl(),
    numero:new FormControl(),
    fechacaducidad:new FormControl(),
       
      })
  }
  aceptar(): void {
    this.metodo.idMetodoPago = this.form.value['idMetodoPago'];
    this.metodo.nombre = this.form.value['nombre'];
    this.metodo. tipo = this.form.value['tipo'];
    this.metodo. numero = this.form.value['numero'];
    this.metodo.fechacaducidad= this.form.value['fechacaducidad'];
    
    if (this.idestudiante > 0) {
      if (this.form.value['nombre'].length > 0) {
    let e =new Estudiante();
        e.idEstudiante=this.idestudiante;
        this.metodo.estudiante=e;
        if(this.edicion){
          this.pS.update(this.metodo).subscribe(data=>{
            this.pS.listIdestudiante(this.idestudiante).subscribe(data=>{
              this.pS.setListID(data)
            }
            )
          }
          )
        }else{
          this.pS.insert(this.metodo).subscribe(data=>{
            this.pS.listIdestudiante(this.idestudiante).subscribe(data=>{
              this.pS.setListID(data)
            }
            )
          }
          )
        }
  
        this.router.navigate(['/pages','homeestudiante', this.idestudiante, 'e-metodopago', this.idestudiante])
      }
  
    }
  }
  init(){
    if(this.edicion){
      this.pS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          idMetodoPago:new FormControl(data.idMetodoPago),
          nombre:new FormControl(data.nombre),
          tipo:new FormControl(data.tipo),
          numero:new FormControl(data.numero),
          fechacaducidad:new FormControl(data.fechacaducidad),
          
        })
      })
    }
  }

}
