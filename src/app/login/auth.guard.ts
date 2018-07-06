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
            localStorage.setItem('name',response.name)
        },error => {
            this.router.navigate(['/login']);
            localStorage.clear()
        });
        return true
    }

}
