import { Component, OnInit } from '@angular/core';
import { AdverService } from '../server/adver.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
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
export class AccountComponent implements OnInit {

  constructor(private adService:AdverService) { }

  // 用户信息(账号的姓名手机号等通用信息)
  commonInfo:any;
  // 按小区(房间)区分的个人信息
  houseInfo:any[]; //业主等身份的信息
  noHouseInfo:any[]; //管理员等身份

  // 用户权限..懒得写pipe...
  typeList:string[] = ['物业主管','物业员工','业主','公司管理员','租户','广告机维护人员'];
  // 审核状态
  tagList:string[] = ['审核中','已通过','未通过'];
  // 弹窗信息
  showModal:boolean;
  modalType:string;
  viewbox:boolean;
  villInfo:any;
  //添加新的信息
  addInfo:any;
  addFamilyInfo:any;
  modifyFamilyInfo:any;
  // 查看的信息
  viewInfo:any;

  ngOnInit() {
  	console.log(window.localStorage);
    this.houseInfo = [];
    this.noHouseInfo = [];
  	this.getUserInfo();
    this.showModal = false;
    this.modalType = '';
    this.viewbox = false;
    this.addInfo = {};
    this.addFamilyInfo={};
    this.modifyFamilyInfo={};
    this.viewInfo = {};
    this.getVillage();
  }

  getUserInfo(){
  	let token = window.localStorage.getItem('access_token');
  	console.log(token);
  	this.adService.getData('/user/findByToken?token='+token).subscribe(res=>{
  		console.log(res);
      this.commonInfo = res.userInfo;
      this.adService.getData('/person/findByPhoneNumberForAccount?phoneNumber='+res.userInfo.phoneNumber).subscribe(list=>{
        // console.log(list);
        list.map(item=>{
          if(item.type==2||item.type==4){ //业主或者租户
            this.houseInfo.push(item);
          }else{
            this.noHouseInfo.push(item);
          }
        });
        console.log(this.houseInfo)
        console.log(this.noHouseInfo)
      });
  	});
  }

  //添加信息时拉取一张默认人脸图片
  getDefaultPic(){

  }
  getVillage(init?){
    this.adService.getData('/village/findAllVillages').subscribe(res=>{
      if(res.status != 0){alert('获取小区列表失败...');return;}
      this.villInfo = res.villageList;
      console.log(res);
      // this.showVillInfo = res.villageList.map(item=>{item['address']=item.province+item.city+item.region;return item});

      // this.initVillHeader = {province:'四川省'};
    });
  }
  selectRegion(e){
    if(e.village){
      this.addInfo['villageName'] = e.province+e.city+e.region+'-'+e.village;
    }
  }
  //添加新信息
  initAdd(){
    this.addInfo = {
      name:this.commonInfo.name,
      phoneNumber:this.commonInfo.phoneNumber
    }
  }
  getAddFace(e){
    console.log(e.files);
    if(!e.files.length){return};
    this.addInfo['img'] = e.files[0];

  }
  addNew(){
    this.addInfo['ownerPhoneNumber'] = this.commonInfo.phoneNumber;
    this.addInfo['type'] = 2;
    this.addInfo['ownerName'] = this.addInfo['name'];
    console.log(this.addInfo);
    let formdata = new FormData();
    for(let k in this.addInfo){
      formdata.append(k,this.addInfo[k]);
    }
    this.adService.upFile('/person/save',formdata).subscribe(res=>{
      console.log(res)
    });
  }

  // 查看房屋(小区)信息
  getFamily(house){
    let url = '/person/findByHouse?villageName='+house.villageName+'&serialNum='+house.house.serialNum+'&unit='+house.house.unit+'&floorNum='+house.house.floorNum+'&roomNumber='+house.house.roomNumber;
    this.adService.getData(url).subscribe(res=>{
      this.viewInfo['family'] = res;
    });
  }

  // 添加成员
  initAddFamily(){
    this.addFamilyInfo = {
      villageName:this.viewInfo.villageName,
      houseId:this.viewInfo.house.id,
      ownerName:this.viewInfo.ownerName,
      type:2
    }
  }
  getFamilyFace(e){
    console.log(e.files);
    if(!e.files.length){return};
    this.addFamilyInfo['img'] = e.files[0];
  }
  addFamily(){
    console.log(this.addFamilyInfo);
    let formdata = new FormData();
    for(let f in this.addFamilyInfo){
      formdata.append(f,this.addFamilyInfo[f]);
    }
    this.adService.upFile('/person/save',formdata).subscribe(res=>{
      console.log(res);
    });
  }

  // 添加、删除、修改完家庭成员之后，停留在当前窗口并刷新数据
  refreshHouse(){

  }

}
