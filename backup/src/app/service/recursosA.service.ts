import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { recusosA } from '../model/recursosA';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class RecursoAService {
  private url=`${base_url}/RecursoAprendizaje`
  private listaCambio=new Subject<recusosA[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<recusosA[]>(this.url);
  }
  insert(recur: recusosA) {
    return this.http.post(this.url, recur);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: recusosA[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id: number) {
    return this.http.get<recusosA>(`${this.url}/${id}`);
  }

  update(p: recusosA) {
    return this.http.put(this.url + '/' + p.id, p);
  }
}

