import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Editora } from '../../models/editora';
import { EditorasService } from '../../services/editoras.services';


@Component({
    standalone: true,
    imports: [RouterLink],
    template: `
      <section style="max-width:900px;margin:2rem auto;padding:0 1rem">
        <h1>Editoras</h1>
  
        @if (carregando()) {
          <p>Carregando…</p>
        } @else if (erro()) {
          <p style="color:#c62828">{{ erro() }}</p>
        } @else {
          <ul style="padding-left:1.25rem">
            @for (a of editoras(); track a.id) {
              <li style="margin:.25rem 0">
                <strong>{{ a.editora }} {{ a.cnpj}}</strong>
                @if (a.editora) { — <em style="color:#666">{{ a.editora}}</em> }
                @if (a.cnpj) { • {{ a.cnpj }} }
                @if (a.endereco) { <div style="color:#555">{{ a.endereco }}</div>}
                @if (a.telefone) { <div style="color:#555">{{ a.telefone }}</div>}
                @if (a.email) { <div style="color:#555">{{ a.email}}</div>}
                  @if (a.site) { <div style="color:#555">{{ a.site}}</div>}
              </li>
            }
          </ul>
        }
        <nav style="margin-top:1rem">
          <a routerLink="/">Voltar ao início</a>
        </nav>
      </section>
    `
  })
  export class EditorasPage {
    private svc = inject(EditorasService);
    private auth = inject(EditorasService);   //Ver o token
    editoras = signal<Editora[]>([]);
    carregando = signal(true);
    erro = signal<string | null>(null);
  
    constructor() {
      
      
      this.svc.listar().subscribe({
        next: (data) => { this.editoras.set(data); this.carregando.set(false); },
        error: () => { this.erro.set('Falha ao carregar editoras'); this.carregando.set(false); }
      });
    }
  }