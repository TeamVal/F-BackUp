import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoTutorial } from 'src/app/model/videotutorial';
import { VideoTutorialService } from 'src/app/service/videoTutorial.service';

@Component({
  selector: 'app-e-videotutoriales',
  templateUrl: './e-videotutoriales.component.html',
  styleUrls: ['./e-videotutoriales.component.css']
})
export class EVideotutorialesComponent implements OnInit{
  dataSource: MatTableDataSource<VideoTutorial> = new MatTableDataSource();
  lista: VideoTutorial[] = [];
  videosFiltrados: VideoTutorial[] = [];

  displayedColumns: string[] = ['numero','titulo', 'fechaSubida', 'url', 'asesor','lenguaje'];
  private idMayor: number = 0;
  //PAGINACION
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalItems: number = 0;
  itemsPerPage: number = 6;
  currentPage: number = 0;
  pageSizeOptions: number[] = [6, 12, 24];
  //PAGINACION
  constructor(private sanitizer: DomSanitizer,private pS: VideoTutorialService, private dialog:MatDialog) {}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.lista = data; // Almacena la lista original en this.lista
      this.videosFiltrados = data; // Inicializa videosFiltrados con la lista original
      this.dataSource = new MatTableDataSource(data);
      this.totalItems = this.dataSource.data.length;

      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe(data =>{
      this.dataSource=new MatTableDataSource(data);
      this.totalItems = this.dataSource.data.length;

      this.dataSource.paginator = this.paginator;
    })
  }
  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    if (filterValue) {
      this.videosFiltrados = this.lista.filter(video =>
        video.idVideoTutorial.toString().includes(filterValue) ||
        video.titulo.toLowerCase().includes(filterValue) 
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
