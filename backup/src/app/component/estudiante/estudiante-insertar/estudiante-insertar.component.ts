import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Estudiante } from "src/app/model/estudiante";
import { EstudianteService } from "src/app/service/estudiante.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
@Component({
  selector: "app-estudiante-insertar",
  templateUrl: "./estudiante-insertar.component.html",
  styleUrls: ["./estudiante-insertar.component.css"],
})
export class EstudianteInsertarComponent implements OnInit {
  id: number = 0;
  edicion: boolean = false;
  form: FormGroup = new FormGroup({});
  estudiante: Estudiante = new Estudiante();
  mensaje: string = "";
  constructor(
    private pS: EstudianteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data["id"];
      this.edicion = data["id"] != null;
      this.init();
    });

    this.form = new FormGroup({
      id: new FormControl(),
      nombre: new FormControl(),
      apellido: new FormControl(),
      telefono: new FormControl(),
      correo: new FormControl(),
    });
  }
  aceptar(): void {
    this.estudiante.id = this.form.value["id"];
    this.estudiante.nombre = this.form.value["nombre"];
    this.estudiante.apellido = this.form.value["apellido"];
    this.estudiante.telefono = this.form.value["telefono"];
    this.estudiante.correo = this.form.value["correo"];
    if (this.form.value["nombre"].length > 0) {
      if (this.edicion) {
        this.pS.update(this.estudiante).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setlist(data);
          });
        });
      } else {
        this.pS.insert(this.estudiante).subscribe((data) => {
          this.pS.list().subscribe((data) => {
            this.pS.setlist(data);
          });
        });
      }
      this.router.navigate(["estudiantes"]);
    } else {
      this.mensaje = "Ingrese el nombre del estudiante!!!";
    }
  }
  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nombre: new FormControl(data.nombre),
         apellido: new FormControl(data.apellido),
          telefono: new FormControl(data.telefono),
          correo: new FormControl(data.correo),
        });
      });
    }
  }
}
