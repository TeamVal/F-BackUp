import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {  MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';

import { NgModule } from '@angular/core';


import { MatGridListModule } from '@angular/material/grid-list';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AsesorComponent } from './asesor/asesor.component';
import { AsesorListarComponent } from './asesor/asesor-listar/asesor-listar.component';

import { LenguajeComponent } from './lenguaje/lenguaje.component';
import { LenguajeListarComponent } from './lenguaje/lenguaje-listar/lenguaje-listar.component';
import { LenguajeInsertarComponent } from './lenguaje/lenguaje-insertar/lenguaje-insertar.component';
import { LenguajeDialogoComponent } from './lenguaje/lenguaje-listar/lenguaje-dialogo/lenguaje-dialogo.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EstudianteListarComponent } from './estudiante/estudiante-listar/estudiante-listar.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { AdministradorListarComponent } from './administrador/administrador-listar/administrador-listar.component';
import { AdministradorInsertarComponent } from './administrador/administrador-insertar/administrador-insertar.component';
import { AdministradorDialogoComponent } from './administrador/administrador-listar/administrador-dialogo/administrador-dialogo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecursoDialogoComponent } from './recurso/recurso-listar/recurso-dialogo/recurso-dialogo.component';
import { VideoComponent } from './video/video.component';
import { VideoListarComponent } from './video/video-listar/video-listar.component';
import { VideoInsertarComponent } from './video/video-insertar/video-insertar.component';
import { VideoDialogoComponent } from './video/video-listar/video-dialogo/video-dialogo.component';
import { MicrocursoComponent } from './microcurso/microcurso.component';
import { MicrocursoListarComponent } from './microcurso/microcurso-listar/microcurso-listar.component';
import { MicrocursoInsertarComponent } from './microcurso/microcurso-insertar/microcurso-insertar.component';
import { MicrocursoDialogoComponent } from './microcurso/microcurso-listar/microcurso-dialogo/microcurso-dialogo.component';
import { MetodopagoComponent } from './metodopago/metodopago.component';
import { MetodopagoListarComponent } from './metodopago/metodopago-listar/metodopago-listar.component';
import { MetodopagoInsertarComponent } from './metodopago/metodopago-insertar/metodopago-insertar.component';
import { MetodopagoDialogoComponent } from './metodopago/metodopago-listar/metodopago-dialogo/metodopago-dialogo.component';
import { ModuloComponent } from './modulo/modulo.component';
import { ModuloCreaeditaComponent } from './modulo/modulo-creaedita/modulo-creaedita.component';
import { ModuloListarComponent } from './modulo/modulo-listar/modulo-listar.component';
import { ModuloDialogoComponent } from './modulo/modulo-listar/modulo-dialogo/modulo-dialogo.component';
import { RecursoComponent } from './recurso/recurso.component';
import { RecursoListarComponent } from './recurso/recurso-listar/recurso-listar.component';
import { RecursoCreaeditaComponent } from './recurso/recurso-creaedita/recurso-creaedita.component';

import { HomeEstudianteComponent } from './home-estudiante/home-estudiante.component';
import { HomeAsesorComponent } from './home-asesor/home-asesor.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { EVideotutorialesComponent } from './e-videotutoriales/e-videotutoriales.component';
import { EMetodopagoComponent } from './e-metodopago/e-metodopago.component';
import { EMetodopagoDialogoComponent } from './e-metodopago/e-metodopago-listar/e-metodopago-dialogo/e-metodopago-dialogo.component';
import { EMetodopagoInsertarComponent } from './e-metodopago/e-metodopago-insertar/e-metodopago-insertar.component';
import { EMetodopagoListarComponent } from './e-metodopago/e-metodopago-listar/e-metodopago-listar.component';
import { EMicrocursosComponent } from './e-microcursos/e-microcursos.component';
import { AVideotutorialesComponent } from './a-videotutoriales/a-videotutoriales.component';
import { AVideotutorialesListarComponent } from './a-videotutoriales/a-videotutoriales-listar/a-videotutoriales-listar.component';
import { AVideotutorialesInsertarComponent } from './a-videotutoriales/a-videotutoriales-insertar/a-videotutoriales-insertar.component';
import { AVideotutorialesDialogoComponent } from './a-videotutoriales/a-videotutoriales-listar/a-videotutoriales-dialogo/a-videotutoriales-dialogo.component';
import { AMicrocursoComponent } from './a-microcurso/a-microcurso.component';
import { AMicrocursoListarComponent } from './a-microcurso/a-microcurso-listar/a-microcurso-listar.component';
import { AMicrocursoInsertarComponent } from './a-microcurso/a-microcurso-insertar/a-microcurso-insertar.component';
import { AMicrocursoDialogoComponent } from './a-microcurso/a-microcurso-listar/a-microcurso-dialogo/a-microcurso-dialogo.component';
import { ARecursoComponent } from './a-recurso/a-recurso.component';
import { ARecursoListarComponent } from './a-recurso/a-recurso-listar/a-recurso-listar.component';
import { ARecursoInsertarComponent } from './a-recurso/a-recurso-insertar/a-recurso-insertar.component';
import { ARecursoDialogoComponent } from './a-recurso/a-recurso-listar/a-recurso-dialogo/a-recurso-dialogo.component';
import { AMicrocursoModuloComponent } from './a-microcurso/a-microcurso-listar/a-microcurso-modulo/a-microcurso-modulo.component';
import { AMicrocursoModuloListarComponent } from './a-microcurso/a-microcurso-listar/a-microcurso-modulo/a-microcurso-modulo-listar/a-microcurso-modulo-listar.component';
import { AMicrocursoModuloInsertarComponent } from './a-microcurso/a-microcurso-listar/a-microcurso-modulo/a-microcurso-modulo-insertar/a-microcurso-modulo-insertar.component';
import { AMicrocursoModuloDialogoComponent } from './a-microcurso/a-microcurso-listar/a-microcurso-modulo/a-microcurso-modulo-listar/a-microcurso-modulo-dialogo/a-microcurso-modulo-dialogo.component';
import { EMicrocursosModuloComponent } from './e-microcursos/e-microcursos-modulo/e-microcursos-modulo.component';
import { EForoComponent } from './e-foro/e-foro.component';
import { EForoListarComponent } from './e-foro/e-foro-listar/e-foro-listar.component';
import { EForoInsertarComponent } from './e-foro/e-foro-insertar/e-foro-insertar.component';
import { EForoDialogoComponent } from './e-foro/e-foro-listar/e-foro-dialogo/e-foro-dialogo.component';
import { EComentarioComponent } from './e-comentario/e-comentario.component';
import { EComentarioListarComponent } from './e-comentario/e-comentario-listar/e-comentario-listar.component';
import { EComentarioInsertarComponent } from './e-comentario/e-comentario-insertar/e-comentario-insertar.component';
import { EComentarioDialogoComponent } from './e-comentario/e-comentario-listar/e-comentario-dialogo/e-comentario-dialogo.component';
import { ESolicitudComponent } from './e-solicitud/e-solicitud.component';
import { ESolicitudListarComponent } from './e-solicitud/e-solicitud-listar/e-solicitud-listar.component';
import { ESolicitudInsertarComponent } from './e-solicitud/e-solicitud-insertar/e-solicitud-insertar.component';
import { ESolicitudDialogoComponent } from './e-solicitud/e-solicitud-listar/e-solicitud-dialogo/e-solicitud-dialogo.component';
import { ASolicitudComponent } from './a-solicitud/a-solicitud.component';
import { AAsesoriaComponent } from './a-asesoria/a-asesoria.component';
import { AAsesoriainsertarComponent } from './a-asesoriainsertar/a-asesoriainsertar.component';
import { MatFormFieldModule } from '@angular/material/form-field';

import { PagesRoutingModule } from './pages-routing.module';

import { CommonModule } from '@angular/common';
import { ReportesComponent } from './reportes/reportes.component';
import { AsesorAsesoriaComponent } from './reportes/asesor-asesoria/asesor-asesoria.component';
import { LenguajeMicroComponent } from './reportes/lenguaje-micro/lenguaje-micro.component';
import { EAsesoriaComponent } from './e-asesoria/e-asesoria.component';
import { EAsesoriaDialogoComponent } from './e-asesoria/e-asesoria-dialogo/e-asesoria-dialogo.component';
import { ContenidoComponent } from './reportes/contenido/contenido.component';
import { BancometodComponent } from './reportes/bancometod/bancometod.component';


@NgModule({
  declarations: [
    AsesorComponent,
    AsesorListarComponent,
    LenguajeComponent,
    LenguajeListarComponent,
    LenguajeInsertarComponent,
    LenguajeDialogoComponent,
    EstudianteComponent,
    EstudianteListarComponent,

    AdministradorComponent,
    AdministradorListarComponent,
    AdministradorInsertarComponent,
    AdministradorDialogoComponent,
    NavbarComponent,
    RecursoDialogoComponent,
    VideoComponent,
    VideoListarComponent,
    VideoInsertarComponent,
    VideoDialogoComponent,
    MicrocursoComponent,
    MicrocursoListarComponent,
    MicrocursoInsertarComponent,
    MicrocursoDialogoComponent,
    MetodopagoComponent,
    MetodopagoListarComponent,
    MetodopagoInsertarComponent,
    MetodopagoDialogoComponent,
    ModuloComponent,
    ModuloCreaeditaComponent,
    ModuloListarComponent,
    ModuloDialogoComponent,
    RecursoComponent,
    RecursoListarComponent,
    RecursoCreaeditaComponent,
    RecursoDialogoComponent,


    HomeEstudianteComponent,
    HomeAsesorComponent,
    HomeAdminComponent,


    EVideotutorialesComponent,

    EMetodopagoComponent,
    EMetodopagoDialogoComponent,
    EMetodopagoInsertarComponent,
    EMetodopagoListarComponent,
    EMicrocursosComponent,
    AVideotutorialesComponent,
    AVideotutorialesListarComponent,
    AVideotutorialesInsertarComponent,
    AVideotutorialesDialogoComponent,
    AMicrocursoComponent,
    AMicrocursoListarComponent,
    AMicrocursoInsertarComponent,
    AMicrocursoDialogoComponent,
    ARecursoComponent,
    ARecursoListarComponent,
    ARecursoInsertarComponent,
    ARecursoDialogoComponent,
    AMicrocursoModuloComponent,
    AMicrocursoModuloListarComponent,
    AMicrocursoModuloInsertarComponent,
    AMicrocursoModuloDialogoComponent,
    EMicrocursosModuloComponent,
    EForoComponent,
    EForoListarComponent,
    EForoInsertarComponent,
    EForoDialogoComponent,
    EComentarioComponent,
    EComentarioListarComponent,
    EComentarioInsertarComponent,
    EComentarioDialogoComponent,
    ESolicitudComponent,
    ESolicitudListarComponent,
    ESolicitudInsertarComponent,
    ESolicitudDialogoComponent,
    ASolicitudComponent,
    AAsesoriaComponent,
    AAsesoriainsertarComponent,
    ReportesComponent,
    AsesorAsesoriaComponent,
    LenguajeMicroComponent,
    EAsesoriaComponent,
    EAsesoriaDialogoComponent,
    ContenidoComponent,
    BancometodComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatPaginatorModule, //paginacion
    MatGridListModule,
    MatSnackBarModule,
    PagesRoutingModule,
    
  ],
  exports: [
    MatFormFieldModule
    ]
})
export class PagesModule { }

