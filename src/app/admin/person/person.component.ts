import { Component, OnInit } from '@angular/core';
import{AdmachineService} from '../server/admachine.service';
import{trigger,state,style,animate,transition} from '@angular/animations';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  animations:[
    trigger('dialogState', [
      state('show', style({
        opacity:1,
      })),
      state('hidden',   style({
        opacity:0
      })),
      transition('show => hidden', animate('200ms ease-in')),
      transition('hidden => show', animate('200ms ease-out'))
    ])
  ]
})
export class PersonComponent implements OnInit {

  constructor(private admachineService:AdmachineService) { }
  heads: object[];
  bodys: object[];
  selectedList:object[] = [];
  textConfig: object;
  colorConfig: object;
  
  addDialogState='hidden';//弹框是否显示

  ngOnInit() {
    this.heads = [{label: '人员姓名',field: 'name'},
      {label: '所属公司(户主)', field: 'ownerName'},
      {label: '联系电话', field: 'phoneNumber'},
      {label: '类型', field: 'type', child: ['业主','租户','物业员工','公司员工','访客','维护人员']},
      {label: '人脸特征数据', field: 'tag',child:['已通过','审核中']},
      {label:'入住时间',field:'date'},
      {label: '操作', field: 'caozuo',operate:true,operations:['查看']}];
  
    this.bodys = [
    ];
  
    this.textConfig = {
      type: {0: '业主', 1: '租户',2:'物业员工',3:'公司员工',4:'访客',5:'维护人员'},
      tag:{0:'已通过',1:'审核中'}
    };
    this.colorConfig = {
      type:{0:'blue',1:'green',2:'red',3:'yellow',4:'pink',5:'purple',6:'gold'},
      tag:{0:'#119C9D',1:'#d73e3e'},
      caozuo: {查看: '#119C9D'}
    };
    //初始化设备列表
    this.getPerson();
  }
  getOperateEvent(e) {
    switch (e.option) {
      case "删除":
        console.log(e);
        break;
      case "修改":
      
    }
  }
  
  getDropdownEvent(e){
    console.log(e);
  }
  
  getSelectedList(e){
    console.log(e);
  }
  
  //获取人员列表
  getPerson(){
    this.admachineService.getData('/person/findAll').subscribe(res=>{
      let that=this;
      this.bodys = res.map(function (item) {
        item['date']=that.timestampToTime(item.date)
        item['operate'] =  ['查看'];
        return item;
      });
    })
  }
  //时间格式化
  timestampToTime(timestamp) {
    let date = new Date(timestamp),
    Y = date.getFullYear() + '-',
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
    D = (date.getDate()<10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
    return Y+M+D;
  }
  //打开添加人员弹框
  addDialogStateShow(){
    this.addDialogState='show';
  }
  //关闭添加人员弹框
  addDialogHidden(){
    this.addDialogState='hidden';
  }
}
