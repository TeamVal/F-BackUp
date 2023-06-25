import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Solicitud } from '../model/solicitud';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class SolicitudService{
    private url=`${base_url}/solicitudes`
    private listaCambioAsesor=new Subject<Solicitud[]>();
    private confirmaEliminacionAsesor = new Subject<Boolean>();

    private listaCambio=new Subject<Solicitud[]>();
    private confirmaEliminacion= new Subject<Boolean>();


    constructor(private http:HttpClient) { }

    
//SOLICITUDES PARA CADA ESTUDIANTE
    listID(idestudiante:number){
        let token = sessionStorage.getItem("token");

      return this.http.get<Solicitud[]>(`${this.url}/listidestudiante/${idestudiante}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
      });
    }
    insertID(metodo: Solicitud) {
        let token = sessionStorage.getItem("token");

      return this.http.post(this.url, metodo, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
      });
    }
    getListID() {
      return this.listaCambio.asObservable();
    }
    setListID(listaNueva: Solicitud[]) {
        this.listaCambio.next(listaNueva);
    }
    listIdID(id: number) {
        let token = sessionStorage.getItem("token");

        return this.http.get<Solicitud>(`${this.url}/${id}`, {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
        });
    }
    updateID(e: Solicitud) {
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
        return this.confirmaEliminacion.asObservable();
    }
    setConfirmaEliminacionID(estado: Boolean) {
        this.confirmaEliminacion.next(estado);
    }




//PARA QUE EL ASESOR VEA SOLO LAS SOLICITUDES NO ACEPTADAS
    listAsesor(){
        let token = sessionStorage.getItem("token");

      return this.http.get<Solicitud[]>(`${this.url}/listnoaceptadas`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
      });
    }
    insertAsesor(metodo: Solicitud) {
        let token = sessionStorage.getItem("token");

      return this.http.post(this.url, metodo, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
      });
    }
    getListAsesor() {
      return this.listaCambioAsesor.asObservable();
    }
    setListAsesor(listaNueva: Solicitud[]) {
        this.listaCambioAsesor.next(listaNueva);
    }
    listIdAsesor(id: number) {
        let token = sessionStorage.getItem("token");

        return this.http.get<Solicitud>(`${this.url}/${id}`, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
          });
    }
    updateAsesor(e: Solicitud) {
        let token = sessionStorage.getItem("token");

        return this.http.put(this.url, e, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
          });
    }
    eliminarAsesor(id: number) {
        let token = sessionStorage.getItem("token");

        return this.http.delete(`${this.url}/${id}`, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
          });
    }
    getConfirmaEliminacionAsesor() {
        return this.confirmaEliminacionAsesor.asObservable();
    }
    setConfirmaEliminacionAsesor(estado: Boolean) {
        this.confirmaEliminacionAsesor.next(estado);
    }


    
}