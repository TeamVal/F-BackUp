import { Component, OnInit, ViewChild } from '@angular/core';
import { Modulo } from 'src/app/model/Modulo';
import { MatTableDataSource } from '@angular/material/table'
import { ModuloService } from 'src/app/service/Modulo.service'; 
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from "@angular/material/paginator";
import { ModuloDialogoComponent } from './modulo-dialogo/modulo-dialogo.component';


@Component({
  selector: 'app-modulo-listar',
  templateUrl: './modulo-listar.component.html',
  styleUrls: ['./modulo-listar.component.css']
})
export class ModuloListarComponent implements OnInit{
 
lista: Modulo[] = [];
  dataSource: MatTableDataSource<Modulo> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'titulo', 'descripcion', 'estado', 'recurso','microcurso', 'ceditar','celiminar']
  private idMayor: number = 0;
  //PAGINACION
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //PAGINACION
  constructor(private mS: ModuloService, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.mS.list().subscribe((data)=>{ 
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.mS.getLista().subscribe((data)=>{

      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.mS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.dataSource.paginator = this.paginator;
    });
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(ModuloDialogoComponent);
  }
  eliminar(id: number) {
    this.mS.eliminar(id).subscribe(() => {
      this.mS.list().subscribe(data => {
        this.mS.setList(data);
      });
    });
  }

  filtrar(e:any){
    this.dataSource.filter=e.target.value.trim();
  }
  }
