import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { VideoTutorialService } from 'src/app/service/videoTutorial.service';

@Component({
  selector: 'app-a-videotutoriales-dialogo',
  templateUrl: './a-videotutoriales-dialogo.component.html',
  styleUrls: ['./a-videotutoriales-dialogo.component.css']
})
export class AVideotutorialesDialogoComponent implements OnInit{
  constructor(
    private pS: VideoTutorialService,
    private dialogoRef: MatDialogRef<AVideotutorialesDialogoComponent>
  ) {}
  ngOnInit(): void {}
  confirmar(estado: boolean) {
    this.pS.setConfirmaEliminacionID(estado);
    this.dialogoRef.close()
  }
}
