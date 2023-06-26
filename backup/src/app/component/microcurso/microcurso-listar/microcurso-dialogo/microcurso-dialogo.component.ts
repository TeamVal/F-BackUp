import { Component, OnInit } from '@angular/core';
import { MicroCursoService } from 'src/app/service/microcurso.service';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-microcurso-dialogo',
  templateUrl: './microcurso-dialogo.component.html',
  styleUrls: ['./microcurso-dialogo.component.css']
})
export class MicrocursoDialogoComponent implements OnInit{
  constructor(
    private pS: MicroCursoService,
    private dialogoRef: MatDialogRef<MicroCursoService>
  ) {}
  ngOnInit(): void {}
  confirmar(estado: boolean) {
    this.pS.setConfirmaEliminacion(estado);
    this.dialogoRef.close()
  }
}
