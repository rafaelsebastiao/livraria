import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.services";
import { UserService } from "../../services/users.services";

@Component(
    {
    selector:'app-login',
    standalone: true,
    imports: [RouterLink],
    template: `
    <section style="max-width:900px;margin:2rem auto;padding:0 1rem">
    <h1 style="margin:0 0 .75rem">Login</h1>
    
    <input #email id="email" placeholder="Informe seu email" />
    <input #password id="password" placeholder="Senha" />
    
    <nav style="margin-top:1rem; display:flex; gap:.75rem">
    
    <a (click)="loginValidate(email.value, password.value)">Logar</a>
    <button (click)="loginValidate(email.value, password.value)">Logar</button>
    
    <a routerLink="editoras">Ver Editoras</a>
    </nav>
    </section>
    `

}
   
)



export class LoginComponent {
    loginValidate(email: string, password: string){
        if (email == ''|| password == ''){
            alert("Login inválido!");
        }else{


        }
    }


}