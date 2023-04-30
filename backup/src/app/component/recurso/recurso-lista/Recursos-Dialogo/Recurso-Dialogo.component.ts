import { Component, OnInit } from "@angular/core";
import { RecursoAService } from "src/app/service/recursosA.service";
import { MatDialogRef } from '@angular/material/dialog';
@Component({
selector:'app-Recurso-Dialogo',
templateUrl:'./Recurso-Dialogo.component.html',
styleUrls:['./Recurso-Dialogo.component.css']


})
export class RecursoDialogoComponent implements OnInit {
    constructor(private pS: RecursoAService,
      private dialogRef: MatDialogRef<RecursoDialogoComponent>){  }
      ngOnInit(): void { }
      confirmar(estado: boolean) {
        this.pS.setConfirmaEliminacion(estado);
        this.dialogRef.close();
      }
    }
    