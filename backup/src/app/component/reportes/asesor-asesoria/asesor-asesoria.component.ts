import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AsesorAsesoriaDTO } from 'src/app/model/asesorAsesoriaDTO';
import { AsesorService } from 'src/app/service/asesor.service';

@Component({
  selector: 'app-asesor-asesoria',
  templateUrl: './asesor-asesoria.component.html',
  styleUrls: ['./asesor-asesoria.component.css']
})
export class AsesorAsesoriaComponent implements OnInit{
  lenguajeCounts: AsesorAsesoriaDTO[] = [];
  dataSource: MatTableDataSource<AsesorAsesoriaDTO> = new MatTableDataSource();
  displayedColumns: string[] = ['nombre','asesorias']

  constructor(private pS: AsesorService) { }

  ngOnInit(): void {
    this.pS.getAsesorCountByAsesorias().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  getAsesorCountByAsesorias(): void {
    this.pS.getAsesorCountByAsesorias()
      .subscribe((data: AsesorAsesoriaDTO[]) => {
        this.lenguajeCounts = data;
      });
  }
}
