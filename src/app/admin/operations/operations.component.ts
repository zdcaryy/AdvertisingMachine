import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  constructor() { }

  heads: object[];
  bodys:object[];
  selectedList:object[] = [];
  textConfig:object;
  colorConfig:object;

  ngOnInit() {
  	this.heads = [{label:"编号",field:'num',width:'15%'},
  								{label:"姓名",field:'name',width:'20%',child:['所有','11','32']},
  								{label:"联系方式",field:'tel',width:'25%'},
  								{label:"调配状态",field:'status',width:'15%',child:['所有','已分配','待分配']},
  								{label:"操作",field:'caozuo',width:'25%',operate:true,operations:['查看','删除']}];

  	this.bodys = [{num:'9527',name:'小明6',tel:'13200000000',status:0},
  								{num:'9529',name:'小明6',tel:'13200000000',status:1},
  								{num:'9533',name:'小明6',tel:'13200000000',status:0},
  								{num:'9534',name:'小明6',tel:'13200000000',status:1},
  								{num:'9535',name:'小明6',tel:'13200000000',status:0},
  								{num:'9536',name:'小明6',tel:'13200000000',status:1},
  								{num:'9537',name:'小明6',tel:'13200000000',status:0},
  								{num:'9538',name:'小明6',tel:'13200000000',status:0},
  								{num:'9539',name:'小明6',tel:'13200000000',status:0},
  								{num:'245235',name:'小明6',tel:'13200000000',status:1},
  								{num:'234234',name:'小明6',tel:'13200000000',status:0},
  								{num:'953533',name:'小明6',tel:'13200000000',status:0},
  								{num:'765334',name:'小明6',tel:'13200000000',status:0},
  								{num:'234378',name:'小明6',tel:'13200000000',status:0},
  								{num:'95398763',name:'小明6',tel:'13200000000',status:1},
  								{num:'97653',name:'小明6',tel:'13200000000',status:0},
  								{num:'2358786546',name:'小明6',tel:'13200000000',status:1},
  								{num:'27854346',name:'小明6',tel:'13200000000',status:0},
  								{num:'97456363',name:'小明6',tel:'13200000000',status:1},
  								{num:'4376457',name:'小明6',tel:'13200000000',status:0},
  								{num:'646846',name:'小明6',tel:'13200000000',status:0},
  								];

    this.textConfig = {status:{0:'状态0',1:'状态1',2:'状态2'},name:{小明6:'SB'}};
    this.colorConfig = {status:{0:'red',1:'#009688',2:'#666666'},caozuo:{查看:'purple',删除:'pink'}};
  }

  // getBodyEvent(e){
  // 	console.log(e);
  //   switch (e.field) {
  //     case "删除":
  //       confirm('确定要删除 "'+e.data.name+'" ?')
  //       break;
  //   }
  // }

  getSelectedList(e){
    console.log(e)
  }
  getDropdownEvent(e){
    console.log(e)
  }
  getOperateEvent(e){
    console.log(e)
  }

}
