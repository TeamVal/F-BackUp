import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Modulo } from 'src/app/model/Modulo';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ModuloService } from 'src/app/service/Modulo.service';
import { MatDialog } from '@angular/material/dialog'
import { MicroCursoService } from 'src/app/service/microcurso.service';

@Component({
  selector: 'app-e-microcursos-modulo',
  templateUrl: './e-microcursos-modulo.component.html',
  styleUrls: ['./e-microcursos-modulo.component.css']
})
export class EMicrocursosModuloComponent {
  lista: Modulo[] = [];
  dataSource: MatTableDataSource<Modulo> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'titulo', 'descripcion', 'estado', 'recurso','microcurso']
  private idMayor: number = 0;
  idestudiante:any;
  idmicro:any;
  moduloFiltrados: Modulo[] = [];


  microtitulo:string="";
  microid:string="";
  microdescripcion:string="";

  //PAGINACION
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalItems: number = 0;
  itemsPerPage: number = 2;
  currentPage: number = 0;
  pageSizeOptions: number[] = [2];
  //PAGINACION
  constructor(private MIS: MicroCursoService,private mS: ModuloService, private dialog: MatDialog,public route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idestudiante = params['idestudiante'];  
      this.idmicro = params['idmicro']; 
    });
    this.MIS.listId(this.idmicro).subscribe((data) => {
      this.microtitulo=data.titulo;
      this.microid=this.idmicro;
      this.microdescripcion=data.descrip;
    });



    this.mS.listID(this.idmicro).subscribe((data)=>{ 
      this.lista = data; // Almacena la lista original en this.lista
      this.moduloFiltrados = data; // Inicializa videosFiltrados con la lista original
      this.dataSource=new MatTableDataSource(data);
      this.totalItems = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
    });
    this.mS.getListaID().subscribe((data)=>{

      this.dataSource=new MatTableDataSource(data);
      this.totalItems = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
    });
    this.mS.getConfirmaEliminacionID().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.totalItems = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
    });
  }
  confirmar(id: number) {
    this.idMayor = id;
  }
  eliminar(id: number) {
    if(this.idMayor!=0){
    this.mS.eliminarID(id).subscribe(() => {
      this.mS.listID(this.idmicro).subscribe(data => {
        this.mS.setListID(data);
      });
    });
   }
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    if (filterValue) {
      this.moduloFiltrados = this.lista.filter(video =>
        video.idmodulo.toString().includes(filterValue) ||
        video.titulo.toLowerCase().includes(filterValue) ||
        video.estado.toLowerCase().includes(filterValue) ||
        video.descripcion.toLowerCase().includes(filterValue) ||
        video.recurso.titulo.toLowerCase().includes(filterValue) ||
        video.microcurso.titulo.toLowerCase().includes(filterValue)
      );
    } else {
      this.moduloFiltrados = this.lista;
    }
  
    this.dataSource = new MatTableDataSource(this.moduloFiltrados);
    this.totalItems = this.moduloFiltrados.length;
    this.paginator.firstPage();
  }
  onPageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }
}
