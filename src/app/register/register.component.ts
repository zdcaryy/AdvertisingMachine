import { Component, OnInit } from '@angular/core';
import { RegisterService } from "./register.service";
declare var $:any

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username:string;
  phone:number;
  papers:number;
  email:string;
  password:string;
  repassword:string;
  userBoolean;
  phoneBoolean:boolean;
  papersBoolean:boolean;
  emailBoolean:boolean;
  psdBoolean:boolean;
  repsdBoolean:boolean;


  constructor(private regist:RegisterService) { }

  ngOnInit() {
    $('input[name="username"]').blur(()=>{
      if($('input[name="username"]').val()!=''){
        console.log(1);
        this.userBoolean=='tureImg'
      }else{
        this.userBoolean=='eorrImg'
      }
    })
  }

  register(){
    this.regist.postData("/user/regist",
      {name:this.username,pwd:this.password,phoneNumber:this.phone,identity:this.papers,email:this.email})
      .subscribe(response => {
        console.log(response);
        
      },error => {
      
    })
  }

}
