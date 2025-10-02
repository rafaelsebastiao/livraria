import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.services";


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
    
    <button (click)="loginValidate(email.value, password.value)">Logar</button>
    
    </nav>
    </section>
    `

}
   
)


export class LoginComponent {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    
    loginValidate(email: string, password: string){
        if (email == ''|| password == ''){
            alert("Login inválido!");
        }else{
            this.authService.login(email, password).subscribe({
                next: (tokens) => {
                  console.log('Login bem-sucedido', tokens);
                  this.router.navigate(['/']);
                },
                error: (err) => {
                  console.error('Erro ao logar', err);
                  alert('Credenciais inválidas. Verifique seu usuário e senha.');
                }                
              });
        }
    }
}