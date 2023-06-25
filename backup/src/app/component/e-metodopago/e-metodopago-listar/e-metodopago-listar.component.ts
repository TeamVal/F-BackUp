import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Metodopago } from 'src/app/model/metodopago';
import { MetodopagoService } from 'src/app/service/metodopago.service';
import { EMetodopagoDialogoComponent } from './e-metodopago-dialogo/e-metodopago-dialogo.component';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-e-metodopago-listar',
  templateUrl: './e-metodopago-listar.component.html',
  styleUrls: ['./e-metodopago-listar.component.css']
})
export class EMetodopagoListarComponent implements OnInit {
  idestudiante:any;
  lista: Metodopago[] = [];
  metodoFiltrados: Metodopago[] = [];
  dataSource: MatTableDataSource<Metodopago> = new MatTableDataSource();
  displayedColumns: string[] = ['id','nombre', 'tipo', 'numero', 'fechacaducidad','estudiante','ceditar','celiminar'];
  private idMayor: number = 0;
  //PAGINACION
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalItems: number = 0;
  itemsPerPage: number = 2;
  currentPage: number = 0;
  pageSizeOptions: number[] = [2];
  //PAGINACION

  constructor(private pS: MetodopagoService, private dialog:MatDialog,public route:ActivatedRoute,public router:Router) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idestudiante = params['idestudiante'];

      
    });
    this.pS.listIdestudiante(this.idestudiante).subscribe(data => {
      this.lista = data; // Almacena la lista original en this.lista
      this.metodoFiltrados = data; 
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
    this.dialog.open(EMetodopagoDialogoComponent);
  }
  eliminar(id: number) {
    if(this.idMayor!=0){
      this.pS.eliminar(id).subscribe(() => {
        this.pS.listIdestudiante(this.idestudiante).subscribe(data => {
          this.pS.setListID(data);/* se ejecuta la línea 27 */
          this.idMayor=0;
        });
      });
    }
  }


  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    if (filterValue) {
      this.metodoFiltrados = this.lista.filter(video =>
        video.idMetodoPago.toString().includes(filterValue) ||
        video.fechacaducidad.toString().toLowerCase().includes(filterValue) ||
        video.nombre.toLowerCase().includes(filterValue) ||
        video.numero.toLowerCase().includes(filterValue) ||
        video.tipo.toLowerCase().includes(filterValue)
        );
    } else {
      this.metodoFiltrados = this.lista;
    }
  
    this.dataSource = new MatTableDataSource(this.metodoFiltrados);
    this.totalItems = this.metodoFiltrados.length;
    this.paginator.firstPage();
  }
  onPageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }
}
