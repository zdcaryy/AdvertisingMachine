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
  	this.heads = [{name:"编号",key:'num'},
  								{name:"姓名",key:'name'},
  								{name:"联系方式",key:'tel'},
  								{name:"调配状态",key:'status',child:['所有','已分配','待分配']},
  								{name:"操作",key:'operate',canOper:true}];

  	this.bodys = [{num:'9527',name:'小明6',tel:'13200000000',status:0,operate:'删除'},
  								{num:'9529',name:'小明6',tel:'13200000000',status:1,operate:'删除'},
  								{num:'9533',name:'小明6',tel:'13200000000',status:0,operate:['查看','删除']},
  								{num:'9534',name:'小明6',tel:'13200000000',status:1,operate:['查看','删除']},
  								{num:'9535',name:'小明6',tel:'13200000000',status:0,operate:['查看','删除']},
  								{num:'9536',name:'小明6',tel:'13200000000',status:1,operate:['查看','删除']},
  								{num:'9537',name:'小明6',tel:'13200000000',status:0,operate:['查看','删除']},
  								{num:'9538',name:'小明6',tel:'13200000000',status:0,operate:['查看','删除']},
  								{num:'9539',name:'小明6',tel:'13200000000',status:0,operate:['查看','删除']},
  								{num:'245235',name:'小明6',tel:'13200000000',status:1,operate:['查看','删除']},
  								{num:'234234',name:'小明6',tel:'13200000000',status:0,operate:['查看','删除']},
  								{num:'953533',name:'小明6',tel:'13200000000',status:0,operate:['查看','删除']},
  								{num:'765334',name:'小明6',tel:'13200000000',status:0,operate:['查看','删除']},
  								{num:'234378',name:'小明6',tel:'13200000000',status:0,operate:['查看','删除']},
  								{num:'95398763',name:'小明6',tel:'13200000000',status:1,operate:['查看','删除']},
  								{num:'97653',name:'小明6',tel:'13200000000',status:0,operate:['查看','删除']},
  								{num:'2358786546',name:'小明6',tel:'13200000000',status:1,operate:['查看','删除']},
  								{num:'27854346',name:'小明6',tel:'13200000000',status:0,operate:['查看','删除']},
  								{num:'97456363',name:'小明6',tel:'13200000000',status:1,operate:['查看','删除']},
  								{num:'4376457',name:'小明6',tel:'13200000000',status:0,operate:['查看','删除']},
  								{num:'646846',name:'小明6',tel:'13200000000',status:0,operate:['查看','删除']},
  								];
  }

  getBodyEvent(e){
  	console.log(e);
    switch (e.key) {
      case "删除":
        confirm('确定要删除 "'+e.data.name+'" ?')
        break;
    }
  }

}
