import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Administrador } from '../model/administrador';


const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class AdministradorService {
  private url = `${base_url}/administradores`;
  private listaCambio = new Subject<Administrador[]>();
  private confirmaEliminacion = new Subject<Boolean>()

  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem("token");
    return this.http.get<Administrador[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insert(administrador: Administrador) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, administrador, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  setList(listaNueva: Administrador[]) {
    this.listaCambio.next(listaNueva);
  }
  getLista() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.get<Administrador>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  modificar(administrador: Administrador) {
    let token = sessionStorage.getItem("token");
    return this.http.put(this.url, administrador, {
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
