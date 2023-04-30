import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AsesorService } from 'src/app/service/asesor.service';

@Component({
  selector: 'app-asesor-dialogo',
  templateUrl: './asesor-dialogo.component.html',
  styleUrls: ['./asesor-dialogo.component.css']
})
export class AsesorDialogoComponent implements OnInit{
  constructor(private pS:AsesorService,private dialogRef: MatDialogRef<AsesorDialogoComponent>){

  }
  ngOnInit(): void {
      
  }
  confirmar(estado: boolean) {
    this.pS.setConfirmaEliminacion(estado);
    this.dialogRef.close();
  }
}
