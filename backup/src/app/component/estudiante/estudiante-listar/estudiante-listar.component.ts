import { Component, OnInit } from '@angular/core';
import { Estudiante } from './../../../model/estudiante';
import { MatTableDataSource } from '@angular/material/table';
import { EstudianteService } from './../../../service/estudiante.service';

@Component({
  selector: 'app-estudiante-listar',
  templateUrl: './estudiante-listar.component.html',
  styleUrls: ['./estudiante-listar.component.css'],
})
export class EstudianteListarComponent implements OnInit {
  dataSource: MatTableDataSource<Estudiante> = new MatTableDataSource();
  lista: Estudiante[] = [];
  displayedColumns: string[] = ['numero','nombre', 'apellido', 'telefono', 'correo'];
  constructor(private pS: EstudianteService) {}
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.pS.getlist().subscribe(data =>{
      this.dataSource=new MatTableDataSource(data);
    })
  }
}
