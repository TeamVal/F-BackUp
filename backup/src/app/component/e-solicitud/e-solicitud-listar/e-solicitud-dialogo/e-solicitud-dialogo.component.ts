import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SolicitudService } from 'src/app/service/solicitud.service';

@Component({
  selector: 'app-e-solicitud-dialogo',
  templateUrl: './e-solicitud-dialogo.component.html',
  styleUrls: ['./e-solicitud-dialogo.component.css']
})
export class ESolicitudDialogoComponent implements OnInit{
  constructor(
    private pS: SolicitudService,
    private dialogoRef: MatDialogRef<ESolicitudDialogoComponent>
  ) {}
  ngOnInit(): void {
    
  }
  confirmar(estado: boolean) {
    this.pS.setConfirmaEliminacionID(estado);
    this.dialogoRef.close();
  }
}
