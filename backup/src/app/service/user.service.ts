import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../model/users';
const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${base_url}/users`;

  constructor(private http: HttpClient) {}

  insert(user: Users) {
    return this.http.post<Users>(`${this.url}/insert`, user);
  }

  last() {
    return this.http.get<Users>(`${this.url}/last`);
  }
}
