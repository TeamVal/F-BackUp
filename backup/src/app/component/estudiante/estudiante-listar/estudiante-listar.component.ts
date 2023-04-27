import { Component, OnInit } from '@angular/core';
import { Estudiante } from './../../../model/estudiante';
import { MatTableDataSource } from '@angular/material/table';
import { EstudianteService } from './../../../service/estudiante.service';
import { MatDialog } from '@angular/material/dialog'
import { EstudianteDialogoComponent } from './estudiante-dialogo/estudiante-dialogo.component';


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
  constructor(private pS: EstudianteService, private dialog:MatDialog) {}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.pS.getlist().subscribe(data =>{
      this.dataSource=new MatTableDataSource(data);
    })
    this.pS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
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
