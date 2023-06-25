import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Metodopago } from '../model/metodopago';
import { BancoDTO } from '../model/bancoDTO';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class MetodopagoService{
    private url=`${base_url}/metodopagos`
    private listaCambio=new Subject<Metodopago[]>();
    private listaCambioID=new Subject<Metodopago[]>();
    private confirmaEliminacion = new Subject<Boolean>();
    private confirmaEliminacionID = new Subject<Boolean>();

    constructor(private http:HttpClient) { }
    list(){
      let token = sessionStorage.getItem("token");
      return this.http.get<Metodopago[]>(this.url, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
      } );
    }
    insert(metodo: Metodopago) {
      let token = sessionStorage.getItem("token");
      return this.http.post(this.url, metodo, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
      });
    }
  
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva: Metodopago[]) {
        this.listaCambio.next(listaNueva);
      }
      listId(id: number) {
        let token = sessionStorage.getItem("token");
        return this.http.get<Metodopago>(`${this.url}/${id}`, {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
        });
      }
    
      update(e: Metodopago) {
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
      listIdestudiante(idestudiante: number) {
        let token = sessionStorage.getItem("token");
        return this.http.get<Metodopago[]>(`${this.url}/listaporidestudiante/${idestudiante}`, {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
        });
      }
      getListID() {
        return this.listaCambioID.asObservable();
      }
      setListID(listaNueva: Metodopago[]) {
        this.listaCambioID.next(listaNueva);
      }
      getConfirmaEliminacionID() {
        return this.confirmaEliminacionID.asObservable();
      }
      setConfirmaEliminacionID(estado: Boolean) {
        this.confirmaEliminacionID.next(estado);
      }



      getBancoCountMetodo(): Observable<BancoDTO[]> {
        let token = sessionStorage.getItem("token");
    
        return this.http.get<BancoDTO[]>(`${this.url}/banco-count`, {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
        });
    
      }
}