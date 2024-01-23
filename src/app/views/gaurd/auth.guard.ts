import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService:AuthenticationService
    ) {}

    canActivate() {
        if (this.authenticationService.isLogin()) {
            return true;
        }
        this.router.navigate(['/login']);
        return true;
    }
    
}


// export const AuthGuard : CanActivateFn = (route, state) =>{
//     const currentMenu = route.url[0].path;
//     const router = inject(Router);
//     const authServices = inject(AuthenticationService);

//     if (authServices.isLogin()) {
//         return true;
//     }
//     router.navigate(['/login']);
//     return true;
// }
