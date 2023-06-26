import { Component,OnInit } from '@angular/core';
import { ContenidoDTO } from 'src/app/model/contenidoDTO';
import { MatTableDataSource } from '@angular/material/table';
import { RecursoService } from 'src/app/service/Recurso.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit{
  contenidoCounts: ContenidoDTO[] = [];
  dataSource: MatTableDataSource<ContenidoDTO> = new MatTableDataSource();
  displayedColumns: string[] = ['tipocontenido','count']

  constructor(private pS: RecursoService) { }

  ngOnInit(): void {
    this.pS.get2tipoconteido().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  get2tipoconteido(): void {
    this.pS.get2tipoconteido()
      .subscribe((data: ContenidoDTO[]) => {
        this.contenidoCounts = data;
      });
  }
}
