import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RecursoDialogoComponent } from 'src/app/component/recurso/recurso-listar/recurso-dialogo/recurso-dialogo.component';
import { RecursoService } from 'src/app/service/Recurso.service';

@Component({
  selector: 'app-a-recurso-dialogo',
  templateUrl: './a-recurso-dialogo.component.html',
  styleUrls: ['./a-recurso-dialogo.component.css']
})
export class ARecursoDialogoComponent implements OnInit{
  constructor(private pS: RecursoService,
    private dialogRef: MatDialogRef<ARecursoDialogoComponent>){  }
    ngOnInit(): void { }
    confirmar(estado: boolean) {
      this.pS.setConfirmaEliminacion(estado);
      this.dialogRef.close();
    }
}
