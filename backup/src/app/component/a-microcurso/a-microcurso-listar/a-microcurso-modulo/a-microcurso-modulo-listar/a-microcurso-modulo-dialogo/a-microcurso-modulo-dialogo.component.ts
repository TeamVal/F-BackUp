import { Component, OnInit } from '@angular/core';
import { ModuloService } from 'src/app/service/Modulo.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-a-microcurso-modulo-dialogo',
  templateUrl: './a-microcurso-modulo-dialogo.component.html',
  styleUrls: ['./a-microcurso-modulo-dialogo.component.css']
})
export class AMicrocursoModuloDialogoComponent implements OnInit{
  constructor(private pS: ModuloService,
    private dialogRef: MatDialogRef<AMicrocursoModuloDialogoComponent>){  }
    ngOnInit(): void { }
    confirmar(estado: boolean) {
      this.pS.setConfirmaEliminacionID(estado);
      this.dialogRef.close();
    }
}
