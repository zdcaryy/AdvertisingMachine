import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css']
})
export class AdvertisementComponent implements OnInit {

  constructor() { }

  heads: object[];
  bodys:object[];
  selectedList:object[] = [];
  textConfig:object;
  colorConfig:object;
  // 是否显示弹窗
  popUp:boolean = null;

  ngOnInit() {
  	this.heads = [{name:"编号",key:'num'},
  								{name:"广告名",key:'adName'},
  								{name:"视频源",key:'origin',child:['所有','已上传','待上传','上传中']},
  								{name:"上传时间",key:'time'},
  								{name:"操作",key:'operate',canOper:true}];

  	this.bodys = [{num:'9527',adName:'advertisement1',origin:0,time:'2018-06-02 12:30',operate:'删除'},
  								{num:'9529',adName:'advertisement2',origin:1,time:'2018-06-02 12:33',operate:'删除'},
  								{num:'9533',adName:'advertisement3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'9534',adName:'advertisement3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'9535',adName:'advertisement3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'9536',adName:'advertisement3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'9537',adName:'advertisement3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'9538',adName:'advertisement3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'9539',adName:'advertisement3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'245235',adName:'advertisement3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'234234',adName:'advertisement3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'953533',adName:'advertisement3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'765334',adName:'advertisement3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'234378',adName:'advertisement3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'95398763',adName:'advertisement3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'97653',adName:'advertisement3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'2358786546',adName:'advertisement3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'27854346',adName:'advertisement3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'97456363',adName:'advertisement3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'4376457',adName:'advertisement3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
  								{num:'646846',adName:'advertisement3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
  								];

  	this.textConfig = {origin:{0:'已上传',1:'待上传',2:'上传中'}};
  	this.colorConfig = {origin:{0:'red',1:'blue',2:'green'},operate:{查看:'purple',删除:'pink'}};
  }

  getBodyEvent(e){
  	console.log(e);
    switch (e.key) {
      case "删除":
        confirm('确定要删除 "'+e.data.adName+'" ?')
        break;
    }
  }
  getHeadEvent(e){
  	console.log(e);
    switch (e.data) {
      case "已上传":
        this.bodys = [{num:'9527',adName:'哈哈哈哈哈哈哈1',origin:0,time:'2018-06-02 12:30',operate:'删除'},
                  {num:'9529',adName:'爱手工法是否IPO结算单2',origin:1,time:'2018-06-02 12:33',operate:'删除'},
                  {num:'9533',adName:'爱手工法是否IPO结算单3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9534',adName:'爱手工法是否IPO结算单3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9535',adName:'爱手工法是否IPO结算单3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9536',adName:'爱手工法是否IPO结算单3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9537',adName:'爱手工法是否IPO结算单3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9538',adName:'爱手工法是否IPO结算单3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9539',adName:'爱手工法是否IPO结算单3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'245235',adName:'爱手工法是否IPO结算单3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'234234',adName:'爱手工法是否IPO结算单3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'953533',adName:'爱手工法是否IPO结算单3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'765334',adName:'爱手工法是否IPO结算单3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'234378',adName:'爱手工法是否IPO结算单3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'95398763',adName:'爱手工法是否IPO结算单3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'97653',adName:'爱手工法是否IPO结算单3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'2358786546',adName:'爱手工法是否IPO结算单3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'27854346',adName:'爱手工法是否IPO结算单3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'97456363',adName:'爱手工法是否IPO结算单3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'4376457',adName:'爱手工法是否IPO结算单3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'646846',adName:'爱手工法是否IPO结算单3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  ];
        break;
      case '待上传':
        this.bodys = [{num:'9527',adName:'哈哈哈哈哈哈哈1',origin:0,time:'2018-06-02 12:30',operate:'删除'},
                  {num:'9529',adName:'哈哈哈哈哈哈哈2',origin:1,time:'2018-06-02 12:33',operate:'删除'},
                  {num:'9533',adName:'哈哈哈哈哈哈哈3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9534',adName:'哈哈哈哈哈哈哈3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9535',adName:'哈哈哈哈哈哈哈3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9536',adName:'哈哈哈哈哈哈哈3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9537',adName:'哈哈哈哈哈哈哈3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9538',adName:'哈哈哈哈哈哈哈3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9538',adName:'哈哈哈哈哈哈哈3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9538',adName:'哈哈哈哈哈哈哈3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9538',adName:'哈哈哈哈哈哈哈3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9538',adName:'哈哈哈哈哈哈哈3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9538',adName:'哈哈哈哈哈哈哈3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9538',adName:'哈哈哈哈哈哈哈3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9539',adName:'哈哈哈哈哈哈哈3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'245235',adName:'哈哈哈哈哈哈哈3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'234234',adName:'哈哈哈哈哈哈哈3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'953533',adName:'哈哈哈哈哈哈哈3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'765334',adName:'哈哈哈哈哈哈哈3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'234378',adName:'哈哈哈哈哈哈哈3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'95398763',adName:'哈哈哈哈哈哈哈3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'97653',adName:'哈哈哈哈哈哈哈3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'2358786546',adName:'哈哈哈哈哈哈哈3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'27854346',adName:'哈哈哈哈哈哈哈3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'97456363',adName:'哈哈哈哈哈哈哈3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'4376457',adName:'哈哈哈哈哈哈哈3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'646846',adName:'哈哈哈哈哈哈哈3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  ];
          break;
          case '上传中':
        this.bodys = [{num:'9527',adName:'哈哈哈哈哈哈哈1',origin:0,time:'2018-06-02 12:30',operate:'删除'},
                  {num:'9529',adName:'哈哈哈哈哈哈哈2',origin:1,time:'2018-06-02 12:33',operate:'删除'},
                  {num:'9533',adName:'哈哈哈哈哈哈哈3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9534',adName:'哈哈哈哈哈哈哈3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9535',adName:'哈哈哈哈哈哈哈3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9536',adName:'哈哈哈哈哈哈哈3',origin:1,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9537',adName:'哈哈哈哈哈哈哈3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9538',adName:'哈哈哈哈哈哈哈3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9538',adName:'哈哈哈哈哈哈哈3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9538',adName:'哈哈哈哈哈哈哈3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']},
                  {num:'9538',adName:'哈哈哈哈哈哈哈3',origin:0,time:'2018-06-02 12:33',operate:['查看','删除']}
                  ];
          break;
    }
  }
  getSelectedList(e){
    this.selectedList = e;
    console.log(this.selectedList);
  }
  delMul(){
    console.log(this.selectedList);
  }

  addNew(){
    
  }

}
