import { Component, OnInit } from '@angular/core';
import { Asesor } from 'src/app/model/asesor';
import { MatTableDataSource } from '@angular/material/table';
import { AsesorService } from 'src/app/service/asesor.service';

import { MatDialog } from '@angular/material/dialog'
import { AsesorDialogoComponent } from './asesor-dialogo/asesor-dialogo.component';

@Component({
  selector: 'app-asesor-listar',
  templateUrl: './asesor-listar.component.html',
  styleUrls: ['./asesor-listar.component.css']
})
export class AsesorListarComponent implements OnInit{
  dataSource:MatTableDataSource<Asesor>=new MatTableDataSource();
  lista:Asesor[]=[]
  displayedColumns:string[]=['numero','apellido','nombre','telefono','correo','archivo', 'ceditar', 'celiminar']
  private idMayor: number = 0;


  constructor(private pS:AsesorService, private dialog: MatDialog){

  }
  ngOnInit(): void {
      this.pS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);

      })
      this.pS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      }
      )
      this.pS.getConfirmaEliminacion().subscribe(data => {
        data == true ? this.eliminar(this.idMayor) : false;
      })
  }

  filtrar(e:any){
    this.dataSource.filter=e.target.value.trim();
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(AsesorDialogoComponent);
  }
  eliminar(id: number) {
    this.pS.eliminar(id).subscribe(() => {
      this.pS.list().subscribe(data => {
        this.pS.setList(data);/* se ejecuta la línea 27 */
      });
    });
  }
}
