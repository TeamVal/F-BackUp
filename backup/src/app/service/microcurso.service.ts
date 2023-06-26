import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { MicroCurso } from '../model/microcurso';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class MicroCursoService {
  private url=`${base_url}/microcursos`

  private listaCambio=new Subject<MicroCurso[]>();
  private confirmaEliminacion = new Subject<Boolean>()
  private listaCambioID=new Subject<MicroCurso[]>();
  private confirmaEliminacionID = new Subject<Boolean>()
  constructor(private http:HttpClient) { }



  list(){
    let token = sessionStorage.getItem("token");

    return this.http.get<MicroCurso[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insert(entidad: MicroCurso) {
    let token = sessionStorage.getItem("token");

    return this.http.post(this.url, entidad, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: MicroCurso[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    let token = sessionStorage.getItem("token");

    return this.http.get<MicroCurso>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  update(e: MicroCurso) {
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




  listID(idasesor: number){
    let token = sessionStorage.getItem("token");

    return this.http.get<MicroCurso[]>(`${this.url}/listxidasesor/${idasesor}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insertID(entidad: MicroCurso) {
    let token = sessionStorage.getItem("token");

    return this.http.post(this.url, entidad, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  getListID() {
    return this.listaCambioID.asObservable();
  }
  setListID(listaNueva: MicroCurso[]) {
    this.listaCambioID.next(listaNueva);
  }
  listIdID(id: number) {
    let token = sessionStorage.getItem("token");

    return this.http.get<MicroCurso>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  updateID(e: MicroCurso) {
    let token = sessionStorage.getItem("token");
    return this.http.put(this.url, e, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });

  }

  eliminarID(id: number) {
    let token = sessionStorage.getItem("token");

    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  getConfirmaEliminacionID() {
    return this.confirmaEliminacionID.asObservable();
  }
  setConfirmaEliminacionID(estado: Boolean) {
    this.confirmaEliminacionID.next(estado);
  }
}