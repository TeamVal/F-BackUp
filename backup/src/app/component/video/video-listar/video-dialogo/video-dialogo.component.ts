import { Component, OnInit } from '@angular/core';
import { VideoTutorialService } from 'src/app/service/videoTutorial.service';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-video-dialogo',
  templateUrl: './video-dialogo.component.html',
  styleUrls: ['./video-dialogo.component.css']
})
export class VideoDialogoComponent implements OnInit{
  constructor(
    private pS: VideoTutorialService,
    private dialogoRef: MatDialogRef<VideoDialogoComponent>
  ) {}
  ngOnInit(): void {}
  confirmar(estado: boolean) {
    this.pS.setConfirmaEliminacion(estado);
    this.dialogoRef.close()
  }
}
