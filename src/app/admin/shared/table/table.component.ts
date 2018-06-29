import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor() { }
 	@Input() heads:object[]; //表头数据
  @Input() bodys:object[] = []; //表格内容数据
  @Input() colorConfig:object; //表格内容颜色设置
  @Input() textConfig:object; //表格内容文字替换

  @Output() headEvent:EventEmitter<object> = new EventEmitter<object>(); //表头中的操作，主要是选中下拉框中的某一项触发
  @Output() bodyEvent:EventEmitter<object> = new EventEmitter<object>(); //表格内容中的操作，如删除、查看等

  selectedList:object[] = []; //选中的数据
  // 双向绑定，数据后面加上 Change ，固定写法！！  ...这里不用双向绑定，仅弹射到父组件即可
  @Output() selectedListChange:EventEmitter<any> = new EventEmitter<any>();

  dropList:string = '';
  // 表格的滚动距离
  boxScrollY:number = 0;
  // 表格最大滚动距离
  maxScrollY:number;
  // 表格和进度条高度的比例
  scaleBoxBar:number = 1;
  canDrag:boolean = false;

  ngOnInit() {
  	// 点击空白隐藏
  	window.onclick = ()=>{
  		this.dropList = '';
  	}
    // 拖动滚动条
    window.onmouseup = ()=>{
      this.canDrag = false;
    }
    window.onmousemove = (e) => {
      if(this.canDrag){
         if(this.boxScrollY + e.movementY/this.scaleBoxBar <=0){
           this.boxScrollY = 0;
           return;
         }
         if(this.boxScrollY + e.movementY/this.scaleBoxBar >= this.maxScrollY){
           this.boxScrollY = this.maxScrollY;
           return;
         }
         // console.log(this.scaleBoxBar);
         this.boxScrollY += e.movementY/this.scaleBoxBar;
      }
    }
  }

  // 传入数据改变时，清除已选择列表
  ngOnChanges(changes){
    console.log(changes);
    if(changes.bodys){
      this.selectedList = [];
      this.selectedListChange.emit(this.selectedList);
    }
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

  // 选择一个
  selectOne(body,checked){
    if(checked){
      this.selectedList.push(body);
    }else{
      this.selectedList = this.selectedList.filter((item)=>{return item!=body});
    }
    this.selectedListChange.emit(this.selectedList);
  }

  // 全选
  private ifSelectAll:boolean = false;
  selectAll(checked){
    // console.log(checked);
    if(checked){
      this.ifSelectAll = true;
      this.selectedList = this.bodys;
    }else{
      this.ifSelectAll = false;
      this.selectedList = [];
    }
    this.selectedListChange.emit(this.selectedList);
  }

  // 检测数据类型
  checkType(data:any,type:string){
  	return typeof(data)==type;
  }

   // 设置滚动条最大拖动距离，以及拖动距离和body滚动距离的比例
  setProgress(scrollBox,tbody,bar){
    this.maxScrollY = tbody.clientHeight - scrollBox.clientHeight;
    this.scaleBoxBar = bar.clientHeight/tbody.clientHeight;
  }

  // 计算滚动条的位置
  barPosi(scrollBox,tbody,bar){
    return scrollBox.clientHeight/tbody.clientHeight*bar.clientHeight+this.boxScrollY*bar.clientHeight/tbody.clientHeight+'px';
  }

}
