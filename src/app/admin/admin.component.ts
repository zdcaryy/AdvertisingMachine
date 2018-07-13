import { Component, OnInit } from '@angular/core';
import { AdminService } from "./server/admin.service";
import { MsgService } from "./server/msg.service";
declare var $:any ;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  username:string;
  adminStatus:boolean;
  plotCheckStatus:boolean;
  plots:object[];
  activePlot:string='未选择';
  msgNumber:number=0;

  constructor(
    private adminService:AdminService,
    private msgService:MsgService
  ) { }

  ngOnInit() {
    this.getUserLevel()
    //导航
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
        event.stopPropagation(); 
    });
  }
  //获取用户信息
  getUserLevel(){
    this.adminService.getData("/user/findByToken",{access_token:localStorage.getItem('access_token')})
    .subscribe(res=>{
      //console.log(res);
      this.username=res.userInfo.name;
      if(res.userInfo.userLevel==0){
        this.plotCheckStatus=false;
        this.adminStatus=true;
      }else if(res.userInfo.userLevel!=0 && localStorage.getItem('plotSign')){
        this.plotCheckStatus=false;
        this.adminStatus=false;
        this.msgService.activePlot=this.activePlot=localStorage.getItem('plotSign');
      }else{
        this.plotCheckStatus=true;
        this.adminStatus=false;
        this.getUserInfo()
      }
    })
  }

  //非0级用户查询小区
  getUserInfo(){
    this.adminService.getData("/village/getRelatedVillage",{access_token:localStorage.getItem('access_token')})
    .subscribe(res=>{
      //console.log(res);
      this.plots=res;
    })
  }

  //非0级用户选择小区
  plotCheck(param){
    console.log(param);
    this.msgService.activePlot=this.activePlot=param.village.name;
    localStorage.setItem('plotSign',param.village.name)
    this.plotCheckStatus=false;
  }

  //切换小区
  cutBtn(){
    this.plotCheckStatus=true;
    this.getUserInfo()
  }

  //刷新网页
  refresh(){
    window.location.reload()
  }

  //登录退出
  logout(){
    this.adminService.logout()
  }

}
