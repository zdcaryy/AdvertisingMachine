import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
declare var $:any;


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
    $('.login-div').find('input').focus(function(){
      $(this).parent().css("border-left","3px solid #009788")
    });
    $('.login-div').find('input').blur(function(){
      $(this).parent().css("border-left","3px solid white")
    })
  }

  login(form: NgForm) {
    if (form.valid) {
        this.auth.login(this.username, this.password)
            .subscribe(response => {
              console.log(response);
              this.router.navigateByUrl("/admin/equip");
              localStorage.setItem('access_token',response.json().access_token);
              localStorage.setItem('userCode',this.username);
            },error => {
              console.log(error);
              this.errorMessage = "账号或密码错误";
          })
    } else {
        this.errorMessage = "账号或密码错误";
    }
  }
}