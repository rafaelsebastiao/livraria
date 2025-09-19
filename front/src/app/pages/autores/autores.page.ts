import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import {AuthService} from "../../services/auth.service";
import { AutoresService } from "../../services/autores.service";
import { Autor } from "../../models/autor";

@Component({
    standalone: true,
    imports: [RouterLink], 
    template: `
    <h1>Teste</h1>
    `
})

export class AutoresPage{
    private svc = inject(AutoresService)
    private auth = inject(AuthService)
    autores = signal<Autor[]>([])
    carregando = signal(true)
    erro = signal<string | null>(null)

    constructor(){
        console.log("Token de acesso: ", this.auth.token());

        this.svc.listar().subscribe({
            next: (data) => {this.autores.set(data); this.carregando.set(false)},

            error: ()=> {this.erro.set("Falha ao carregar autores. "); this.carregando}
        })
    }
}