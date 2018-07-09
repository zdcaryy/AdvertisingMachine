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
  
  allvillage:object[];
  addIf:boolean=false;
  modifyIf:boolean=false;
  success:boolean=true;
  
  searchNum;//搜索的设备编号
  dialog:boolean=false;//控制同时弹框数量只能唯一
  operationResult:boolean=false;//判断添加、删除等操作是否成功，是否弹出提示框
  dialogContent:string;//提示框内容
  delItem:object[];//需要删除的设备信息
  
  equipList=[];//存储列表数据，方便通过状态筛选数据。
  
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
  property:string;//物业信息
  initVill:object;//用于修改设备对象功能中，地理位置的初始化
  //运维人员信息
  maintainer=[];
  
  ngOnInit() {
    this.heads = [{label: '设备编号',field: 'mac'},
      {label: '设备位置', field: 'position'},
      {label: '设备运行状态', field: 'status', child: ['所有', '正常', '故障'],textConfig:{0: '正常', 1: '故障'},colorConfig:{0: 'blue', 1: 'red'}},
      {label: '备份情况', field: 'copy', child: ['所有', '已上传', '待上传', '上传中'],colorConfig:{0:'blue',1:'green',2:'red',3:'yellow'}},
      {label: '维护人员', field: 'accendantName'},
      {label: '操作', field: 'caozuo',operate:true,operations:['修改','删除'],colorConfig:{修改: '#119C9D', 删除: '#d73e3e'}}];
    
    this.bodys = [
    ];
    
    //初始化设备列表
    this.getEquip('/machine/findAll');
  }
  
  getOperateEvent(e) {
    switch (e.option) {
      case "删除":
        console.log(e);
        this.delView(e.data);
        break;
      case "修改":
        if(!this.dialog){
          this.dialog=true;
          this.modifyEquip=e.data;
          this.initVill={
            province:e.data.province,city:e.data.city,region:e.data.region,village:e.data.villageName,building:e.data.buildingNum
          };
          this.getPerson(e.data);
          this.equipService.getData('/village/findAllVillages').subscribe(res=>{
            this.allvillage=res.villageList;
            this.modifyIf=true;
            $('#equip_config').fadeIn();
          })
        }
        break;
    }
  }
  
  getDropdownEvent(e){
    console.log(e);
    switch(e.field){
      case 'status':
        switch(e.option){
          case '所有':
            this.bodys=this.equipList;
            break;
          case '正常':
            this.bodys=this.equipList.filter(equip=>equip['status']==0);
            break;
          case '故障':
            this.bodys=this.equipList.filter(equip=>equip['status']==1);
            break;
        }
        break;
      case 'copy':
        switch(e.option){
        
        }
        break;
    }
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
  
  selectPosition(e):void{
    console.log(e);
    this.addEquip.province=e.province;
    this.addEquip.city=e.city;
    this.addEquip.region=e.region;
    this.addEquip.villageName=e.village;
    this.addEquip.buildingNum=e.building;
  }
  modifyPosition(e):void{
    this.modifyEquip['province']=e.province;
    this.modifyEquip['city']=e.city;
    this.modifyEquip['region']=e.region;
    this.modifyEquip['villageName']=e.village;
    this.modifyEquip['buildingNum']=e.building;
    this.getProperty(this.modifyEquip);
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
        this.equipList=this.bodys;
      });
  }
  
  //获取物业信息
  getProperty(data):void{
    this.equipService.getData('/village/findVillageByArea?province='+data.province+'&city='+data.city+'&region='+data.region).subscribe(res=>{
      this.property=res.villages.filter(v=>v['name']==data.villageName)[0].propertyComName;
    })
  }
  
  //获取运维人员信息
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
  
  //打开添加设备弹框
  addView(){
    if(!this.dialog){
      this.dialog=true;
      $('#add_equip').fadeIn();
      this.getPerson('');
      this.equipService.getData('/village/findAllVillages').subscribe(res=>{
        console.log(res);
        this.allvillage=res.villageList;
        this.addIf=true;
      })
    }
  }
  //添加设备
  add(form){
    $('#add_equip').fadeIn();
    this.equipService.postData('/machine/add',this.addEquip).subscribe(res=>{
      if(res.status==0){
        //添加成功，弹出提示框。
        this.operationResult=true;
        this.dialogContent='添加成功';
        this.maintainer=[];
        this.success=true;
        $('#add_equip').fadeOut();
        form.reset();//添加成功重置表单
        this.getEquip('/machine/findAll');
      }
      if(res.status==1){
        this.success=false;
        this.operationResult=true;
        this.dialogContent=res.msg;
        $('#add_equip').fadeOut();
      }
    });
  }
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
  
  //修改设备信息
  modify(){
    console.log(this.modifyEquip);
    this.equipService.postData('/machine/modify',this.modifyEquip).subscribe(res=>{
      console.log(res);
      if(res.status==0){
        $('#equip_config').fadeOut();
        this.operationResult=true;
        this.dialogContent='修改成功';
        this.getEquip('/machine/findAll');
        this.maintainer=[];
        this.success=true;
      }
      if(res.status==1){
        $('#equip_config').fadeOut();
        this.operationResult=true;
        this.success=false;
        this.dialogContent=res.msg;
      }
    })
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
      let delArr = [];
      this.delItem.map(function (item) {
        delArr.push(item['id']);
      });
      console.log(delArr);
      this.equipService.postData('/machine/deleteMachine',delArr).subscribe(res=>{
        console.log(res);
        if(res.status==0){
          this.delItem.map(function (item){
            that.bodys=that.bodys.filter(equip => equip !==item);
          });
          this.equipList=this.bodys;
          $('.del-confirm').fadeOut();
          this.operationResult=true;
          this.dialogContent='删除成功';
        }
      })
    }
    else{
      let delArr=[];
      delArr.push(this.delItem['id']);
      console.log(delArr);
      this.equipService.postData('/machine/deleteMachine',delArr).subscribe(res=>{
        if(res.status==0){
          this.bodys=this.bodys.filter(equip=>equip!==this.delItem);
          this.equipList=this.bodys;
          $('.del-confirm').fadeOut();
          //删除成功，弹出提示框
          this.operationResult=true;
          this.dialogContent='删除成功';
        }
      });
    }
  }
}
