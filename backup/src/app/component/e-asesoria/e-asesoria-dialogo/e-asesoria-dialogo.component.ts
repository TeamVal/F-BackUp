import { Component, OnInit } from '@angular/core';
import { AsesoriaService } from 'src/app/service/asesoria.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-e-asesoria-dialogo',
  templateUrl: './e-asesoria-dialogo.component.html',
  styleUrls: ['./e-asesoria-dialogo.component.css']
})
export class EAsesoriaDialogoComponent implements OnInit{
  constructor(
    private pS: AsesoriaService,
    private dialogoRef: MatDialogRef<EAsesoriaDialogoComponent>
  ) {}
  ngOnInit(): void {}
  confirmar(estado: boolean) {
    this.pS.setConfirmaEliminacion(estado);
    this.dialogoRef.close()
  }
}
