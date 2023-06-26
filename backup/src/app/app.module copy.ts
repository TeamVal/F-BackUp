import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginComponent } from './component/login/login.component';
import { LoginestudianteComponent } from './component/login/loginestudiante/loginestudiante.component';
import { LoginasesorComponent } from './component/login/loginasesor/loginasesor.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginadminComponent } from './component/login/loginadmin/loginadmin.component';
import { RegisterComponent } from './component/register/register.component';
import { RegisterEstudianteComponent } from './component/register/register-estudiante/register-estudiante.component';
import { RegisterAsesorComponent } from './component/register/register-asesor/register-asesor.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginestudianteComponent,
    LoginasesorComponent,
    LoginadminComponent,
    RegisterComponent,
    RegisterEstudianteComponent,
    RegisterAsesorComponent,
  ],
  imports: [
    BrowserModule, // Reemplaza BrowserModule por CommonModule
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
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
    MatPaginatorModule, // paginacion
    MatGridListModule,
    MatSnackBarModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}