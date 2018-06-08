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

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    if (form.valid) {
        this.auth.login(this.username, this.password)
            .subscribe(response => {
              console.log(response);
              this.router.navigateByUrl("/userlist");
              localStorage.setItem('access_token',response.json().access_token);
              localStorage.setItem('userCode',this.username);
            },error => {
              console.log(error);
              this.errorMessage = "登录失败";
          })
    } else {
        this.errorMessage = "账号或密码错误";
    }
}

}
