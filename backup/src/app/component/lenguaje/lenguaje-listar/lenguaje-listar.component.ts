import { Component, OnInit } from '@angular/core';
import { Lenguaje } from 'src/app/model/lenguaje';
import { MatTableDataSource } from '@angular/material/table';
import { LenguajeService } from 'src/app/service/lenguaje.service';

@Component({
  selector: 'app-lenguaje-listar',
  templateUrl: './lenguaje-listar.component.html',
  styleUrls: ['./lenguaje-listar.component.css']
})
export class LenguajeListarComponent implements OnInit{
  dataSource:MatTableDataSource<Lenguaje>=new MatTableDataSource();
  lista:Lenguaje[]=[]
  displayedColumns:string[]=['numero','descripcion','abreviacion','tipo']
  constructor(private pS:LenguajeService){

  }
  ngOnInit(): void {
      this.pS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);

      })
      this.pS.getList().subscribe(data=>{
        this.dataSource = new MatTableDataSource(data);
      })

  }

}
