import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VideoTutorial } from 'src/app/model/videotutorial';
import { VideoTutorialService } from 'src/app/service/videoTutorial.service';
import { AVideotutorialesDialogoComponent } from './a-videotutoriales-dialogo/a-videotutoriales-dialogo.component';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-a-videotutoriales-listar',
  templateUrl: './a-videotutoriales-listar.component.html',
  styleUrls: ['./a-videotutoriales-listar.component.css']
})
export class AVideotutorialesListarComponent implements OnInit{
  dataSource: MatTableDataSource<VideoTutorial> = new MatTableDataSource();
  idasesor:any;
  lista: VideoTutorial[] = [];
  videosFiltrados: VideoTutorial[] = [];
  displayedColumns: string[] = ['numero','titulo', 'fechaSubida', 'url', 'asesor','lenguaje','ceditar','celiminar'];
  private idMayor: number = 0;
  //PAGINACION
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalItems: number = 0;
  itemsPerPage: number = 6;
  currentPage: number = 0;
  pageSizeOptions: number[] = [6, 12, 24];
  //PAGINACION
  constructor(private sanitizer: DomSanitizer,private pS: VideoTutorialService, private dialog:MatDialog,public route:ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idasesor = params['idasesor'];

      
    });

    this.pS.listID(this.idasesor).subscribe((data) => {
      this.lista = data; // Almacena la lista original en this.lista
      this.videosFiltrados = data; // Inicializa videosFiltrados con la lista original
      this.dataSource = new MatTableDataSource(data);
      this.totalItems = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
    });

    this.pS.getListID().subscribe(data =>{
      this.dataSource=new MatTableDataSource(data);
      this.totalItems = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
    })
    this.pS.getConfirmaEliminacionID().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.totalItems = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;

    });
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(AVideotutorialesDialogoComponent);
  }
  eliminar(id: number) {
    if(this.idMayor!=0){
      this.pS.eliminarID(id).subscribe(() => {
        this.pS.listID(this.idasesor).subscribe(data => {
          this.pS.setListID(data);/* se ejecuta la línea 27 */
        });
      });
    }
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    if (filterValue) {
      this.videosFiltrados = this.lista.filter(video =>
        video.idVideoTutorial.toString().includes(filterValue) ||
        video.titulo.toLowerCase().includes(filterValue) ||
        video.url.toLowerCase().includes(filterValue) ||
        video.asesor.nom.toLowerCase().includes(filterValue) ||
        video.lenguaje.tipoLeng.toLowerCase().includes(filterValue)
      );
    } else {
      this.videosFiltrados = this.lista;
    }
  
    this.dataSource = new MatTableDataSource(this.videosFiltrados);
    this.totalItems = this.videosFiltrados.length;
    this.paginator.firstPage();
  }
  onPageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }
  sanitizarUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
