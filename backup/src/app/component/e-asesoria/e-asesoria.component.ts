import { Component, OnInit, ViewChild } from '@angular/core';
import { Asesoria } from 'src/app/model/asesoria';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AsesoriaService } from 'src/app/service/asesoria.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { EAsesoriaDialogoComponent } from './e-asesoria-dialogo/e-asesoria-dialogo.component';

@Component({
  selector: 'app-e-asesoria',
  templateUrl: './e-asesoria.component.html',
  styleUrls: ['./e-asesoria.component.css']
})
export class EAsesoriaComponent implements OnInit{
  dataSource: MatTableDataSource<Asesoria> = new MatTableDataSource();
  lista: Asesoria[] = [];
  idestudiante:any
  asesoriaFiltrados: Asesoria[] = [];
  displayedColumns: string[] = ['numero','titulo', 'descrip', 'tema', 'asesor','lenguaje'];
  private idMayor: number = 0;
  //PAGINACION
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalItems: number = 0;
  itemsPerPage: number = 2;
  currentPage: number = 0;
  pageSizeOptions: number[] = [2];
  //PAGINACION
  constructor(private mS: AsesoriaService, private dialog:MatDialog,public route:ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idestudiante = params['idestudiante'];
    });
    this.mS.list(this.idestudiante).subscribe((data) => {
      this.lista = data; // Almacena la lista original en this.lista
      this.asesoriaFiltrados = data; // Inicializa videosFiltrados con la lista original
      this.dataSource = new MatTableDataSource(data);
      this.totalItems = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
    });
    this.mS.getList().subscribe(data =>{
      this.dataSource=new MatTableDataSource(data);
      this.totalItems = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
    })
    this.mS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.totalItems = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;

    });
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(EAsesoriaDialogoComponent);
  }
  eliminar(id: number) {
      this.mS.eliminar(id).subscribe(() => {
        this.mS.list(this.idestudiante).subscribe(data => {
          this.mS.setList(data);/* se ejecuta la línea 27 */
        });
      });
  }
  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    if (filterValue) {
      this.asesoriaFiltrados = this.lista.filter(video =>
        video.idasesoria.toString().includes(filterValue) ||
        video.asesor.nom.toLowerCase().includes(filterValue) ||
        video.solicitud.nombre.toLowerCase().includes(filterValue)        ||
        video.solicitud.estudiante.nombre.toLowerCase().includes(filterValue)
      );
    } else {
      this.asesoriaFiltrados = this.lista;
    }
  
    this.dataSource = new MatTableDataSource(this.asesoriaFiltrados);
    this.totalItems = this.asesoriaFiltrados.length;
    this.paginator.firstPage();
  }
  onPageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }
}
