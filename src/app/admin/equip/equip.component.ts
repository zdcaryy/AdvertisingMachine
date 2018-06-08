import {Component, OnInit} from '@angular/core';
import{EquipService} from '../server/equip.service';


@Component({
  selector: 'app-equip',
  templateUrl: './equip.component.html',
  styleUrls: ['./equip.component.css']
})
export class EquipComponent implements OnInit {
  
  constructor(private equipService:EquipService) {
  }
  
  heads: object[];
  bodys: object[];
  selectedList:object[] = [];
  textConfig: object;
  colorConfig: object;
  
  searchNum;//搜索的设备编号
  
  ngOnInit() {
    //初始化设备列表
    // this.getEquip('getall');
    
    this.heads = [{name: '设备编号', key: 'num'},
      {name: '设备位置', key: 'position'},
      {name: '设备运行状态', key: 'state', child: ['所有', '正常', '故障']},
      {name: '备份情况', key: 'copy', child: ['所有', '已上传', '待上传', '上传中']},
      {name: '维护人员', key: 'person'},
      {name: '操作', key: 'operate', canOper: true}];
    
    this.bodys = [
      {num: '9527', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 0, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9529', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 1, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']},
    ];
    
    this.textConfig = {state: {0: '已上传', 1: '待上传', 2: '上传中'}, copy: {0: '已上传', 1: '待上传', 2: '上传中'}};
    this.colorConfig = {
      state: {0: 'red', 1: 'blue', 2: 'green'},
      copy: {0: 'red', 1: 'blue', 2: 'green'},
      operate: {查看: '#119C9D', 修改: '#119C9D'}
    };
  }
  
  getBodyEvent(e) {
    console.log(e);
  }
  
  getHeadEvent(e) {
    console.log(e);
  }
  getSelectedList(e){
    this.selectedList = e;
    console.log(this.selectedList);
  }
  //设备搜索
  searchEquip():void{
    this.getEquip('getEquip?num='+this.searchNum);
  }
  //获取设备信息
  getEquip(route:string):void{
    this.equipService.getData(route)
      .subscribe(res=>{
        console.log(res);
      });
  }
  //添加页面
  addView(){
    document.querySelector('.add-equip')['style'].display='block';
  }
  //关闭添加页面
  closeView(){
    document.querySelector('.add-equip')['style'].display='none';
  }
}
