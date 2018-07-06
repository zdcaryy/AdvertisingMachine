import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AdverService {

  constructor(private http:HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type":  "application/json; charset=UTF-8"
    })
  };

  private adUrl = "http://localhost:9062";

  getData(key:string):Observable<any>{
    // return this.http.post<any>(this.sdkUrl+key,data,this.httpOptions);
    return this.http.get<any>(this.adUrl+key);
  }

  postData(key:string,data):Observable<any>{
    // return this.http.post<any>(this.sdkUrl+key,data,this.httpOptions);
    return this.http.post<any>(this.adUrl+key,data,this.httpOptions);
  }

  upFile(key:string,data):Observable<any>{
    // return this.http.post<any>(this.sdkUrl+key,data,this.httpOptions);
    var fileOptions = {
      headers: new HttpHeaders({  })
    };
    return this.http.post<any>(this.adUrl+key,data,fileOptions);
  }


  // 视频获取第一帧
  getThumb(videoInputEle,callback:Function){
  	// 点击取消也会触发onchange
  	if(videoInputEle.files.length==0){callback(null);return}
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var video = document.createElement('video');
    // 读取文件 --- URL.createObjectURL貌似有兼容问题，待发现、解决.....
    var url = URL.createObjectURL(videoInputEle.files[0]);
    video.src = url;
    video.onloadeddata = ()=>{
      // 这里设置为与源视频等宽高
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video,0,0,canvas.width,canvas.height);
      var result = canvas.toDataURL('image/jpeg',1);
      // console.log(result);
      // console.log(this.dataURLtoBlob(result));
      callback(this.dataURLtoBlob(result));
    }
  }

  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
    	  mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
  	return new Blob([u8arr], {type:mime});
	}

  // 时间格式转换
  formatDate(date,formate){
    var times = {
      y: date.getFullYear().toString(),
      M: (date.getMonth()+1).toString(),
      d: date.getDate().toString(),
      h: date.getHours().toString(),
      m: date.getMinutes().toString(),
      s: date.getSeconds().toString()
    }
    //year的规则不同，单独替换
    formate = formate.replace(/y+/g, function(item){
      return times.y.slice(-item.length);
    });
    return formate.replace(/(M+|d+|h+|m+|s+)/g, function(item){
      var t = times[item[0]];
      return item.length>1 && t.length<2 ?"0"+t:t;
    })
  }

}
