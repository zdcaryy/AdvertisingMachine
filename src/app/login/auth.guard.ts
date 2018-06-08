import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard {

    constructor(
        private router: Router,
        private auth: AuthService
    ) { }

    canActivate(){
        this.auth.getUserInfo().subscribe(Response => {
            console.log('token验证成功')
        },error => {
            this.router.navigate(['/login']);
            localStorage.removeItem('access_token');
            localStorage.removeItem('userCode')
        });
        return true
    }

}
