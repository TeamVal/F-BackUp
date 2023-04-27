import { Component, OnInit } from '@angular/core';
import { Lenguaje } from 'src/app/model/lenguaje';
import { MatTableDataSource } from '@angular/material/table';
import { LenguajeService } from 'src/app/service/lenguaje.service';

import { MatDialog } from '@angular/material/dialog'
import { LenguajeDialogoComponent } from './lenguaje-dialogo/lenguaje-dialogo.component';

@Component({
  selector: 'app-lenguaje-listar',
  templateUrl: './lenguaje-listar.component.html',
  styleUrls: ['./lenguaje-listar.component.css']
})
export class LenguajeListarComponent implements OnInit{
  dataSource:MatTableDataSource<Lenguaje>=new MatTableDataSource();
  lista:Lenguaje[]=[]
  displayedColumns:string[]=['numero','descripcion','abreviacion','tipo', 'ceditar', 'celiminar']
  private idMayor: number = 0;
  constructor(private pS:LenguajeService, private dialog: MatDialog){

  }
  ngOnInit(): void {
      this.pS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);

      })
      this.pS.getList().subscribe(data=>{
        this.dataSource = new MatTableDataSource(data);
      })
      this.pS.getConfirmaEliminacion().subscribe(data => {
        data == true ? this.eliminar(this.idMayor) : false;
      });

  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(LenguajeDialogoComponent);
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
