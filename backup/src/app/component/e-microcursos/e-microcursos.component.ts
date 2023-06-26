import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MicroCurso } from 'src/app/model/microcurso';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MicroCursoService } from 'src/app/service/microcurso.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-e-microcursos',
  templateUrl: './e-microcursos.component.html',
  styleUrls: ['./e-microcursos.component.css']
})
export class EMicrocursosComponent implements OnInit {
  dataSource: MatTableDataSource<MicroCurso> = new MatTableDataSource();
  lista: MicroCurso[] = [];
  idestudiante:any
  microFiltrados: MicroCurso[] = [];
  displayedColumns: string[] = ['numero','titulo', 'descrip', 'tema', 'asesor','lenguaje'];
  private idMayor: number = 0;
  //PAGINACION
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalItems: number = 0;
  itemsPerPage: number = 2;
  currentPage: number = 0;
  pageSizeOptions: number[] = [2];
  //PAGINACION
  constructor(private mS: MicroCursoService, private dialog:MatDialog,public route:ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idestudiante = params['idestudiante'];

      
    });
    this.mS.list().subscribe((data) => {
      this.lista = data; // Almacena la lista original en this.lista
      this.microFiltrados = data; // Inicializa videosFiltrados con la lista original
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
  }
  eliminar(id: number) {
      this.mS.eliminar(id).subscribe(() => {
        this.mS.list().subscribe(data => {
          this.mS.setList(data);/* se ejecuta la línea 27 */
        });
      });
  }
  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    if (filterValue) {
      this.microFiltrados = this.lista.filter(video =>
        video.idMicroCurso.toString().includes(filterValue) ||
        video.titulo.toLowerCase().includes(filterValue) ||
        video.tema.toLowerCase().includes(filterValue) ||
        video.descrip.toLowerCase().includes(filterValue) ||
        video.asesor.nom.toLowerCase().includes(filterValue) ||
        video.lenguaje.tipoLeng.toLowerCase().includes(filterValue)
      );
    } else {
      this.microFiltrados = this.lista;
    }
  
    this.dataSource = new MatTableDataSource(this.microFiltrados);
    this.totalItems = this.microFiltrados.length;
    this.paginator.firstPage();
  }
  onPageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }
}
