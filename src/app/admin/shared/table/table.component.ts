import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor() { }
 	@Input() heads:object[]; //表头数据
 	@Input() bodys:object[]; //表格内容数据
 	@Input() colorConfig:object; //表格内容颜色设置
  @Input() textConfig:object; //表格内容文字替换

	@Output() headEvent:EventEmitter<object> = new EventEmitter<object>(); //表头中的操作，主要是选中下拉框中的某一项触发
 	@Output() bodyEvent:EventEmitter<object> = new EventEmitter<object>(); //表格内容中的操作，如删除、查看等

 	dropList:string = '';

  ngOnInit() {
  	// 点击空白隐藏
  	window.addEventListener('click',()=>{
  		this.dropList = '';
  	})
  	// this.colorConfig = {origin:{已上传:'red',待上传:'blue',上传中:'green'}};
  }

  // 表头中的操作，如选中下拉框中的某一项
  headOper(key,data){
  	let toEmit = {
  		key:key,
  		data:data
  	};
  	this.headEvent.emit(toEmit);
  }
  // 表格body内部的事件，例如删除/查看等等
  bodyOper(key,data){
  	let toEmit = {
  		key:key,
  		data:data
  	};
  	this.bodyEvent.emit(toEmit);
  }

  // 检测数据类型
  checkType(data:any,type:string){
  	return typeof(data)==type;
  }

}
