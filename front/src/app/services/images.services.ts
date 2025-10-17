import {Injectable, inject} from "@angular/core"
import {HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from "../../environments/environments"


export type Image = {
    id: number;
    imagem: string;
    url: string;
    criado_em:string;
}


@Injectable({providedIn: 'root'})
export class ImagesService{
    private http = inject(HttpClient)
    private base = `${environment.apiBase}/api/imagens`

    private headers(): HttpHeaders{
        const token = localStorage.getItem('acess')
        return token ? new HttpHeaders({Autorization: `Bear${token}`}) : new HttpHeaders()
    }
    
    listar(): Observable<Image[]>{
        return this.http.get<Image[]>(this.base, {headers: this.headers()})   
    }
    
    enviar(file: File): Observable<Image>{
        const form= new FormData()
        form.append("imagem", file)
        return this.http.post<Image>(this.base, {headers: this.headers()}) 
    }


    deletar(id: number){    
        return this.http.delete(`${this.base}${id}/`, {headers: this.headers()})
    }
    
}