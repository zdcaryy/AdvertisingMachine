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
  textConfig:object;
  colorConfig:object;

  ngOnInit() {
  	this.heads = [{name:"编号",key:'num'},
  								{name:"广告名",key:'adName'},
  								{name:"视频源",key:'origin',child:['所有','已上传','待上传','上传中']},
  								{name:"上传时间",key:'time',child:['1','2','3']},
  								{name:"操作",key:'operate',canOper:true}];

  	this.bodys = [{num:'9527',adName:'advertisement1',origin:0,time:'2018-06-02 12:30',operate:'删除'},
  								{num:'9529',adName:'advertisement2',origin:1,time:'2018-06-02 12:33',operate:'删除'},
  								{num:'9533',adName:'advertisement3',origin:2,time:'2018-06-02 12:33',operate:['查看','删除']}];

  	this.textConfig = {origin:{0:'已上传',1:'待上传',2:'上传中'}};
  	this.colorConfig = {origin:{0:'red',1:'blue',2:'green'},operate:{查看:'purple',删除:'pink'}};
  }

  getBodyEvent(e){
  	console.log(e);
  }
  getHeadEvent(e){
  	console.log(e);
  }

}
