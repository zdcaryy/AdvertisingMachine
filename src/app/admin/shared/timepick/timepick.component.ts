import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'TimePick',
  templateUrl: './timepick.component.html',
  styleUrls: ['./timepick.component.css']
})
export class TimepickComponent implements OnInit {

  @Input() dateTime:string;
	@Output() dateTimeChange:EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }


  ngAfterViewInit(){

    Array.prototype.map.call(document.querySelectorAll('input'),function(item){
      item.addEventListener('focus',function(){
        // item.select();
      })
    })

    let maxEle = document.querySelectorAll('[maxVal]');
    Array.prototype.map.call(maxEle,function(item){
      let max = parseFloat(item.attributes.maxVal.value);
      item.addEventListener('input',function(){
        item.value>max?item.value=max:'';
      })
    })

    let minEle = document.querySelectorAll('[minVal]');
    Array.prototype.map.call(minEle,function(item){
      let min = parseFloat(item.attributes.minVal.value);
      item.addEventListener('input',function(){
        if(item.value<min){
          item.value='0'+min;
          item.select();
        }
        if(item.value.length==0){
          item.value='0'+min;
          item.select();
        }
      })
    })

    let maxLen = document.querySelectorAll('[maxLen]');
    Array.prototype.map.call(maxLen,function(item){
      let max = parseFloat(item.attributes.maxLen.value);
      item.addEventListener('input',function(){
        let val = item.value;
        val.length>max?item.value=val.substr(val.length-max,val.length):'';
      })
    })

  }

  date:object = {
    y:'',
    M:'',
    d:'',
    h:'',
    m:'',
    s:''
  };

  init(){
    if(this.date['y'].length){return}
    let today = new Date();
    this.date = {
      y:today.getFullYear().toString(),
      M:today.getMonth().toLocaleString("en-US",{minimumIntegerDigits:2}),
      d:today.getDay().toLocaleString("en-US",{minimumIntegerDigits:2}),
      h:today.getHours().toLocaleString("en-US",{minimumIntegerDigits:2}),
      m:today.getMinutes().toLocaleString("en-US",{minimumIntegerDigits:2}),
      s:'00'
      // s:today.getSeconds().toLocaleString("en-US",{minimumIntegerDigits:2})
    }
    this.emitDate();       
  }

  getYear(){
    return new Date().getFullYear();
  }

  emitDate(){
    // console.log(this.date);
    let fullDate = this.date['y']+'-'+this.date['M']+'-'+this.date['d']+' '+this.date['h']+':'+this.date['m']+':'+this.date['s'];
    // console.log(fullDate);
   	this.dateTimeChange.emit(fullDate);
  }

}
