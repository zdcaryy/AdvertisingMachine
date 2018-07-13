import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private el:ElementRef) { }
  @Input() checkBox:boolean = false; //是否需要选中
 	@Input() heads:object[]; //表头数据
  @Input() bodys:object[] = []; //表格内容数据
  // @Input() colorConfig:object; //表格内容颜色设置
  // @Input() textConfig:object; //表格内容文字替换

  @Output() dropdownEvent:EventEmitter<object> = new EventEmitter<object>(); //表头中的操作，主要是选中下拉框中的某一项触发
  @Output() operateEvent:EventEmitter<object> = new EventEmitter<object>(); //表格内容中的操作，如删除、查看等

  selectedList:object[] = []; //选中的数据
  // 父子组件之间双向绑定，数据后面加上 Change ，固定写法！！  ...这里不用双向绑定，仅弹射到父组件即可
  @Output() selectedListChange:EventEmitter<any> = new EventEmitter<any>();

  dropList:string = '';
  // 表格和进度条高度的比例
  scaleBoxBar:number = 1;

  // 滚动条
  showScroll:boolean = false;
  canDrag:boolean = false;
  initialHeight:number;
  //最大拖拽距离
  maxScrollHeight:number;
  // head中，所有下拉列表的选中值
  headDropList:object = {};

  ngOnInit() {
    // 点击空白隐藏
    window.addEventListener('click',()=>{
      this.dropList = '';
    })
    // 窗口大小变化(主要是高度)，滚动条重置
    window.addEventListener('resize',()=>{
      this.ifShowScroll();
    });
    // 拖动滚动条
    window.addEventListener('mouseup',()=>{
      this.canDrag = false;
    });
    window.addEventListener('mousemove',(e) => {
      if(!this.canDrag){return};
      this.dragScrollBar(e);
    });
  }

  ngOnChanges(changes){
    if(changes.heads){
      let head = changes.heads.currentValue;
      head.map(item=>{
        if(item.child){
          this.headDropList[item.field] = item.child[0];
        }
      });
      this.dropdownEvent.emit(this.headDropList);
    }
    if(changes.bodys){
      // 传入数据改变时，清除已选择列表
      this.selectedList = [];
      this.selectedListChange.emit(this.selectedList);
      // 重置滚动条
      setTimeout(()=>{this.ifShowScroll();this.scrollToTop()},0)
    }
  }

  // 表头中的操作，如选中下拉框中的某一项
  headOper(field,option){
    this.headDropList[field] = option;
    // let toEmit = {
    //   field:field,
    //   option:option
    // };
    this.dropdownEvent.emit(this.headDropList);
  }
  // 表格body内部的事件，例如删除/查看等等
  bodyOper(field,option,data){
    let toEmit = {
      field:field,
      option:option,
      data:data
    };
    this.operateEvent.emit(toEmit);
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

  // 滚动条显示与否
  ifShowScroll(){
    let viewBox = this.el.nativeElement.querySelector('.viewBox');
    let tbody = this.el.nativeElement.querySelector('.tbody');
    // console.log(viewBox.clientHeight, tbody.clientHeight);
    // console.log(this.el.nativeElement.querySelector('[hahaha]'));
    if(tbody.clientHeight > viewBox.clientHeight){
      this.showScroll=true;
      // 重置滚动条的位置
      this.setScrollHeight();
    }else{
      this.showScroll=false
    };
  }
  // 滚动到顶部
  scrollToTop(){
    this.el.nativeElement.querySelector('.viewBox').scrollTop = 0;
  }
  // 设置滚动条的位置
  setScrollHeight(){
    let viewBox = this.el.nativeElement.querySelector('.viewBox');
    let tbody = this.el.nativeElement.querySelector('.tbody');
    let scrollBar = this.el.nativeElement.querySelector('.scrollBar');
    // 主要是初始化的时候，ngIf显示滚动条，会获取不到此节点
    if(!scrollBar){setTimeout(()=>{this.setScrollHeight()},0);return};
    // 已经显示的高度，即当前显示的高度加上已经滚过的高度
    let showHeight = viewBox.scrollTop+viewBox.clientHeight;
    // 剩余的未显示的高度
    let remainderHeight = tbody.clientHeight - showHeight;
    // 剩余的百分比
    let remainderPercent = remainderHeight/tbody.clientHeight*100+'%';
    scrollBar.style.height = remainderPercent;
  }
  // viewBox的onscroll事件
  viewBoxScroll(){
    // 拖拽滚动条时不执行 => 拖动滚动条会引起滚动，然后触发此事件，而此事件又会去设置滚动条的高度..
    if(this.canDrag){return};
    this.setScrollHeight();
  }
  // 设置滚动条的最大拖拽距离 
  setMaxScroll(){
    let viewBox = this.el.nativeElement.querySelector('.viewBox');
    let tbody = this.el.nativeElement.querySelector('.tbody');
    let scrollBase = this.el.nativeElement.querySelector('.scrollBase');
    this.maxScrollHeight = (tbody.clientHeight - viewBox.clientHeight)/tbody.clientHeight * scrollBase.clientHeight;
  }
  // 滚动条拖拽事件
  dragScrollBar(e){
    let viewBox = this.el.nativeElement.querySelector('.viewBox');
    let tbody = this.el.nativeElement.querySelector('.tbody');
    let scrollBar = this.el.nativeElement.querySelector('.scrollBar');
    let scrollBase = this.el.nativeElement.querySelector('.scrollBase');
    // scrollBar随拖拽变化高度 
    if(scrollBar.clientHeight-e.movementY <=0){
      // console.log('到底了');
      scrollBar.style.height = 0;
    }else if(scrollBar.clientHeight-e.movementY >= this.maxScrollHeight){
      // console.log('到顶了');
      scrollBar.style.height = this.maxScrollHeight+'px';
    }else{
      scrollBar.style.height = scrollBar.clientHeight-e.movementY+'px';
    }
    // viewBox随拖拽滚动 => 这里不能根据movementY变化，它不够精确，如果拖动很慢的话，滚动距离会变少
    let canScrollH = tbody.clientHeight-viewBox.clientHeight; //(tbody)余下的能够滚动的部分
    let reminderPercent = scrollBar.clientHeight/scrollBase.clientHeight; //(滚动条)能够拖动的部分(绿色),的百分比，对应 (tbody)能滚动的部分的百分比
    viewBox.scrollTop = canScrollH-reminderPercent*tbody.clientHeight; // tbody - viewBox - scrollTop = reminderPercent * tbody 
  }

}
