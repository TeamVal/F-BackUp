import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MicroCurso } from 'src/app/model/microcurso';
import { MatPaginator } from '@angular/material/paginator';
import { MicroCursoService } from 'src/app/service/microcurso.service';
import { MatDialog } from '@angular/material/dialog';
import { MicrocursoDialogoComponent } from './microcurso-dialogo/microcurso-dialogo.component';

@Component({
  selector: 'app-microcurso-listar',
  templateUrl: './microcurso-listar.component.html',
  styleUrls: ['./microcurso-listar.component.css']
})
export class MicrocursoListarComponent implements OnInit{
  dataSource: MatTableDataSource<MicroCurso> = new MatTableDataSource();
  lista: MicroCurso[] = [];
  displayedColumns: string[] = ['numero','titulo', 'descrip', 'tema', 'asesor','lenguaje','ceditar','celiminar'];
  private idMayor: number = 0;
  //PAGINACION
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //PAGINACION
  constructor(private mS: MicroCursoService, private dialog:MatDialog) {}
  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.mS.getList().subscribe(data =>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.mS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.dataSource.paginator = this.paginator;

    });
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(MicrocursoDialogoComponent);
  }
  eliminar(id: number) {
      this.mS.eliminar(id).subscribe(() => {
        this.mS.list().subscribe(data => {
          this.mS.setList(data);/* se ejecuta la línea 27 */
        });
      });
  }
  filtrar(e:any){
    this.dataSource.filter=e.target.value.trim();
  }
}
