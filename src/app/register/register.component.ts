import { Component, OnInit } from '@angular/core';
import { RegisterService } from "./register.service";

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

  userImg:string='eorrImg';
  phoneImg:string='eorrImg';
  papersImg:string='eorrImg';
  emailImg:string='eorrImg';
  psdImg:string='eorrImg';
  repsdImg:string='eorrImg';
  phoneBoolean:boolean=false;
  sucessBoolean:boolean=false;
  failBoolean:boolean=false;
  failMsg:string;

  phoneTest=/^[1][3,4,5,7,8][0-9]{9}$/;
  papersTest=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  emailTest=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

  constructor(private regist:RegisterService) { }

  ngOnInit() { }

  blur(param){
    switch(param){
      case 'user':
        if(this.username){
          this.userImg='trueImg'
        }else{
          this.userImg='eorrImg'
        }
        break;
      case 'phone':
        if(this.phone && this.phoneTest.test(this.phone.toString())){
          this.phoneImg='trueImg';
        }else{
          this.phoneImg='eorrImg';
        }
        break;
      case 'papers':
        if(this.papers && this.papersTest.test(this.papers.toString())){
          this.papersImg='trueImg'
        }else{
          this.papersImg='eorrImg'
        }
        break;
      case 'email':
        if(this.email && this.emailTest.test(this.email)){
          this.emailImg='trueImg'
        }else{
          this.emailImg='eorrImg'
        }
        break;
      case 'psd':
        if(this.password){
          this.psdImg='trueImg'
        }else{
          this.psdImg='eorrImg'
        }
        break;
      case 'repsd':
        if(this.repassword && this.password!='' && this.repassword==this.password){
          this.repsdImg='trueImg'
        }else{
          this.repsdImg='eorrImg'
        }
        break;
    }
  }

  register(){
    if(this.userImg=='trueImg' && this.phoneImg=='trueImg' && this.papersImg=='trueImg' && 
    this.emailImg=='trueImg' && this.psdImg=='trueImg' && this.repsdImg=='trueImg'){
      this.regist.postData("/user/regist",
        {name:this.username,pwd:this.password,phoneNumber:this.phone,identity:this.papers,email:this.email})
        .subscribe(response => {
          console.log(response);         
          if(response.status==0){
            this.sucessBoolean=true;
          }else{
            this.failBoolean=true;
            this.phoneBoolean=true;
            this.failMsg=response.msg
          }
        })
    }
  }

  registerEorr(){
    window.location.reload()
  }

}