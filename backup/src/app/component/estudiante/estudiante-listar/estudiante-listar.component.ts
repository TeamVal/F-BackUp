import { Component, OnInit, ViewChild } from '@angular/core';
import { Estudiante } from './../../../model/estudiante';
import { MatTableDataSource } from '@angular/material/table';
import { EstudianteService } from './../../../service/estudiante.service';
import { MatDialog } from '@angular/material/dialog'
import { EstudianteDialogoComponent } from './estudiante-dialogo/estudiante-dialogo.component';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-estudiante-listar',
  templateUrl: './estudiante-listar.component.html',
  styleUrls: ['./estudiante-listar.component.css'],
})
export class EstudianteListarComponent implements OnInit {
  dataSource: MatTableDataSource<Estudiante> = new MatTableDataSource();
  lista: Estudiante[] = [];
  displayedColumns: string[] = ['numero','nombre', 'apellido', 'telefono', 'correo','ceditar','celiminar'];
  private idMayor: number = 0;
  //PAGINACION
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //PAGINACION

  constructor(private pS: EstudianteService, private dialog:MatDialog) {}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getlist().subscribe(data =>{
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
    this.dialog.open(EstudianteDialogoComponent);
  }
    eliminar(id: number) {
      this.pS.eliminar(id).subscribe(() => {
        this.pS.list().subscribe(data => {
          this.pS.setlist(data);/* se ejecuta la línea 27 */
        });
      });
  }
  filtrar(e:any){
    this.dataSource.filter=e.target.value.trim();
  }
}
