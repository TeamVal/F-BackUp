import { Component, OnInit } from '@angular/core';
import { AdministradorService } from './../../../service/administrador.service';
import { Administrador } from './../../../model/administrador';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-administrador-insertar',
  templateUrl: './administrador-insertar.component.html',
  styleUrls: ['./administrador-insertar.component.css']
})
export class AdministradorInsertarComponent implements OnInit{
  id: number = 0;
  edicion: boolean = false;

  form: FormGroup = new FormGroup({});
  administrador: Administrador = new Administrador();
  mensaje: string = '';

  constructor(
    private pS: AdministradorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = new FormGroup({
      id: new FormControl(),
      usuario: new FormControl(),
      correoElec: new FormControl(),
      codigo: new FormControl(),
    });
  }

  aceptar(): void {
    this.administrador.id = this.form.value['id'];
    this.administrador.usuario = this.form.value['usuario'];
    this.administrador.correoElec = this.form.value['correoElec'];
    this.administrador.codigo = this.form.value['codigo'];
    if (this.form.value['usuario'].length > 0) {
      if (this.edicion) {
        this.pS.modificar(this.administrador).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(this.administrador).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }

      this.router.navigate(['administradores']);
    } else {
      this.mensaje = 'Ingrese el nombre del administrador';
    }
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          usuario: new FormControl(data.usuario),
          correoElec: new FormControl(data.correoElec),
          codigo: new FormControl(data.codigo),
        });
      });
    }
  }
}
