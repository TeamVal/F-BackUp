import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Asesor } from '../model/asesor';
import { Observable, Subject } from 'rxjs';
import { AsesorAsesoriaDTO } from '../model/asesorAsesoriaDTO';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class AsesorService {
  private url=`${base_url}/asesores`
  private listaCambio=new Subject<Asesor[]>
  constructor(private http:HttpClient) { }
  private confirmaEliminacion = new Subject<Boolean>()



  list(){
    let token = sessionStorage.getItem("token");
    return this.http.get<Asesor[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insertnuevo(asesor: Asesor) {

    return this.http.post(`${this.url}/insert`, asesor);
  }
  insert(asesor: Asesor){
    let token = sessionStorage.getItem("token");
    return this.http.post(this.url, asesor, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:Asesor[]){
    this.listaCambio.next(listaNueva);
  }
  listId(id:number){
    let token = sessionStorage.getItem("token");

    return this.http.get<Asesor>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    })
  }
  update(a:Asesor){
    let token = sessionStorage.getItem("token");

    return this.http.put(this.url, a, {
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

    return this.http.get<Asesor>(`${this.url}/listbyUser/${username}`)
  }


  getAsesorCountByAsesorias(): Observable<AsesorAsesoriaDTO[]> {
    let token = sessionStorage.getItem("token");

    return this.http.get<AsesorAsesoriaDTO[]>(`${this.url}/asesor-count`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });

  }
}

