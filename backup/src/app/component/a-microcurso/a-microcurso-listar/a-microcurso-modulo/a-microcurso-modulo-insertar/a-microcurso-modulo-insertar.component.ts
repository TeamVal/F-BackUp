import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Modulo } from 'src/app/model/Modulo';
import { Recurso } from 'src/app/model/Recurso';
import { MicroCurso } from 'src/app/model/microcurso';
import { ModuloService } from 'src/app/service/Modulo.service';
import { RecursoService } from 'src/app/service/Recurso.service';
import { MicroCursoService } from 'src/app/service/microcurso.service';

@Component({
  selector: 'app-a-microcurso-modulo-insertar',
  templateUrl: './a-microcurso-modulo-insertar.component.html',
  styleUrls: ['./a-microcurso-modulo-insertar.component.css']
})
export class AMicrocursoModuloInsertarComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  modulo: Modulo = new Modulo()
  mensaje: string = ""
  editar:boolean=false;
  listar: Recurso[] = [];
  idrecurselectionado: number = 0;


  id:number=0;
  idasesor:any;
  idmicro:any;
  constructor(private vS: ModuloService,
    private router: Router,
    private route: ActivatedRoute, private pS:RecursoService,  private mS:MicroCursoService) {
  }
  ngOnInit(): void {
    this.pS.list().subscribe(data => { this.listar = data });
    this.route.params.subscribe((params: Params) => {
      this.idasesor = params['idasesor'];  
      this.idmicro = params['idmicro']; 
    });
    this.route.params.subscribe((data:Params)=>{
      this.id=data['idmodulo'];
      this.editar=data['idmodulo'] !=null;
       this.init();
      });
    this.form = new FormGroup({
      idmodulo: new FormControl(),
      titulo: new FormControl(),
      descripcion: new FormControl(),
      estado: new FormControl(),
      recurso:new FormControl()
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
      microcurso.idMicroCurso=this.idmicro;
      this.modulo.microcurso=microcurso;
      
      if(this.editar){
        
        
        this.vS.updateID(this.modulo).subscribe(()=>{
        this.vS.listID(this.idmicro).subscribe((data) => {
       this.vS.setListID(data);
       });
       })
  
  
       } else{
         this.vS.insertID(this.modulo).subscribe((data) => {
          this.vS.listID(this.idmicro).subscribe((data) => {
            this.vS.setListID(data);
          });
          });
  
        }
        
        this.router.navigate(['/pages','homeasesor', this.idasesor, 'a-modulo', this.idasesor, this.idmicro])
     } else {
       this.mensaje = 'Ingrese el  titulo del modulo';
     }
  }
  init() {
    if (this.editar) {
      this.vS.listIdID(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idmodulo: new FormControl(data.idmodulo),
          titulo: new FormControl(data.titulo),
          descripcion: new FormControl(data.descripcion),
          estado: new FormControl(data.estado),
          recurso: new FormControl(data.recurso.titulo)      

        });
      });
    }
  }
}
