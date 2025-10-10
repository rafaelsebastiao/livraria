import {Injectable, inject} from "@angular/core"
import {HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { environment } from "../../environments/environments"


export type Imagem = {
    id: number;
    imagem: string;
    url: string;
    criado_em:string;
}


@Injectable({providedIn: 'root'})
export class ImagemService{
    private http = inject(HttpClient)
    private base = `${environment.apiBase}/api/imagem/`

    private headers(): HttpHeaders{
        const token = localStorage.getItem('acess')
        return token ? new HttpHeaders({Autorization: `Bear${token}`}) : new HttpHeaders()
    }
    
    listar(): Observable<Imagem[]>{
        return this.http.get<Imagem[]>(this.base, {headers: this.headers()})   
    }
    
    enviar(file: File): Observable<Imagem>{
        const form= new FormData()
        form.append("imagem", file)
        return this.http.post<Imagem>(this.base, {headers: this.headers()}) 
    }

    deletar(id: number){
        return this.http.delete(`${this.base}${id}/`, {headers: this.headers()})
    }

}