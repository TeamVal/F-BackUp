import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsesorComponent } from './component/asesor/asesor.component';
import { AsesorInsertarComponent } from './component/asesor/asesor-insertar/asesor-insertar.component';

import { LenguajeComponent } from './component/lenguaje/lenguaje.component';
import { LenguajeInsertarComponent } from './component/lenguaje/lenguaje-insertar/lenguaje-insertar.component';

import { EstudianteInsertarComponent } from './component/estudiante/estudiante-insertar/estudiante-insertar.component';
import { EstudianteComponent } from './component/estudiante/estudiante.component';

const routes: Routes = [
  {
    path:'asesores',component:AsesorComponent, children:[
      {
        path:'asesoresinsertar',component:AsesorInsertarComponent,
      }
    ]
  },
  {
    path:'lenguajes',component:LenguajeComponent, children:[
      {
        path:'lenguajesinsertar',component:LenguajeInsertarComponent,
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
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
