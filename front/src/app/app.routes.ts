import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AutoresPage} from './pages/authors/authors.component';
import { EditorasPage } from './pages/editoras/editoras.component';
import { BooksPage } from './pages/books/books.components';
import { RegisterComponent } from './pages/register/registerComponent';
import { ImagensComponent } from './pages/image/image.components';
import { authGuard } from './auth.guard';



export const routes: Routes = [
    {path: '', component:LoginComponent},
    {path : 'home', component: HomeComponent},
    {path : 'autores', component: AutoresPage, canActivate:[authGuard]},
    {path: 'editoras', component: EditorasPage, canActivate:[authGuard]},
    {path: 'livros', component: BooksPage, canActivate:[authGuard]},
    {path: 'imagens', component:ImagensComponent}
];
