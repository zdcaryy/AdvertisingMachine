import { Component, OnInit } from '@angular/core';
import { AreaService } from "../server/area.service";
declare var AMap:any ;
declare var $:any ;

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

  heads: object[];
  bodys: object[];
  selectedList:object[] = [];
  textConfig: object;
  colorConfig: object;

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
    //小区模糊搜索
    $('.areaSearchInput').find('input').bind('input propertychange',()=>{
      this.activeInput=$('.areaSearchInput').find('input').val();
      this.dimVillage()
    })
    //操作列表
    this.heads = [{label: '设备编号',field: 'mac'},
      {label: '设备位置', field: 'position'},
      {label: '设备运行状态', field: 'status', child: [ '正常', '故障']},
      {label: '备份情况', field: 'copy', child: ['所有', '已上传', '待上传', '上传中']},
      {label: '维护人员', field: 'accendantName'},
      {label: '操作', field: 'caozuo',operate:true,operations:['修改','删除']}];
    
    this.bodys = [
    ];
    
    this.textConfig = {status: {0: '正常', 1: '故障'}};
    this.colorConfig = {
      status: {0: 'blue', 1: 'red'},
      copy:{0:'blue',1:'green',2:'red',3:'yellow'},
      caozuo: {修改: '#119C9D', 删除: '#d73e3e'}
    };
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
        this.bodys=value.machines;
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
