import { Component,OnInit } from '@angular/core';
import { VideoTutorial } from 'src/app/model/videotutorial';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment'
import { VideoTutorialService } from 'src/app/service/videoTutorial.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Asesor } from 'src/app/model/asesor';
import { Lenguaje } from 'src/app/model/lenguaje';
import { AsesorService } from 'src/app/service/asesor.service';
import { LenguajeService } from 'src/app/service/lenguaje.service';

@Component({
  selector: 'app-video-insertar',
  templateUrl: './video-insertar.component.html',
  styleUrls: ['./video-insertar.component.css']
})
export class VideoInsertarComponent implements OnInit{
  id:number=0;
  edicion:boolean=false;

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

    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null
      this.init();
    })

      this.form=new FormGroup({
        idVideoTutorial:new FormControl(),
        titulo:new FormControl(),
        fechaSubida:new FormControl(),
        url:new FormControl(),
        asesor:new FormControl(),
        lenguaje:new FormControl(),
      })
  }
  aceptar(): void {
    this.video.idVideoTutorial = this.form.value['idVideoTutorial'];
    this.video.titulo = this.form.value['titulo'];
    this.video.fechaSubida = this.form.value['fechaSubida'];
    this.video.url = this.form.value['url'];
  
    if (this.idAsesorSeleccionado > 0 && this.idLenguajeSeleccionado > 0) {
      if (this.form.value['titulo'].length > 0) {
        let asesor = new Asesor();
        asesor.idAsesor = this.idAsesorSeleccionado;
        this.video.asesor = asesor;
  
        let lenguaje = new Lenguaje();
        lenguaje.idLenguaje = this.idLenguajeSeleccionado;
        this.video.lenguaje = lenguaje;
  
        if(this.edicion){
          this.pS.update(this.video).subscribe(data=>{
            this.pS.list().subscribe(data=>{
              this.pS.setList(data)
            }
            )
          }
          )
        }else{
          this.pS.insert(this.video).subscribe(data=>{
            this.pS.list().subscribe(data=>{
              this.pS.setList(data)
            }
            )
          }
          )
        }
  
        
  
  
  
  
  
        this.router.navigate(['/pages/homeadmin/videotutoriales'])
      } else {
        this.mensaje = "Introduzca un título para el video, por favor";
      }
    } else {
      this.mensaje = "Por favor, seleccione un asesor y un lenguaje";
    }
  }
  init(){
    if(this.edicion){
      this.pS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          idVideoTutorial:new FormControl(data.idVideoTutorial),
          titulo:new FormControl(data.titulo),
          fechaSubida:new FormControl(data.fechaSubida),
          url:new FormControl(data.url),
          asesor:new FormControl(data.asesor.nom),
          lenguaje:new FormControl(data.lenguaje.tipoLeng),
        })
      })
    }
  }
}
