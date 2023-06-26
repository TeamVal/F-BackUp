import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estudiante } from '../model/estudiante';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  private url = `${base_url}/estudiantes`;
  private listaCambio = new Subject<Estudiante[]>();
  private confirmaEliminacion = new Subject<Boolean>();
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem("token");

    return this.http.get<Estudiante[]>(this.url , {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insertnuevo(estudiante: Estudiante) {

    return this.http.post(`${this.url}/insert`, estudiante);
  }
  insert(estudiante: Estudiante) {
    let token = sessionStorage.getItem("token");

    return this.http.post(this.url, estudiante, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getlist() {
    return this.listaCambio.asObservable();
  }
  setlist(listaNueva: Estudiante[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id:number){
    let token = sessionStorage.getItem("token");

    return this.http.get<Estudiante>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }
  update(p:Estudiante){
    let token = sessionStorage.getItem("token");

    return this.http.put(this.url, p, {
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



  listbyuser(username:String){
    return this.http.get<Estudiante>(`${this.url}/listbyUser/${username}`)
  }
}
