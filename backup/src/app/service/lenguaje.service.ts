import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Lenguaje } from '../model/lenguaje';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class LenguajeService {

  private url=`${base_url}/lenguajes`
  private listaCambio= new Subject<Lenguaje[]>
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Lenguaje[]>(this.url);
  }
  insert(lenguaje: Lenguaje){
    return this.http.post(this.url, lenguaje)
  }
getList(){
    return this.listaCambio.asObservable();
  }
setList(listaNueva:Lenguaje[]){
    this.listaCambio.next(listaNueva);
  }
}
