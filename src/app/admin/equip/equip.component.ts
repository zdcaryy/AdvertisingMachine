import {Component, OnInit} from '@angular/core';
import{EquipService} from '../server/equip.service';
declare var $ : any;


@Component({
  selector: 'app-equip',
  templateUrl: './equip.component.html',
  styleUrls: ['./equip.component.css']
})
export class EquipComponent implements OnInit {
  constructor(private equipService:EquipService) {
  }
  heads: object[];
  bodys: object[];
  selectedList:object[] = [];
  textConfig: object;
  colorConfig: object;
  
  searchNum;//搜索的设备编号
  dialog:boolean=false;//控制同时弹框数量只能唯一
  operationResult:boolean=false;//判断添加、删除等操作是否成功，是否弹出提示框
  dialogContent:string;//提示框内容
  delItem:object[];//需要删除的设备信息
  
  //添加的设备对象
  addEquip={
    machineName:'',
    mac:'',
    netWork:'',
    models:'',
    province:'',
    city:'',
    region:'',
    villageName:'',
    buildingNum:'',
    property:'',
    accendantName:'',
  };
  //修改的设备对象
  modifyEquip={
  
  };
  //小区信息
  village=[];
  //楼栋信息
  building=[];
  //运维人员信息
  maintainer=[];
  
  ngOnInit() {
    this.heads = [{name: '设备编号', key: 'mac'},
      {name: '设备位置', key: 'position'},
      {name: '设备运行状态', key: 'status', child: [ '正常', '故障']},
      {name: '备份情况', key: 'copy', child: ['所有', '已上传', '待上传', '上传中']},
      {name: '维护人员', key: 'accendantNamen'},
      {name: '操作', key: 'operate', canOper: true}];
    
    this.bodys = [
      {num: '9527', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 0, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9529', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 1, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['修改', '删除']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['修改', '删除']},
    ];
    
    this.textConfig = {status: {0: '正常', 1: '故障'}};
    this.colorConfig = {
      status: {0: 'blue', 1: 'red'},
      operate: {修改: '#119C9D', 删除: '#d73e3e'}
    };
    
    //初始化设备列表
    this.getEquip('/machine/findAll');
  }
  // ngAfterViewChecked(){
  //   if(this.addFlag){
  //     $('[data-toggle="distpicker"]').distpicker();
  //   }
  //   console.log($('#province1').val());
  // }触发频率太高
  // onError():void{
  //   $('[data-toggle="distpicker"]').distpicker();
  // }
  
  getBodyEvent(e) {
    switch (e.key) {
      case "删除":
        console.log(e);
        this.delView(e.data);
        break;
      case "修改":
        if(!this.dialog){
          this.dialog=true;
          console.log(e.data);
          this.getPerson(e.data);//获取维护人员列表
          $('[data-toggle="distpicker"]').distpicker('destroy');
          $('[data-toggle="distpicker"]').distpicker({
            province:e.data.province,
            city: e.data.city,
            district: e.data.region
          });
          this.getEquipPosition(e.data);//获取设备位置信息
          $('#equip_config').fadeIn();
        }
        break;
    }
  }
  
  getHeadEvent(e) {
    console.log(e);
  }
  
  getSelectedList(e){
    this.selectedList = e;
    console.log(this.selectedList);
    if(this.selectedList.length!=0){
      $('.useless-btn').css({'background':'#d73e3e'});
    }
    else{
      $('.useless-btn').css({'background':'#d0d0d0'});
    }
  }
  
  //设备搜索
  searchEquip():void{
    this.getEquip('getEquip?num='+this.searchNum);
  }
  
  //获取设备信息列表
  getEquip(route:string):void{
    this.equipService.getData(route)
      .subscribe(res=>{
        this.bodys = res.map(function (item) {
          item['position']=item.province+item.city+item.region+item.villageName+item.buildingNum;
          item['operate'] =  ['修改', '删除'];
          return item;
        });
      });
  }
  
  //打开添加设备弹框
  addView(){
    if(!this.dialog){
      this.dialog=true;
      $('[data-toggle="distpicker"]').distpicker({
        province: '四川省'
      });
      $('[data-toggle="distpicker"]').distpicker('reset');
      $('#add_equip').fadeIn();
      this.getVillage();
      this.getPerson('');
    }
  }
  
  //小区信息的获取
  getVillage():void{
    this.addEquip.province=$('#province1').val();
    this.addEquip.city=$('#city1').val();
    this.addEquip.region=$('#district1').val();
    this.equipService.getData('/village/findVillageByArea?province='+this.addEquip.province+'&city='+this.addEquip.city+'&region='+this.addEquip.region).subscribe(res=>{
      this.village=res.villages;
      if(res.villages){
        this.addEquip.villageName=this.village[0].name;
        this.getBuildingAndProperty();
      }
      else{
        this.building=[];
        this.addEquip.property='';
      }
    })
  }
  //楼栋信息和物业信息的获取
  getBuildingAndProperty():void{
    console.log(this.addEquip.villageName);
    let selectVillage=this.village.filter(v=>v.name==this.addEquip.villageName);
    this.building=selectVillage[0].buildings;
    if(this.building){
      this.addEquip.buildingNum=this.building[0].serialNum;
    }
    else{
      this.addEquip.buildingNum='';
    }
    console.log(this.addEquip.buildingNum);
    this.addEquip.property=selectVillage[0].propertyComName;
  }
  //运维人员的获取
  getPerson(data):void{
    this.equipService.getData('/person/findMaintainer').subscribe(res=>{
      let that=this;
      res.map(function(item){
        if(item.house){
          that.maintainer.push(item.house.ownerName);
        }
      });
      this.addEquip.accendantName=this.maintainer[0];
      if(data){
        this.modifyEquip=data;
      }
    })
  }
  //修改设备弹框中获得设备位置
  getEquipPosition(data):void{
    this.modifyEquip['province']=$('#province2').val();
    this.modifyEquip['city']=$('#city2').val();
    this.modifyEquip['region']=$('#district2').val();
    this.equipService.getData('/village/findVillageByArea?province='+this.modifyEquip['province']+'&city='+this.modifyEquip['city']+'&region='+this.modifyEquip['region']).subscribe(res=>{
      this.modifyVillage=res.villages;
      console.log(this.modifyVillage);
      if(res.villages){
        if(data){
          this.modifyEquip['villageName']=data.villageName;
          this.modifyEquip['buildingNum']=data.buildingNum;
        }
        else{
          this.modifyEquip['villageName']=this.modifyVillage[0].name;
          this.modifyEquip['buildingNum']=this.modifyVillage[0].buildings[0].serialNum;
          console.log(this.modifyEquip['buildingNum'])
        }
        this.getEquipBuilding(data);
      }
      else{
        this.modifyBuilding=[];
      }
    })
  }
  //修改弹框中获取设备所在楼栋数
  getEquipBuilding(data){
    let selectVillage=this.modifyVillage.filter(v=>v.name==this.modifyEquip['villageName']);
    this.modifyBuilding=selectVillage[0].buildings;
    if(this.modifyBuilding&&!data.buildingNum){
      this.modifyEquip['buildingNum']=this.modifyBuilding[0].serialNum;
    }
  }
  //修改设备中的小区
  modifyVillage=[];
  //修改设备中的楼栋信息
  modifyBuilding=[];
  
  //关闭添加设备弹框
  closeAddView(){
    let that=this;
    $('#add_equip').fadeOut(function(){
      that.addEquip.mac='';
      that.addEquip.villageName='';
      that.addEquip.property='';
      that.addEquip.accendantName='';
      that.dialog=false;
      that.maintainer=[];
    });
  }
  
  //关闭修改设备弹框
  closeModifyView(){
    let that=this;
    $('#equip_config').fadeOut(function(){
      that.dialog=false;
      that.maintainer=[];
    });
  }
  
  //打开删除设备弹框
    delView(data){
      if(!this.dialog){
        this.delItem=data;
        this.dialog=true;
        $('.del-confirm').fadeIn();
      }
    }
    //关闭删除设备弹框
    cancel(){
      let that=this;
      $('.del-confirm').fadeOut(function(){
        that.dialog=false;
      });
  }
  
  //添加设备
  add(){
    this.equipService.postData('/machine/add',this.addEquip).subscribe(res=>{
      console.log(res);
    });
    //添加成功，弹出提示框。
    $('#add_equip').fadeOut();
    this.operationResult=true;
    this.dialogContent='添加成功';
    this.maintainer=[];
  }
  
  //修改设备信息
  modify(){
    $('#equip_config').fadeOut();
    this.operationResult=true;
    this.dialogContent='修改成功';
    this.maintainer=[];
  }
  
  //删除设备
  delMore() {
    let data = this.selectedList;
    if (data.length != 0) {
      this.delView(data);
    }
  }
  del(){
    let that=this;
    if(this.delItem.length){
      this.delItem.map(function (item){
        that.bodys=that.bodys.filter(equip => equip !==item);
      });
    }
    else{
      this.equipService.getData('/machine/deleteMachine?id='+this.delItem['id']).subscribe(res=>{
        if(res.status==0){
          this.bodys=this.bodys.filter(equip=>equip!==this.delItem);
          $('.del-confirm').fadeOut();
          //删除成功，弹出提示框
          this.operationResult=true;
          this.dialogContent='删除成功';
        }
      });
    }
  }
}
