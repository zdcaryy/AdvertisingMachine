import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  floder:boolean;
  username:string=localStorage.getItem('name');

  constructor(private router:Router) { }

  ngOnInit() {
    if(document.documentElement.clientWidth<=992){
      this.floder=true
    }
  }
  
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
