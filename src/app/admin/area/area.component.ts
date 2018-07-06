import { Component, OnInit } from '@angular/core';
import { AreaService } from "../server/area.service";
declare var AMap:any ;

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  area:string;
  street:string;
  plot:string;
  property:string;
  equipAll:number;
  equipNormal:number;
  equipAnomaly:number;
  imgUrl:string;
  areaCoord=[];
  activeInput:string;
  map;

  constructor(
    private areaService:AreaService
  ) { }

  ngOnInit() {
    this.getVillage();
    this.map = new AMap.Map('gaodemap-container');
    this.map.plugin('AMap.Geolocation', () => {
        let geolocation = new AMap.Geolocation({
            enableHighAccuracy: false,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true     //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        this.map.addControl(geolocation);
    });
  }
  //获取全部小区
  getVillage(){
    this.areaService.getVillage('/village/getAllVillagesAndMachinesByCompany')
      .subscribe(value => {
        console.log(value);
        this.areaCoord=value;
        this.point(this.areaCoord);
      })
  }
  //地图描点
  point(param){
    for(let i=0;i<param.length;i++){
      if(param[i].unusualCount==0){
        this.imgUrl="../../../assets/img/icon_1.png"
      }else{
        this.imgUrl="../../../assets/img/icon_2.png"
      }
      let marker=new AMap.Marker({
        icon:this.imgUrl,
        position: [param[i].village.ptLoc.x,param[i].village.ptLoc.y],
        title: param[i].village.name
      })
      marker.on('click',()=>{
        this.activeInput=marker.G.title;
        this.searchVillage()
      })
      this.map.add(marker);
    }
  }

  //查询小区信息
  searchVillage(){
    this.areaService.searchVillage('/village/getDetailByVillage',this.activeInput)
      .subscribe(value => {
        console.log(value);
        this.area=value.vliiageAndCount.village.province+''+value.vliiageAndCount.village.city;
        this.street=value.vliiageAndCount.village.region;
        this.plot=value.vliiageAndCount.village.name;
        this.property=value.vliiageAndCount.village.propertyComName;
        this.equipAll=value.vliiageAndCount.machineCount;
        this.equipNormal=value.vliiageAndCount.normalCount;
        this.equipAnomaly=value.vliiageAndCount.unusualCount;
        this.areaCoord=value.machines;
      })
  }
  //小区模糊搜索
  dimVillage(){
    this.areaService.dimVillage('/village/fuzzySearchVillage',this.activeInput)
      .subscribe(value => {
        console.log(value);
      })
  }
}
