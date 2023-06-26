import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { VideoTutorial } from '../model/videotutorial';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class VideoTutorialService {
  private url=`${base_url}/videostutoriales`

  private listaCambio=new Subject<VideoTutorial[]>();
  private confirmaEliminacion = new Subject<Boolean>()

  private listaCambioID=new Subject<VideoTutorial[]>();
  private confirmaEliminacionID = new Subject<Boolean>()

  constructor(private http:HttpClient) { }


  list(){
    let token = sessionStorage.getItem("token");

    return this.http.get<VideoTutorial[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insert(entidad: VideoTutorial) {
    let token = sessionStorage.getItem("token");

    return this.http.post(this.url, entidad, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: VideoTutorial[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    let token = sessionStorage.getItem("token");

    return this.http.get<VideoTutorial>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  update(e: VideoTutorial) {
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
    return this.http.get<VideoTutorial[]>(`${this.url}/listxidasesor/${idasesor}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insertID(entidad: VideoTutorial) {
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, entidad, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  getListID() {
    return this.listaCambioID.asObservable();
  }
  setListID(listaNueva: VideoTutorial[]) {
    this.listaCambioID.next(listaNueva);
  }

  updateID(e: VideoTutorial) {
    let token = sessionStorage.getItem("token");
    return this.http.put(this.url, e, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });

  }
  listIdID(id: number) {
    let token = sessionStorage.getItem("token");
    return this.http.get<VideoTutorial>(`${this.url}/${id}`, {
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