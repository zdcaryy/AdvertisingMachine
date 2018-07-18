import { Component, OnInit } from '@angular/core';
import { AreaService } from "../server/area.service";
declare var AMap:any ;

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  heads: object[];
  bodys: object[];
  map;

  allPlots:object[];
  imgUrl:string;
  currentArea:string;
  currentStreet:string;
  currentPlot:string;
  currentProperty:string;
  currentEquipAll:number;
  currentEquipNormal:number;
  currentEquipAnomaly:number;
  currentVillage=[];
  activeInput:string;
  searchPlots:object[];
 
  equipIf:boolean=false;
  equipNumber:string;
  equipArea:string;
  equipVillage:string;
  equipProperty:string;
  equipMaintainer:string;
  equipAdver:string;

  constructor(
    private areaService:AreaService
  ) { }

  ngOnInit() {
    this.getAllPlots();

    //地图初始化
    this.map = new AMap.Map('gaodemap-container');
    this.map.plugin('AMap.Geolocation', () => {
        let geolocation = new AMap.Geolocation({
            enableHighAccuracy: false,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: false,        //显示定位按钮，默认：true
            buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy: true     //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        this.map.addControl(geolocation);
    });

    //小区信息列表初始化
    this.heads = [
      {label: '设备编号',field: 'mac'},
      {label: '设备运行状态', field: 'status', child: ['所有', '正常', '故障'],textConfig:{0: '正常', 1: '故障'},colorConfig:{0: 'blue', 1: 'red'}},
      //{label: '备份情况', field: 'copy', child: ['所有', '已上传', '待上传', '上传中'],colorConfig:{0:'blue',1:'green',2:'red',3:'yellow'}},
      {label: '维护人员', field: 'accendantName'},
      {label: '操作', field: 'caozuo',operate:true,operations:['查看',],colorConfig:{查看: '#119C9D'}}
    ];
    this.bodys = [];

  }
  
  //获取全部小区
  getAllPlots(){
    this.areaService.getDate('/village/getAllVillagesAndMachinesByCompany',
      {access_token:localStorage.getItem('access_token')})
      .subscribe(res => {
        console.log(res);
        this.allPlots=res;
        this.point(this.allPlots);
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
      marker.setLabel({
        offset: new AMap.Pixel(-8, 40),
        content: '<span>'+param[i].village.name+'</span>'
      });
      marker.on('click',()=>{
        this.activeInput=marker.G.title;
        this.searchOnePlot()
      })
      this.map.add(marker);
    }
  }

  //小区模糊搜索
  searchDim(){
    this.areaService.getDate('/village/fuzzySearchVillage',
      {access_token:localStorage.getItem('access_token'),villageName:this.activeInput})
      .subscribe(res => {
        console.log(res);
        this.searchPlots=res;
      })
  }

  plotCheck(param){
    this.activeInput=param;
    this.searchPlots=null
  }

  //查询某个小区信息
  searchOnePlot(){
    this.areaService.getDate('/village/getDetailByVillage',
      {access_token:localStorage.getItem('access_token'),ViliiageName:this.activeInput})
      .subscribe(res => {
        console.log(res);
        this.currentArea=res.vliiageAndCount.village.province+''+res.vliiageAndCount.village.city;
        this.currentStreet=res.vliiageAndCount.village.region;
        this.currentPlot=res.vliiageAndCount.village.name;
        this.currentProperty=res.vliiageAndCount.village.propertyComName;
        this.currentEquipAll=res.vliiageAndCount.machineCount;
        this.currentEquipNormal=res.vliiageAndCount.normalCount;
        this.currentEquipAnomaly=res.vliiageAndCount.unusualCount;
        this.bodys=res.machines;    
        this.currentVillage=res.machines    
      })
  }

  //条件过滤
  getDropdownEvent($event){
    //console.log($event.status,$event.copy);
    this.bodys=[];
    for(let i=0;i<this.currentVillage.length;i++){
      if(this.condition($event.status)==-1){
        this.bodys=this.currentVillage
      }else{
        if(this.condition($event.status)==this.currentVillage[i].status){
          this.bodys.push(this.currentVillage[i])
        }
      }
    
    }
  }
  condition(param){
    if(param=='所有'){
      return -1
    }else if(param=='正常'){
      return 0
    }else if(param=='故障'){
      return 1
    }
  }

  //操作事件
  getOperateEvent($event){
    console.log($event);
    this.equipIf=true;
    this.equipNumber=$event.data.mac;
    this.equipArea=$event.data.province+$event.data.city+$event.data.region;
    this.equipVillage=$event.data.villageName;
    this.equipProperty=this.currentProperty;
    this.equipMaintainer=$event.data.accendantName;
    this.equipAdver=$event.unit;
  }
  //关闭窗口
  closeEquip(){
    this.equipIf=false;
  }

}
