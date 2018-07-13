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
        this.auth.getUserInfo().subscribe(response => {
            //console.log(response);
            if(response.status!=0){
                this.router.navigate(['/login']);
                localStorage.clear()
            }
        },error => {
            this.router.navigate(['/login']);
            localStorage.clear()
        });
        return true
    }

}
