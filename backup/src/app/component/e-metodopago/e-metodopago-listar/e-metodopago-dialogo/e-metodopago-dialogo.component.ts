import { Component, OnInit } from '@angular/core';
import { MetodopagoService } from 'src/app/service/metodopago.service';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-e-metodopago-dialogo',
  templateUrl: './e-metodopago-dialogo.component.html',
  styleUrls: ['./e-metodopago-dialogo.component.css']
})
export class EMetodopagoDialogoComponent implements OnInit{
  constructor(
    private pS: MetodopagoService,
    private dialogoRef: MatDialogRef<EMetodopagoDialogoComponent>
  ) {}
  ngOnInit(): void {
    
  }
  confirmar(estado: boolean) {
    this.pS.setConfirmaEliminacionID(estado);
    this.dialogoRef.close();
  }
}
