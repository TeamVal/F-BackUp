import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsesorComponent } from './component/asesor/asesor.component';
import { AsesorInsertarComponent } from './component/asesor/asesor-insertar/asesor-insertar.component';

const routes: Routes = [
  {
    path:'asesores',component:AsesorComponent, children:[
      {
        path:'asesoresinsertar',component:AsesorInsertarComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
