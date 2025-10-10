import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AutoresPage} from './pages/authors/authors.component';
import { EditorasPage } from './pages/editoras/editoras.component';
import { LivrosPage } from './pages/livros/livros.components';
import { RegisterComponent } from './pages/register/registerComponent';
import { authGuard } from './auth.guard';



export const routes: Routes = [
    {path: '', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path : 'home', component: HomeComponent},
    {path : 'autores', component: AutoresPage, canActivate:[authGuard]},
    {path: 'editoras', component: EditorasPage, canActivate:[authGuard]},
    {path: 'livros', component: LivrosPage, canActivate:[authGuard]}
];
