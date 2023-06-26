import { Component, OnInit } from '@angular/core';
import { ComentarioService } from 'src/app/service/comentario.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-e-comentario-dialogo',
  templateUrl: './e-comentario-dialogo.component.html',
  styleUrls: ['./e-comentario-dialogo.component.css']
})
export class EComentarioDialogoComponent implements OnInit{
  constructor(
    private pS: ComentarioService,
    private dialogoRef: MatDialogRef<EComentarioDialogoComponent>
  ) {}
  ngOnInit(): void {}
  confirmar(estado: boolean) {
    this.pS.setConfirmaEliminacionID(estado);
    this.dialogoRef.close()
  }
}
