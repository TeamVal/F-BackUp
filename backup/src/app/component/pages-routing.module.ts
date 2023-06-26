import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ASolicitudComponent } from './a-solicitud/a-solicitud.component';
import { AAsesoriaComponent } from './a-asesoria/a-asesoria.component';
import { AAsesoriainsertarComponent } from './a-asesoriainsertar/a-asesoriainsertar.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AsesorComponent } from './asesor/asesor.component';
import { LenguajeInsertarComponent } from './lenguaje/lenguaje-insertar/lenguaje-insertar.component';
import { LenguajeComponent } from './lenguaje/lenguaje.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { AdministradorInsertarComponent } from './administrador/administrador-insertar/administrador-insertar.component';
import { VideoComponent } from './video/video.component';
import { VideoInsertarComponent } from './video/video-insertar/video-insertar.component';
import { MicrocursoComponent } from './microcurso/microcurso.component';
import { MicrocursoInsertarComponent } from './microcurso/microcurso-insertar/microcurso-insertar.component';
import { MetodopagoComponent } from './metodopago/metodopago.component';
import { MetodopagoInsertarComponent } from './metodopago/metodopago-insertar/metodopago-insertar.component';
import { RecursoComponent } from './recurso/recurso.component';
import { RecursoCreaeditaComponent } from './recurso/recurso-creaedita/recurso-creaedita.component';
import { ModuloComponent } from './modulo/modulo.component';
import { ModuloCreaeditaComponent } from './modulo/modulo-creaedita/modulo-creaedita.component';
import { HomeEstudianteComponent } from './home-estudiante/home-estudiante.component';
import { EMetodopagoComponent } from './e-metodopago/e-metodopago.component';
import { EMetodopagoListarComponent } from './e-metodopago/e-metodopago-listar/e-metodopago-listar.component';
import { EMetodopagoInsertarComponent } from './e-metodopago/e-metodopago-insertar/e-metodopago-insertar.component';
import { EVideotutorialesComponent } from './e-videotutoriales/e-videotutoriales.component';
import { EMicrocursosComponent } from './e-microcursos/e-microcursos.component';
import { EMicrocursosModuloComponent } from './e-microcursos/e-microcursos-modulo/e-microcursos-modulo.component';
import { EForoComponent } from './e-foro/e-foro.component';
import { EForoListarComponent } from './e-foro/e-foro-listar/e-foro-listar.component';
import { EForoInsertarComponent } from './e-foro/e-foro-insertar/e-foro-insertar.component';
import { EComentarioComponent } from './e-comentario/e-comentario.component';
import { EComentarioListarComponent } from './e-comentario/e-comentario-listar/e-comentario-listar.component';
import { EComentarioInsertarComponent } from './e-comentario/e-comentario-insertar/e-comentario-insertar.component';
import { ESolicitudComponent } from './e-solicitud/e-solicitud.component';
import { ESolicitudListarComponent } from './e-solicitud/e-solicitud-listar/e-solicitud-listar.component';
import { ESolicitudInsertarComponent } from './e-solicitud/e-solicitud-insertar/e-solicitud-insertar.component';
import { HomeAsesorComponent } from './home-asesor/home-asesor.component';
import { AVideotutorialesComponent } from './a-videotutoriales/a-videotutoriales.component';
import { AVideotutorialesListarComponent } from './a-videotutoriales/a-videotutoriales-listar/a-videotutoriales-listar.component';
import { AVideotutorialesInsertarComponent } from './a-videotutoriales/a-videotutoriales-insertar/a-videotutoriales-insertar.component';
import { AMicrocursoComponent } from './a-microcurso/a-microcurso.component';
import { AMicrocursoListarComponent } from './a-microcurso/a-microcurso-listar/a-microcurso-listar.component';
import { AMicrocursoInsertarComponent } from './a-microcurso/a-microcurso-insertar/a-microcurso-insertar.component';
import { ARecursoComponent } from './a-recurso/a-recurso.component';
import { ARecursoListarComponent } from './a-recurso/a-recurso-listar/a-recurso-listar.component';
import { ARecursoInsertarComponent } from './a-recurso/a-recurso-insertar/a-recurso-insertar.component';
import { AMicrocursoModuloComponent } from './a-microcurso/a-microcurso-listar/a-microcurso-modulo/a-microcurso-modulo.component';
import { AMicrocursoModuloListarComponent } from './a-microcurso/a-microcurso-listar/a-microcurso-modulo/a-microcurso-modulo-listar/a-microcurso-modulo-listar.component';
import { AMicrocursoModuloInsertarComponent } from './a-microcurso/a-microcurso-listar/a-microcurso-modulo/a-microcurso-modulo-insertar/a-microcurso-modulo-insertar.component';
import { GuardService } from '../service/guard.service';
import { ReportesComponent } from './reportes/reportes.component';
import { AsesorAsesoriaComponent } from './reportes/asesor-asesoria/asesor-asesoria.component';
import { LenguajeMicroComponent } from './reportes/lenguaje-micro/lenguaje-micro.component';
import { EAsesoriaComponent } from './e-asesoria/e-asesoria.component';


const routes: Routes = [
  
  //home admin
  {path: 'homeadmin', component: HomeAdminComponent, children:[
    {
      path:'asesores',component:AsesorComponent
    },
    {
      path:'lenguajes',component:LenguajeComponent, children:[
        {path:'lenguajesinsertar',component:LenguajeInsertarComponent,},
        {path:'edicion/:id',component:LenguajeInsertarComponent,}
      ],canActivate:[GuardService]
    },
    {
      path: 'estudiantes', component: EstudianteComponent,
    },
    {
      path:'administradores', component:AdministradorComponent,
      children:[
        { path:'administradoresinsertar',component:AdministradorInsertarComponent},
        { path:'edicion/:id',component:AdministradorInsertarComponent}
      ],canActivate:[GuardService]
    },
    {
      path:'videotutoriales', component:VideoComponent,
      children:[
        { path:'videotutorialesinsertar',component:VideoInsertarComponent},
        { path:'edicion/:id',component:VideoInsertarComponent}
      ],canActivate:[GuardService]
    },
    {
      path:'microcursos', component:MicrocursoComponent,
      children:[
        { path:'microcursosinsertar',component:MicrocursoInsertarComponent},
        { path:'edicion/:id',component:MicrocursoInsertarComponent}
      ],canActivate:[GuardService]
    },
    {
      path:'metodopagos', component:MetodopagoComponent,
      children:[
        { path:'metodopagosinsertar',component:MetodopagoInsertarComponent},
        { path:'edicion/:id',component:MetodopagoInsertarComponent}
      ],canActivate:[GuardService]
    },
    {
      path: 'recursos', component:RecursoComponent, children: [
        { path: 'nuevo', component: RecursoCreaeditaComponent },
        { path: 'editar/:id', component: RecursoCreaeditaComponent }
      ],canActivate:[GuardService]
    },
    {path: 'modulos', component: ModuloComponent, children: [
      { path: 'nuevo', component: ModuloCreaeditaComponent },
      { path: 'editar/:id', component: ModuloCreaeditaComponent }
    ],canActivate:[GuardService]
    },
    {
      path:'reportes',component:ReportesComponent,children:[
  
      { path: 'asesor-count-asesoria', component: AsesorAsesoriaComponent },
      { path: 'lenguaje-count-micro', component: LenguajeMicroComponent },
      { path: 'contenido', component: LenguajeMicroComponent },

    ]
    }
  ]
  }
  //E S T U D I A N T E
  ,
  //homeestudiante
  {path: 'homeestudiante/:idestudiante', component: HomeEstudianteComponent, 
  children: [
    //metodopagos
    { path:'e-metodopago/:idestudiante', component:EMetodopagoComponent,
      children:[
      { path: '',  component:EMetodopagoListarComponent},
      { path:'e-metodopagoinsertar/:idestudiante',component:EMetodopagoInsertarComponent},
      { path:'edicion/:idestudiante/:idmetodopago',component:EMetodopagoInsertarComponent}
    ],canActivate:[GuardService] },
    //videotutoriales
    { path: 'e-videotutoriales', component: EVideotutorialesComponent ,canActivate:[GuardService]},
    //microcursos
    { path: 'e-microcursos/:idestudiante', component: EMicrocursosComponent,canActivate:[GuardService]},
    { path: 'modulo/:idestudiante/:idmicro',  component:EMicrocursosModuloComponent, canActivate:[GuardService]},

    //foro
    { path:'e-foro/:idestudiante', component:EForoComponent,
      children:[
      { path: '',  component:EForoListarComponent},
      { path:'e-foroinsertar/:idestudiante',component:EForoInsertarComponent},
      { path:'edicion/:idestudiante/:idforo',component:EForoInsertarComponent}
    ],canActivate:[GuardService] },
    //comentarioforo
    { path:'e-comentario/:idestudiante/:idforo', component:EComentarioComponent,
      children:[
      { path: '',  component:EComentarioListarComponent},
      { path:'e-comentarioinsertar/:idestudiante/:idforo',component:EComentarioInsertarComponent},
      { path:'edicion/:idestudiante/:idforo/:idcomentario',component:EComentarioInsertarComponent}
    ],canActivate:[GuardService] },
    //solicitud de asesoria
    { path:'e-solicitud/:idestudiante', component:ESolicitudComponent,
      children:[
      { path: '',  component:ESolicitudListarComponent},
      { path:'e-solicitudinsertar/:idestudiante',component:ESolicitudInsertarComponent},
      { path:'edicion/:idestudiante/:idsolicitud',component:ESolicitudInsertarComponent}
    ],canActivate:[GuardService] },
    { path:'e-asesoria/:idestudiante', component:EAsesoriaComponent , canActivate:[GuardService]},

  ]
  }
  //A S E S O R
  ,

  //homeestudiante
  {path: 'homeasesor/:idasesor', component: HomeAsesorComponent, 
  children: [
    //videotutoriales
    { path:'a-videotutoriales/:idasesor', component:AVideotutorialesComponent,
      children:[
      { path: '',  component:AVideotutorialesListarComponent},
      { path:'a-videotutorialesinsertar/:idasesor',component:AVideotutorialesInsertarComponent},
      { path:'edicion/:idasesor/:idvideo',component:AVideotutorialesInsertarComponent}
    ],canActivate:[GuardService] },
    //microcurso
    { path:'a-microcurso/:idasesor', component:AMicrocursoComponent,
      children:[
      { path: '',  component:AMicrocursoListarComponent},
      { path:'a-microcursoinsertar/:idasesor',component:AMicrocursoInsertarComponent},
      { path:'edicion/:idasesor/:idmicro',component:AMicrocursoInsertarComponent}
    ],canActivate:[GuardService] },
    //recursos
    { path:'a-recurso/:idasesor', component:ARecursoComponent,
      children:[
      { path: '',  component:ARecursoListarComponent},
      { path:'a-recursoinsertar/:idasesor',component:ARecursoInsertarComponent},
      { path:'edicion/:idasesor/:idrecurso',component:ARecursoInsertarComponent}
    ],canActivate:[GuardService] },
    //Modulo
    { path:'a-modulo/:idasesor/:idmicro', component:AMicrocursoModuloComponent,
      children:[
      { path: '',  component:AMicrocursoModuloListarComponent},
      { path:'a-moduloinsertar/:idasesor/:idmicro',component:AMicrocursoModuloInsertarComponent},
      { path:'edicion/:idasesor/:idmicro/:idmodulo',component:AMicrocursoModuloInsertarComponent}
    ],canActivate:[GuardService] },
    //solicitud de asesoria
    { path:'a-solicitud/:idasesor', component:ASolicitudComponent , canActivate:[GuardService]},
    //Asesoria
    { path:'a-asesoria/:idasesor', component:AAsesoriaComponent , canActivate:[GuardService]},
    //Aceptar asesoria
    { path:'a-asesoriainsertar/:idasesor/:idsolicitud',component:AAsesoriainsertarComponent, canActivate:[GuardService]},

  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
