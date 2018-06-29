import { Component, OnInit } from '@angular/core';
import {PropertyService} from '../server/property.service';

declare var $:any;

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  constructor(private propertyService:PropertyService) { }
  
  heads: object[];
  bodys: object[];
  selectedList:object[] = [];
  textConfig: object;
  colorConfig: object;
  
  dialog:boolean=false;
  operationResult:boolean=false;
  dialogContent:string;
  delItem:object[];
  
  addProperty={
    name:'',
    leaderName:'',
    leaderIdentity:'',
    leaderPhoneNumber:'',
    linkManName:'',
    linkManPhoneNumber:''
  }
  
  ngOnInit() {
    this.heads = [{name: '物业', key: 'name'},
      {name: '负责人', key: 'leaderName'},
      {name: '负责人证件号', key: 'leaderIdentity'},
      {name: '负责人电话', key: 'leaderPhoneNumber'},
      {name: '常用联系人', key: 'linkManName'},
      {name: '常用联系人电话',key:'linkManPhoneNumber'},
      {name: '操作', key: 'operate', canOper: true}];
  
    this.bodys = [
    ];
  
    // this.textConfig = {status: {0: '正常', 1: '故障'}};
    this.colorConfig = {
      status: {0: 'blue', 1: 'red'},
      operate: {修改: '#119C9D', 删除: '#d73e3e'}
    };
    this.getProperty('/property/findAll');
  }
  getBodyEvent(e) {
    switch (e.key) {
      case "删除":
        console.log(e);
   
        break;
      case "修改":
        
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
  
  //获取物业列表数据
  getProperty(route:string):void{
    this.propertyService.getData(route)
      .subscribe(res=>{
        this.bodys = res.propertyList.map(function (item) {
          item['operate'] =  ['修改', '删除'];
          return item;
        });
      });
  }
  
  //打开添加设备弹框
  addView(){
    if(!this.dialog){
      this.dialog=true;
      $('#add_property').fadeIn();
    }
  }
  //添加物业信息
  add(){
    this.propertyService.postData('/property/addProperty',this.addProperty).subscribe(res=>{
      console.log(res);
      if(res.status==0){
        $('#add_property').fadeOut();
        this.operationResult=true;
        this.dialogContent='添加成功';
        this.addProperty['operate']=['修改', '删除'];
        this.getProperty('/property/findAll');//重新请求一次数据
      }
    });
  }
  
  //关闭添加物业信息弹框
  closeAddView(){
    let that=this;
    $('#add_property').fadeOut(function(){
      that.dialog=false;
    });
  }
}
