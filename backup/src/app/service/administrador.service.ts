import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Administrador[]>(this.url);
  }
  insert(administrador: Administrador) {
    return this.http.post(this.url, administrador);
  }

  setList(listaNueva: Administrador[]) {
    this.listaCambio.next(listaNueva);
  }
  getLista() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.http.get<Administrador>(`${this.url}/${id}`);
  }

  modificar(administrador: Administrador) {
    return this.http.put(this.url + "/" + administrador.id, administrador);
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
