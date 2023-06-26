import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Foro } from '../model/foro';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ForoService {
  private url=`${base_url}/foros`

  private listaCambio=new Subject<Foro[]>();
  private confirmaEliminacion = new Subject<Boolean>()

  private listaCambioID=new Subject<Foro[]>();
  private confirmaEliminacionID = new Subject<Boolean>()

  constructor(private http:HttpClient) { }


  list(){
    let token = sessionStorage.getItem("token");

    return this.http.get<Foro[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insert(entidad: Foro) {
    let token = sessionStorage.getItem("token");

    return this.http.post(this.url, entidad, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Foro[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    let token = sessionStorage.getItem("token");

    return this.http.get<Foro>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  update(e: Foro) {
    let token = sessionStorage.getItem("token");

    return this.http.put(this.url, e, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });

  }

  eliminar(id: number) {
    let token = sessionStorage.getItem("token");

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getConfirmaEliminacion() {
    return this.confirmaEliminacion.asObservable();
  }
  setConfirmaEliminacion(estado: Boolean) {
    this.confirmaEliminacion.next(estado);
  }




  
}