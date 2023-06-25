import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Metodopago } from 'src/app/model/metodopago';
import { MetodopagoService } from 'src/app/service/metodopago.service';
import { MetodopagoDialogoComponent } from './metodopago-dialogo/metodopago-dialogo.component';

@Component({
  selector: 'app-metodopago-listar',
  templateUrl: './metodopago-listar.component.html',
  styleUrls: ['./metodopago-listar.component.css']
})
export class MetodopagoListarComponent implements OnInit{
  
  lista: Metodopago[] = [];
  dataSource: MatTableDataSource<Metodopago> = new MatTableDataSource();
  displayedColumns: string[] = ['id','nombre', 'tipo', 'numero', 'fechacaducidad','estudiante','ceditar','celiminar'];
  private idMayor: number = 0;
  //PAGINACION
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //PAGINACION
  constructor(private pS: MetodopagoService, private dialog:MatDialog) {}
  ngOnInit(): void {
    this.pS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe(data =>{
      this.dataSource=new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getConfirmaEliminacion().subscribe(data => {
      data == true ? this.eliminar(this.idMayor) : false;
      this.dataSource.paginator = this.paginator;

    });
  
  }
  confirmar(id: number) {
    this.idMayor = id;
    this.dialog.open(MetodopagoDialogoComponent);
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
