import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsesorComponent } from './component/asesor/asesor.component';
import { AsesorListarComponent } from './component/asesor/asesor-listar/asesor-listar.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {  MatButtonModule } from '@angular/material/button';
import { AsesorInsertarComponent } from './component/asesor/asesor-insertar/asesor-insertar.component';

import { LenguajeComponent } from './component/lenguaje/lenguaje.component';
import { LenguajeListarComponent } from './component/lenguaje/lenguaje-listar/lenguaje-listar.component';
import { LenguajeInsertarComponent } from './component/lenguaje/lenguaje-insertar/lenguaje-insertar.component';

import { EstudianteComponent } from './component/estudiante/estudiante.component';
import { EstudianteListarComponent } from './component/estudiante/estudiante-listar/estudiante-listar.component';
import { EstudianteInsertarComponent } from './component/estudiante/estudiante-insertar/estudiante-insertar.component';

import { RecursolistarComponent } from './component/recurso/recurso-lista/recurso-lista.component';
import { RecursoComponent } from './component/recurso/recurso.component';
import { RecursoInsertarComponent } from './component/recurso/recurso-insertar/recurso-insertar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { EstudianteDialogoComponent } from './component/estudiante/estudiante-listar/estudiante-dialogo/estudiante-dialogo.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    AsesorComponent,
    AsesorListarComponent,
    AsesorInsertarComponent,
    LenguajeComponent,
    LenguajeListarComponent,
    LenguajeInsertarComponent,
    EstudianteComponent,
    EstudianteListarComponent,
    EstudianteInsertarComponent,
    EstudianteDialogoComponent,
    RecursoComponent, 
    RecursolistarComponent, 
    RecursoInsertarComponent, 
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
