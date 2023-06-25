import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Modulo } from '../model/Modulo';
import { Subject } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ModuloService {
  private url = `${base_url}/modulos`
  private listaCambioID = new Subject<Modulo[]>()
  private confirmaEliminacionID = new Subject<Boolean>()

  private listaCambio = new Subject<Modulo[]>()
  private confirmaEliminacion = new Subject<Boolean>()
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem("token");

    return this.http.get<Modulo[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
    }
 insert(modulo: Modulo) {
  let token = sessionStorage.getItem("token");

   return this.http.post(this.url, modulo, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
 }
 setList(listaNueva: Modulo[]) {
   this.listaCambio.next(listaNueva);
 }
 getLista() {
   return this.listaCambio.asObservable();
 }
 setConfirmaEliminacion(confirm: Boolean) {
   this.confirmaEliminacion.next(confirm);
 }
 listId(id: number) {
  let token = sessionStorage.getItem("token");

   return this.http.get<Modulo>(`${this.url}/${id}`, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
 }
 getConfirmaEliminacion() {
   return this.confirmaEliminacion.asObservable();
 }
 update(p: Modulo) {
  let token = sessionStorage.getItem("token");

   return this.http.put(this.url,p, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
 }
 eliminar(id: number) {
  let token = sessionStorage.getItem("token");

   return this.http.delete(`${this.url}/${id}`, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
  });
 }




  listID(idmicro:number) {
    let token = sessionStorage.getItem("token");

     return this.http.get<Modulo[]>(`${this.url}/listxidmicro/${idmicro}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
     }
  insertID(modulo: Modulo) {
    let token = sessionStorage.getItem("token");

    return this.http.post(this.url, modulo, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  setListID(listaNueva: Modulo[]) {
    this.listaCambioID.next(listaNueva);
  }
  getListaID() {
    return this.listaCambioID.asObservable();
  }
  setConfirmaEliminacionID(confirm: Boolean) {
    this.confirmaEliminacionID.next(confirm);
  }
  listIdID(id: number) {
    let token = sessionStorage.getItem("token");

    return this.http.get<Modulo>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getConfirmaEliminacionID() {
    return this.confirmaEliminacionID.asObservable();
  }
  updateID(p: Modulo) {
    let token = sessionStorage.getItem("token");

    return this.http.put(this.url,p, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  eliminarID(id: number) {
    let token = sessionStorage.getItem("token");

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
}
