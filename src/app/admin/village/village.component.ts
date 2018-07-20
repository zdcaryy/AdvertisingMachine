import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AdverService } from '../server/adver.service';

declare var AMap:any;
declare var $:any;

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

  constructor(private adService:AdverService) { 
    
  }

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
  // 是否查看小区信息
  viewVillage:boolean;
  // 当前查看的小区
  viewInfo:any;
  // 当前修改的小区
  modifyInfo:any;
  // 添加小区信息
  addVillage:object;
  // 添加楼栋的信息
  addBuildInfo:object;
  // 头部地区选择，保存当前所在的地区
  nowArea:object;
  // 当前小区的所有房屋信息
  houseInfo:any;
  // 添加房屋信息
  addHouseInfo:any;

  ngOnInit() {
    this.initAll();
    this.getVillage();
  }

  private gaode:any;

  ngAfterViewInit(){
    AMap.plugin('AMap.Geocoder', () => {
      this.gaode = new AMap.Geocoder({
        // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        city: '全国'
      })
    })
  }

  //高德地图 -- 地址转经纬度
  addToCode(address:string,callback:Function){
    this.gaode.getLocation(address,(status,result)=>{
        if (status === 'complete' && result.info === 'OK') {
          // result中对应详细地理坐标信息
          console.log('高德返回：',result);
          callback(result.geocodes[0].location.lat,result.geocodes[0].location.lng);
        }
    });
  }

  initAll(){
    // this.villInfo = [];
    this.selectedVill = [];
    this.heads = [
                    {label:"小区名",field:'name'},
                    {label:"所属物业",field:'propertyComName'},
                    {label:"位置",field:'address'},
                    {label:"物业电话",field:'phoneNumber'},
                    // {label:"操作",field:'operate',canOper:true}];
                    {label:"操作",field:'operate',operate:true,operations:['查看','删除'],colorConfig:{查看:'#009688',删除:'#d73e3e'}}
                 ];
    this.villInfo = [];
    this.showVillInfo = [];
    this.textConfig = {};
    this.colorConfig = {};
    this.showModal = false;
    this.animeState = false;
    this.modalType = '';
    this.viewVillage = false;
    this.houseInfo = [];
    this.initAdd();
    this.initAddBuild();
    this.initAddHouse();
  }

  //获取所有小区列表
  getVillage(init?){
    this.adService.getData('/village/findAllVillages').subscribe(res=>{
      if(res.status != 0){alert('获取小区列表失败...');return;}
      this.villInfo = res.villageList;
      console.log(res);
      // this.showVillInfo = res.villageList.map(item=>{item['address']=item.province+item.city+item.region;return item});

      this.initVillHeader = {province:'四川省'};
    });
  }

  // 头部，根据区域显示小区
  selectRegion(e){
    this.nowArea = e;
    let url = '/village/findVillageByArea?province='+e.province;
    if(e.city){
      url += '&city='+e.city;
    }
    if(e.region){
      url+= '&region='+e.region;
    }
    this.adService.getData(url).subscribe(res=>{
      if(res.status != 0){alert('获取小区列表失败...');return;}
      this.showVillInfo = res.villages.map(item=>{item['address']=item.province+item.city+item.region;return item});
    });
  }
  
  // 表格的事件
  getOperateEvent(e){
    console.log(e);
    if(e.field=='operate'&&e.option=='删除'){this.delOne(e.data)};
    if(e.field=='operate'&&e.option=='查看'){
      this.viewVillage=true;
      this.viewInfo=e.data;
      this.adService.getData('/house/findAllHouseByVillage?villageName='+e.data.address+'-'+e.data.name).subscribe(res=>{
        console.log(res);
        this.houseInfo = res.houseList;
      });
    };
  }
  // 表格的事件
  getSelectedList(e){
    // console.log(e);
  }

  // 添加小区
  initAdd(){
    this.addVillage = {
      name:'',
      propertyComName:'',
      priceTag: null,
      province:'',
      city:'',
      region:'',
      phoneNumber:'',
      longitude:null,
      latitude:null
    }
  }
  // 添加小区，选择位置
  selectAreaAdd(e){
    if(e.region){
      // console.log(e);
      this.addVillage['province'] = e.province;
      this.addVillage['city'] = e.city;
      this.addVillage['region'] = e.region;
      this.getVillageCode('add');
    }
  }
  // 获取输入的小区的经纬度
  getVillageCode(type){
    let info;
    switch (type) {
      case "add":
        info = this.addVillage;
        break;
      case "modify":
        info = this.modifyInfo;
        break;
    }
    if(!info['region'] || !info['name']){return};
    let address = info['province'] + info['city'] + info['region'] + info['name'];
    this.addToCode(address,(lat,lng)=>{
      info['latitude'] = lat;
      info['longitude'] = lng;
    });
    console.log('获取经纬度...',address);
  }
      
  // 添加，删除等操作之后重置页面
  resetPage(area?){
    this.selectedVill = [];
    this.showModal = false;
    this.modalType = '';
    this.initAdd();
    // 改变initVillHeader会引起表格数据的改变(selectRegion)
    if(area){
      this.initVillHeader = {province:area['province'],city:area['city'],region:area['region']};
    }else{
      this.initVillHeader = {province:this.nowArea['province'],city:this.nowArea['city'],region:this.nowArea['region']};
    }
  }

  // 确认添加
  addNew(){
    let data = JSON.parse(JSON.stringify(this.addVillage));
    data.priceTag = parseFloat(data.priceTag);
    // data.phoneNumber = parseInt(data.phoneNumber);
    console.log('确认添加',data);
    // if(1){return};
    // this.useAjax(data);
    this.adService.postFormData('/village/addVillage',data).subscribe(res=>{
      console.log(res);
      if(res.status==0){alert('添加成功！');this.resetPage({province:data.province,city:data.city,region:data.region})}
    });
  }

  //删除一个小区
  delOne(data){
    if(!confirm('是否删除该小区？')){return}
    console.log(data);
    this.adService.postFormData('/village/deleteVillage',{id:data.id}).subscribe(res=>{
      console.log(res);
      if(res.status==0){
        alert('删除成功！');
        if(this.showVillInfo.length>1){
          this.resetPage();
        }else{
          this.resetPage({province:'四川省'});
        }
      }
    });
  }


  // 修改小区信息
  initModify(){
    this.modifyInfo = JSON.parse(JSON.stringify(this.viewInfo));
    this.modifyInfo.longitude = this.modifyInfo.ptLoc.x;
    this.modifyInfo.latitude = this.modifyInfo.ptLoc.y;
  }
  // 修改小区，AreaSelect的事件
  selectAreaModify(e){
    if(e.region){
      // console.log(e);
      this.modifyInfo['province'] = e.province;
      this.modifyInfo['city'] = e.city;
      this.modifyInfo['region'] = e.region;
      this.getVillageCode('modify');
    }
  }
  modify(){
    let data = {
      id:this.modifyInfo.id,
      name:this.modifyInfo.name,
      propertyComName:this.modifyInfo.propertyComName,
      priceTag:this.modifyInfo.priceTag,
      phoneNumber:this.modifyInfo.phoneNumber,
      province:this.modifyInfo.province,
      city:this.modifyInfo.city,
      region:this.modifyInfo.region,
      ptLoc:{type:"Point",x:this.modifyInfo.longitude,y:this.modifyInfo.latitude,coordinates:[this.modifyInfo.longitude,this.modifyInfo.latitude]},
      buildings:this.modifyInfo.buildings
    }
    console.log(data);
    // if(1){return}
    this.adService.postData('/village/modifyVillage',data).subscribe(res=>{
      console.log(res);
      if(res.status==0){
        alert('修改成功！');
        this.resetPage();
        // 为了停留在查看小区窗口，等待获取到小区列表之后，刷新当前查看的小区信息
        this.showVillInfo = [];
        let time0 = setInterval(()=>{
          if(this.showVillInfo.length){
            clearInterval(time0);
            this.viewInfo = this.showVillInfo.filter(item=>{return item['id']==data.id})[0];
          }else{
            console.log('waiting...');
          }
        },50)
      }
    });
  }

  // 添加楼栋信息
  initAddBuild(){
    this.addBuildInfo = {
        serialNum:null,
        floorNum:null,
        unitNum:null,
        priceTag:null
      }
    if(this.viewInfo){
      this.addBuildInfo['id'] = this.viewInfo.id;
    }
  }
  addBuild(){
    if(this.viewInfo.buildings){
      let repeat = this.viewInfo.buildings.filter(item=>{return this.addBuildInfo['serialNum']==item['serialNum']});
      if(repeat.length){alert('已存在该楼栋！');return};
    }

    if(!this.addBuildInfo['priceTag']){delete this.addBuildInfo['priceTag']};
    this.adService.postFormData('/village/saveBuilding',this.addBuildInfo).subscribe(res=>{
      console.log(res);
      if(res.status==0){
        alert('添加成功！');
        this.resetPage();
        // 保留当前查看窗口，刷新信息
        this.showVillInfo = [];
        let time0 = setInterval(()=>{
          if(this.showVillInfo.length){
            clearInterval(time0);
            this.viewInfo = this.showVillInfo.filter(item=>{return item['id']==this.addBuildInfo['id']})[0];
          }else{
            console.log('waiting...');
          }
        },50)
      }
    });
  }

  delBuild(index){
    if(!confirm('确认要删除吗？')){return};
    this.modifyInfo.buildings.splice(index,1);
    console.log( this.modifyInfo)
    this.modify();
  }

  // 新增房屋信息
  initAddHouse(){
    // console.log(this.viewInfo)
    this.addHouseInfo = {
      villageName:'',
      serialNum:'',
      unit:'',
      floorNum:'',
      roomNumber:'',
      ownerName:'',
      phoneNumber:''
    }
    if(this.viewInfo){this.addHouseInfo['villageName']=this.viewInfo.address+'-'+this.viewInfo.name};
  }

  addHouse(){
    console.log(this.addHouseInfo);
    this.adService.postFormData('/house/addHouse',this.addHouseInfo).subscribe(res=>{
      console.log(res);
    });
  }

}
