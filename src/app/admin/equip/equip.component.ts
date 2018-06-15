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
    addNum:'',
    province:'',
    city:'',
    district:'',
    quarter:'',
    property:'',
    opePerson:'1',
    advertisement:'1'
  };
  ngOnInit() {
    //初始化设备列表
    // this.getEquip('getall');
    this.heads = [{name: '设备编号', key: 'num'},
      {name: '设备位置', key: 'position'},
      {name: '设备运行状态', key: 'state', child: ['所有', '正常', '故障']},
      {name: '备份情况', key: 'copy', child: ['所有', '已上传', '待上传', '上传中']},
      {name: '维护人员', key: 'person'},
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
    
    this.textConfig = {state: {0: '已上传', 1: '待上传', 2: '上传中'}, copy: {0: '已上传', 1: '待上传', 2: '上传中'}};
    this.colorConfig = {
      state: {0: 'red', 1: 'blue', 2: 'green'},
      copy: {0: 'red', 1: 'blue', 2: 'green'},
      operate: {修改: '#119C9D', 删除: '#d73e3e'}
    };
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
          $('[data-toggle="distpicker"]').distpicker({
            province: '福建省',
            city: '厦门市',
            district: '思明区'
          });
          $('[data-toggle="distpicker"]').distpicker('reset');
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
        console.log(res);
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
    }
  }
  
  //关闭添加设备弹框
  closeAddView(){
    let that=this;
    $('#add_equip').fadeOut(function(){
      that.addEquip.addNum='';
      that.addEquip.quarter='';
      that.addEquip.property='';
      that.addEquip.opePerson='1';
      that.addEquip.advertisement='1';
      that.dialog=false;
    });
  }
  
  //关闭修改设备弹框
  closeModifyView(){
    let that=this;
    $('#equip_config').fadeOut(function(){
      that.dialog=false;
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
    this.addEquip.province=$('#province1').val();
    this.addEquip.city=$('#city1').val();
    this.addEquip.district=$('#district1').val();
    console.log(this.addEquip);
    //添加成功，弹出提示框。
    $('#add_equip').fadeOut();
    this.dialog=false;
    this.operationResult=true;
    this.dialogContent='添加成功';
  }
  
  //修改设备信息
  modify(){
    let that=this;
    $('#equip_config').fadeOut(function(){
      that.dialog=false;
    });
    this.operationResult=true;
    this.dialogContent='修改成功';
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
      this.bodys=this.bodys.filter(equip=>equip!==this.delItem);
    }
   
    $('.del-confirm').fadeOut();
    this.dialog=false;
    let data = this.selectedList;
    this.equipService.postData('sdf', data);
    //删除成功，弹出提示框
    this.operationResult=true;
    this.dialogContent='删除成功';
  }
}
