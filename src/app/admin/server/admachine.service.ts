import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AdmachineService {
  
  constructor(private http:HttpClient) { }
  private adMachineUrl="http://192.168.31.30:9062";
  getData(key:string):Observable<any>{
    return this.http.get<any>(this.adMachineUrl+key,{params:{access_token:localStorage.getItem('access_token')}});
  };
  //angular默认传json格式
  postData(key:string,data):Observable<any>{
    key += '?access_token='+localStorage.getItem('access_token');
    return this.http.post<any>(this.adMachineUrl+key,data);
  };
  //手动编码转成键值对
  postFormData(key:string,data):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'})
    };
    data['access_token'] = localStorage.getItem('access_token');
    let str = '';
    for(let i in data){
      if(str.length>0){str += `&${i}=${data[i]}`}else{str += `${i}=${data[i]}`}
    }
    return this.http.post<any>(this.adMachineUrl+key,str,httpOptions);
  }
  upfile(key:string,data:FormData):Observable<any>{
    data.append('access_token',localStorage.getItem('access_token'));
    return this.http.post<any>(this.adMachineUrl+key,data);
  }
}
