import { Component, OnInit } from '@angular/core';
import { AdverService } from '../server/adver.service';

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.css']
})
export class VillageComponent implements OnInit {

  constructor(private adService:AdverService) { }

  // 所有小区信息
  villInfo:object[];
  initVill:object;
  // 选中的小区列表
  selectedVill:object[];
  
  heads: object[];
  selectedList:object[] = [];
  textConfig:object;
  colorConfig:object;

  ngOnInit() {
    this.initAll();
    this.getVillage();
    this.initVill = {province:'四川省',city:'成都市',region:'双流区',village:'子木小区',building:2};
  }

  test(){
    this.villInfo = [
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'}
    ];
  }

  testLong(){
    this.villInfo = [
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'},
      {name:'asdasd',propertyComName:'asdfasdas',address:'2545445',phoneNumber:'564364564'}
    ];
  }

  initAll(){
    // this.villInfo = [];
    this.selectedVill = [];
    this.heads = [{label:"小区名",field:'name'},
                  {label:"所属物业",field:'propertyComName'},
                  {label:"位置",field:'address'},
                  {label:"物业电话",field:'phoneNumber'},
                  // {label:"操作",field:'operate',canOper:true}];
                  {label:"操作",field:'operate',operate:true,operations:['查看','删除']}];
    this.villInfo = [];
    this.textConfig = {};
    this.colorConfig = {};
  }


  getVillage(){
    this.adService.getData('/village/findAllVillages').subscribe(res=>{
      if(res.status != 0){alert('获取小区列表失败...');return;}
      this.villInfo = res.villageList.map(item=>{item['address']=item.province+item.city+item.region;return item});
      console.log(this.villInfo);
    });
  }

  selectVillage(e){
    console.log(e);
  }
  
  getSelectedList(e){
    // console.log(e);
  }

}
