
import { RecursoAService } from 'src/app/service/recursosA.service'; 
import  {recusosA} from 'src/app/model/recursosA';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Router, Params, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recurso-insertar',
  templateUrl: './recurso-insertar.component.html',
  styleUrls: ['./recurso-insertar.component.css']
})
export class RecursoInsertarComponent implements OnInit {
   id:number=0;
  editar:boolean=false;
  
  form: FormGroup = new FormGroup({});
  recur: recusosA = new recusosA();
  mensaje: string = '';
  constructor(private pS: RecursoAService, private router: Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
     this.route.params.subscribe((data:Params)=>{
    this.id=data['id'];
    this.editar=data['id'] !=null;
     this.init();
    });
    this.form = new FormGroup({
      id: new FormControl(),
      titulo: new FormControl(),
      tema:new FormControl(),
      tipocontenido: new FormControl(),
      url: new FormControl(),
      tamano:new FormControl(),
    });
  }
  aceptar(): void {
    this.recur.id = this.form.value['id'];
    this.recur.titulo = this.form.value['titulo'];
    this.recur.tema = this.form.value['tema'];
    this.recur.tipocontenido = this.form.value['tipocontenido'];
    this.recur.url = this.form.value['url'];
    this.recur.tamano = this.form.value['tamano'];
    if (this.form.value['titulo'].length > 0) {
      if(this.editar){
      this.pS.update(this.recur).subscribe(()=>{
      this.pS.list().subscribe((data) => {
     this.pS.setList(data);
     });
     })


      } else{
       this.pS.insert(this.recur).subscribe((data) => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data);
        });
        });

      }
      
      this.router.navigate(['recursos']);
    } else {
      this.mensaje = 'Ingrese un titulo';
    }
  }
  init() {
    if (this.editar) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          titulo: new FormControl(data.titulo),
          tema: new FormControl(data.tema),
          tipocontenido: new FormControl(data.tipocontenido),
          url:new FormControl(data.url),
          tamano:new FormControl(data.tamano),

        });
      });
    }
  }
}

