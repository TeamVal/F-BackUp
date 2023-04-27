import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Asesor } from '../model/asesor';
import { Subject } from 'rxjs';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class AsesorService {
  private url=`${base_url}/asesores`
  private listaCambio=new Subject<Asesor[]>
  constructor(private http:HttpClient) { }
  private confirmaEliminacion = new Subject<Boolean>()



  list(){
    return this.http.get<Asesor[]>(this.url);
  }
  insert(asesor: Asesor){
    return this.http.post(this.url, asesor)
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:Asesor[]){
    this.listaCambio.next(listaNueva);
  }
  listId(id:number){
    return this.http.get<Asesor>(`${this.url}/${id}`)
  }
  update(a:Asesor){
    return this.http.put(this.url+'/'+a.id, a);
  }
  eliminar(id: number) {

    return this.http.delete(`${this.url}/${id}`);
  }
  getConfirmaEliminacion() {
    return this.confirmaEliminacion.asObservable();
  }
  setConfirmaEliminacion(estado: Boolean) {
    this.confirmaEliminacion.next(estado);
  }
}

