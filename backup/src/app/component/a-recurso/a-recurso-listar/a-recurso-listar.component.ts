import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Recurso } from 'src/app/model/Recurso';
import { RecursoService } from 'src/app/service/Recurso.service';
import { RecursoDialogoComponent } from '../../recurso/recurso-listar/recurso-dialogo/recurso-dialogo.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-a-recurso-listar',
  templateUrl: './a-recurso-listar.component.html',
  styleUrls: ['./a-recurso-listar.component.css']
})
export class ARecursoListarComponent implements OnInit{
  dataSource:MatTableDataSource<Recurso>=new MatTableDataSource();
  lista:Recurso[]=[];
  idasesor:any;
  recursosFiltrados: Recurso[] = [];
  displayedColumns:String[]=['Numero','Titulo','Tema','Tipocontenido','Url','Tamano','ceditar', 'celiminar'];
  private idMayor: number = 0;
  //PAGINACION
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalItems: number = 0;
  itemsPerPage: number = 3;
  currentPage: number = 0;
  pageSizeOptions: number[] = [2,3];
  //PAGINACION
  constructor(private pS:RecursoService, private dialog: MatDialog,public route:ActivatedRoute){}
ngOnInit(): void {
  this.route.params.subscribe((params: Params) => {
    this.idasesor = params['idasesor'];
  });
  this.pS.list().subscribe((data)=>{ 
    this.lista = data; // Almacena la lista original en this.lista
    this.recursosFiltrados = data; // Inicializa videosFiltrados con la lista original
    this.dataSource=new MatTableDataSource(data);
    this.totalItems = this.dataSource.data.length;
    this.dataSource.paginator = this.paginator;
  });
  this.pS.getList().subscribe((data)=>{

    this.dataSource=new MatTableDataSource(data);
    this.totalItems = this.dataSource.data.length;
    this.dataSource.paginator = this.paginator;
  });
  this.pS.getConfirmaEliminacion().subscribe(data => {
    data == true ? this.eliminar(this.idMayor) : false;
    this.totalItems = this.dataSource.data.length;
    this.dataSource.paginator = this.paginator;
  });
}
confirmar(id: number) {
  this.idMayor = id;
  this.dialog.open(RecursoDialogoComponent);
}
eliminar(id: number) {
  if(this.idMayor!=0){
  this.pS.eliminar(id).subscribe(() => {
    this.pS.list().subscribe(data => {
      this.pS.setList(data);
    });
  });
  }
}

filtrar(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

  if (filterValue) {
    this.recursosFiltrados = this.lista.filter(video =>
      video.idrecurso.toString().includes(filterValue) ||
      video.titulo.toLowerCase().includes(filterValue) ||
      video.tema.toLowerCase().includes(filterValue) ||
      video.url.toLowerCase().includes(filterValue) ||
      video.tamano.toLowerCase().includes(filterValue) ||
      video.tipoContenido.toLowerCase().includes(filterValue)
    );
  } else {
    this.recursosFiltrados = this.lista;
  }

  this.dataSource = new MatTableDataSource(this.recursosFiltrados);
  this.totalItems = this.recursosFiltrados.length;
  this.paginator.firstPage();
}
onPageChanged(event: PageEvent) {
  this.currentPage = event.pageIndex;
  this.itemsPerPage = event.pageSize;
}
}
