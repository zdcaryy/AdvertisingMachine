import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css'],
  animations: [
    trigger('adCover',[
      state('show',style({
        opacity:1,
      })),
      state('hide',style({
        opacity:0,
      })),
      transition('hide => show',animate('200ms ease-in')),
      transition('show => hide',animate('200ms ease-out'))
    ])
  ]
})
export class AdvertisementComponent implements OnInit {

  constructor() { }

  // 广告数据列表
  adver:any[] = [];
  // 是否显示下拉菜单  --  项目分类
  showTypes:boolean = false;
  types:string[];
  // 显示弹窗 & 动画
  showModal:boolean = false;
  animeState:boolean = false;
  // 弹窗类型
  modalType:string = '';
  // 弹窗内容
  viewInfo:any[] = [];  
  modifyAD:any[] = [];  

  ngOnInit() {
  	this.adver = [
      {id:34564,name:"隔壁超市的薯片半价！1",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
      {id:34564,name:"隔壁超市的薯片半价！2",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
      {id:34564,name:"隔壁超市的薯片半价！3",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
      {id:34564,name:"隔壁超市的薯片半价！4",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
      {id:34564,name:"隔壁超市的薯片半价！5",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
      {id:34564,name:"隔壁超市的薯片半价！6",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
      {id:34564,name:"隔壁超市的薯片半价！7",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
      {id:34564,name:"隔壁超市的薯片半价！8",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
      {id:34564,name:"隔壁超市的薯片半价！9",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
      {id:34564,name:"隔壁超市的薯片半价！10",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
      {id:34564,name:"隔壁超市的薯片半价！11",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
      {id:34564,name:"隔壁超市的薯片半价！12",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
      {id:34564,name:"隔壁超市的薯片半价！13",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
      {id:34564,name:"隔壁超市的薯片半价！14",type:"时尚",imgUrls:"assets/img/adver/adv.jpg",addedDate:"2018-01-12",expiredDate:"2018-02-11"},
    ];
    this.types = ['餐饮','服装','电商','时尚','化妆品','车辆','旅游','公益','haha'];
    window.onclick = ()=>{
      this.showTypes = false;
    }
  }

  // 选择分类
  chooseType(type){
    console.log(type);
  }

  // 批量删除
  delMul(){

  }

  // 添加，显示弹窗
  showAdd(){
    this.showModal = true;
  }
  // 确认添加
  addNew(){

  }

  test(ads){
    ads.state='hide';
    console.log(this.adver);
  }

  handle(e){
    console.log(e);
  }

}
