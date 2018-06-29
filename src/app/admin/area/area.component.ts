import { Component, OnInit } from '@angular/core';
import { AreaService } from "../server/area.service";
declare var AMap:any 

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
  map;

  constructor(private areaService:AreaService) { }

  ngOnInit() {
    this.getCoord();
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
  //获取坐标
  getCoord(){
    this.areaService.getData('/village/findAllVillages')
      .subscribe(value => {
        console.log(value);
        this.areaCoord=value.dian;
        this.area=value.dq;
        this.street=value.jd;
        this.plot=value.xq;
        this.property=value.wy;
        this.equipAll=value.dian.length;
        this.equipNormal=value.tur;
        this.equipAnomaly=value.fal;
        this.point(this.areaCoord);
      })
  }
  //描点
  point(str){
    console.log(str.length);
    for(let i=0;i<str.length;i++){
      if(str[i].z==0){
        this.imgUrl="../../../assets/img/icon_1.png"
      }else{
        this.imgUrl="../../../assets/img/icon_2.png"
      }
      this.map.add(
        new AMap.Marker({
          icon:this.imgUrl,
          position: [str[i].x,str[i].y],
          title: str[i].position
        })
      );
    }
  }
}
