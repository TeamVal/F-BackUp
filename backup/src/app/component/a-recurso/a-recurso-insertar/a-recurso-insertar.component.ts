import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recurso } from 'src/app/model/Recurso';
import { RecursoService } from 'src/app/service/Recurso.service';

@Component({
  selector: 'app-a-recurso-insertar',
  templateUrl: './a-recurso-insertar.component.html',
  styleUrls: ['./a-recurso-insertar.component.css']
})
export class ARecursoInsertarComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  recurso: Recurso = new Recurso()
  mensaje: string = ""
  edicion: boolean = false
  id: number = 0;

  idasesor:any;


  constructor(private pS: RecursoService,
    private router: Router,
    private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idasesor = params['idasesor'];
    })
    this.route.params.subscribe((data: Params) => {
      this.id = data['idrecurso'];
      this.edicion = data['idrecurso'] != null;
      this.init();
    });
    this.form = new FormGroup({
      idrecurso: new FormControl(),
      titulo: new FormControl(),
      tema:new FormControl(),
      tipoContenido: new FormControl(),
      url: new FormControl(),
      tamano:new FormControl(),
    });

  }
  aceptar(): void {
    this.recurso.idrecurso = this.form.value['idrecurso'];
    this.recurso.titulo = this.form.value['titulo'];
    this.recurso.tema = this.form.value['tema'];
    this.recurso.tipoContenido = this.form.value['tipoContenido'];
    this.recurso.url = this.form.value['url'];
    this.recurso.tamano = this.form.value['tamano'];

    if (this.form.value['titulo'].length > 0 ) {
      if (this.edicion) {
        this.pS.update(this.recurso).subscribe(() => {
          this.pS.list().subscribe(data => {
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(this.recurso).subscribe(() => {
          this.pS.list().subscribe(data => {
            this.pS.setList(data);
          })
        })
      }
      this.router.navigate(['/pages','homeasesor', this.idasesor, 'a-recurso', this.idasesor])
    } else {
      this.mensaje = "Complete los valores requeridos";
    }
  }
  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe(data => {
      
        this.form = new FormGroup({
          idrecurso: new FormControl(data.idrecurso),
          titulo: new FormControl(data.titulo),
          tema: new FormControl(data.tema),
          tipoContenido: new FormControl(data.tipoContenido),
          url:new FormControl(data.url),
          tamano:new FormControl(data.tamano),
        });
      //console.log(data);
      });
    }
  }
}
