import { Component,OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MicroCurso } from 'src/app/model/microcurso';
import { MicroCursoService } from 'src/app/service/microcurso.service';
import { MicrocursoDialogoComponent } from '../../microcurso/microcurso-listar/microcurso-dialogo/microcurso-dialogo.component';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-a-microcurso-listar',
  templateUrl: './a-microcurso-listar.component.html',
  styleUrls: ['./a-microcurso-listar.component.css']
})
export class AMicrocursoListarComponent implements OnInit{
  idasesor:any;
  dataSource: MatTableDataSource<MicroCurso> = new MatTableDataSource();
  lista: MicroCurso[] = [];
  microFiltrados: MicroCurso[] = [];
  displayedColumns: string[] = ['numero','titulo', 'descrip', 'tema', 'asesor','lenguaje','ceditar','celiminar'];
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
      this.idasesor = params['idasesor'];

      
    });

    this.mS.listID(this.idasesor).subscribe((data) => {
      this.lista = data; // Almacena la lista original en this.lista
      this.microFiltrados = data; // Inicializa videosFiltrados con la lista original
      this.dataSource = new MatTableDataSource(data);
      this.totalItems = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
    });
    this.mS.getListID().subscribe(data =>{
      this.dataSource=new MatTableDataSource(data);
      this.totalItems = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
    })
    this.mS.getConfirmaEliminacionID().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.totalItems = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;

    });
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(MicrocursoDialogoComponent);
  }
  eliminar(id: number) {
    if(this.idMayor!=0){
      this.mS.eliminarID(id).subscribe(() => {
        this.mS.listID(this.idasesor).subscribe(data => {
          this.mS.setListID(data);/* se ejecuta la línea 27 */
        });
      });
    }
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
