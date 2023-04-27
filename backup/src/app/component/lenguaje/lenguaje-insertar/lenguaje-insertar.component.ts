import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Lenguaje } from 'src/app/model/lenguaje';
import { LenguajeService } from 'src/app/service/lenguaje.service';
import { ActivatedRoute, Params,Router } from '@angular/router';

@Component({
  selector: 'app-lenguaje-insertar',
  templateUrl: './lenguaje-insertar.component.html',
  styleUrls: ['./lenguaje-insertar.component.css']
})
export class LenguajeInsertarComponent implements OnInit {

  id:number=0;
  edicion:boolean=false;

  form:FormGroup=new FormGroup({});
  lenguaje:Lenguaje=new Lenguaje();
  mensaje: string ='';

  constructor(private pS:LenguajeService, private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {

    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null
      this.init();
    })


      this.form=new FormGroup({
        id:new FormControl(),
        desc:new FormControl(),
        abrev:new FormControl(),
        tipoLeng:new FormControl(),

      })
  }
  aceptar():void{
    this.lenguaje.id=this.form.value['id'];
    this.lenguaje.desc=this.form.value['desc'];
    this.lenguaje.abrev=this.form.value['abrev'];
    this.lenguaje.tipoLeng=this.form.value['tipoLeng'];
    if(this.form.value['desc'].length>0){


      if(this.edicion){
        this.pS.update(this.lenguaje).subscribe(data=>{
          this.pS.list().subscribe(data=>{
            this.pS.setList(data)
          }
          )
        }
        )
      }else{
        this.pS.insert(this.lenguaje).subscribe(data=>{
          this.pS.list().subscribe(data=>{
            this.pS.setList(data)
          }
          )
        }
        )
      }
      



      this.router.navigate(['lenguajes'])
    }
    else{
      this.mensaje="Introduzca el nombre del lenguaje, por favor"
    }
  }
  init(){
    if(this.edicion){
      this.pS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          id:new FormControl(data.id),
          desc:new FormControl(data.desc),
          abrev:new FormControl(data.abrev),
          tipoLeng:new FormControl(data.tipoLeng),
        })
      })
    }
  }


}
