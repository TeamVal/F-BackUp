import { Component, OnInit, ViewChild } from '@angular/core';
import { Administrador } from 'src/app/model/administrador';
import { AdministradorService } from 'src/app/service/administrador.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'
import { AdministradorDialogoComponent } from './administrador-dialogo/administrador-dialogo.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-administrador-listar',
  templateUrl: './administrador-listar.component.html',
  styleUrls: ['./administrador-listar.component.css']
})
export class AdministradorListarComponent implements OnInit{
  dataSource:MatTableDataSource<Administrador>=new MatTableDataSource();
  lista:Administrador[]=[]
  displayedColumns:string[]=['numero','usuario','correo','codigo', 'ceditar', 'celimininar']
  private idMayor: number = 0;


   //PAGINACION
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   //PAGINACION
   
  constructor(private pS:AdministradorService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.pS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;

    })
    this.pS.getLista().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;

    }
    )
    this.pS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.dataSource.paginator = this.paginator;

    })
  }

  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(AdministradorDialogoComponent);
  }

  eliminar(id: number) {
    this.pS.eliminar(id).subscribe(() => {
      this.pS.list().subscribe(data => {
        this.pS.setList(data);
      });
    });
  }

  filtrar(e: any) {
    this.dataSource.filter = e.target.value.trim();
  }
}
