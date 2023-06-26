import { Component, OnInit } from '@angular/core';
import { Modulo } from 'src/app/model/Modulo'; 
import { FormGroup, FormControl } from '@angular/forms'

import { ModuloService } from 'src/app/service/Modulo.service';
import { ActivatedRoute,  Params,  Router } from '@angular/router';
import { Recurso } from 'src/app/model/Recurso'; 
import { RecursoService } from 'src/app/service/Recurso.service'; 
import { MicroCurso } from 'src/app/model/microcurso';
import { MicroCursoService } from 'src/app/service/microcurso.service';
@Component({
  selector: 'app-modulo-creaedita',
  templateUrl: './modulo-creaedita.component.html',
  styleUrls: ['./modulo-creaedita.component.css']
})
export class ModuloCreaeditaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  modulo: Modulo = new Modulo()
  mensaje: string = ""
  editar:boolean=false;
  listar: Recurso[] = [];
  idrecurselectionado: number = 0;

  listam: MicroCurso[] = [];
  idmicroselectionado: number = 0;

  id:number=0;

  constructor(private vS: ModuloService,
    private router: Router,
    private route: ActivatedRoute, private pS:RecursoService,  private mS:MicroCursoService) {
  }
  ngOnInit(): void {
    this.pS.list().subscribe(data => { this.listar = data });
    this.mS.list().subscribe(data => { this.listam = data });

    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.editar=data['id'] !=null;
       this.init();
      });
    this.form = new FormGroup({
      idmodulo: new FormControl(),
      titulo: new FormControl(),
      descripcion: new FormControl(),
      estado: new FormControl(),
      recurso:new FormControl(),
      microcurso:new FormControl()
    });

  }
  aceptar(): void {
    this.modulo.idmodulo = this.form.value['idmodulo'];
    this.modulo.titulo = this.form.value['titulo'];
    this.modulo.descripcion = this.form.value['descripcion'];
    this.modulo.estado = this.form.value['estado'];

    if (this.form.value['titulo'].length > 0) {

      let recursito=new Recurso();
      recursito.idrecurso=this.idrecurselectionado;
      this.modulo.recurso=recursito;


      let microcurso=new MicroCurso();
      microcurso.idMicroCurso=this.idmicroselectionado;
      this.modulo.microcurso=microcurso;
      
      if(this.editar){
        
        
        this.vS.update(this.modulo).subscribe(()=>{
        this.vS.list().subscribe((data) => {
       this.vS.setList(data);
       });
       })
  
  
       } else{
         this.vS.insert(this.modulo).subscribe((data) => {
          this.vS.list().subscribe((data) => {
            this.vS.setList(data);
          });
          });
  
        }
        
        this.router.navigate(['/pages/homeadmin/modulos']);
     } else {
       this.mensaje = 'Ingrese el  titulo del modulo';
     }
  }
  init() {
    if (this.editar) {
      this.vS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idmodulo: new FormControl(data.idmodulo),
          titulo: new FormControl(data.titulo),
          descripcion: new FormControl(data.descripcion),
          estado: new FormControl(data.estado),
          recurso: new FormControl(data.recurso.titulo),
          microcurso: new FormControl(data.microcurso.titulo),
      

        });
      });
    }
  }
}

