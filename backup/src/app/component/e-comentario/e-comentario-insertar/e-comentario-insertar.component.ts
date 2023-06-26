import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Comentario } from 'src/app/model/comentario';
import { Estudiante } from 'src/app/model/estudiante';
import { Foro } from 'src/app/model/foro';
import { RecursoService } from 'src/app/service/Recurso.service';
import { ComentarioService } from 'src/app/service/comentario.service';
import { EstudianteService } from 'src/app/service/estudiante.service';
import { ForoService } from 'src/app/service/foro.service';

@Component({
  selector: 'app-e-comentario-insertar',
  templateUrl: './e-comentario-insertar.component.html',
  styleUrls: ['./e-comentario-insertar.component.css']
})
export class EComentarioInsertarComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  comentario: Comentario = new Comentario()
  mensaje: string = ""
  editar:boolean=false;

  isHidden:boolean=true;

  id:number=0;
  idestudiante:any;
  idforo:any;
  constructor(private vS: ComentarioService,
    private router: Router,
    private route: ActivatedRoute, private pS:ForoService,  private mS:EstudianteService) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idestudiante = params['idestudiante'];  
      this.idforo = params['idforo']; 
    });
    this.route.params.subscribe((data:Params)=>{
      this.id=data['idcomentario'];
      this.editar=data['idcomentario'] !=null;
       this.init();
      });
    this.form = new FormGroup({
      idcomentario: new FormControl(),
      texto: new FormControl()
        });

  }
  aceptar(): void {
    this.comentario.idcomentario = this.form.value['idcomentario'];
    this.comentario.fechapublic = new Date(Date.now());
    this.comentario.texto = this.form.value['texto'];

    if (this.form.value['texto'].length > 0) {

      let recursito=new Estudiante();
      recursito.idEstudiante=this.idestudiante;
      this.comentario.estudiante=recursito;


      let microcurso=new Foro();
      microcurso.idforo=this.idforo;
      this.comentario.foro=microcurso;
      
      if(this.editar){
        
        
        this.vS.updateID(this.comentario).subscribe(()=>{
        this.vS.listID(this.idforo).subscribe((data) => {
       this.vS.setListID(data);
       });
       })
  
  
       } else{
         this.vS.insertID(this.comentario).subscribe((data) => {
          this.vS.listID(this.idforo).subscribe((data) => {
            this.vS.setListID(data);
          });
          });
  
        }
        
        this.router.navigate(['/pages','homeestudiante', this.idestudiante, 'e-comentario', this.idestudiante,this.idforo])
     } else {
       this.mensaje = 'Ingrese el  comentario';
     }
  }
  init() {
    if (this.editar) {
      this.vS.listIdID(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idcomentario: new FormControl(data.idcomentario),
          texto: new FormControl(data.texto) 

        });
      });
    }
  }
}
