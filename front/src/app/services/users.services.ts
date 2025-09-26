import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import {Editora} from "../models/editora";
import { User } from '../models/user';
import {environment} from '../../environments/environments';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class UserService {
  private http = inject(HttpClient);
  private base = environment.apiBase;

  //pegar a quantidade de autores
  quantidade(): Observable<number> {
    return this.listar().pipe(
      map(users => users.length)  // transforma o array em um número
    );

  }
  
  listar():Observable<User[]> {
    const url = `${this.base}api/users/`;
    return this.http.get<User[]>(url);  
  }




}

