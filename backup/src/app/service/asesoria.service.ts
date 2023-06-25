import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Asesoria } from '../model/asesoria';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class AsesoriaService{
    private url=`${base_url}/asesorias`

    private listaCambio=new Subject<Asesoria[]>();
    private confirmaEliminacion= new Subject<Boolean>();

    private listaCambioID=new Subject<Asesoria[]>();
    private confirmaEliminacionID= new Subject<Boolean>();


    constructor(private http:HttpClient) { }

    
//asesorias PARA CADA asesor
    listID(idasesor:number){
      let token = sessionStorage.getItem("token");
      return this.http.get<Asesoria[]>(`${this.url}/listidasesor/${idasesor}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
      });
    }
    insertID(metodo: Asesoria) {
      let token = sessionStorage.getItem("token");

      return this.http.post(this.url, metodo, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
      });
    }
    getListID() {
      return this.listaCambioID.asObservable();
    }
    setListID(listaNueva: Asesoria[]) {
        this.listaCambioID.next(listaNueva);
    }
    listIdID(id: number) {
      let token = sessionStorage.getItem("token");

        return this.http.get<Asesoria>(`${this.url}/${id}`, {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
        });
    }
    updateID(e: Asesoria) {
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





//asesorias PARA CADA estudiante
    list(idEstudiante:number){
      let token = sessionStorage.getItem("token");
      return this.http.get<Asesoria[]>(`${this.url}/listidestudiante/${idEstudiante}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
      });
    }
    insert(metodo: Asesoria) {
      let token = sessionStorage.getItem("token");

      return this.http.post(this.url, metodo, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
      });
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva: Asesoria[]) {
        this.listaCambio.next(listaNueva);
    }
    listId(id: number) {
      let token = sessionStorage.getItem("token");

        return this.http.get<Asesoria>(`${this.url}/${id}`, {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
        });
    }
    update(e: Asesoria) {
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