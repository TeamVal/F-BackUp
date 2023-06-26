import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Recurso } from '../model/Recurso';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { ContenidoDTO } from '../model/contenidoDTO';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class RecursoService {
  private  URL = `${base_url}/recursos`
  private listaCambio=new Subject<Recurso[]>();
  private confirmaEliminacion = new Subject<Boolean>()

  constructor(private http:HttpClient) { }
  list(){
    let token = sessionStorage.getItem("token");

    return this.http.get<Recurso[]>(this.URL, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
  insert(recurso: Recurso) {
    let token = sessionStorage.getItem("token");

    return this.http.post(this.URL, recurso, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Recurso[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    let token = sessionStorage.getItem("token");

    return this.http.get<Recurso>(`${this.URL}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  update(p: Recurso) {
    let token = sessionStorage.getItem("token");

    return this.http.put(this.URL + '/' + p.idrecurso, p, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  eliminar(id: number) {
    let token = sessionStorage.getItem("token");

    return this.http.delete(`${this.URL}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
 
  getConfirmaEliminacion() {
    return this.confirmaEliminacion.asObservable();
  }
  setConfirmaEliminacion(confirm: Boolean) {
    this.confirmaEliminacion.next(confirm);
  }



  get2tipoconteido(): Observable<ContenidoDTO[]> {
    let token = sessionStorage.getItem("token");

    return this.http.get<ContenidoDTO[]>(`${this.URL}/tipo-count`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });

  }
}