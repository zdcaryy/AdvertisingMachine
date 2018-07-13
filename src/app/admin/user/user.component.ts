import { Component, OnInit } from '@angular/core';
import{AdmachineService} from '../server/admachine.service';

declare var $:any;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService:AdmachineService) { }
  
  heads: object[];
  bodys: object[];
  userList=[];//存储列表数据，方便通过状态筛选数据。(系统管理员、其他)
  selectedList:object[] = [];
  textConfig: object;
  colorConfig: object;
  
  //添加的用户对象
  addUser={
    id:'',
    name:'',
    pwd:'',
    email:'',
    userLevel:'',
    phoneNumber:'',
    identity:'',
    ownerNames:[]
  };
  //修改的用户对象
  modifyUser={
  
  }
  dialog:boolean=false;//控制同时弹框数量只能唯一
  operationResult:boolean=false;//判断添加、删除等操作是否成功，是否弹出提示框
  dialogContent:string;//提示框内容
  delItem:object[];//需要删除的用户信息
  
  success:boolean=true;//判断添加和修改是否成功
  
  searchConfig:string;//搜索条件
  
  ngOnInit() {
    this.getUsers();
    this.heads = [{label: '用户姓名', field: 'name'},
      {label: '证件号', field: 'identity'},
      {label: '手机号', field: 'phoneNumber'},
      {label:'所属公司或户主名', field: 'ownerNames'},
      {label: '类型', field: 'userLevel',child:['所有','系统管理员','其他'],textConfig:{0: '系统管理员', 1: '其他'},colorConfig:{0: 'red',1: 'blue'}},
      {label: '操作', field:'caozuo',width:'25%',operate:true,operations:['修改','删除'],colorConfig:{修改: '#119C9D', 删除: '#d73e3e'}}
      ];
  
    this.bodys = [
    ];
  }
  
  getOperateEvent(e) {
    switch (e.option) {
      case "删除":
        this.delView(e.data);
        break;
      case "修改":
        if(!this.dialog){
          this.dialog=true;
          this.modifyUser=JSON.parse(JSON.stringify(e.data));
          $('#user_config').fadeIn();
        }
        break;
    }
  }
  
  getDropdownEvent(e){
    console.log(e);
    switch(e.userLevel){
      case '所有':
        this.bodys=this.userList;
        break;
      case '系统管理员':
        this.bodys=this.userList.filter(user=>user['userLevel']==0);
        break;
      case '其他':
        this.bodys=this.userList.filter(user=>user['userLevel']==1);
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
  
  //得到用户列表
  getUsers():void{
    this.userService.getData('/user/findAll')
      .subscribe(res=>{
        this.bodys = res.map(function (item) {
          item['operate'] =  ['修改', '删除'];
          return item;
        });
        this.userList=this.bodys;
      });
  }
  
  //打开添加用户弹框
  addView(){
    if(!this.dialog){
      this.dialog=true;
      $('#add_user').fadeIn();
    }
  }
  //关闭添加用户弹框
  closeAddView(form){
    let that=this;
    $('#add_user').fadeOut(function(){
      that.dialog=false;
      form.reset();//添加成功重置表单
    });
  }
  //添加用户
  add(form){
    $('#add_user').fadeOut();
    this.userService.postData('/user/add',this.addUser).subscribe(res=>{
      if(res.status==0){
        this.operationResult=true;
        this.dialogContent='添加成功';
        // this.addUser['operate']=['修改', '删除'];
        this.getUsers();//重新请求一次数据
        this.success=true;
        form.reset();
      }
      if(res.status==1){
        this.operationResult=true;
        this.dialogContent=res.msg;
        this.success=false;
      }
    });
  }
  
  //关闭修改用户信息弹框
  closeModifyView(){
    let that=this;
    $('#user_config').fadeOut(function(){
      that.dialog=false;
    });
  }
  
  //修改用户信息
  modify(){
    if(!(this.modifyUser['ownerNames'] instanceof Array)){
      this.modifyUser['ownerNames']=[this.modifyUser['ownerNames']];
    }
    this.userService.postData('/user/modify',this.modifyUser).subscribe(res=>{
      if(res.status==0){
        $('#user_config').fadeOut();
        this.operationResult=true;
        this.dialogContent='修改成功';
        this.getUsers();
        this.success=true;
      }
      if(res.status==1){
        $('#user_config').fadeOut();
        this.operationResult=true;
        this.dialogContent=res.msg;
        this.success=false;
      }
    })
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
      this.userService.postData('/user/delete',delArr).subscribe(res=>{
        if(res.status==0){
          this.delItem.map(function (item){
            that.bodys=that.bodys.filter(user=>user!==item);
            that.userList=that.bodys;
          });
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
      this.userService.postData('/user/delete',delArr).subscribe(res=>{
        if(res.status==0){
          this.bodys=this.bodys.filter(equip=>equip!==this.delItem);
          this.userList=this.bodys;
          $('.del-confirm').fadeOut();
          //删除成功，弹出提示框
          this.operationResult=true;
          this.dialogContent='删除成功';
        }
      });
    }
  }
  
  //搜索
  search():void{
    let reg=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if(reg.test(this.searchConfig)){
      this.bodys=[];
      this.userService.getData('/user/findByPhoneNumber?phoneNumber='+this.searchConfig).subscribe(res=>{
        res['operate'] =  ['修改', '删除'];
        this.bodys.push(res);
      })
    }
    else{
      this.userService.getData('/user/findByName?name='+this.searchConfig).subscribe(res=>{
        this.bodys = res.map(function (item) {
          item['operate'] =  ['修改', '删除'];
          return item;
        });
      })
    }
  }
  
  
}
