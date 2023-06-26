import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MicrocursoDialogoComponent } from 'src/app/component/microcurso/microcurso-listar/microcurso-dialogo/microcurso-dialogo.component';
import { MicroCursoService } from 'src/app/service/microcurso.service';

@Component({
  selector: 'app-a-microcurso-dialogo',
  templateUrl: './a-microcurso-dialogo.component.html',
  styleUrls: ['./a-microcurso-dialogo.component.css']
})
export class AMicrocursoDialogoComponent implements OnInit{
  constructor(
    private pS: MicroCursoService,
    private dialogoRef: MatDialogRef<AMicrocursoDialogoComponent>
  ) {}
  ngOnInit(): void {}
  confirmar(estado: boolean) {
    this.pS.setConfirmaEliminacionID(estado);
    this.dialogoRef.close()
  }
}
