import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/auth.services";
import { HttpClient } from "@angular/common/http";
import { ReactiveFormsModule, FormBuilder, Validators} from "@angular/forms";
import {environment} from '../../../environments/environments'

@Component({
    selector:'app-login.component',
    standalone: true,
    templateUrl:'./register.component.html'
    }
)

export class RegisterComponent {
    error = signal<String | null>(null)
    loading = signal(false)


    private fb = inject(FormBuilder)
    
    form = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
      })

    constructor(
        private authService: AuthService,
        private router: Router,
        private http : HttpClient
        
    ) {}


    registerUser(username: string, password: string, confirmPassword: string){
        if (username == ''|| password == ''){
            alert("Insira os dados de forma correta!");
        }else if(password != confirmPassword){
            alert("As senhas devem ser iguais!")
        }else{
            this.http.post(`${environment.apiBase}api/register/`, {
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

