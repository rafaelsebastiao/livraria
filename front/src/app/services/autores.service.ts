import { Injectable, inject} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Autor } from "../models/Autor";
import { environments } from "../environments/environments";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class AutoresService{
    private http = inject(HttpClient)
    private base = environments.apiBase

    listar(): Observable<Autor[]>{
        const url = `${this.base}/api/autores`
        return this.http.get<Autor[]>(url)
    }
}

