import { Component, OnInit, ElementRef, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private el:ElementRef) { }
 	@Input() heads:object[]; //表头数据
 	@Input() bodys:object[]; //表格内容数据
 	@Input() colorConfig:object; //表格内容颜色设置
    @Input() textConfig:object; //表格内容文字替换

	@Output() headEvent:EventEmitter<object> = new EventEmitter<object>(); //表头中的操作，主要是选中下拉框中的某一项触发
 	@Output() bodyEvent:EventEmitter<object> = new EventEmitter<object>(); //表格内容中的操作，如删除、查看等

 	dropList:string = '';
  showProgress:boolean = false;
  // 表格的滚动距离
  boxScrollY:number = 0;
  // 表格最大滚动距离
  maxScrollY:number;
  // 滚动条初始位置
  barScrollInit:number = 0;
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
         console.log(this.scaleBoxBar)
         this.boxScrollY += e.movementY/this.scaleBoxBar;
      }
    }
  }

  // ngDoCheck(){
  //   if(this.bodysChange){
  //     let bar = this.el.nativeElement.querySelector('.progressBase');
  //     if(bar){

  //     }
  //   }
  // }

  private bodysChange = false;

  ngOnChanges(changes: SimpleChanges){
    console.log('------ngOnChanges-----');
    if(changes.bodys){
      // body变化
      this.bodysChange = true;
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

  // 检测数据类型
  checkType(data:any,type:string){
  	return typeof(data)==type;
  }

  //  // 判断是否要显示进度条
  // ifShowProgress(){
  //   let tbody = this.el.nativeElement.querySelector('.tbody').clientHeight;
  //   let scrollBox = this.el.nativeElement.querySelector('.scrollBox').clientHeight;
  //   this.showProgress = tbody>scrollBox?true:false;
  //   console.log('-----ifShowProgress-----');
  //   console.log(this.showProgress);
  // }

  // fxxk 生命周期.....ngIf
  // 初始化滚动条，设置scrollBox对应进度条的比例,及初始位置
  // initProgress(){
  //   console.log('-----initProgress-----');
  //   let tbody = this.el.nativeElement.querySelector('.tbody').clientHeight;
  //   let scrollBox = this.el.nativeElement.querySelector('.scrollBox').clientHeight;
  //   // 初始位置
  //   let initial = scrollBox/tbody;
  //   let bar = this.el.nativeElement.querySelector('.progressBase');
  //   // 生命周期
  //   if(bar){
  //     console.log('-----find bar-----');
  //     this.barScrollInit = scrollBox/tbody*bar.clientHeight;
  //     // 比例
  //     this.scaleBoxBar = bar.clientHeight/tbody;
  //     this.maxScrollY = tbody - scrollBox;
  //     // init
  //     this.boxScrollY = 0;
  //   }
  // }

  setProgress(n){
    let tbody = this.el.nativeElement.querySelector('.tbody').clientHeight;
    let scrollBox = this.el.nativeElement.querySelector('.scrollBox').clientHeight;
    this.maxScrollY = tbody - scrollBox;
    this.scaleBoxBar = n;
  }

  // div滚动同时进度条变化
  // linkProgress(boxTop){
  //   if(!this.showProgress){return}
  //   // console.log(boxTop*this.scaleBoxBar);
  //   // console.log(boxTop*this.scaleBoxBar);
  //   this.boxScrollY = boxTop;
  // }

}
