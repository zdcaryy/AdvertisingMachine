import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  public errorMessage: string;
  public userBorder: boolean=false;
  public psdBorder: boolean=false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  focus(param:string){
    if(param=="user"){
      this.userBorder=true
    }else if(param=="psd"){
      this.psdBorder=true
    }
  }

  blur(param:string){
    if(param=="user"){
      this.userBorder=false
    }else if(param=="psd"){
      this.psdBorder=false
    }
  }

  login(form: NgForm) {
    if (form.valid) {
        this.auth.login(this.username, this.password)
            .subscribe(response => {
              //console.log(response.json());
              this.router.navigateByUrl("/admin/equip");
              localStorage.setItem('access_token',response.json().access_token);
            },error => {
              console.log(error);
              this.errorMessage = "账号或密码错误";
          })
    } else {
        this.errorMessage = "账号或密码错误";
    }
  }

}