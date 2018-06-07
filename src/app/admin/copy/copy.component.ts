import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.css']
})
export class CopyComponent implements OnInit {

  constructor() {
  }

  heads: object[];
  bodys:object[];
  textConfig:object;
  colorConfig:object;

  ngOnInit() {
    this.heads = [{name: '编号', key: 'num'},
      {name: '设备号', key: 'adNum'},
      {name: '备份日期', key: 'time'},
      {name: '备份状态', key: 'state', child: ['已上传','未上传']},
      ];
  

    this.bodys = [
      {num: '9527', adNum: '20181111', time: '2018-06-02 12:30', state:0},
      {num: '9527', adNum: '20181111', time: '2018-06-02 12:30', state:0},
      {num: '9527', adNum: '20181111', time: '2018-06-02 12:30', state:0},
      ];

    this.textConfig = {state: {0: '可查看', 1: '已清理'}};
    // this.colorConfig = {origin: {0: 'blue', 1: 'red'}, operate: {查看: 'purple', 删除: 'pink'}};
  }

  getBodyEvent(e) {
    console.log(e);
  }

  getHeadEvent(e) {
    console.log(e);
  }

}
