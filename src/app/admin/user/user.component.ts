import { Component, OnInit } from '@angular/core';
declare var $:any;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }
  
  heads: object[];
  bodys: object[];
  selectedList:object[] = [];
  textConfig: object;
  colorConfig: object;
  
  //添加的用户对象
  addUser={
    username:'',
    pwd:'',
    email:'',
    usertype:'1',
    tel:'',
    idcard:'',
    power:'1',
  };
  dialog:boolean=false;//控制同时弹框数量只能唯一
  operationResult:boolean=false;//判断添加、删除等操作是否成功，是否弹出提示框
  dialogContent:string;//提示框内容
  delItem:object[];//需要删除的设备信息
  
  ngOnInit() {
    this.heads = [{name: '用户姓名', key: 'username'},
      {name: '证件号', key: 'idcard'},
      {name: '手机号', key: 'tel'},
      {name:'所属公司或户主名', key: 'belong'},
      {name: '类型', key: 'type'},
      {name: '操作', key: 'operate', canOper: true}];
  
    this.bodys = [
      {username: '徐凤年', idcard: '510821199511333311',tel:18812341234, belong: '中钞信达', type: '系统管理员', operate: ['修改', '删除']},
      {username: '徐凤年', idcard: '510821199511333311',tel:18812341234, belong: '中钞信达', type: '系统管理员', operate: ['修改', '删除']},
      {username: '徐凤年', idcard: '510821199511333311',tel:18812341234, belong: '中钞信达', type: '系统管理员', operate: ['修改', '删除']},
      {username: '徐凤年', idcard: '510821199511333311',tel:18812341234, belong: '中钞信达', type: '系统管理员', operate: ['修改', '删除']},
      {username: '徐凤年', idcard: '510821199511333311',tel:18812341234, belong: '中钞信达', type: '系统管理员', operate: ['修改', '删除']},
      {username: '徐凤年', idcard: '510821199511333311',tel:18812341234, belong: '中钞信达', type: '系统管理员', operate: ['修改', '删除']}
    ];
  
    this.textConfig = {state: {0: '已上传', 1: '待上传', 2: '上传中'}, copy: {0: '已上传', 1: '待上传', 2: '上传中'}};
    this.colorConfig = {
      state: {0: 'red', 1: 'blue', 2: 'green'},
      copy: {0: 'red', 1: 'blue', 2: 'green'},
      operate: {修改: '#119C9D', 删除: '#d73e3e'}
    };
  }
  
  getBodyEvent(e) {
    switch (e.key) {
      case "删除":
        console.log(e);
       
        break;
      case "修改":
        if(!this.dialog){
          this.dialog=true;
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
  
  //关闭修改用户信息弹框
  closeModifyView(){
    $('#user_config').fadeOut();
  }
}
