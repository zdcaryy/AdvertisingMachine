import { Component, OnInit } from '@angular/core';
import {AdmachineService} from '../server/admachine.service';

declare var $:any;

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  constructor(private propertyService:AdmachineService) { }

  heads: object[];
  bodys: object[];
  selectedList:object[] = [];
  textConfig: object;
  colorConfig: object;
  
  dialog:boolean=false;
  operationResult:boolean=false;
  dialogContent:string;
  success:boolean=true;
  delItem:object[];
  propertyList=[];
  
  searchName:string;//查询所需的物业公司名
  
  addProperty={
    name:'',
    leaderName:'',
    leaderIdentity:'',
    leaderPhoneNumber:'',
    linkManName:'',
    linkManPhoneNumber:''
  }
  
  modifyProperty={};
  
  ngOnInit() {

    this.heads = [{label: '物业',field: 'name'},
      {label: '负责人', field: 'leaderName'},
      {label: '负责人证件号', field: 'leaderIdentity'},
      {label: '负责人电话', field: 'leaderPhoneNumber'},
      {label: '常用联系人', field: 'linkManName'},
      {label: '常用联系人电话',field:'linkManPhoneNumber'},
      {label: '操作', field: 'caozuo',operate:true,operations:['修改','删除'],colorConfig:{修改: '#119C9D', 删除: '#d73e3e'}}];
  
    this.bodys = [
    ];
    
    this.getProperty('/property/findAll');
  }
  getOperateEvent(e) {
    switch (e.option) {
      case "删除":
        this.delView(e.data);
        break;
      case "修改":
        if(!this.dialog){
          this.dialog=true;
          this.modifyProperty=JSON.parse(JSON.stringify(e.data));//对象的赋值实质是内存区，这样列表中的值和修改弹框中的值都双向绑定在一个内存空间
          console.log(this.modifyProperty);
          $('#property_config').fadeIn();
        }
        break;
    }
  }
  
  getDropdownEvent(e) {
    switch(e.option){
      case '系统管理员':
        break;
      case '管理员':
        break;
      case '业主':
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
  
  //获取物业列表数据
  getProperty(route:string):void{
    this.propertyService.getData(route)
      .subscribe(res=>{
        this.bodys = res.propertyList.map(function (item) {
          item['operate'] =  ['修改', '删除'];
          return item;
        });
        this.propertyList=this.bodys;
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
  add(form){
    this.addProperty.name=$.trim(this.addProperty.name);//去掉空格
    this.propertyService.postData('/property/addProperty',this.addProperty).subscribe(res=>{
      if(res.status==0){
        $('#add_property').fadeOut();
        this.operationResult=true;
        this.dialogContent='添加成功';
        // this.addProperty['operate']=['修改', '删除'];
        this.getProperty('/property/findAll');//重新请求一次数据
        this.success=true;
        form.reset();//添加成功后，重置表单
      }
      if(res.status==1){
        $('#add_property').fadeOut();
        this.operationResult=true;
        this.dialogContent=res.msg;
        this.success=false;
      }
    });
  }
  //修改物业信息
  modify(){
    this.propertyService.postData('/property/modifyProperty',this.modifyProperty).subscribe(res=>{
      console.log(res);
      if(res.status==0){
        $('#property_config').fadeOut();
        this.operationResult=true;
        this.dialogContent='修改成功';
        this.getProperty('/property/findAll');
        this.success=true;
      }
      if(res.status==1){
        $('#property_config').fadeOut();
        this.operationResult=true;
        this.dialogContent='该信息已存在';
        this.getProperty('/property/findAll');
        this.success=false;
      }
    })
  }
  //关闭修改用户信息弹框
  closeModifyView(){
    let that=this;
    $('#property_config').fadeOut(function(){
      that.dialog=false;
    });
  }
  
  //关闭添加物业信息弹框
  closeAddView(form){
    let that=this;
    $('#add_property').fadeOut(function(){
      that.dialog=false;
      form.reset();
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
  
  //删除用户
  delMore() {
    let data = this.selectedList;
    if (data.length != 0) {
      this.delView(data);
    }
  }
  del(){
    let that=this;
    if(this.delItem.length){
      let delArr=[];
      this.delItem.map(function (item){
        delArr.push(item['id']);
      });
      this.propertyService.postData('/property/deleteProperty',delArr).subscribe(res=>{
        if(res.status==0){
          this.delItem.map(function (item){
            that.bodys=that.bodys.filter(property=>property!==item);
          });
          this.propertyList=this.bodys;
          $('.del-confirm').fadeOut();
          //删除成功，弹出提示框
          this.operationResult=true;
          this.dialogContent='删除成功';
        }
      });
    }
    else{
      let delArr=[];
      delArr.push(this.delItem['id']);
      this.propertyService.postData('/property/deleteProperty',delArr).subscribe(res=>{
        if(res.status==0){
          this.bodys=this.bodys.filter(property=>property!==this.delItem);
          this.propertyList=this.bodys;
          $('.del-confirm').fadeOut();
          //删除成功，弹出提示框
          this.operationResult=true;
          this.dialogContent='删除成功';
        }
      });
    }
  }
  
  //按照物业公司名搜索
  search():void{
    this.searchName=$.trim(this.searchName);
    this.propertyService.getData('/property/findByName?name='+this.searchName).subscribe(res=>{
      this.bodys = res.map(function (item) {
        item['operate'] =  ['修改', '删除'];
        return item;
      });
    })
  }
}
