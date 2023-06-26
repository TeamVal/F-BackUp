import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LenguajeMicroDTO } from 'src/app/model/lenguajeMicroDTO';
import { LenguajeService } from 'src/app/service/lenguaje.service';

@Component({
  selector: 'app-lenguaje-micro',
  templateUrl: './lenguaje-micro.component.html',
  styleUrls: ['./lenguaje-micro.component.css']
})
export class LenguajeMicroComponent implements OnInit{
  lenguajeCounts: LenguajeMicroDTO[] = [];
  dataSource: MatTableDataSource<LenguajeMicroDTO> = new MatTableDataSource();
  displayedColumns: string[] = ['tipo_leng','microCount']

  constructor(private pS: LenguajeService) { }

  ngOnInit(): void {
    this.pS.getLenguajeCountByMicrocurso().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  getLenguajeCountByMicrocurso(): void {
    this.pS.getLenguajeCountByMicrocurso()
      .subscribe((data: LenguajeMicroDTO[]) => {
        this.lenguajeCounts = data;
      });
  }
}
