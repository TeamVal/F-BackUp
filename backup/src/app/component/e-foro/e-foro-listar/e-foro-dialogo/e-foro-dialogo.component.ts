import { Component, OnInit } from '@angular/core';
import { ForoService } from 'src/app/service/foro.service';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-e-foro-dialogo',
  templateUrl: './e-foro-dialogo.component.html',
  styleUrls: ['./e-foro-dialogo.component.css']
})
export class EForoDialogoComponent implements OnInit{
  constructor(
    private pS: ForoService,
    private dialogoRef: MatDialogRef<EForoDialogoComponent>
  ) {}
  ngOnInit(): void {
    
  }
  confirmar(estado: boolean) {
    this.pS.setConfirmaEliminacion(estado);
    this.dialogoRef.close();
  }
}
