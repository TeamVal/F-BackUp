import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

import { AsesorComponent } from './component/asesor/asesor.component';
import { AsesorListarComponent } from './component/asesor/asesor-listar/asesor-listar.component';
import { AsesorInsertarComponent } from './component/asesor/asesor-insertar/asesor-insertar.component';
import { AsesorDialogoComponent } from './component/asesor/asesor-listar/asesor-dialogo/asesor-dialogo.component';


import { LenguajeComponent } from './component/lenguaje/lenguaje.component';
import { LenguajeListarComponent } from './component/lenguaje/lenguaje-listar/lenguaje-listar.component';
import { LenguajeInsertarComponent } from './component/lenguaje/lenguaje-insertar/lenguaje-insertar.component';
import { LenguajeDialogoComponent } from './component/lenguaje/lenguaje-listar/lenguaje-dialogo/lenguaje-dialogo.component';


import { EstudianteComponent } from './component/estudiante/estudiante.component';
import { EstudianteListarComponent } from './component/estudiante/estudiante-listar/estudiante-listar.component';
import { EstudianteInsertarComponent } from './component/estudiante/estudiante-insertar/estudiante-insertar.component';

import { RecursolistarComponent } from './component/recurso/recurso-lista/recurso-lista.component';
import { RecursoComponent } from './component/recurso/recurso.component';
import { RecursoInsertarComponent } from './component/recurso/recurso-insertar/recurso-insertar.component';

import { NavbarComponent } from './component/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AsesorComponent,
    AsesorListarComponent,
    AsesorInsertarComponent,
    AsesorDialogoComponent,
    LenguajeComponent,
    LenguajeListarComponent,
    LenguajeInsertarComponent,
    LenguajeDialogoComponent,
    EstudianteComponent,
    EstudianteListarComponent,
    EstudianteInsertarComponent,
    RecursoComponent, 
    RecursolistarComponent, 
    RecursoInsertarComponent,
    NavbarComponent
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
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

