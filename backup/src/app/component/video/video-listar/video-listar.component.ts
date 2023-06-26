import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VideoTutorial } from 'src/app/model/videotutorial';
import { VideoTutorialService } from 'src/app/service/videoTutorial.service';
import { VideoDialogoComponent } from './video-dialogo/video-dialogo.component';

@Component({
  selector: 'app-video-listar',
  templateUrl: './video-listar.component.html',
  styleUrls: ['./video-listar.component.css']
})
export class VideoListarComponent implements OnInit{
  dataSource: MatTableDataSource<VideoTutorial> = new MatTableDataSource();
  lista: VideoTutorial[] = [];
  displayedColumns: string[] = ['numero','titulo', 'fechaSubida', 'url', 'asesor','lenguaje','ceditar','celiminar'];
  private idMayor: number = 0;
  //PAGINACION
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //PAGINACION
  constructor(private pS: VideoTutorialService, private dialog:MatDialog) {}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe(data =>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.pS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.dataSource.paginator = this.paginator;

    });
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(VideoDialogoComponent);
  }
  eliminar(id: number) {
      this.pS.eliminar(id).subscribe(() => {
        this.pS.list().subscribe(data => {
          this.pS.setList(data);/* se ejecuta la línea 27 */
        });
      });
  }
  filtrar(e:any){
    this.dataSource.filter=e.target.value.trim();
  }
}
