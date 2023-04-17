import { HttpClient } from '@angular/common/http';
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
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Estudiante[]>(this.url);
  }
  insert(estudiante: Estudiante) {
    return this.http.post(this.url, estudiante);
  }
  getlist() {
    return this.listaCambio.asObservable();
  }
  setlist(listaNueva: Estudiante[]) {
    this.listaCambio.next(listaNueva);
  }
}
