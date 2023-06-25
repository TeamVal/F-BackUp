import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from "@angular/material/dialog";
import { MetodopagoService } from 'src/app/service/metodopago.service';

@Component({
  selector: 'app-metodopago-dialogo',
  templateUrl: './metodopago-dialogo.component.html',
  styleUrls: ['./metodopago-dialogo.component.css']
})
export class MetodopagoDialogoComponent implements OnInit{
  constructor(
    private pS: MetodopagoService,
    private dialogoRef: MatDialogRef<MetodopagoDialogoComponent>
  ) {}
  ngOnInit(): void {}
  confirmar(estado: boolean) {
    this.pS.setConfirmaEliminacion(estado);
    this.dialogoRef.close()
  }

}
