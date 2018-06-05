import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-equip',
  templateUrl: './equip.component.html',
  styleUrls: ['./equip.component.css']
})
export class EquipComponent implements OnInit {
  
  constructor() {
  }
  
  heads: object[];
  bodys: object[];
  textConfig: object;
  colorConfig: object;
  
  ngOnInit() {
    this.heads = [{name: '设备编号', key: 'num'},
      {name: '设备位置', key: 'position'},
      {name: '设备运行状态', key: 'state', child: ['所有', '正常', '故障']},
      {name: '备份情况', key: 'copy', child: ['所有', '已上传', '待上传', '上传中']},
      {name: '维护人员', key: 'person'},
      {name: '操作', key: 'operate', canOper: true}];
    
    this.bodys = [
      {num: '9527', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 0, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9529', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 1, copy: 0, person: '泥巴', operate: ['查看', '修改']},
      {num: '9533', position: '成都市双流区华阳街道999号时代奥特莱斯小区09幢', state: 2, copy: 0, person: '泥巴', operate: ['查看', '修改']}
    ];
    
    this.textConfig = {state: {0: '已上传', 1: '待上传', 2: '上传中'}, copy: {0: '已上传', 1: '待上传', 2: '上传中'}};
    this.colorConfig = {
      state: {0: 'red', 1: 'blue', 2: 'green'},
      copy: {0: 'red', 1: 'blue', 2: 'green'},
      operate: {查看: 'purple', 修改: 'pink'}
    };
  }
  
  getBodyEvent(e) {
    console.log(e);
  }
  
  getHeadEvent(e) {
    console.log(e);
  }
}
