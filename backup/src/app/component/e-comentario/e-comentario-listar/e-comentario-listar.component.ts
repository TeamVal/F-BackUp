import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ForoService } from 'src/app/service/foro.service';
import { ComentarioService } from 'src/app/service/comentario.service';
import { MatDialog } from '@angular/material/dialog'
import { ActivatedRoute, Params } from '@angular/router';
import { Comentario } from 'src/app/model/comentario';
import { EComentarioDialogoComponent } from './e-comentario-dialogo/e-comentario-dialogo.component';

@Component({
  selector: 'app-e-comentario-listar',
  templateUrl: './e-comentario-listar.component.html',
  styleUrls: ['./e-comentario-listar.component.css']
})
export class EComentarioListarComponent implements OnInit{
  lista: Comentario[] = [];
  dataSource: MatTableDataSource<Comentario> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'titulo', 'descripcion', 'estado', 'estudiante','foro', 'ceditar','celiminar']
  private idMayor: number = 0;
  idestudiante:any;
  idforo:any;
  comentariosFiltrados: Comentario[] = [];


  foroTitulo:string="";
  foroTexto:string="";
  foroFecha:Date=new Date(Date.now());
  //PAGINACION
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalItems: number = 0;
  itemsPerPage: number = 2;
  currentPage: number = 0;
  pageSizeOptions: number[] = [2, 4, 8];
  //PAGINACION
  constructor(private MIS: ForoService,private mS: ComentarioService, private dialog: MatDialog,public route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idestudiante = params['idestudiante'];  
      this.idforo = params['idforo']; 
    });
    this.MIS.listId(this.idforo).subscribe((data) => {
      this.foroTitulo=data.titulo;
      this.foroTexto=data.texto;
      this.foroFecha=data.fechacreacion;

    });



    this.mS.listID(this.idforo).subscribe((data)=>{ 
      this.lista = data; // Almacena la lista original en this.lista
      this.comentariosFiltrados = data; // Inicializa videosFiltrados con la lista original
      this.dataSource=new MatTableDataSource(data);
      this.totalItems = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
    });
    this.mS.getListID().subscribe((data)=>{
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
    this.dialog.open(EComentarioDialogoComponent);
  }
  eliminar(id: number) {
    if(this.idMayor!=0){
    this.mS.eliminarID(id).subscribe(() => {
      this.mS.listID(this.idforo).subscribe(data => {
        this.mS.setListID(data);
      });
    });
   }
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    if (filterValue) {
      this.comentariosFiltrados = this.lista.filter(video =>
        video.foro.toString().includes(filterValue) ||
        video.texto.toLowerCase().includes(filterValue) ||
        video.idcomentario.toString().includes(filterValue) 
      );
    } else {
      this.comentariosFiltrados = this.lista;
    }
  
    this.dataSource = new MatTableDataSource(this.comentariosFiltrados);
    this.totalItems = this.comentariosFiltrados.length;
    this.paginator.firstPage();
  }
  onPageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }
}
