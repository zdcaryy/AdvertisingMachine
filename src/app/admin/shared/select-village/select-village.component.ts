import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'selectVillage',
  templateUrl: './select-village.component.html',
  styleUrls: ['./select-village.component.css']
})
export class SelectVillageComponent implements OnInit {

  constructor() { }

  @Input() showLevel:any = 4;
  @Input() allVillage:any[];
  @Input() init:any = null;
  // this.initVill = {province:'四川省',city:'成都市',region:'双流区',village:'子木小区',building:2};
  @Output() handle:EventEmitter<object> = new EventEmitter<object>();

  show:string;

  provinceList:string[]=[];
  cityList:string[]=[];
  regionList:string[]=[];
  villageList:any[]=[];
  buildingList:any[]=[];

  chooseRes = {}

  ngOnInit() {
  	this.show = '';
  	window.addEventListener('click',(e)=>{
  		this.show = '';
  	});

  }

  ngOnChanges(e){
    // console.log(e)
    if(e.allVillage && e.allVillage.currentValue){
      this.resetAll();
      if(this.init){
        setTimeout(()=>{this.initLocation()},0);
      }
    }else{
      // 只有init在变化
      let arr = [];
      for(let i in e){arr.push(i)};
      if(arr.length==1 && arr[0]=='init'){
        setTimeout(()=>{this.initLocation()},0);
      }
    }
  }

  resetAll(){
    this.provinceList = this.getProvince();
    this.cityList=[];
    this.regionList=[];
    this.villageList=[];
    this.buildingList=[];
  }

  initLocation(){
    // 设置选中的'省'
    this.chooseRes['province'] = this.init['province'];
    // 获取'市'列表
    this.cityList = this.getCity();
    // 若初始化数据中没有'市'，直接输出当前结果 -- 到'省'为止
    if(!this.init['city']){this.hasSelect('province',this.init['province']);return};

    this.chooseRes['city'] = this.init['city'];
    this.regionList = this.getRegion();
    
    if(!this.init['region']){this.hasSelect('city',this.init['city']);return};

    this.chooseRes['region'] = this.init['region'];
    this.villageList = this.getVillage();
    
    if(!this.init['village']){this.hasSelect('region',this.init['region']);return};

    var village = this.villageList.filter(item=>{return item.name==this.init['village']})[0];
    if(!this.init['building']){this.hasSelect('village',village);return;}
    
    this.chooseRes['village'] = village.name;
    this.chooseRes['id'] = village.id;
    this.buildingList = village.building?village.building:['no'];


    this.hasSelect('building',this.init['building']);

  }

  getProvince():string[]{
    let pro = [];
    let obj = {};
    this.allVillage.map(res=>{
      if(!obj[res.province]){
        obj[res.province] = true;
        pro.push(res.province);
      }
    });
    return pro;
  }

  getCity():string[]{
    let city = [];
    let obj = {};
    this.allVillage.map(res=>{
      if(res.province==this.chooseRes['province'] && !obj[res.city]){
        obj[res.city] = true;
        city.push(res.city);
      }
    });
    return city;
  }

  getRegion():string[]{
    let region = [];
    let obj = {};
    this.allVillage.map(res=>{
      if(res.province==this.chooseRes['province'] && res.city==this.chooseRes['city'] && !obj[res.region]){
        obj[res.region] = true;
        region.push(res.region);
      }
    });
    return region;
  }

  getVillage():string[]{
    let village = [];
    this.allVillage.map(res=>{
      if(res.province==this.chooseRes['province'] && res.city==this.chooseRes['city'] && res.region==this.chooseRes['region']){
        village.push({name:res.name,id:res.id,building:res.buildings});
      }
    });
    return village;
  }

  hasSelect(level:string,value){
    switch (level) {
      case "province":
        this.chooseRes = {province:value};
        this.cityList = this.getCity();
        this.regionList = [];
        this.villageList = [];
        this.buildingList = [];
        break;

      case "city":
        this.chooseRes['city'] = value;
        delete this.chooseRes['region'];
        delete this.chooseRes['village'];
        delete this.chooseRes['id'];
        delete this.chooseRes['building'];
        this.regionList = this.getRegion();
        this.villageList = [];
        this.buildingList = [];
        break;

      case "region":
        this.chooseRes['region'] = value;
        delete this.chooseRes['village'];
        delete this.chooseRes['id'];
        delete this.chooseRes['building'];
        this.villageList = this.getVillage();
        this.buildingList = [];
        break;

      case "village":
        this.chooseRes['village'] = value.name;
        this.chooseRes['id'] = value.id;
        delete this.chooseRes['building'];
        this.buildingList = value.building?value.building:['no'];
        break;

      case "building":
        this.chooseRes['building'] = value;

    }
    this.handle.emit(this.chooseRes);
  }

}
