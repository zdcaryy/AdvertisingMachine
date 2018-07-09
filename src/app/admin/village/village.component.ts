import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AdverService } from '../server/adver.service';

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.css'],
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
export class VillageComponent implements OnInit {

  constructor(private adService:AdverService) { }

  // 所有小区信息
  villInfo:object[];
  showVillInfo:object[];
  initVillHeader:object;
  // 选中的小区列表
  selectedVill:object[];
  
  heads: object[];
  selectedList:object[] = [];
  textConfig:object;
  colorConfig:object;

  // 显示弹窗 & 动画
  showModal:boolean;
  animeState:boolean;
  // 弹窗类型
  modalType:string;

  // 添加小区信息
  addVillage:object;

  ngOnInit() {
    this.initAll();
    this.getVillage();
  }

  initAll(){
    // this.villInfo = [];
    this.selectedVill = [];
    this.heads = [{label:"小区名",field:'name'},
                  {label:"所属物业",field:'propertyComName'},
                  {label:"位置",field:'address'},
                  {label:"物业电话",field:'phoneNumber'},
                  // {label:"操作",field:'operate',canOper:true}];
                  {label:"操作",field:'operate',operate:true,operations:['查看','删除']}];
    this.villInfo = [];
    this.showVillInfo = [];
    this.textConfig = {};
    this.colorConfig = {};
    this.showModal = false;
    this.animeState = false;
    this.modalType = '';
    this.initAdd();
  }


  getVillage(){
    this.adService.getData('/village/findAllVillages').subscribe(res=>{
      if(res.status != 0){alert('获取小区列表失败...');return;}
      this.villInfo = res.villageList;
      // this.showVillInfo = res.villageList.map(item=>{item['address']=item.province+item.city+item.region;return item});
      this.initVillHeader = {province:res.villageList[0].province,city:res.villageList[0].city,region:res.villageList[0].region};
    });
  }

  // 头部，根据区域显示小区
  selectRegion(e){
    if(e.region){
      console.log(e);
      this.adService.getData('/village/findVillageByArea?province='+e.province+'&city='+e.city+'&region='+e.region).subscribe(res=>{
        if(res.status != 0){alert('获取小区列表失败...');return;}
        console.log(res.villages);
        this.showVillInfo = res.villages.map(item=>{item['address']=item.province+item.city+item.region;return item});
      });
    }
  }
  
  getSelectedList(e){
    // console.log(e);
  }

  // 添加小区
  initAdd(){
    this.addVillage = {
      name:'',
      propertyComName:'',
      priceTag: '',
      province:'',
      city:'',
      region:'',
      phoneNumber:''
    }
  }
  selectVillageAdd(e){
    this.addVillage['province'] = e.province;
    this.addVillage['city'] = e.city;
    this.addVillage['region'] = e.region;
    this.addVillage['province'] = e.province;
  }
  // 确认添加
  addNew(){
    let data = JSON.parse(JSON.stringify(this.addVillage));
    data.priceTag = parseFloat(data.priceTag);
    console.log(data);
    this.adService.postData('/village/addVillage',data).subscribe(res=>{
      console.log(res);
    });
  }

}
