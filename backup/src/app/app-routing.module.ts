import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsesorComponent } from './component/asesor/asesor.component';
import { AsesorInsertarComponent } from './component/asesor/asesor-insertar/asesor-insertar.component';

import { LenguajeComponent } from './component/lenguaje/lenguaje.component';
import { LenguajeInsertarComponent } from './component/lenguaje/lenguaje-insertar/lenguaje-insertar.component';

import { EstudianteInsertarComponent } from './component/estudiante/estudiante-insertar/estudiante-insertar.component';
import { EstudianteComponent } from './component/estudiante/estudiante.component';

import { RecursoComponent } from './component/recurso/recurso.component';
import { RecursoInsertarComponent } from './component/recurso/recurso-insertar/recurso-insertar.component';


const routes: Routes = [
  {
    path:'asesores',component:AsesorComponent, children:[
      {
        path:'asesoresinsertar',component:AsesorInsertarComponent,
      },
      {
        path:'edicion/:id',component:AsesorInsertarComponent,
      }
    ]
  },
  {
    path:'lenguajes',component:LenguajeComponent, children:[
      {
        path:'lenguajesinsertar',component:LenguajeInsertarComponent,
      },
      {
        path:'edicion/:id',component:LenguajeInsertarComponent,
      }
    ]
  },
  {
    path: 'estudiantes',
    component: EstudianteComponent,
    children: [
      {
        path: 'estudiantesinsertar',
        component: EstudianteInsertarComponent,
      },
      {
         path:'edicion/:id',component:EstudianteInsertarComponent,
      }
    ],
  },
  
  
  {
    path:'recursos',
    component:RecursoComponent,
    children:[

  {path:'recursosinsertar',component:RecursoInsertarComponent},
  {path:'editar/:id',component:RecursoInsertarComponent}
],
  }
  
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
