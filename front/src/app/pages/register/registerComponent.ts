import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.services";
import { HttpClient } from "@angular/common/http";




@Component(
    {
    selector:'app-login',
    standalone: true,
    imports: [RouterLink],
    template: `
    <section style="max-width:900px;margin:2rem auto;padding:0 1rem">
    <h1 style="margin:0 0 .75rem">Cadastro</h1>
    <hr>
    <input #email id="email" placeholder="Nome de usuário" />
    <input #password id="password" type="password" placeholder="Senha" />
    
    <nav style="margin-top:1rem; display:flex; gap:.75rem">
    <button (click)="registerUser(email.value, password.value)">Cadastrar</button>
    </nav>
    </section>
    `
}
   
)



export class RegisterComponent {
    constructor(
        private authService: AuthService,
        private router: Router,
        private http : HttpClient


    ) {}
    


    registerUser(username: string, password: string){
        if (username == ''|| password == ''){
            alert("Insira os dados de forma correta!");
        }else{
            this.http.post('http://127.0.0.1:8000/api/register/', {
                username: username,
                password: password
                

            }).subscribe({
                next: res => {
                    alert('Cadastro realizado com sucesso!')
                    this.router.navigate(['./login'])
                },
                error: err => alert('Erro no cadastro')
              });
        }
        
    }


}

