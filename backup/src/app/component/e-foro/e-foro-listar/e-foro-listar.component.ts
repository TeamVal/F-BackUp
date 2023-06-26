import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Foro } from 'src/app/model/foro';
import { ForoService } from 'src/app/service/foro.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EForoDialogoComponent } from './e-foro-dialogo/e-foro-dialogo.component';

@Component({
  selector: 'app-e-foro-listar',
  templateUrl: './e-foro-listar.component.html',
  styleUrls: ['./e-foro-listar.component.css']
})
export class EForoListarComponent implements OnInit{
  idestudiante:any;
  lista: Foro[] = [];
  foroFiltrados: Foro[] = [];
  dataSource: MatTableDataSource<Foro> = new MatTableDataSource();
  displayedColumns: string[] = ['idforo','titulo', 'fechacreacion', 'texto', 'estudiante','ceditar','celiminar'];
  private idMayor: number = 0;
  //PAGINACION
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalItems: number = 0;
  itemsPerPage: number = 2;
  currentPage: number = 0;
  pageSizeOptions: number[] = [2];
  //PAGINACION

  constructor(private pS: ForoService, private dialog:MatDialog,public route:ActivatedRoute,public router:Router) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idestudiante = params['idestudiante'];
    });
    this.pS.list().subscribe(data => {
      this.lista = data; // Almacena la lista original en this.lista
      this.foroFiltrados = data; 
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
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
    this.dialog.open(EForoDialogoComponent);
  }
  eliminar(id: number) {
    if(this.idMayor!=0){
      this.pS.eliminar(id).subscribe(() => {
        this.pS.list().subscribe(data => {
          this.pS.setList(data);/* se ejecuta la línea 27 */
          this.idMayor=0;
        });
      });
    }
  }


  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    if (filterValue) {
      this.foroFiltrados = this.lista.filter(video =>
        video.idforo.toString().includes(filterValue) ||
        video.estudiante.nombre.toString().toLowerCase().includes(filterValue) ||
        video.texto.toLowerCase().includes(filterValue) ||
        video.fechacreacion.toString().toLowerCase().includes(filterValue) 
        );
    } else {
      this.foroFiltrados = this.lista;
    }
  
    this.dataSource = new MatTableDataSource(this.foroFiltrados);
    this.totalItems = this.foroFiltrados.length;
    this.paginator.firstPage();
  }
  onPageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }
}
