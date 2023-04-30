import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Asesor } from 'src/app/model/asesor';
import * as moment from 'moment'
import { AsesorService } from 'src/app/service/asesor.service';
import { ActivatedRoute, Params,Router } from '@angular/router';

@Component({
  selector: 'app-asesor-insertar',
  templateUrl: './asesor-insertar.component.html',
  styleUrls: ['./asesor-insertar.component.css']
})
export class AsesorInsertarComponent implements OnInit{

  id:number=0;
  edicion:boolean=false;

  form:FormGroup=new FormGroup({});
  asesor: Asesor=new Asesor();
  mensaje: string='';
  maxFecha: Date=moment().add(-1,'days').toDate();

  constructor(private pS:AsesorService, private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {

    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null
      this.init();
    })

      this.form=new FormGroup({
        id:new FormControl(),
        ape:new FormControl(),
        nom:new FormControl(),
        tel:new FormControl(),
        correo:new FormControl(),
        arch:new FormControl(),
      })
  }
  aceptar():void{
    this.asesor.id=this.form.value['id'];
    this.asesor.ape=this.form.value['ape'];
    this.asesor.nom=this.form.value['nom'];
    this.asesor.tel=this.form.value['tel'];
    this.asesor.correo=this.form.value['correo'];
    this.asesor.arch=this.form.value['arch'];


    if(this.form.value['nom'].length>0){


      if(this.edicion){
        this.pS.update(this.asesor).subscribe(data=>{
          this.pS.list().subscribe(data=>{
            this.pS.setList(data)
          }
          )
        }
        )
      }else{
        this.pS.insert(this.asesor).subscribe(data=>{
          this.pS.list().subscribe(data=>{
            this.pS.setList(data)
          }
          )
        }
        )
      }

      





      this.router.navigate(['asesores'])
    }
    else{
      this.mensaje="Introduzca el nombre del asesor, por favor"
    }


  }
  init(){
    if(this.edicion){
      this.pS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          id:new FormControl(data.id),
          ape:new FormControl(data.ape),
          nom:new FormControl(data.nom),
          tel:new FormControl(data.tel),
          correo:new FormControl(data.correo),
          arch:new FormControl(data.arch),
        })
      })
    }
  }
}
