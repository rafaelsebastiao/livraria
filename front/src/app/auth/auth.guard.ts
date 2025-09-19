import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import {AuthService} from "../services/auth.service";



export const authGuard: CanActivateFn = () => {
    const auth = inject(AuthService)
    const router = inject(Router)

    if(auth.isAuthenticad()) return true;
    
    router.navigateByUrl('/login')

    return false

};