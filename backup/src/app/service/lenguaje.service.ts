import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Lenguaje } from '../model/lenguaje';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class LenguajeService {

  private url=`${base_url}/lenguajes`
  private listaCambio= new Subject<Lenguaje[]>
  private confirmaEliminacion = new Subject<Boolean>()
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Lenguaje[]>(this.url);
  }
  insert(lenguaje: Lenguaje){
    return this.http.post(this.url, lenguaje)
  }
getList(){
    return this.listaCambio.asObservable();
  }
setList(listaNueva:Lenguaje[]){
    this.listaCambio.next(listaNueva);
  }
  listId(id:number){
    return this.http.get<Lenguaje>(`${this.url}/${id}`)
  }
  update(l:Lenguaje){
    return this.http.put(this.url+'/'+l.id, l);
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
