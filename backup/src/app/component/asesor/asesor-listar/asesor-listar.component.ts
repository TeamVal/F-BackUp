import { Component, OnInit } from '@angular/core';
import { Asesor } from 'src/app/model/asesor';
import { MatTableDataSource } from '@angular/material/table';
import { AsesorService } from 'src/app/service/asesor.service';


@Component({
  selector: 'app-asesor-listar',
  templateUrl: './asesor-listar.component.html',
  styleUrls: ['./asesor-listar.component.css']
})
export class AsesorListarComponent implements OnInit{
  dataSource:MatTableDataSource<Asesor>=new MatTableDataSource();
  lista:Asesor[]=[]
  displayedColumns:string[]=['numero','apellido','nombre','telefono','correo','archivo', 'ceditar']
  constructor(private pS:AsesorService){

  }
  ngOnInit(): void {
      this.pS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);

      })
      this.pS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      }
      )
  }

  filtrar(e:any){
    this.dataSource.filter=e.target.value.trim();
  }
}
