import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Asesor } from 'src/app/model/asesor';
import { Lenguaje } from 'src/app/model/lenguaje';
import { VideoTutorial } from 'src/app/model/videotutorial';
import { AsesorService } from 'src/app/service/asesor.service';
import { LenguajeService } from 'src/app/service/lenguaje.service';
import { VideoTutorialService } from 'src/app/service/videoTutorial.service';

@Component({
  selector: 'app-a-videotutoriales-insertar',
  templateUrl: './a-videotutoriales-insertar.component.html',
  styleUrls: ['./a-videotutoriales-insertar.component.css']
})
export class AVideotutorialesInsertarComponent implements OnInit{
  id:number=0;
  edicion:boolean=false;
  idasesor:any;

  form:FormGroup=new FormGroup({});
  video: VideoTutorial=new VideoTutorial();
  mensaje: string='';
  maxFecha: Date=moment().add(-1,'days').toDate();

  listaA: Asesor[] = [];
  idAsesorSeleccionado: number = 0;
  listaL: Lenguaje[] = [];
  idLenguajeSeleccionado: number = 0;

  constructor(private pS:VideoTutorialService, 
    private router:Router,
    private route:ActivatedRoute,
    private aS:AsesorService,
    private lS:LenguajeService){}

  ngOnInit(): void {
    this.aS.list().subscribe(data => { this.listaA = data });
    this.lS.list().subscribe(data => { this.listaL = data });

    this.route.params.subscribe((params: Params) => {
      this.idasesor = params['idasesor'];
    })


    this.route.params.subscribe((data:Params)=>{
      this.id=data['idvideo'];
      this.edicion=data['idvideo']!=null
      this.init();
    })

      this.form=new FormGroup({
        idVideoTutorial:new FormControl(),
        titulo:new FormControl(),
        fechaSubida:new FormControl(),
        url:new FormControl(),
        lenguaje:new FormControl(),
      })
  }
  aceptar(): void {
    this.video.idVideoTutorial = this.form.value['idVideoTutorial'];
    this.video.titulo = this.form.value['titulo'];
    this.video.fechaSubida = this.form.value['fechaSubida'];
    this.video.url = this.form.value['url'];
  
    if (this.idLenguajeSeleccionado > 0) {
      if (this.form.value['titulo'].length > 0) {
        let asesor = new Asesor();
        asesor.idAsesor = this.idasesor;
        this.video.asesor = asesor;
  
        let lenguaje = new Lenguaje();
        lenguaje.idLenguaje = this.idLenguajeSeleccionado;
        this.video.lenguaje = lenguaje;
  
        if(this.edicion){
          this.pS.updateID(this.video).subscribe(data=>{
            this.pS.listID(this.idasesor).subscribe(data=>{
              this.pS.setListID(data)
            }
            )
          }
          )
        }else{
          this.pS.insertID(this.video).subscribe(data=>{
            this.pS.listID(this.idasesor).subscribe(data=>{
              this.pS.setListID(data)
            }
            )
          }
          )
        }
  
        
  
  
  
  
  
        this.router.navigate(['/pages','homeasesor', this.idasesor, 'a-videotutoriales', this.idasesor])
      } else {
        this.mensaje = "Introduzca un título para el video, por favor";
      }
    } else {
      this.mensaje = "Por favor, seleccione un lenguaje";
    }
  }
  init(){
    if(this.edicion){
      this.pS.listIdID(this.id).subscribe(data=>{
        this.form=new FormGroup({
          idVideoTutorial:new FormControl(data.idVideoTutorial),
          titulo:new FormControl(data.titulo),
          fechaSubida:new FormControl(data.fechaSubida),
          url:new FormControl(data.url),
          lenguaje:new FormControl(data.lenguaje.tipoLeng),
        })
      })
    }
  }
}
