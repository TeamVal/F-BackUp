import { Component, OnInit } from '@angular/core';
import { LenguajeService } from 'src/app/service/lenguaje.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lenguaje-dialogo',
  templateUrl: './lenguaje-dialogo.component.html',
  styleUrls: ['./lenguaje-dialogo.component.css']
})
export class LenguajeDialogoComponent implements OnInit {
  constructor(private pS: LenguajeService,
    private dialogRef: MatDialogRef<LenguajeDialogoComponent>){  }
    ngOnInit(): void { }
    confirmar(estado: boolean) {
      this.pS.setConfirmaEliminacion(estado);
      this.dialogRef.close();
    }

}
