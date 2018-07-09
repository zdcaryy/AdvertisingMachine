import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any ;

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
    $('.header-floder').click(function(){
      $('#nav').slideDown()
    });
    $('body').click(function(){
      let w = document.documentElement.clientWidth || document.body.clientWidth;
      if(w<970){
        $('#nav').slideUp()
      }  
    })
    $('body').on('click', '#nav,.header-floder', function(event){
        event.stopPropagation();  // 或 return false;
    });
  }
  
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
