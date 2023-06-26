import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Comentario } from '../model/comentario';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private url=`${base_url}/comentarios`



  private listaCambioID=new Subject<Comentario[]>();
  private confirmaEliminacionID = new Subject<Boolean>()

  constructor(private http:HttpClient) { }


  listID(idcomentario:number){
    let token = sessionStorage.getItem("token");

    return this.http.get<Comentario[]>(`${this.url}/listxIdforo/${idcomentario}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insertID(entidad: Comentario) {
    let token = sessionStorage.getItem("token");

    return this.http.post(this.url, entidad, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  getListID() {
    return this.listaCambioID.asObservable();
  }
  setListID(listaNueva: Comentario[]) {
    this.listaCambioID.next(listaNueva);
  }
  listIdID(id: number) {
    let token = sessionStorage.getItem("token");

    return this.http.get<Comentario>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  updateID(e: Comentario) {
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