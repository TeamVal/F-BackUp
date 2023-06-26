import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ModuloComponent } from './component/modulo/modulo.component';
import { LoginComponent } from './component/login/login.component';

import { LoginasesorComponent } from './component/login/loginasesor/loginasesor.component';
import { LoginadminComponent } from './component/login/loginadmin/loginadmin.component';
import { RegisterEstudianteComponent } from './component/register/register-estudiante/register-estudiante.component';
import { RegisterComponent } from './component/register/register.component';
import { RegisterAsesorComponent } from './component/register/register-asesor/register-asesor.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'pages',
    loadChildren: () => import('./component/pages.module').then((m) => m.PagesModule),
  },
    //loginestudiante
  {path: 'loginestudiante', component: LoginComponent},
  {
    path: 'register', component: RegisterComponent
  },
    //registerestudiante
  {path: 'registerestudiante', component: RegisterEstudianteComponent},//-----
      //loginestudiante
  {path: 'loginasesor', component: LoginasesorComponent},
  //registerestudiante
  {path: 'registerasesor', component: RegisterAsesorComponent},//-----


  
  {path: 'loginadmin', component: LoginadminComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
