import { Component, OnInit } from '@angular/core';
import{UserService} from '../server/user.service';

declare var $:any;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService:UserService) { }
  
  heads: object[];
  bodys: object[];
  selectedList:object[] = [];
  textConfig: object;
  colorConfig: object;
  
  //添加的用户对象
  addUser={
    id:'',
    name:'',
    pwd:'',
    email:'',
    userLevel:'1',
    phoneNumber:'',
    identity:'',
  };
  //修改的用户对象
  modifyUser={
  
  }
  dialog:boolean=false;//控制同时弹框数量只能唯一
  operationResult:boolean=false;//判断添加、删除等操作是否成功，是否弹出提示框
  dialogContent:string;//提示框内容
  delItem:object[];//需要删除的用户信息
  
  ngOnInit() {
    this.getUsers();
    this.heads = [{name: '用户姓名', key: 'name'},
      {name: '证件号', key: 'identity'},
      {name: '手机号', key: 'phoneNumber'},
      {name:'所属公司或户主名', key: 'ownerNames'},
      {name: '类型', key: 'userLevel'},
      {name: '操作', key: 'operate', canOper: true}];
  
    this.bodys = [
    ];
  
    this.textConfig = {userLevel: {0: '系统管理员', 1: '物业公司主管', 2: '物业员工',3:'业主'}};
    this.colorConfig = {
      state: {0: 'red', 1: 'blue', 2: 'green'},
      copy: {0: 'red', 1: 'blue', 2: 'green'},
      operate: {修改: '#119C9D', 删除: '#d73e3e'}
    };
  }
  
  getBodyEvent(e) {
    switch (e.key) {
      case "删除":
        this.delView(e.data);
        break;
      case "修改":
        if(!this.dialog){
          this.dialog=true;
          this.modifyUser=e.data;
          $('#user_config').fadeIn();
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
  
  //得到用户列表
  getUsers():void{
    this.userService.getData('/user/findAll')
      .subscribe(res=>{
        this.bodys = res.map(function (item) {
          item['operate'] =  ['修改', '删除'];
          return item;
        });
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
  closeAddView(){
    let that=this;
    $('#add_user').fadeOut(function(){
      that.dialog=false;
    });
  }
  //添加用户
  add(){
    $('#add_user').fadeOut();
    this.userService.postData('/user/add',this.addUser).subscribe(res=>{
      this.operationResult=true;
      this.dialogContent='添加成功';
      this.addUser['operate']=['修改', '删除'];
      this.getUsers();//重新请求一次数据
      // this.bodys.push(this.addUser);
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
    this.userService.postData('/user/modify',this.modifyUser).subscribe(res=>{
      if(res.status==0){
        $('#user_config').fadeOut();
        this.operationResult=true;
        this.dialogContent='修改成功';
        this.getUsers();
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
      this.delItem.map(function (item){
        let delArr=[];
        delArr.push(item['id']);
        that.userService.postData('/user/delete',delArr).subscribe(res=>{
          if(res.status==0){
            that.bodys=that.bodys.filter(user=>user!==item);
            $('.del-confirm').fadeOut();
            //删除成功，弹出提示框
            that.operationResult=true;
            that.dialogContent='删除成功';
          }
        });
      });
    }
    else{
      let delArr=[];
      delArr.push(this.delItem['id']);
      this.userService.postData('/user/delete',delArr).subscribe(res=>{
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
