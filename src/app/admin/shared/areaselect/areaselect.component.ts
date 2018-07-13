import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Areas } from './areas';

@Component({
  selector: 'AreaSelect',
  templateUrl: './areaselect.component.html',
  styleUrls: ['./areaselect.component.css']
})
export class AreaselectComponent implements OnInit {

  constructor() { }

  @Input() init:any = null;
  // this.initVill = {province:'四川省',city:'成都市',region:'双流区',village:'子木小区',building:2};
  @Output() handle:EventEmitter<object> = new EventEmitter<object>();

  show:string;

  provinceList:string[]=[];
  cityList:string[]=[];
  regionList:string[]=[];

  chooseRes = {}

  areas = Areas;

  ngOnInit() {
  	this.show = '';
  	window.addEventListener('click',(e)=>{
  		this.show = '';
  	});

  }

  ngOnChanges(e){
    console.log('地区选择(全国)，初始化...');
    if(e.init && e.init.currentValue){
      // console.log(e.init.currentValue);
      this.initLocation(e.init.currentValue);
    }
  }

  // resetAll(){
  //   this.provinceList = this.getProvince();
  //   this.cityList=[];
  //   this.regionList=[];
  //   this.villageList=[];
  //   this.buildingList=[];
  // }

  initLocation(init){
    let pro;
    let city;
    let reg;
    if(init.province){
      pro = this.areas.filter(item=>{return item.name==init.province})[0];
      this.hasSelect('province',pro);
    }
    if(init.city){
      city = pro.city.filter(item=>{return item.name==init.city})[0];
      this.hasSelect('city',city);
    }
    if(init.region){
      reg = city.region.filter(item=>{return item==init.region})[0];
      this.hasSelect('region',reg);
    }
  }

  hasSelect(level:string,value){
    switch (level) {
      case "province":
        this.chooseRes = {province:value.name};
        this.cityList = value.city;
        this.regionList = [];
        break;

      case "city":
        this.chooseRes['city'] = value.name;
        delete this.chooseRes['region'];
        this.regionList = value.region;
        break;

      case "region":
        this.chooseRes['region'] = value;
        break;

    }
    this.handle.emit(this.chooseRes);
  }

}
