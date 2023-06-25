import { Component, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModuloService } from 'src/app/service/Modulo.service';

@Component({
  selector: 'app-modulo-dialogo',
  templateUrl: './modulo-dialogo.component.html',
  styleUrls: ['./modulo-dialogo.component.css']
})
export class ModuloDialogoComponent  implements OnInit {
  constructor(private pS: ModuloService,
    private dialogRef: MatDialogRef<ModuloDialogoComponent>){  }
    ngOnInit(): void { }
    confirmar(estado: boolean) {
      this.pS.setConfirmaEliminacion(estado);
      this.dialogRef.close();
    }
}
