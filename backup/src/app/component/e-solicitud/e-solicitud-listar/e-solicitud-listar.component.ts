import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Solicitud } from 'src/app/model/solicitud';
import { SolicitudService } from 'src/app/service/solicitud.service';
import { ESolicitudDialogoComponent } from './e-solicitud-dialogo/e-solicitud-dialogo.component';

@Component({
  selector: 'app-e-solicitud-listar',
  templateUrl: './e-solicitud-listar.component.html',
  styleUrls: ['./e-solicitud-listar.component.css']
})
export class ESolicitudListarComponent implements OnInit{
  idestudiante:any;
  lista: Solicitud[] = [];
  solicitudFiltrados: Solicitud[] = [];
  dataSource: MatTableDataSource<Solicitud> = new MatTableDataSource();
  displayedColumns: string[] = ['idforo','titulo', 'fechacreacion', 'texto', 'estudiante','ceditar','celiminar'];
  private idMayor: number = 0;
  //PAGINACION
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalItems: number = 0;
  itemsPerPage: number = 2;
  currentPage: number = 0;
  pageSizeOptions: number[] = [2];
  //PAGINACION

  constructor(private pS: SolicitudService, private dialog:MatDialog,public route:ActivatedRoute,public router:Router) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idestudiante = params['idestudiante'];
    });
    this.pS.listID(this.idestudiante).subscribe(data => {
      this.lista = data; // Almacena la lista original en this.lista
      this.solicitudFiltrados = data; 
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getListID().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.totalItems = this.dataSource.data.length;

      this.dataSource.paginator = this.paginator;
    });
 
      this.pS.getConfirmaEliminacionID().subscribe(data => {
        data == true ? this.eliminar(this.idMayor) : false;
        this.totalItems = this.dataSource.data.length;
        this.dataSource.paginator = this.paginator;
      });

   
  
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(ESolicitudDialogoComponent);
  }
  eliminar(id: number) {
    if(this.idMayor!=0){
      this.pS.eliminarID(id).subscribe(() => {
        this.pS.listID(this.idestudiante).subscribe(data => {
          this.pS.setListID(data);/* se ejecuta la línea 27 */
          this.idMayor=0;
        });
      });
    }
  }


  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    if (filterValue) {
      this.solicitudFiltrados = this.lista.filter(video =>
        video.idsolicitud.toString().includes(filterValue) ||
        video.estudiante.nombre.toString().toLowerCase().includes(filterValue) ||
        video.descrip.toLowerCase().includes(filterValue) ||
        video.fechasol.toString().toLowerCase().includes(filterValue) 
        );
    } else {
      this.solicitudFiltrados = this.lista;
    }
  
    this.dataSource = new MatTableDataSource(this.solicitudFiltrados);
    this.totalItems = this.solicitudFiltrados.length;
    this.paginator.firstPage();
  }
  onPageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }
}
